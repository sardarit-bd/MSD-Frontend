"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.accessToken) {
      alert("Registered successfully");
      window.location.href = "/auth/login";
    } else {
      alert(data.message);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="border p-2 w-full mb-3"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        className="border p-2 w-full mb-3"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button
        onClick={handleRegister}
        className="bg-green-600 text-white w-full p-2 rounded"
      >
        Register
      </button>
    </>
  );
}