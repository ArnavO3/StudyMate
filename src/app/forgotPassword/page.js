"use client";
import React, { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("../api/users/forgotPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setMessage(data.message || "Check your email for reset instructions.");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="relative w-full h-screen flex justify-center items-center bg-[#f1faee]">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-[#1d3557] text-lg font-bold text-center mb-4">
          Reset Your Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#1d3557]"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d3557]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#1d3557] text-white p-2 rounded-md hover:bg-[#457b9d]"
          >
            Send Reset Link
          </button>
        </form>
        {message && (
          <p className="mt-4 text-sm text-center text-[#457b9d]">{message}</p>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
