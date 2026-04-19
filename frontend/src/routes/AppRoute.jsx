import React from "react";
import { Routes, Route } from 'react-router-dom';
import { useUser } from '../context/userContext';
import ProductsPage from '../features/product/ProductsPage'
import MerchantsPage from '../features/merchant/MerchantsPage'
import Navbar from '../components/layout/NavBar'
import CartCheckoutPage from "../features/cart/CartsPage";
import BottomNavBar from '../components/layout/BottomBar'
import ProfilePage from "../features/profile/ProfilePage";
import ProfileCardPage from "../features/card/ProfileCardPage";
import TransactionHistPage from "../features/transaction/TransactionHistPage";
import LoginPage from "../auth/LoginPage";
import MerchTransactionHistPage from "../merchantfeatures/transaction/MerchTransactionHistPage"

const CustomerRoute = ({ children }) => {
  const { userId, userRole, userLoading } = useUser();
  if (userLoading) return null;
  if (!userId) return <Navigate to="/login" />;
  if (userRole !== 'customer') return <Navigate to="/login" />;
  return children;
};

const MerchantRoute = ({ children }) => {
  const { userId, userRole, userLoading } = useUser();
  if (userLoading) return null;
  if (!userId) return <Navigate to="/login" />;
  if (userRole !== 'merchant') return <Navigate to="/login" />;
  return children;
};

function AppRoutes() {
  return (
    <div className="w-full">
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MerchantsPage />} />
        <Route path="/merchants" element={<MerchantsPage />} />
        <Route path="/products/:merchant_id" element={<ProductsPage />} />
        <Route path="/cart" element={<CartCheckoutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/add-card" element={<ProfileCardPage />} />
        <Route path="/transactions" element={<TransactionHistPage />} />
        <Route path="/merchTransactions" element = {<MerchTransactionHistPage />}/>
      </Routes>
      <BottomNavBar/>
    </div>
  );
}

export default AppRoutes;

{/* <Route path="/transactions/:cust_id" element={<TransactionHistPage />} /> */}


// function AppRoutes() {
//   return (
//     <div className="w-full">
//       <Navbar />
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />

//         {/* Customer routes */}
//         <Route path="/" element={<CustomerRoute><MerchantsPage /></CustomerRoute>} />
//         <Route path="/merchants" element={<CustomerRoute><MerchantsPage /></CustomerRoute>} />
//         <Route path="/products/:merchant_id" element={<CustomerRoute><ProductsPage /></CustomerRoute>} />
//         <Route path="/cart" element={<CustomerRoute><CartCheckoutPage /></CustomerRoute>} />
//         <Route path="/transactions" element={<CustomerRoute><TransactionHistPage /></CustomerRoute>} />
//         <Route path="/profile" element={<CustomerRoute><ProfilePage /></CustomerRoute>} />

//         {/* Merchant routes — add these when ready */}
//         {/* <Route path="/dashboard" element={<MerchantRoute><MerchantDashboard /></MerchantRoute>} /> */}
//       </Routes>
//       <BottomNavBar />
//     </div>
//   );
// }