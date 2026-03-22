import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // For navigation links

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="bg-white text-black p-4">
      <div className="w-full flex justify-between items-center">
        <h5 className = "animate-bounce">
          <Link to="/" className="text-gray-950 font-bold font-style: italic text-lg">
            DefinitelyMatcha
          </Link>
        </h5>

        {/* Hamburger button - only shows on mobile */}
        <button
          className="md:hidden block text-gray-950"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-2xl">{isOpen ? '☰' : '☰'}</span>
        </button>

        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <li><Link to="/" className="text-gray-950 hover:text-green-700">Products</Link></li>
            <li><Link to="/cart" className="text-gray-950 hover:text-green-700">Cart</Link></li>
            <li><Link to="/profile" className="text-gray-950 hover:text-green-700">Profile</Link></li>
          </ul>
        </nav>
      </div>

      {/* Mobile dropdown - only shows when hamburger is clicked */}
      {isOpen && (
        <nav className="md:hidden absolute right-4 top-14 bg-white shadow-lg rounded-lg z-50 min-w-[100px]">
          <ul className="flex flex-col space-y-2">
            <li><Link to="/" className="text-gray-950 hover:text-green-700" onClick={() => setIsOpen(false)}>Products</Link></li>
            <li><Link to="/cart" className="text-gray-950 hover:text-green-700" onClick={() => setIsOpen(false)}>Cart</Link></li>
            <li><Link to="/profile" className="text-gray-950 hover:text-green-700" onClick={() => setIsOpen(false)}>Profile</Link></li>
          </ul>
        </nav>
      )}

    </header>
  );
}

export default Navbar;

//      <div className="container mx-auto flex justify-between items-center">