// src/App.jsx
import React from 'react';
import './index.css'; // Import Tailwind CSS
import AppRoutes from '../src/routes/AppRoute' // Import AppRoutes to manage routing

function App() {
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-green-300 via-teal-400 to-lime-300">
      <AppRoutes />  {/* Render routes that include the Navbar and Products page */}
      
    </div>
    
  );
}

export default App;

// bg-gradient-to-r from-green-300 via-teal-400 to-lime-300"

{/* <header className="flex justify-between items-center p-6">
        <div className="text-2xl font-bold text-gray-800">Radiant</div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#" className="text-gray-800 hover:text-gray-600">Pricing</a></li>
            <li><a href="#" className="text-gray-800 hover:text-gray-600">Company</a></li>
            <li><a href="#" className="text-gray-800 hover:text-gray-600">Blog</a></li>
            <li><a href="#" className="text-gray-800 hover:text-gray-600">Login</a></li>
          </ul>
        </nav>
      </header>
      
      <main className="flex justify-center items-center text-center py-20">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-5xl font-extrabold text-gray-900">Close every deal.</h1>
          <p className="text-xl text-gray-700">
            Radiant helps you sell more by revealing sensitive information about your customers.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-6 py-3 bg-black text-white text-lg font-medium rounded-lg hover:bg-gray-800 transition">
              Get Started
            </button>
            <button className="px-6 py-3 bg-pink-200 text-gray-800 text-lg font-medium rounded-lg hover:bg-pink-300 transition">
              See Pricing
            </button>
          </div>
        </div>
      </main> */}