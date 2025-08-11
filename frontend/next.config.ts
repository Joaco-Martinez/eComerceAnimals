import withPWA from 'next-pwa';
const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
  reactStrictMode: true,
  images: { domains: ['res.cloudinary.com'], unoptimized: true },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // apuntá al backend real (HTTPS) en prod y a 3000 en dev
        destination: isDev
          ? 'http://0.0.0.0:3000/:path*'
          : 'https://api.punkypet.com.ar/:path*', // o tu URL del back en VPS
      },
    ];
  },
};

module.exports = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: isDev,
})(nextConfig);