/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        // The booking page was /gbp-apply when this offer lived on the main
        // site. Keep old links and bookmarks working.
        source: '/gbp-apply',
        destination: '/apply',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
