import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getMe } from "../api/auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const me = await getMe();
        setUser(me);
      } catch (error) {
        setUser(null);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const refreshUser = async () => {
    try {
      const me = await getMe();
      setUser(me);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    refreshUser().finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
