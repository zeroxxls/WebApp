import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from '../store/slices/authSlice'
import axios from "axios";

export const AuthChecker = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      
      if (token) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/check`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          dispatch(
            setUser({
              user: response.data.user,
              token: token,
            })
          );
        } catch (error) {
          console.error("Auth check failed:", error);
          localStorage.removeItem("token");
        }
      }
    };

    checkAuth();
  }, [dispatch]);

  return children;
};