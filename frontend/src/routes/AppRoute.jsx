import React from "react";
import { Routes, Route } from 'react-router-dom';
import ProductsPage from '../features/product/ProductsPage'
import MerchantsPage from '../features/merchant/MerchantsPage'
import Navbar from '../components/layout/NavBar'
import CartCheckoutPage from "../features/cart/CartsPage";
import BottomNavBar from '../components/layout/BottomBar'
import ProfilePage from "../features/profile/ProfilePage";
import ProfileCardPage from "../features/card/ProfileCardPage";
import TransactionHistPage from "../features/transaction/TransactionHistPage";

function AppRoutes() {
  return (
    <div className="w-full">
      <Navbar />
      <Routes>
        <Route path="/" element={<MerchantsPage />} />
        <Route path="/merchants" element={<MerchantsPage />} />
        <Route path="/products/:merchant_id" element={<ProductsPage />} />
        <Route path="/cart" element={<CartCheckoutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/add-card" element={<ProfileCardPage />} />
        <Route path="/transactions/:cust_id" element={<TransactionHistPage />} />
      </Routes>
      <BottomNavBar/>
    </div>
  );
}

export default AppRoutes;
