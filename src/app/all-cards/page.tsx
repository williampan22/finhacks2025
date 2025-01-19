"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OrderCard from "@/components/orderCard";

export default function Page() {
  const [creditCards, setCreditCards] = useState([]); // State to hold the fetched cards
  const [user, setUser] = useState<any>(null); // State to hold user details
  const router = useRouter();

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include", // Include cookies in the request
        });
        if (!response.ok) {
          router.push("/login"); // Redirect to login if unauthorized
          return;
        }
        const data = await response.json();
        setUser(data.user); // Update state with user details
      } catch (error: any) {
        console.error("Error fetching user details:", error.message);
      }
    }

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
      await fetchUserDetails(); // Fetch user details first
      fetchCards(); // Fetch cards if authenticated
    }

    checkAuth();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <p className="text-4xl font-bold text-blue-600 mb-6 mt-5"> All Cards </p>
      <div className="container mb-6 header-line">
        <div className="w-full border border-gray-300"></div>
      </div>

      <div className="container space-y-4">
        {creditCards.length > 0 ? (
          creditCards.map((card, index) => (
            <OrderCard key={index} card={card} />
          ))
        ) : (
          <p className="text-gray-500">...Loading</p>
        )}
      </div>
    </div>
  );
}
