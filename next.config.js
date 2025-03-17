// next.config.js
module.exports = {
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/landing-page': { page: '/landing-page' },
      '/tailwind-config': { page: '/tailwind-config' }
    }
  },
}
