// AddAnotherCard.jsx
import React, { useState } from "react";

const AddAnotherCard = ({ onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`flex items-center justify-center gap-2 w-full max-w-[360px] mx-auto border ${
        hovered ? "border-green-700 bg-green-100 text-green-800" : "border-[#c8e6c9] text-green-600"
      } rounded-lg p-3 text-sm font-semibold transition-all duration-200 ease-in-out cursor-pointer`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
      Add another card
    </button>
  );
};

export default AddAnotherCard;