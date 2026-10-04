import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout, setUser } from '../store/slices/authSlice'
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
          // Keep the cached session if the API is temporarily unavailable.
          // Clear it only when the server explicitly rejects the token.
          if (error.response?.status === 401 || error.response?.status === 403) {
            dispatch(logout());
          } else {
            console.error("Auth check failed:", error);
          }
        }
      }
    };

    checkAuth();
  }, [dispatch]);

  return children;
};
