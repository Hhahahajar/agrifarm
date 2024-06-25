import React from 'react';

const Header = ({ category, title, children }) => (
  <div className="mb-10">
    <div>
      <p className="text-lg text-gray-400">{category}</p>
      <p className="text-3xl font-extrabold tracking-tight text-slate-900">{title}</p>
    </div>
    {children && <div className="mt-4">{children}</div>}
  </div>
);

export default Header;
