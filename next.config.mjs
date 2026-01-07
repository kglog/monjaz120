/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // أي رابط قديم لصفحة "تصميم" يحوّل تلقائيًا للصفحة الجديدة
      { source: '/categories/تصميم', destination: '/design', permanent: false },
      { source: '/categories/تصميم/', destination: '/design', permanent: false },

      // لو عندك مسارات فرعية تحت "تصميم" قديمة، ننقلها للهيكل الجديد
      { source: '/categories/تصميم/:slug', destination: '/design/:slug', permanent: false },
      { source: '/categories/تصميم/:slug*', destination: '/design/:slug*', permanent: false },
    ];
  },
};

export default nextConfig;
