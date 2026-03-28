import React, { useState } from "react";
import PaymentCard from "./PaymentCard";
import AddAnotherCard from "./AddAnotherCard";

// Sample cards data
const SAMPLE_CARDS = [
  { cardId: 1, cardName: "Matcha Lover", cardNumber: "4242 4242 4242 4242", expiry: "08/27", type: "visa" },
  { cardId: 2, cardName: "Matcha Lover", cardNumber: "5555 5555 5555 4444", expiry: "12/26", type: "mastercard" },
];

const CardPage = () => {
  const [cards, setCards] = useState(SAMPLE_CARDS);

  const handleAddCard = (newCard) => {
    setCards([...cards, newCard]);
  };

  const handleRemoveCard = (cardId) => {
    // Filter out the card with the matching ID
    setCards(cards.filter((card) => card.cardId !== cardId));
  };

  return (
    <div className="bg-[#faf8f3] font-sans">

      {/* Main Content */}
      <main className="flex flex-col items-center p-2">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#2d4a2d]">Your Cards</h1>
          <p className="text-[#7db68a] text-lg">{cards.length} card(s) saved securely</p>
        </div>

        <div className="flex flex-col items-center gap-3">
          {cards.map((card, i) => (
            <PaymentCard key={card.cardId} card={card} index={i} onRemove={handleRemoveCard} />
          ))}

          <AddAnotherCard onCardAdded={handleAddCard} />
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-[#a5c4a5] mt-8">
          <p>256-bit encrypted · PCI DSS compliant</p>
          <p>© 2025 definitelymatcha. All rights reserved.</p>
        </div>
      </main>
    </div>
  );
};

export default CardPage;