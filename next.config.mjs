/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: 'http',
              hostname: 'localhost',
              port: '8000', // specify the port if using one
              pathname: '/images/**', // match all paths under /images
          },
      ],
  },
};

export default nextConfig;
