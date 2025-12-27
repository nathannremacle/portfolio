/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Désactiver le cache en développement pour voir les changements d'images immédiatement
    minimumCacheTTL: process.env.NODE_ENV === 'development' ? 0 : 60,
  },
}

module.exports = nextConfig



