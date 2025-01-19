"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loggedIn, setLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {

    async function fetchUserDetails() {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (!response.ok) {
          return;
        }

        const data = await response.json();
        setLoggedIn(true);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoggedIn(false);
      }
    }

    fetchUserDetails();
  }, [pathname]);

  return (
    <>
    <Navbar loggedIn={loggedIn} />
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname} // Use the current path as the key
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 , transition: { duration: 0.1 }}}
          transition={{ duration: 0.5 }}
        >
          
          {children}
         
        </motion.div>
      </AnimatePresence>
      <Footer />
    </>
  );
}
