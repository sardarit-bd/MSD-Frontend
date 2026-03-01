"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    if (!token) {
      setMessage("Invalid reset link.");
      return;
    }

    const res = await fetch("http://localhost:5000/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        newPassword,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Password reset successful. You can now login.");
    } else {
      setMessage(data.message || "Reset failed");
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>

      <input
        type="password"
        className="border p-2 w-full mb-3"
        placeholder="Enter new password"
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <button
        onClick={handleReset}
        className="bg-green-600 text-white w-full p-2 rounded"
      >
        Reset Password
      </button>

      {message && (
        <p className="mt-4 text-sm text-gray-600">{message}</p>
      )}
    </>
  );
}