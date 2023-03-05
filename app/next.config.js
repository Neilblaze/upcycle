/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['upload.wikimedia.org', 'cdn3.volusion.com'],
  },
}

module.exports = nextConfig
