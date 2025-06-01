// src/app/reviews/page.tsx
"use client";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const snapshot = await getDocs(collection(db, "reviews"));
      const reviewsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(reviewsData);
    };

    fetchReviews();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">التقييمات</h1>
      {reviews.length === 0 ? (
        <p>ما فيه تقييمات حتى الآن.</p>
      ) : (
        <ul className="space-y-2">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="border p-2 rounded shadow hover:shadow-md"
            >
              <strong>الخدمة:</strong> {review.serviceName} <br />
              <strong>التقييم:</strong> {review.rating} نجوم <br />
              <strong>التعليق:</strong> {review.comment}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
