import { Modal, notification } from "antd";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import customAxios from "../axios";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  useEffect(() => {
    // Check if the user is already logged in
    const admin = localStorage.getItem("admin");
    if (!admin) {
      navigate("/login");
    }
    setIsAuthChecking(false);
  }, [navigate]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

  const loginUser = async (data) => {
    try {
      const res = await customAxios.post("/users/login", data);
      if (res.status === 200) {
        localStorage.setItem("admin", true);
        if (res.data.role === "admin") {
          localStorage.setItem("userInfo", JSON.stringify(res.data));
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
    // Trigger the redirect immediately on logout
    navigate("/login");
  };

  // This effect listens for changes in localStorage and redirects to login if userInfo is removed
  useEffect(() => {
    const handleStorageChange = () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) {
        navigate("/login");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Check on mount if userInfo is missing
    if (!userInfo) {
      navigate("/login");
    }

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate, userInfo]);

  return (
    <AuthContext.Provider
      value={{ loginUser, userInfo, logoutUser, isAuthChecking }}
    >
      {!isAuthChecking ? children : null}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
