/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "antd",
    "@ant-design",
    "rc-util",
    "rc-pagination",
    "rc-picker",
    "rc-notification",
    "rc-tooltip",
  ],
  async redirects() {
    return [
      {
        source: "/old-path", // Đường dẫn cũ
        destination: "/new-path", // Đường dẫn mới
        permanent: true, // true nếu là redirect vĩnh viễn
      },
      // Thêm các redirect khác nếu cần
    ];
  },
};

export default nextConfig;
