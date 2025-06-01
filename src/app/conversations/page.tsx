// src/app/conversations/page.tsx
"use client";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<any[]>([]);

  useEffect(() => {
    const fetchConversations = async () => {
      const snapshot = await getDocs(collection(db, "conversations"));
      const conversationsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setConversations(conversationsData);
    };

    fetchConversations();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">المحادثات</h1>
      {conversations.length === 0 ? (
        <p>ما فيه محادثات بعد.</p>
      ) : (
        <ul className="space-y-2">
          {conversations.map((conv) => (
            <li
              key={conv.id}
              className="border p-2 rounded shadow hover:shadow-md"
            >
              <strong>المستخدم:</strong> {conv.username} <br />
              <strong>آخر رسالة:</strong> {conv.lastMessage}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
