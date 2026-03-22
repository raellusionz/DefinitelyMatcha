import React from "react";
import { Routes, Route } from 'react-router-dom';
import ProductsPage from '../features/product/ProductsPage'
import MerchantsPage from '../features/merchant/MerchantsPage'
import Navbar from '../components/layout/NavBar'

function AppRoutes() {
  return (
    <div className="w-full">
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/merchants" element={<MerchantsPage />} />
        
      </Routes>
    </div>
  );
}

export default AppRoutes;
