import { PageProps } from "next";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>صفحة المنتج</h1>
      <p>رقم المنتج: {params.id}</p>
    </div>
  );
}
