import React, { useState, useRef, useEffect } from "react";
import CardTypeIcon from "./CardTypeIcon";
import { TrashIcon } from '@heroicons/react/24/outline'; // Correct import for Heroicons v2

const maskNumber = (cardNumber) => {
  // Remove any non-digit characters
  const cleanedNumber = cardNumber.replace(/\D/g, "");
  // Mask all digits except the last 4
  const masked = cleanedNumber.slice(0, -4).replace(/\d/g, "•") + cleanedNumber.slice(-4);

  // Format the masked number with spaces every 4 digits
  return masked.replace(/(.{4})(?=.)/g, "$1 ").trim();
};

const PaymentCard = ({ card, index, onRemove }) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);  // Track if the card is clicked
  const cardRef = useRef(null);  // Reference for the card element
  
  // Listen for clicks outside the card to close the overlay
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setClicked(false); // Close overlay when clicking outside
      }
    };

    // Add event listener for click outside
    document.addEventListener("mousedown", handleClickOutside);
    
    // Cleanup event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const gradients = [
    "bg-gradient-to-r from-blue-700 to-green-500",
    "bg-gradient-to-r from-red-500 to-yellow-400",
  ];

  const handleCardClick = () => {
    setClicked(!clicked);  // Toggle the clicked state when the card is clicked
  };

  return (
    <div
      ref={cardRef}  // Reference to the card element
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleCardClick}  // Add onClick handler
      className={`${gradients[index % gradients.length]} rounded-2xl overflow-hidden text-white w-full max-w-[320px] min-h-[160px] relative shadow-lg transform transition-transform duration-300 ease-in-out ${hovered ? "translate-y-[-4px] shadow-xl" : "shadow-md"} cursor-pointer mx-auto mb-4`}
    >
      <div className="absolute top-[-50px] right-[-50px] w-[180px] h-[180px] rounded-full bg-[rgba(125,182,138,0.22)] pointer-events-none"></div>
      <div className="absolute bottom-[-30px] left-[-30px] w-[140px] h-[140px] rounded-full bg-[rgba(201,168,76,0.14)] pointer-events-none"></div>

      {/* Translucent overlay when clicked */}
      {clicked && (
        <div className="absolute inset-0 bg-black opacity-30 z-10 pointer-events-none"></div>  // Set pointer-events to none
      )}

      <div className="relative z-20 p-4 flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <div className="w-8 h-6 rounded-lg bg-gradient-to-r from-[#c9a84c] to-[#e8c96a]"></div>
          
          {/* Adjusted card logo position */}
          <div className="flex items-center space-x-2">
            <CardTypeIcon type={card.type} />
          </div>
        </div>

        <div className="font-mono tracking-wide text-lg opacity-90 mb-4">
          {maskNumber(card.cardNumber)}
        </div>

        <div className="flex justify-between items-end mt-auto">
          <div>
            <p className="text-xs uppercase tracking-wide opacity-55 mb-1">Card Holder</p>
            <p className="text-sm font-medium">{card.cardName}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wide opacity-55 mb-1">Expires</p>
            <p className="text-sm font-medium">{card.expiry}</p>
          </div>
        </div>

        {/* Trash Icon (Remove Card) - Positioned at the center when clicked */}
        {clicked && (
          <button
            onClick={(e) => {
              e.stopPropagation();  // Prevent the click event from propagating to parent div
              onRemove(card.cardId);    // Trigger the onRemove function passed from the parent component
            }}
            className="absolute inset-0 flex justify-center items-center text-white hover:text-red-500 z-50"  // High z-index for trash button
          >
            <TrashIcon className="w-8 h-8" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentCard;