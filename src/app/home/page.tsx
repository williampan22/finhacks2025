"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OrderCard from "@/components/orderCard";
import Loading from "@/components/loading";

interface User {
  _id: string;
  cards: string[];
}

interface Reward {
  category: string;
  pointsPerDollar: number;
  centsPerDollar: number;
}

interface Card {
  _id: string;
  bank: string;
  name: string;
  rewards: Reward[];
  perks: string;
  annualFee: number;
}

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
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFirstLoad, setIsFirstLoad] = useState(false);
  const router = useRouter();

  // Get unique categories from user's cards
  const categories = ["All Categories", ...new Set(
    userCards.flatMap(card =>
      card.rewards.map(reward => reward.category)
    )
  )].sort();

  // Find the best card for selected category
  const getBestCardForCategory = (category: string) => {
    if (category === "All Categories") return null;

    let bestCard = null;
    let bestReward = 0;

    for (const card of userCards) {
      const reward = card.rewards.find(r => r.category === category);
      if (reward && reward.centsPerDollar > bestReward) {
        bestCard = {
          card,
          reward
        };
        bestReward = reward.centsPerDollar;
      }
    }

    return bestCard;
  };

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

  const bestCard = getBestCardForCategory(selectedCategory);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {isFirstLoad && (
        <div className="w-full max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-600 mb-6">Dashboard</h1>

          // Replace the Best Card Selector Section in your dashboard with this:

          {/* Best Card Selector Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Which Card Should I Use?</h2>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg py-3 px-4 mb-4 text-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {selectedCategory !== "All Categories" && (
              <div className="mt-4">
                {bestCard ? (
                  <div className="space-y-6">
                    {/* Best Card Display */}
                    <div className="bg-blue-50 rounded-lg p-6">
                      <div className="flex items-start gap-6">
                        {/* Card Image */}
                        <div className="w-64 h-40 flex-shrink-0 bg-white rounded-lg shadow-md p-4">
                          <img
                            src={bestCard.card.imageLink}
                            alt={`${bestCard.card.bank} ${bestCard.card.name}`}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        {/* Card Details */}
                        <div className="flex-grow">
                          <h3 className="text-2xl font-bold text-blue-800">
                            {bestCard.card.bank} {bestCard.card.name}
                          </h3>
                          <p className="text-xl text-blue-600 mt-2">
                            {bestCard.reward.centsPerDollar.toFixed(1)}% value back on {selectedCategory}
                          </p>
                          <p className="text-gray-600 mt-1">
                            ({bestCard.reward.pointsPerDollar}x points worth {(bestCard.reward.centsPerDollar / bestCard.reward.pointsPerDollar).toFixed(1)}¢ each)
                          </p>
                          <p className="text-gray-600 mt-1">
                            Annual Fee: ${bestCard.card.annualFee}
                          </p>
                        </div>
                      </div>

                      {/* Explanation */}
                      <div className="mt-6 p-4 bg-white rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">Why this card?</h4>
                        <p className="text-gray-600">
                          The {bestCard.card.bank} {bestCard.card.name} is your best option for {selectedCategory.toLowerCase() }
                          because it offers the highest return at {bestCard.reward.centsPerDollar.toFixed(1)}% value back.
                          {userCards.length > 1 && `This beats your other cards' rewards for ${selectedCategory.toLowerCase()}, with the next best being 
                ${Math.max(...userCards
                            .filter(card => card._id !== bestCard.card._id)
                            .map(card => card.rewards.find(r => r.category === selectedCategory)?.centsPerDollar || 0)
                          ).toFixed(1)}%.`}
                        </p>
                      </div>

                      {/* Other Card Benefits */}
                      <div className="mt-4 text-sm text-gray-600">
                        <p className="font-semibold mb-1">Additional Card Benefits:</p>
                        <p>{bestCard.card.perks}</p>
                      </div>
                    </div>

                    {/* Next Best Cards */}
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Your Other Cards for {selectedCategory}:</h4>
                      <div className="space-y-2">
                        {userCards
                          .filter(card => card._id !== bestCard.card._id)
                          .sort((a, b) => {
                            const aReward = a.rewards.find(r => r.category === selectedCategory)?.centsPerDollar || 0;
                            const bReward = b.rewards.find(r => r.category === selectedCategory)?.centsPerDollar || 0;
                            return bReward - aReward;
                          })
                          .map(card => {
                            const reward = card.rewards.find(r => r.category === selectedCategory);
                            return reward ? (
                              <div key={card._id} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                                <span>{card.bank} {card.name}</span>
                                <span className="text-gray-600">{reward.centsPerDollar.toFixed(1)}% back</span>
                              </div>
                            ) : null;
                          })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-yellow-50 rounded-lg p-6">
                    <p className="text-lg text-yellow-800">
                      You don't have any cards that earn bonus rewards in this category.
                    </p>
                    {creditCards.some(card =>
                      card.rewards.some(r =>
                        r.category === selectedCategory &&
                        r.centsPerDollar > 0
                      )
                    ) && (
                      <div className="mt-4">
                        <p className="font-semibold text-yellow-800">Available Cards with {selectedCategory} Rewards:</p>
                        <div className="mt-2 space-y-2">
                          {creditCards
                            .filter(card => card.rewards.some(r => r.category === selectedCategory))
                            .sort((a, b) => {
                              const aReward = a.rewards.find(r => r.category === selectedCategory)?.centsPerDollar || 0;
                              const bReward = b.rewards.find(r => r.category === selectedCategory)?.centsPerDollar || 0;
                              return bReward - aReward;
                            })
                            .slice(0, 3)
                            .map(card => {
                              const reward = card.rewards.find(r => r.category === selectedCategory);
                              return (
                                <div key={card._id} className="p-3 bg-white rounded-lg">
                                  <p className="font-semibold">{card.bank} {card.name}</p>
                                  <p className="text-sm text-gray-600">
                                    {reward?.centsPerDollar.toFixed(1)}% back on {selectedCategory}
                                  </p>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Existing Cards Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cards</h2>
            {userCards.length > 0 ? (
              <div className="space-y-4">
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
              <p className="text-gray-500">You have no cards added.</p>
            )}
          </div>

          {/* Add New Card Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add a New Card</h2>
            <select
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
          </div>
        </div>
      )}
    </div>
  );
}