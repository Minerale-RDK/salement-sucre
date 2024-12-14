// next.config.js
const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  async rewrites() {
    return [
      {
        source: '/recipes',
        destination: '/recettes',
        locale: false,
      },
      {
        source: '/recipes/:slug',
        destination: '/recettes/:slug',
        locale: false,
      }
    ];
  },
};

module.exports = nextConfig;