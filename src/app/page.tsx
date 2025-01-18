import Navbar from '@/components/navbar';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <Head>
        <title>High Card - Welcome</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center p-4">
        <Image
          src="/logo.png"
          alt="TravelPouch Logo"
          width={120}
          height={120}
          className="mx-auto mb-6"
        />
        <h1 className="text-4xl font-bold text-blue-600 mb-6">Welcome to High Card</h1>
        <p className="text-lg text-gray-700 mb-4">
          Where High Cards Meet High Rewards.
        </p>

        <div className="space-x-4">
          <Link
            href="/login"
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md shadow-md hover:bg-gray-400"
          >
            Register
          </Link>
        </div>
      </main>

      <footer className="mt-auto py-4 text-gray-500 text-sm text-center">
        Powered by High Card &bull; Built with Next.js, Tailwind CSS, and TypeScript
      </footer>
    </div>
  );
}