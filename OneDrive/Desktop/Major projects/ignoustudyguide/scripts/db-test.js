const fs = require('fs')
const path = require('path')
const { Client } = require('pg')
const { loadEnvFile } = require('./load-env')

loadEnvFile()

const DEFAULT_RDS_HOST = 'database-1.c3qckuwyatfg.ap-south-1.rds.amazonaws.com'

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

async function main() {
  const password = process.env.RDS_PASSWORD || process.env.PGPASSWORD
  if (!password) {
    throw new Error('Missing database password. Add RDS_PASSWORD to .env before running db:test.')
  }

  const client = new Client({
    host: process.env.RDS_HOST || process.env.PGHOST || DEFAULT_RDS_HOST,
    port: Number(process.env.RDS_PORT || process.env.PGPORT || 5432),
    database: process.env.RDS_DATABASE || process.env.PGDATABASE || 'postgres',
    user: process.env.RDS_USER || process.env.PGUSER || 'postgres',
    password,
    ssl: getSslConfig(),
  })

  await client.connect()
  try {
    const result = await client.query('select version()')
    console.log(result.rows[0].version)
  } finally {
    await client.end()
  }
}

main().catch((error) => {
  if (error.code === 'ETIMEDOUT' || error.code === 'EHOSTUNREACH') {
    console.error('Database network failed. Run npm run db:diagnose. If the endpoint resolves to 172.31.x.x, it is private and unreachable from your laptop without public access, VPN, bastion, SSM tunnel, or same-VPC hosting.')
  }
  console.error('Database test failed:', error.message)
  process.exit(1)
})
