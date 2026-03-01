"use client";

import { useState } from "react";

export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChange = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/auth/change-password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Change Password</h1>

      <input
        type="password"
        className="border p-2 w-full mb-3"
        placeholder="Old Password"
        onChange={(e) => setOldPassword(e.target.value)}
      />

      <input
        type="password"
        className="border p-2 w-full mb-3"
        placeholder="New Password"
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <button
        onClick={handleChange}
        className="bg-red-600 text-white w-full p-2 rounded"
      >
        Update Password
      </button>
    </>
  );
}