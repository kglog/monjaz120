/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // ✅ تشغيل الوضع الصارم للتنبيه عن الأخطاء
  images: {
    domains: ['via.placeholder.com'], // ✅ السماح بجلب الصور من هذا النطاق
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
