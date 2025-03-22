/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ext.same-assets.com',
        pathname: '/259716110/**',
      },
    ],
  },
  output: 'export', // For static site generation
  distDir: 'out', // Specify build directory for Netlify
};

export default nextConfig;
