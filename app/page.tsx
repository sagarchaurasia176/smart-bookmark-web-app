"use client";

import Navbar from "./navbar/Navbar";

export default function HomePage() {
  return (
    <div>
      <Navbar/>
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Welcome to Smart Bookmark</h1>
          <p className="text-gray-600">Sign in with Google to continue</p>
        </div>
      </div>
    </div>
  );
}
