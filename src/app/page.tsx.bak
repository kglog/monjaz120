"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// مكوّن الخدمة
function ServiceCard({ service }: { service: any }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <Image
        src={service.image || "/default.png"}
        alt={service.title}
        width={400}
        height={200}
        className="rounded-md mb-2"
      />
      <h3 className="text-lg font-bold mb-1">{service.title}</h3>
      <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>
      <div className="flex justify-between items-center mt-3">
        <span className="text-green-600 font-bold">{service.price} ريال</span>
        <Link
          href={`/services/${service.id}`}
          className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
        >
          تفاصيل
