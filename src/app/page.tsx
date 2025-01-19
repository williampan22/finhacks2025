"use client";
import CreditCard from '@/components/creditCard';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <Head>
        <title>High Card - Welcome</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Grid container with two columns */}
      <div className="grid grid-cols-2 min-h-screen w-full relative">
        
        {/* Content section */}
        <div className="z-2 mt-20 px-8 py-4">
          <div className="card-stack-1 flex flex-wrap justify-center w-full">
          <a href="https://linkedin.com/in/williamlpan">
            <CreditCard 
              cardNumber={"1234 5678 9012 3456"} 
              name="John Doe" 
              expiration="12/25" 
              card="1" 
            /></a><a href="https://linkedin.com/in/jlojanarungsiri">
            <CreditCard 
              cardNumber={"9876 5432 1098 7654"} 
              name="John Doe" 
              expiration="11/26" 
              card="2"
            /></a><a href="https://linkedin.com/in/williamlpan">
            <CreditCard 
              cardNumber={"4567 8901 2345 6789"} 
              name="John Doe" 
              expiration="10/24" 
              card="3"
            /></a>
          </div>
          <div className="card-stack-2 flex flex-wrap justify-center w-full mt-4">
          <a href="https://linkedin.com/in/jlojanarungsiri">
            <CreditCard 
              cardNumber={"4567 8901 2345 6789"} 
              name="John Doe" 
              expiration="10/24" 
              card="4"
            /></a><a href="https://linkedin.com/in/williamlpan">
            <CreditCard 
              cardNumber={"1234 5678 9012 3456"} 
              name="John Doe" 
              expiration="12/25" 
              card="5"
            /></a><a href="https://linkedin.com/in/jlojanarungsiri">
            <CreditCard 
              cardNumber={"9876 5432 1098 7654"} 
              name="John Doe" 
              expiration="11/26" 
              card="6"
            /></a>
          </div>
        </div>

        {/* Gradient Overlay section */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-black/50 to-transparent">
          {/* This section will cover the right half of the screen with the gradient */}
        </div>

        {/* Main content with transition and animation applied */}
        <div className="z-10 text-center flex flex-col justify-center items-center animate-slideIn transition-all duration-1000 ease-in">
          <div className='top-header'>
            <img
              src="/logo.png"
              alt="TravelPouch Logo"
              className="mx-auto mb-6 w-56 card-4 transition-all ease-in ease-out duration-500"
            />
            <h1 className="text-4xl font-bold text-gray-600 mb-2">Welcome to High Card</h1>
            <p className="text-lg text-gray-700 mb-6">
            <i>Where Every Swipe is a Winning Hand.</i>
            </p>

            <div className="space-x-4">
              <Link
                href="/login"
                className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition-all"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md shadow-md hover:bg-gray-400 transition-all"
              >
                Register
              </Link>
            </div>
          </div>

          <div className="bottom-part">
            {/* Additional content goes here */}
          </div>
        </div>
      </div>

      {/* Tailwind CSS for the animation */}
      <style jsx global>{`
        @keyframes fadeUp {
          0% {
            transform: translateY(30px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fadeUp {
          animation: fadeUp 1s ease-in forwards;
        }

        /* Delay for cards */
        .delay-200 {
          animation-delay: 200ms;
        }
        .delay-400 {
          animation-delay: 400ms;
        }
        .delay-600 {
          animation-delay: 600ms;
        }
        .delay-800 {
          animation-delay: 800ms;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
}
