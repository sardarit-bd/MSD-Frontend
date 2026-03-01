"use client";

import { useState } from "react";

export default function ChangeEmailPage() {
  const [newEmail, setNewEmail] = useState("");

  const handleChange = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/auth/change-email", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newEmail }),
    });

    const data = await res.json();
    alert(data.message || "Email Updated");
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Change Email</h1>

      <input
        className="border p-2 w-full mb-3"
        placeholder="New Email"
        onChange={(e) => setNewEmail(e.target.value)}
      />

      <button
        onClick={handleChange}
        className="bg-blue-600 text-white w-full p-2 rounded"
      >
        Update Email
      </button>
    </>
  );
}