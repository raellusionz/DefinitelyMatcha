// AddAnotherCard.jsx
import React, { useState } from "react";
import CardModal from "./CardModal"; // Modal component to add card

const AddAnotherCard = ({ onCardAdded }) => {
    const [hovered, setHovered] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleAddCardClick = () => {
        setShowModal(true)
    }
    
    const handleCloseModal = () => {
        setShowModal(false)
    }

    return (
        <div>
            <button
            onClick={handleAddCardClick}
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

            {showModal && (
                <CardModal 
                    onClose = {handleCloseModal}
                    onCardAdded={onCardAdded}
                />
            )}

        </div>

    );
};

export default AddAnotherCard;