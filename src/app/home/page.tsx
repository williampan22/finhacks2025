'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import OrderCard from '@/components/orderCard';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const response = await fetch('/api/auth/me');
      if (!response.ok) {
        router.push('/login');
      }
    }

    checkAuth();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
     <p className="text-4xl font-bold text-blue-600 mb-6">home page</p>


     <hr />
     <div className="container">
       <OrderCard country="Japan"/>
     </div>
   </div>
  )
}
