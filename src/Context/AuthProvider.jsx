import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const AuthProvider = ({ children }) => {
  const axiosSecure = useAxiosSecure();
  const [user, setUser] = useState(null);

  const Login = async (email, password) => {
    try {
      const res = await axiosSecure.get(`/login?email=${email}&password=${password}`);

      if (!res?.data?.token) {
        return false;
      }

      localStorage.setItem("token", res.data.token);

      const profileRes = await axiosSecure.get(`/user/profile`, {
        headers: { Authorization: `Bearer ${res.data.token}` },
      });
      setUser(profileRes.data);

      return true; 
    } catch (error) {
      console.error("Login failed:", error);
      return false; 
    }
  };


  const Logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    return
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchUser = async () => {
        try {
          const profileRes = await axiosSecure.get("/user/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(profileRes.data);
        } catch (err) {
          console.error("User fetch error:", err);
          setUser(null);
        }
      };
      fetchUser();
    }
  }, [axiosSecure]);

  const UserInfo = {
    Login,
    user,
    Logout
  };

  return (
    <AuthContext.Provider value={UserInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
