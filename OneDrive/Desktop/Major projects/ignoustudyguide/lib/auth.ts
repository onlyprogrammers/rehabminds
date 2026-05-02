import crypto from 'crypto'

const SESSION_COOKIE = 'ignou_session'

type SessionPayload = {
  userId: string
  email: string
  role: string
  exp: number
}

function getSecret() {
  const secret = process.env.AUTH_SECRET
  if (!secret && process.env.NODE_ENV === 'production') {
    throw new Error('AUTH_SECRET is required in production')
  }

  return secret || 'local-dev-auth-secret-change-before-production'
}

export function hashPassword(password: string, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${hash}`
}

export function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(':')
  if (!salt || !hash) return false

  const candidate = crypto.scryptSync(password, salt, 64)
  const saved = Buffer.from(hash, 'hex')
  return saved.length === candidate.length && crypto.timingSafeEqual(saved, candidate)
}

export function createSessionToken(payload: Omit<SessionPayload, 'exp'>, maxAgeSeconds = 60 * 60 * 24 * 30) {
  const body: SessionPayload = {
    ...payload,
    exp: Math.floor(Date.now() / 1000) + maxAgeSeconds,
  }
  const encoded = Buffer.from(JSON.stringify(body)).toString('base64url')
  const signature = crypto.createHmac('sha256', getSecret()).update(encoded).digest('base64url')
  return `${encoded}.${signature}`
}

export function readSessionToken(token?: string | null): SessionPayload | null {
  if (!token) return null

  const [encoded, signature] = token.split('.')
  if (!encoded || !signature) return null

  const expected = crypto.createHmac('sha256', getSecret()).update(encoded).digest('base64url')
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null

  const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString()) as SessionPayload
  if (payload.exp < Math.floor(Date.now() / 1000)) return null

  return payload
}

export { SESSION_COOKIE }

