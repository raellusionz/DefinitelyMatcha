// BottomNavBar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link from React Router
import { UserCircleIcon, ShoppingCartIcon} from '@heroicons/react/24/solid';
import { Icon } from '@iconify/react';
//import { useUser } from '../../context/userContext';  // Adjust according to folder structure

const BottomNavBar = () => {

  const {pathname} = useLocation();

  const isActive = (path) =>
    pathname === path || pathname.startsWith(path)

  const cust_id = 1

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-2px_6px_rgba(0,0,0,0.1)] border-t border-gray-200">
      <div className="flex justify-around items-center py-3">
        
        {/* Merchants Tab */}
        <Link to="/merchants" className="flex flex-col items-center">
          <div className={`flex flex-col items-center px-4 py-1 rounded-xl transition-colors ${isActive('/merchants') ? 'bg-green-50' : ''}`}>
              <Icon icon="streamline-emojis:teacup-without-handle" className="w-6 h-6" />
              <span className={`text-sm ${isActive('/merchants') ? 'text-gray-600 font-semibold' : 'text-gray-600'}`}>Matcha</span>
          </div>
        </Link>

        {/* Transactions Tab */}
        <Link to={`/transactions`} className="flex flex-col items-center">
          <div className={`flex flex-col items-center px-4 py-1 rounded-xl transition-colors ${isActive('/transactions') ? 'bg-green-50' : ''}`}>
            <Icon icon="icon-park-outline:transaction-order"
            className={`w-6 h-6 ${isActive('/transactions') ? 'text-green-600' : 'text-gray-700'}`}/>
            <span className={`text-sm ${isActive('/transactions') ? 'text-gray-600 font-semibold' : 'text-gray-600'}`}>Orders</span>
          </div>
        </Link>

        {/* Cart Tab */}
        <Link to="/cart" className="flex flex-col items-center">
          <div className={`flex flex-col items-center px-4 py-1 rounded-xl transition-colors ${isActive('/cart') ? 'bg-green-50' : ''}`}>
            <ShoppingCartIcon className={`w-6 h-6 ${isActive('/cart') ? 'text-green-600' : 'text-gray-700'}`}/>
            <span className={`text-sm ${isActive('/precart') ? 'text-gray-600 font-semibold' : 'text-gray-600'}`}>Cart</span>
          </div>
        </Link>


        {/* Profile Tab */}
        <Link to="/profile" className="flex flex-col items-center">
          <div className={`flex flex-col items-center px-4 py-1 rounded-xl transition-colors ${isActive('/profile') ? 'bg-green-50' : ''}`}>
            <UserCircleIcon className={`w-6 h-6 text-gray-700 ${isActive('/profile') ? 'text-green-600' : 'text-gray-700'}`}/>
            <span className={`text-sm ${isActive('/profile') ? 'text-gray-600 font-semibold' : 'text-gray-600'}`}>Profile</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavBar;

//  <Link to={`/transactions/${cust_id}`} className="flex flex-col items-center">
//              <Icon icon="icon-park-outline:transaction-order" className="text-gray-700 w-6 h-6" />
//             <span className="text-sm text-gray-600">Orders</span>
//         </Link>
