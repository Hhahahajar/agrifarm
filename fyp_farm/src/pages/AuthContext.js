import React, { createContext, useState, useContext, useMemo } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Example state for authenticated user
  const [role, setRole] = useState(null); // State for user role
  const [token, setToken] = useState(null); // State for authentication token

  const login = (name, userRole, authToken) => {
    setUser(name);
    setRole(userRole);
    setToken(authToken);
    // You can also set token in localStorage or cookies here
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setToken(null);
    // Clear token from localStorage or cookies here
  };

  const authContextValue = useMemo(() => ({
    user,
    role,
    token,
    login,
    logout,
  }), [user, role, token]); // Memoize the context value to avoid recreating it unnecessarily

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
