"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OrderCard from "@/components/orderCard";

export default function Page() {
  const [creditCards, setCreditCards] = useState([]); // State to hold the fetched cards
  const router = useRouter();

  useEffect(() => {
    async function fetchCards() {
      try {
        const response = await fetch("/api/cards");
        if (!response.ok) {
          throw new Error("Failed to fetch cards");
        }
        const cards = await response.json();
        setCreditCards(cards); // Update the state with the fetched cards
      } catch (error: any) {
        console.error("Error fetching cards:", error.message);
      }
    }

    async function checkAuth() {
      const response = await fetch("/api/auth/me");
      if (!response.ok) {
        router.push("/login");
      } else {
        fetchCards(); // Fetch cards only after authentication
      }
    }

    checkAuth();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <p className="text-4xl font-bold text-blue-600 mb-6">Home Page</p>
      <div className="container space-y-4">
        {creditCards.length > 0 ? (
          creditCards.map((card, index) => (
            <OrderCard key={index} card={card} />
          ))
        ) : (
          <p className="text-gray-500">No cards available.</p>
        )}
      </div>
    </div>
  );
}
