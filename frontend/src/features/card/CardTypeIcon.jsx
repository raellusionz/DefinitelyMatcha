// CardTypeIcon.jsx
import React from 'react';

const CardTypeIcon = ({ type }) => {
  if (type === 'visa') {
    return (
      <span className="font-serif italic font-extrabold text-white text-lg tracking-wide">
        VISA
      </span>
    );
  }
  return (
    <div className="flex items-center">
      <div className="w-5 h-5 rounded-full bg-red-600 mr-2 opacity-90" />
      <div className="w-5 h-5 rounded-full bg-yellow-400 opacity-90" />
    </div>
  );
};

export default CardTypeIcon;