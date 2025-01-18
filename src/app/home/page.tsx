"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OrderCard from "@/components/orderCard";

export default function Page() {
  const [creditCards, setCreditCards] = useState([]);

  const testCard = {
    bank: "Chase",
    name: "Sapphire Reserve",
    rewards: [
      { category: "Food", pointsPerDollar: 1.0, centsPerDollar: 5.0 },
      { category: "Travel", pointsPerDollar: 2.0, centsPerDollar: 3.0 },
    ],
  };

  const router = useRouter();

  useEffect(() => {
    async function fetchCards() {
      const response = await fetch("api.")
    }
    async function checkAuth() {
      const response = await fetch("/api/auth/me");
      if (!response.ok) {
        router.push("/login");
      }
    }

    checkAuth();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <p className="text-4xl font-bold text-blue-600 mb-6">home page</p>

      <hr />
      <div className="container">
        <OrderCard card={testCard} />
      </div>
    </div>
  );
}
