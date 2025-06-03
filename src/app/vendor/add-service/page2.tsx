"use client";
// temp comment to force re-deploy 🚀

import { useState } from "react";

export default function AddServicePage() {
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/add-service", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: serviceName,
        description,
        price,
      }),
    });

    if (response.ok) {
      setStatus("✅ تمت إضافة الخدمة بنجاح!");
      setServiceName("");
      setDescription("");
      setPrice("");
    } else {
      setStatus("❌ حدث خطأ، حاول لاحقًا!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>إضافة خدمة جديدة</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "400px",
          gap: "10px",
        }}
      >
        <label>
          اسم الخدمة:
          <input
            type="text"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            required
          />
        </label>

        <label>
          وصف الخدمة:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <label>
          السعر (ريال):
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>

        <button type="submit">إضافة الخدمة</button>
      </form>

      {status && <p>{status}</p>}
    </div>
  );
}
