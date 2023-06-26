import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
 const initData = JSON.parse(localStorage.getItem('user')) || {
  isAuthenticated: false,
  firstName: null,
  lastName: null,
  email: null,
  image: null,
  firstTime: null,
  accountType: null,
  customerNumber: null,
  earlyBird: false,
  token: null,
  tokenLife: null,
  expire: null,
  refreshToken: null,
 };
 const [user, setUser] = useState(initData);
 useEffect(() => {
  localStorage.setItem('user', JSON.stringify(user));
 }, [user]);

 return (
  <AuthContext.Provider value={{ user, setUser }}>
   {children}
  </AuthContext.Provider>
 );
};

export default AuthContext;
