// src/App.jsx
import React from 'react';
import './index.css'; // Import Tailwind CSS
import AppRoutes from '../src/routes/AppRoute' // Import AppRoutes to manage routing

function App() {
  
  return (
    <UserProvider>
      <div className="min-h-screen w-full bg-[#f3f7f3]">
        <AppRoutes />  {/* Render routes that include the Navbar and Products page */}
        
      </div>
    </UserProvider>
  );
}

export default App;

