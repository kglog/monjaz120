import { prisma } from "@/lib/prisma";

interface Props {
  params: {
    id: string;
  };
}

export default async function CategoryPage({ params }: Props) {
  const services = await prisma.service.findMany({
    where: {
      category: params.id,
    },
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">الخدمات في {params.id}</h1>

      {services.length === 0 ? (
        <p className="text-gray-600">لا توجد خدمات في هذا القسم حاليًا</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <h2 className="font-semibold text-lg">{service.title}</h2>
              <p className="text-sm text-gray-600">{service.description}</p>
              <p className="mt-2 font-bold">{service.price} ريال</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
