"use client";
//#222831
//#393E46
//#00ADB5
//#EEEEEE

import React from "react";
import "./globals.css"; // Import the CSS file for bounce animation

const Error = ({ text }) => {
  // Function to handle the bounce effect
  const handleBounce = (e) => {
    const letter = e.target;
    if (!letter.classList.contains("bounce")) {
      letter.classList.add("bounce");
      setTimeout(() => {
        letter.classList.remove("bounce");
      }, 1000); // Match the duration of the animation
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#222831]">
      <a className="text-center text-[#00ADB5] text-6xl" href="/login">
        {/* Split the string into individual characters, including spaces */}
        {text.split("").map((char, index) => (
          <span
            key={index}
            onMouseOver={handleBounce}
            className={`inline-block cursor-pointer ${
              char === " " ? "mx-2" : ""
            }`} // Add margin for spaces
          >
            {char}
          </span>
        ))}
      </a>
    </div>
  );
};

export default Error;
