import React, { useState, useEffect } from "react";


const detectCardType = (cardNumber) => {
    const visaRegex = /^4/;
    const masterCardRegex = /^(5[1-5]|222[1-9]|22[3-9][0-9]|2[3-9][0-9]{2}|[3-6][0-9]{3})/;
    const amexRegex = /^3[47]/;

    if (visaRegex.test(cardNumber)) return "visa";
    if (masterCardRegex.test(cardNumber)) return "mastercard";
    if (amexRegex.test(cardNumber)) return "amex";
    return "";  // If it doesn't match any known pattern
};


const CardModal = ({onClose, onCardAdded}) => {
    const [cardName, setCardName] = useState("")
    const [cardNumber, setCardNumber]  = useState("")
    const [expiry, setExpiry]  = useState("")
    const [type, setType]  = useState("")

    // Format the card number by adding spaces every 4 digits
    const formatCardNumber = (cardNumber) => {
        return cardNumber.replace(/\D/g, "") // Remove non-digit characters
            .replace(/(\d{4})(?=\d)/g, "$1 "); // Add space every 4 digits
    };

    // Update the card number with proper formatting
    const handleCardNumberChange = (e) => {
        let formattedNumber = formatCardNumber(e.target.value);
        setCardNumber(formattedNumber);
    };

    useEffect(() => { 
        if (cardNumber.length > 0) {
            const detectedType = detectCardType(cardNumber)
            setType(detectedType)
        }
        
    }, [cardNumber]);

    const handleSubmit = (e) => {
        e.preventDefault()
        const newCard = {
            cardId : Date.now(),
            cardName, 
            cardNumber, 
            expiry,
            type
        }
        
        onCardAdded(newCard)
        onClose()
    }    

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]"> 
                <h2 className="text-xl font-semibold mb-4">Add New Card</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold">
                            Cardholder Name
                        </label>
                        <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Enter cardholder's name"
                        required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold">Card Number</label>
                        <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Enter card number"
                        required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold">Expiry Date</label>
                        <input
                        type="text"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="MM/YY"
                        required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold">Card Type</label>
                        <input
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)} // Let user still change it if needed
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        disabled // Disable manual edit as it's auto-detected
                        />
                    </div>

                    <div className="flex justify-between">
                        <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
                        >
                        Cancel
                        </button>
                        <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded-lg"
                        >
                        Add Card
                        </button>
                    </div>
                </form>
            </div>
        </div>   
    )

}

export default CardModal

