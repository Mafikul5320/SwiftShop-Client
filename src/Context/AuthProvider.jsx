import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const AuthProvider = ({ children }) => {
  const axiosSecure = useAxiosSecure();
  const [User, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

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
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchUser = async () => {
        try {
          setLoading(true); 
          const profileRes = await axiosSecure.get("/user/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(profileRes.data);
        } catch (err) {
          console.error("User fetch error:", err);
          setUser(null);
        } finally {
          setLoading(false); 
        }
      };
      fetchUser();
    } else {
      setLoading(false); 
    }
  }, [axiosSecure]);

  const UserInfo = {
    Login,
    User,
    Logout,
    loading 
  };

  return (
    <AuthContext.Provider value={UserInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
