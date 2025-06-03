const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Add path aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
      '~': path.resolve(__dirname, 'public'),
    };

    // Important: return the modified config
    return config;
  },
  // Enable experimental features
  experimental: {
    esmExternals: 'loose',
    // Enable concurrent features
    serverComponentsExternalPackages: ['@radix-ui/react-tabs', '@radix-ui/react-label', '@radix-ui/react-slot'],
  },
  // Enable TypeScript type checking
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: false,
  },
  // Enable ESLint on build
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
  },
  // Configure images
  images: {
    domains: ['images.unsplash.com'],
  },
};

module.exports = nextConfig;
