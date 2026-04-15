import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // For navigation links
import logo from '../../assets/logo.png'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="bg-[#f3f7f3] text-black p-1 shadow-md">
      <div className="w-full flex justify-center items-center">
          {/* <Link to="/" className="text-gray-950 font-bold font-style: italic text-lg">
            🍵 DefinitelyMatcha 🍵
          </Link> */}
          <Link to="/" >
            <img src={logo} className="base" width="150" height="100" alt="" />
          </Link>
      </div> 
    </header>
  );
}

export default Navbar;

