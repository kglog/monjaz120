// Simple seed script to create a sample Request using the generated Prisma client.
// Run after `npx prisma generate` and after migrations: `node prisma/seed_requests.js`

async function main() {
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();

  try {
    const r = await prisma.request.create({
      data: {
        title: 'تجربة: تصميم شعار بسيط',
        description: 'هذا طلب اختبار لإنهاء إعداد النظام والتحقق من واجهات API',
        createdBy: null,
        status: 'open',
        platformFee: 1000
      }
    });
    console.log('Created sample request:', r.id);
  } catch (err) {
    console.error('Seed error', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
