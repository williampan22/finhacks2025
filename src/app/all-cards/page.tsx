"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OrderCard from "@/components/orderCard";
import Loading from "@/components/loading";
import { motion } from "framer-motion"; // Import motion

export default function Page() {
  const [creditCards, setCreditCards] = useState([]); // State to hold the fetched cards
  const [user, setUser] = useState<any>(null); // State to hold user details
  const [showLoading, setShowLoading] = useState(true);
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
        setShowLoading(false); // Set loading to false once data is fetched
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {showLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loading />
        </div>
      ) : (
        <motion.div
            initial={{ opacity: 0, x: 30 }} // Start from opacity 0, x: 30
            animate={{ opacity: 1, x: 0 }}   // Fade in and slide to original position
            exit={{ opacity: 0, x: -30, transition: { duration: 0.1 } }}    // Exit with custom transition time
            transition={{ duration: 0.5 }}
          >
          <p className="text-4xl font-bold text-gray-600 mb-6 mt-5"> All Cards </p>
          <div className="container mb-6 header-line">
            <div className="w-full border border-gray-300"></div>
          </div>

          <div className="container space-y-4">
            {creditCards.map((card, index) => (
              <OrderCard key={index} card={card} />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
