import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getToken as svcGetToken,
  getUser as svcGetUser,
  loginUser as svcLoginUser,
  logoutUser as svcLogoutUser,
} from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => svcGetToken());
  const [user, setUser] = useState(() => svcGetUser());

  const login = async (email, password) => {
    const res = await svcLoginUser(email, password);
    if (res.success) {
      setToken(localStorage.getItem("authToken"));
      setUser(JSON.parse(localStorage.getItem("user")));
    }
    return res;
  };

  const logout = () => {
    svcLogoutUser();
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = () => !!token;

  const hasRole = (role) => user && user.role === role;

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, isAuthenticated, hasRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
