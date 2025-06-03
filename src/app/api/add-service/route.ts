import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

// 🔴 رابط اتصالك بقاعدة البيانات MongoDB (غيره لاحقًا بالبيانات الحقيقية)
const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function POST(request: Request) {
  try {
    const { name, description, price } = await request.json();

    // 🔴 اتصل بقاعدة البيانات
    await client.connect();
    const db = client.db("monjaz");
    const collection = db.collection("services");

    // 🔴 أضف البيانات
    await collection.insertOne({
      name,
      description,
      price: parseFloat(price),
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "تمت إضافة الخدمة بنجاح!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "حدث خطأ، حاول لاحقًا." }, { status: 500 });
  } finally {
    await client.close();
  }
}
