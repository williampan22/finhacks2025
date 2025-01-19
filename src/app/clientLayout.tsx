"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    // Update the current path
    setCurrentPath(window.location.pathname);

    async function fetchUserDetails() {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (!response.ok) {
          if (response.status === 401) {
            window.location.href = "/login"; // Redirect if unauthorized
          }
          return;
        }

        const data = await response.json();
        setLoggedIn(!!data.user);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserDetails();
  }, []);

  if (loading) {
    // Optional loading state
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPath} // Use the current path as the key
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar loggedIn={loggedIn} />
          {children}
          <Footer />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
