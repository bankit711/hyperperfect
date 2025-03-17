// next.config.js
/** @type {import('next').NextConfig} */

// GitHub Pages specific configuration
const nextConfig = {
  output: 'export',  // Enables static HTML export
  distDir: 'out',    // Output directory
  images: {
    unoptimized: true, // Required for static export
  },
  // Ensure trailing slashes for GitHub Pages compatibility
  trailingSlash: true,
  // Remove assetPrefix to allow relative paths
  // assetPrefix: 'https://www.hyperperfect.ai',
  basePath: '',
}

module.exports = nextConfig
