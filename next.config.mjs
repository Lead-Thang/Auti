import withPWA from 'next-pwa';

// Configure PWA with proper settings for Next.js 15
const withPWAConfig = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  cacheOnFrontEndNav: true,
  cacheStartUrl: true,
  // Fix for build issues with Next.js 15
  buildExcludes: ['**/node_modules/**/*'],
  // Exclude API routes and non-critical assets from precaching
  exclude: [
    /^\/api\//,
    // Exclude large or non-critical chunks (let them be runtime cached)
    /chunks\/.*\.(js|css)$/,
    // Exclude non-critical static assets
    /\.(mp3|wav|ogg|mp4|webm)$/,
    // Exclude large font files (keep only critical ones)
    /\/_next\/static\/media\/.*\.(woff2|woff|ttf|eot)$/,
  ],
  // Add runtime caching for API routes and excluded assets
  runtimeCaching: [
    {
      urlPattern: /^\/api\//,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        networkTimeoutSeconds: 10,
        expiration: {
          maxEntries: 16,
          maxAgeSeconds: 86400, // 24 hours
        },
      },
    },
    // Runtime cache for JavaScript chunks
    {
      urlPattern: /chunks\/.*\.js$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'js-chunks-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 86400, // 24 hours
        },
      },
    },
    // Runtime cache for CSS files
    {
      urlPattern: /.*\.css$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'css-cache',
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 86400, // 24 hours
        },
      },
    },
    // Runtime cache for media files
    {
      urlPattern: /\.(mp3|wav|ogg|mp4|webm)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'media-cache',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 604800, // 7 days
        },
      },
    },
  ],
  // Add additional PWA assets (only critical static assets)
  additionalManifestEntries: [],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [
        ...config.externals,
        'sharp',
        'quiche',
        '@img/sharp-win32-x64',
        '@img/sharp-linux-x64-gnu',
        '@prisma/client',
        '@prisma/fetch-engine'
      ]
    }
    return config
  },
  serverExternalPackages: [
    '@prisma/client',
    '@supabase/supabase-js',
    '@supabase/ssr'
  ],
}

export default withPWAConfig(nextConfig);