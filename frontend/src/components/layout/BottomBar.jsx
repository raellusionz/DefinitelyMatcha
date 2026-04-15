// BottomNavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { UserCircleIcon, ShoppingCartIcon} from '@heroicons/react/24/solid';
import { Icon } from '@iconify/react';
//import { useUser } from '../../context/userContext';  // Adjust according to folder structure

const BottomNavBar = () => {

  const cust_id = 1
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-2px_6px_rgba(0,0,0,0.1)] border-t border-gray-200">
      <div className="flex justify-around items-center py-3">
        
        {/* Merchants Tab */}
        <Link to="/merchants" className="flex flex-col items-center">
             <Icon icon="streamline-emojis:teacup-without-handle" className="w-6 h-6" />
            <span className="text-sm text-gray-600">Matcha</span>
        </Link>

        {/* Merchants Tab */}
        <Link to={`/transactions/${cust_id}`} className="flex flex-col items-center">
             <Icon icon="icon-park-outline:transaction-order" className="text-gray-700 w-6 h-6" />
            <span className="text-sm text-gray-600">Orders</span>
        </Link>

        {/* Cart Tab */}
        <Link to="/cart" className="flex flex-col items-center">
          <ShoppingCartIcon className="w-6 h-6 text-gray-700" />
          <span className="text-sm text-gray-600">Cart</span>
        </Link>


        {/* Profile Tab */}
        <Link to="/profile" className="flex flex-col items-center">
          <UserCircleIcon className="w-6 h-6 text-gray-700" />
          <span className="text-sm text-gray-600">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavBar;