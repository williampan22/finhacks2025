"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OrderCard from "@/components/orderCard";
import Loading from "@/components/loading";

interface User {
  _id: string;  // Changed from id to _id to match MongoDB
  cards: string[];
}

interface Card {
  _id: string;
  bank: string;
  name: string;
}

// Update these functions in your page.tsx

async function fetchUserCards(userId: string) {
  const response = await fetch(`/api/users/${userId}/cards`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch user cards");
  }
  return response.json();
}

async function addCardToUser(userId: string, cardId: string) {
  const response = await fetch(`/api/users/${userId}/cards`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cardId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to add credit card");
  }

  return response.json();
}

async function removeCardFromUser(userId: string, cardId: string) {
  const response = await fetch(`/api/users/${userId}/cards`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cardId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to remove card");
  }

  return response.json();
}

export default function Page() {
  const [creditCards, setCreditCards] = useState<Card[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [userCards, setUserCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [isFirstLoad, setIsFirstLoad] = useState(false);

  useEffect(() => {
    async function fetchUserDetails() {
      const response = await fetch("/api/auth/me", {
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/login");
          return null;
        }
        throw new Error("Failed to fetch user details");
      }

      const data = await response.json();
      return data.user;
    }

    async function fetchAllCards() {
      const response = await fetch("/api/cards");
      if (!response.ok) {
        throw new Error("Failed to fetch cards");
      }
      return response.json();
    }

    async function initializeData() {
      setLoading(true);
      setError(null);

      try {
        const userData = await fetchUserDetails();
        if (!userData) return;

        setUser(userData);

        const [userCardsData, allCardsData] = await Promise.all([
          fetchUserCards(userData._id),
          fetchAllCards()
        ]);

        setUserCards(userCardsData);
        setCreditCards(allCardsData);
      } catch (err: any) {
        console.error("Initialization error:", err);
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    }

    initializeData();
    setIsFirstLoad(false);

    const timer = setTimeout(() => {
      setIsFirstLoad(true);
    }, 100); 
  
    return () => clearTimeout(timer);
  }, [router]);

  const handleAddCard = async () => {
    if (!selectedCard || !user) return;

    try {
      setError(null);
      await addCardToUser(user._id, selectedCard);
      const updatedUserCards = await fetchUserCards(user._id);
      setUserCards(updatedUserCards);
      setSelectedCard("");
    } catch (err: any) {
      setError(err.message || "Failed to add card");
    }
  };

  const handleRemoveCard = async (cardId: string) => {
    if (!user) return;

    try {
      setError(null);
      await removeCardFromUser(user._id, cardId);
      setUserCards(userCards.filter(card => card._id !== cardId));
    } catch (err: any) {
      setError(err.message || "Failed to remove card");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
                <Loading />
              </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {isFirstLoad && <div>
      <h1 className="text-4xl font-bold text-gray-600 mb-6">Dashboard</h1>

      <div className="w-full max-w-4xl mb-6">
        <div className="border-b border-gray-300" />
      </div>

      <h2 className="text-4xl font-bold text-gray-600 mb-6">Your Cards</h2>

      {userCards.length > 0 ? (
        <div className="w-full max-w-4xl space-y-4">
          {userCards.map((card) => (
            <div key={card._id} className="flex items-center justify-between">
              <OrderCard card={card} />
              <button
                onClick={() => handleRemoveCard(card._id)}
                className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mb-8">You have no cards added.</p>
      )}

      <div className="w-full max-w-lg mt-8">
        <label htmlFor="select-card" className="block text-lg font-semibold text-gray-700 mb-2">
          Select a Card to Add:
        </label>
        <select
          id="select-card"
          value={selectedCard}
          onChange={(e) => setSelectedCard(e.target.value)}
          className="w-full border border-gray-300 rounded-lg py-2 px-4 mb-4"
        >
          <option value="">Choose a card...</option>
          {creditCards
            .filter(card => !userCards.some(userCard => userCard._id === card._id))
            .map((card) => (
              <option key={card._id} value={card._id}>
                {`${card.bank} ${card.name}`}
              </option>
            ))}
        </select>
        <button
          onClick={handleAddCard}
          disabled={!selectedCard}
          className={`w-full py-2 px-4 rounded-lg text-white transition-colors ${
            selectedCard ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Add Card
        </button>
      </div></div>
              }
    </div>
  );
}