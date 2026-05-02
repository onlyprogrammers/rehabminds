type RdsTokenConfig = {
  region: string
  host: string
  port: number
  user: string
}

function parseAwsDate(value: string) {
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

function getTokenUrl(token: string) {
  try {
    return new URL(token.startsWith('http') ? token : `https://${token}`)
  } catch {
    return null
  }
}

export function isRdsAuthTokenExpired(token: string, skewSeconds = 60) {
  const url = getTokenUrl(token)
  const signedAt = url?.searchParams.get('X-Amz-Date')
  const expires = Number(url?.searchParams.get('X-Amz-Expires') || 0)
  const signedAtMs = signedAt ? parseAwsDate(signedAt) : null

  if (!signedAtMs || !expires) {
    return false
  }

  return Date.now() >= signedAtMs + expires * 1000 - skewSeconds * 1000
}

export async function getRdsAuthToken({ region, host, port, user }: RdsTokenConfig) {
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

