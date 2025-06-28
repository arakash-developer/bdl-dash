import { Modal, notification } from "antd";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import customAxios from "../axios";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  const fetchUserData = async (userId) => {
    try {
      const response = await customAxios.get(`/users/${userId}`);
      if (response.status === 200) {
        setUserInfo(response.data);
        // Also update localStorage with fresh data
        localStorage.setItem("userInfo", JSON.stringify(response.data));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      // If user not found or error, keep existing localStorage data
      const existingUserInfo =
        JSON.parse(localStorage.getItem("userInfo")) || {};
      setUserInfo(existingUserInfo);
    }
  };

  useEffect(() => {
    // Check if the user is already logged in
    const admin = localStorage.getItem("admin");
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

    if (!admin) {
      navigate("/login");
    } else {
      // If we have a user ID, fetch fresh data from backend
      if (storedUserInfo._id || storedUserInfo.user) {
        const userId = storedUserInfo._id || storedUserInfo.user;
        fetchUserData(userId);
      } else {
        setUserInfo(storedUserInfo);
      }
    }
    setIsAuthChecking(false);
  }, [navigate]);

  const loginUser = async (data) => {
    try {
      const res = await customAxios.post("/users/login", data);
      if (res.status === 200) {
        localStorage.setItem("admin", true);
        if (res.data.role === "admin") {
          // Store the basic login response
          localStorage.setItem("userInfo", JSON.stringify(res.data));

          // Fetch complete user data using the user ID
          if (res.data.user) {
            await fetchUserData(res.data.user);
          }

          notification.success({ duration: 2, message: "Login Successful" });
          navigate("/");
        } else {
          navigate("/login");
          Modal.error({
            title: "Error",
            content: (
              <p className="font-mono text-lg mb-3">
                You are not authorized to access this Site.
              </p>
            ),
            // onOk: () => navigate("/login"),
          });
        }
      }
    } catch (error) {
      notification.error({
        message:
          error.response.data.message ||
          `${error.response.data.message} Please contacts with admin.`,
        duration: 2,
      });
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("admin");
    setUserInfo({});
    // Trigger the redirect immediately on logout
    navigate("/login");
  };

  // This effect listens for changes in localStorage and redirects to login if userInfo is removed
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!storedUserInfo) {
        navigate("/login");
      } else {
        setUserInfo(storedUserInfo);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{ loginUser, userInfo, logoutUser, isAuthChecking, fetchUserData }}
    >
      {!isAuthChecking ? children : null}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
