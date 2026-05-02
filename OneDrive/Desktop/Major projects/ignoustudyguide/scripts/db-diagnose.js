const dns = require('dns').promises
const net = require('net')
const { loadEnvFile } = require('./load-env')

loadEnvFile()

const DEFAULT_RDS_HOST = 'database-1.c3qckuwyatfg.ap-south-1.rds.amazonaws.com'

function isPrivateIp(ip) {
  return (
    /^10\./.test(ip) ||
    /^192\.168\./.test(ip) ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(ip)
  )
}

function testTcp(host, port, timeoutMs = 8000) {
  return new Promise((resolve) => {
    const socket = new net.Socket()
    const startedAt = Date.now()

    socket.setTimeout(timeoutMs)
    socket.once('connect', () => {
      socket.destroy()
      resolve({ ok: true, elapsedMs: Date.now() - startedAt })
    })
    socket.once('timeout', () => {
      socket.destroy()
      resolve({ ok: false, error: `Timed out after ${timeoutMs}ms` })
    })
    socket.once('error', (error) => {
      resolve({ ok: false, error: error.message })
    })
    socket.connect(port, host)
  })
}

async function main() {
  const host = process.env.RDS_HOST || process.env.PGHOST || DEFAULT_RDS_HOST
  const port = Number(process.env.RDS_PORT || process.env.PGPORT || 5432)
  const addresses = await dns.lookup(host, { all: true })

  console.log(`Host: ${host}`)
  console.log(`Port: ${port}`)
  console.log(`Resolved IPs: ${addresses.map((item) => item.address).join(', ')}`)

  if (addresses.some((item) => isPrivateIp(item.address))) {
    console.log('Network: private VPC address detected. This database is not reachable from a normal laptop unless public access, VPN, bastion, SSM tunnel, or same-VPC hosting is configured.')
  }

  const tcp = await testTcp(host, port)
  if (tcp.ok) {
    console.log(`TCP: reachable in ${tcp.elapsedMs}ms`)
  } else {
    console.log(`TCP: not reachable - ${tcp.error}`)
    process.exitCode = 1
  }
}

main().catch((error) => {
  console.error('Database diagnostics failed:', error.message)
  process.exit(1)
})
