import { getRdsAuthToken } from '@/lib/rds-auth-token'
import fs from 'fs'
import path from 'path'

export type QueryValue = string | number | boolean | null | Date | Record<string, unknown> | unknown[]

export type DbMaterial = {
  id: string
  title: string
  description: string | null
  material_type: string
  programme: string | null
  course_code: string | null
  price_paise: number
  currency: string
  file_url: string
  preview_url: string | null
  seller_name: string | null
  status: string
  created_at: string
}

const DEFAULT_RDS_HOST = 'database-1.c3qckuwyatfg.ap-south-1.rds.amazonaws.com'
const DEFAULT_RDS_REGION = 'ap-south-1'

export function isDbEnabled() {
  return process.env.IGNOU_DB_ENABLED === 'true' || Boolean(process.env.DATABASE_URL)
}

function getDbConfig() {
  const region = process.env.AWS_REGION || process.env.RDS_REGION || DEFAULT_RDS_REGION
  const host = process.env.RDS_HOST || process.env.PGHOST || DEFAULT_RDS_HOST
  const user = process.env.RDS_USER || process.env.PGUSER || 'postgres'
  const database = process.env.RDS_DATABASE || process.env.PGDATABASE || 'postgres'
  const port = Number(process.env.RDS_PORT || process.env.PGPORT || 5432)

  return { region, host, user, database, port }
}

async function createClient() {
  const { Client } = require('pg')
  const ssl = getSslConfig()

  if (process.env.DATABASE_URL) {
    return new Client({
      connectionString: process.env.DATABASE_URL,
      ssl,
    })
  }

  const { region, host, user, database, port } = getDbConfig()
  let password = process.env.RDS_PASSWORD || process.env.PGPASSWORD || ''

  if (!password && process.env.RDS_USE_IAM === 'true') {
    password = await getRdsAuthToken({ region, host, port, user })
  }

  if (!password) {
    throw new Error('Missing database password. Set RDS_PASSWORD, PGPASSWORD, DATABASE_URL, or RDS_USE_IAM=true.')
  }

  return new Client({
    host,
    port,
    database,
    user,
    password,
    ssl,
  })
}

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

export async function query<T = Record<string, unknown>>(sql: string, params: QueryValue[] = []) {
  if (!isDbEnabled()) {
    throw new Error('Database is not enabled. Set IGNOU_DB_ENABLED=true and RDS/DATABASE env vars.')
  }

  const client = await createClient()
  await client.connect()

  try {
    return await client.query(sql, params) as { rows: T[]; rowCount: number }
  } finally {
    await client.end()
  }
}

export async function queryOptional<T = Record<string, unknown>>(sql: string, params: QueryValue[] = []) {
  if (!isDbEnabled()) {
    return null
  }

  try {
    return await query<T>(sql, params)
  } catch (error) {
    console.error('Database query failed:', error)
    return null
  }
}
