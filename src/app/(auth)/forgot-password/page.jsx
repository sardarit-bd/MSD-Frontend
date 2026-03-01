"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setMessage("");

    const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Reset link generated (check console for now).");
      console.log("RESET TOKEN:", data.resetToken);
    } else {
      setMessage(data.message || "Something went wrong");
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>

      <input
        type="email"
        className="border p-2 w-full mb-3"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white w-full p-2 rounded"
      >
        Send Reset Link
      </button>

      {message && (
        <p className="mt-4 text-sm text-gray-600">{message}</p>
      )}
    </>
  );
}