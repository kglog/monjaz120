
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "admin@platform.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@platform.com",
      password: "123456",
      role: "admin",
    },
  });

  await prisma.service.createMany({
    data: [
      {
        title: "تصميم شعار احترافي",
        description: "شعار مميز يعبر عن هوية شركتك",
        price: 150,
        userId: user.id,
        deliveryTime: 3,
        images: ""
      },
      {
        title: "موقع شخصي بسيط",
        description: "موقع شخصي من صفحة واحدة باستخدام أحدث التقنيات",
        price: 500,
        userId: user.id,
        deliveryTime: 7,
        images: ""
      },
    ],
    // skipDuplicates: true, // Not supported for SQLite
  });

  console.log("تمت إضافة بيانات افتراضية");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
// ASSISTANT_FINAL: true
