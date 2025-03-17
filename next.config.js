// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enables static HTML export
  distDir: 'out',    // Output directory
  images: {
    unoptimized: true, // Required for static export
  },
  // Ensure trailing slashes for GitHub Pages compatibility
  trailingSlash: true,
  // If deploying to a custom domain, you don't need basePath and assetPrefix
  // If deploying to a GitHub Pages subdomain (username.github.io/repo-name), uncomment these:
  // basePath: '/repo-name',
  // assetPrefix: '/repo-name/',
  
  // Export path map for static routes
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/landing-page': { page: '/landing-page' },
    }
  },
}

module.exports = nextConfig
