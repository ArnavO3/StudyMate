"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function ResetPassword({ params }) {
  const { token } = params; // Extract the token from the URL
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    
    try {
      console.log(password + confirmPassword);
      
      const response = await fetch("../api/users/resetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage("Password reset successful! Redirecting...");
        setTimeout(() => navigate.push("/login"), 3000);
      } else {
        setMessage(data.message || "Password reset failed.");
      }
    } catch (error) {
      console.error("Error=>", error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="relative w-full h-screen flex justify-center items-center bg-[#f1faee]">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-[#1d3557] text-lg font-bold text-center mb-4">
          Set New Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#1d3557]"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d3557]"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-[#1d3557]"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d3557]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#1d3557] text-white p-2 rounded-md hover:bg-[#457b9d]"
          >
            Reset Password
          </button>
        </form>
        {message && (
          <p className="mt-4 text-sm text-center text-[#457b9d]">{message}</p>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
