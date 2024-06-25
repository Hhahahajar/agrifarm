import React from 'react';
import farmBackground from '../data/farm.jpg'; // Ensure you have the correct path to your background image

const LoginLayout = ({ children }) => (
  <div
    className="flex items-center justify-center min-h-screen bg-cover bg-center"
    style={{ backgroundImage: `url(${farmBackground})` }}
  >
    {children}
  </div>
);

export default LoginLayout;
