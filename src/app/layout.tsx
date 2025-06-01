// src/app/layout.tsx
import "@/styles/global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <title>منصة منجز</title>
      </head>
      <body className="font-sans bg-gray-100 text-gray-800">
        {children}
      </body>
    </html>
  );
}
