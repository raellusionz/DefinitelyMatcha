// BottomNavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { HomeIcon, UsersIcon, UserCircleIcon, ShoppingCartIcon} from '@heroicons/react/24/solid';

const BottomNavBar = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t border-gray-200">
      <div className="flex justify-around items-center py-3">
        {/* Home Tab */}
        <Link to="/" className="flex flex-col items-center">
            <HomeIcon className="w-6 h-6 text-gray-700" />
            <span className="text-sm text-gray-700">Home</span>
        </Link>
        
        {/* Merchants Tab */}
        <Link to="/merchants" className="flex flex-col items-center">
            <UsersIcon className="w-6 h-6 text-gray-700" />
            <span className="text-sm text-gray-700">Merchants</span>
        </Link>

        {/* Cart Tab */}
        <Link to="/cart" className="flex flex-col items-center">
          <ShoppingCartIcon className="w-6 h-6 text-gray-700" />
          <span className="text-sm text-gray-700">Cart</span>
        </Link>


        {/* Profile Tab */}
        <Link to="/profile" className="flex flex-col items-center">
          <UserCircleIcon className="w-6 h-6 text-gray-700" />
          <span className="text-sm text-gray-700">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavBar;