/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['www.ignoustudyguide.com', 'ignoustudyguide.com'],
}

export default nextConfig
