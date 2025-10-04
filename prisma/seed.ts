import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // ✅ إنشاء مستخدم أدمن
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

  // ✅ إنشاء خدمات
  const services = await prisma.service.createMany({
    data: [
      {
        title: "تصميم شعار احترافي",
        description: "شعار مميز يعبر عن هوية شركتك",
        price: 150,
        deliveryTime: 3,
        category: "تصميم",
        tags: ["شعار", "هوية"],
        images: [],
        userId: user.id,
      },
      {
        title: "موقع شخصي بسيط",
        description: "موقع شخصي من صفحة واحدة باستخدام أحدث التقنيات",
        price: 500,
        deliveryTime: 7,
        category: "برمجة",
        tags: ["موقع", "شخصي"],
        images: [],
        userId: user.id,
      },
    ],
    skipDuplicates: true,
  });

  // ✅ إنشاء طلب تجريبي
  const firstService = await prisma.service.findFirst();
  if (firstService) {
    await prisma.order.create({
      data: {
        title: "طلب تجربة أول",
        description: "هذا طلب تجريبي مربوط بالخدمة",
        price: firstService.price,
        netPrice: firstService.price,
        buyerId: user.id,
        sellerId: user.id,
        serviceId: firstService.id,
      },
    });
  }

  console.log("✅ تمت إضافة بيانات تجريبية: أدمن + خدمات + طلب");
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
