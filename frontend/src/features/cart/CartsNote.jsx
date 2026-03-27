import React from "react";

function CartsNote() {
  return (
    <div>
      <label className="block text-sm font-semibold">
        Add a note to your order:
      </label>
      <textarea
        placeholder="How can we help you?"
        className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
      />
    </div>
  );
}

export default CartsNote;