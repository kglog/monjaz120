import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // هنا لو تبي تجيب بيانات بناء على id مثلا
  // const data = await fetchSomeData(id);

  // تأكد إن id موجود
  if (!id) {
    notFound();
  }

  return (
    <div>
      <h1>Page for ID: {id}</h1>
    </div>
  );
}
