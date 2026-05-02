const fs = require('fs')
const path = require('path')
const { Client } = require('pg')
const { loadEnvFile } = require('./load-env')

loadEnvFile()

const DEFAULT_RDS_HOST = 'database-1.c3qckuwyatfg.ap-south-1.rds.amazonaws.com'
const DEFAULT_RDS_REGION = 'ap-south-1'

function getSslConfig() {
  if (process.env.PGSSL === 'false') {
    return undefined
  }

  const caPath = process.env.PGSSL_CA_PATH || process.env.RDS_CA_PATH || './global-bundle.pem'
  const absoluteCaPath = path.isAbsolute(caPath) ? caPath : path.join(process.cwd(), caPath)

  if (fs.existsSync(absoluteCaPath)) {
    return {
      rejectUnauthorized: true,
      ca: fs.readFileSync(absoluteCaPath, 'utf8'),
    }
  }

  return { rejectUnauthorized: false }
}

function parseAwsDate(value) {
  const match = value.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/)
  if (!match) return null

  return Date.UTC(
    Number(match[1]),
    Number(match[2]) - 1,
    Number(match[3]),
    Number(match[4]),
    Number(match[5]),
    Number(match[6])
  )
}

function isRdsAuthTokenExpired(token, skewSeconds = 60) {
  let url
  try {
    url = new URL(token.startsWith('http') ? token : `https://${token}`)
  } catch {
    return false
  }

  const signedAt = url.searchParams.get('X-Amz-Date')
  const expires = Number(url.searchParams.get('X-Amz-Expires') || 0)
  const signedAtMs = signedAt ? parseAwsDate(signedAt) : null

  if (!signedAtMs || !expires) return false

  return Date.now() >= signedAtMs + expires * 1000 - skewSeconds * 1000
}

async function getRdsAuthToken({ region, host, port, user }) {
  const pastedToken = process.env.RDS_AUTH_TOKEN || ''
  if (pastedToken) {
    if (isRdsAuthTokenExpired(pastedToken)) {
      throw new Error('RDS_AUTH_TOKEN is expired. Generate a fresh IAM auth token or remove RDS_AUTH_TOKEN so the SDK can generate one from AWS credentials.')
    }

    return pastedToken
  }

  const { Signer } = require('@aws-sdk/rds-signer')
  const signer = new Signer({
    region,
    hostname: host,
    port,
    username: user,
  })

  return signer.getAuthToken()
}

async function main() {
  const region = process.env.AWS_REGION || process.env.RDS_REGION || DEFAULT_RDS_REGION
  const host = process.env.RDS_HOST || process.env.PGHOST || DEFAULT_RDS_HOST
  const user = process.env.RDS_USER || process.env.PGUSER || 'postgres'
  const database = process.env.RDS_DATABASE || process.env.PGDATABASE || 'postgres'
  const port = Number(process.env.RDS_PORT || process.env.PGPORT || 5432)
  let password = process.env.RDS_PASSWORD || process.env.PGPASSWORD || ''

  if (!password && process.env.RDS_USE_IAM === 'true') {
    password = await getRdsAuthToken({ region, host, port, user })
  }

  if (!password) {
    throw new Error('Missing database password. Add RDS_PASSWORD to .env, or set RDS_USE_IAM=true for IAM auth.')
  }

  const client = new Client({
    host,
    port,
    database,
    user,
    password,
    ssl: getSslConfig(),
  })

  const schema = fs.readFileSync(path.join(__dirname, '..', 'db', 'schema.sql'), 'utf8')

  await client.connect()
  try {
    await client.query(schema)
    console.log('Database schema is ready.')
  } finally {
    await client.end()
  }
}

main().catch((error) => {
  if (error.code === '28P01') {
    console.error('Database authentication failed. Check RDS_PASSWORD in .env. If you are using IAM auth, make sure RDS_USE_IAM=true, the token is fresh, RDS IAM authentication is enabled on the cluster, and the database role has: grant rds_iam to postgres;')
  }
  if (error.code === 'ETIMEDOUT' || error.code === 'EHOSTUNREACH') {
    console.error('Database network failed. Run npm run db:diagnose. If the endpoint resolves to 172.31.x.x, it is private and your laptop cannot reach it without public access, VPN, bastion, SSM tunnel, or same-VPC hosting.')
  }
  console.error('Database init failed:', error)
  process.exit(1)
})
