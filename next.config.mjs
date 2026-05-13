const nextConfig = {
  images: {
    remotePatterns: [
      // Sanity CDN — required to serve uploaded images (hero portrait, property photos, etc.)
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

export default nextConfig
