import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // إضافة خدمات تجريبية
  await prisma.service.createMany({
    data: [
      { title: "تصميم شعار", price: 100 },
      { title: "كتابة محتوى", price: 50 },
      { title: "برمجة موقع", price: 500 },
    ],
  });
  console.log("✅ Seed data inserted");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
