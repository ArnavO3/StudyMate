"use client";
import React from "react";
import { useRouter } from "next/navigation";

function Logout() {
  // const navigate = useNavigate();
  const navigate = useRouter();

  const handleLogout = () => {
    // Clear user data from localStorage (or sessionStorage)
    localStorage.removeItem("token"); // Example for token-based authentication
    localStorage.removeItem("username"); // If you store the username or other info
    // sessionStorage.removeItem('token');  // If you use sessionStorage instead

    // Redirect the user to the login page
    navigate.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="justify-center border border-black rounded-md bg-red-500 px-3 py-1.5 text-lg font-semibold leading-6 text-white hover:bg-white hover:text-red-500 active:scale-110 transition duration-400"
    >
      Logout
    </button>
  );
}

export default Logout;
