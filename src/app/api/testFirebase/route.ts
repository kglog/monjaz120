import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebaseConfig"; // <-- غيرت هذا السطر
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "orders"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error("خطأ في قراءة البيانات:", error);
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}
