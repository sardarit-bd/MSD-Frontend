"use client";

import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function NotFound() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/lottie/404.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
      
      {/* Lottie Animation */}
      <div className="w-[300px] md:w-[400px]">
        {animationData && (
          <Lottie animationData={animationData} loop={true} />
        )}
      </div>

      {/* Text */}
      <h1 className="text-3xl font-bold text-[#003b4a] mt-6">
        Page Not Found
      </h1>

      <p className="text-gray-600 mt-2">
        The page you are looking for doesn’t exist.
      </p>

      {/* Back Button */}
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-[#003b4a] text-white rounded-lg hover:opacity-90 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}