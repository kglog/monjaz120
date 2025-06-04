import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function POST(request: Request) {
  try {
    const { name, description, price } = await request.json();

    await client.connect();
    const db = client.db("monjaz");
    const collection = db.collection("services");

    await collection.insertOne({
      name,
      description,
      price: parseFloat(price),
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, message: "✅ تمت الإضافة" });
  } catch (error) {
    console.error("❌ خطأ داخلي:", error); // هذا مهم
    return NextResponse.json(
      { success: false, message: "❌ حدث خطأ أثناء الإضافة" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
