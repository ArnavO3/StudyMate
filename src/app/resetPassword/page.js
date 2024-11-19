"use client";
import { useState } from "react";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token"); // Extract the token from the query string

    try {
      const response = await fetch("/api/users/resetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        setError("");
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to reset password. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h2 className="text-xl font-semibold text-center text-gray-800">
          Reset Your Password
        </h2>

        {success ? (
          <p className="mt-4 text-green-600">
            Password reset successfully! You can now log in.
          </p>
        ) : (
          <form onSubmit={handleResetPassword} className="mt-4">
            {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
