import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Sidebar from "./Sidebar";

const Layout = () => {
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo.role === "admin") {
      navigate("/login");
    }
  });
  return (
    <div className="flex overflow-hidden font-primary">
      <Sidebar />
      <div className="flex-1 p-2 bg-gray-100 h-screen overflow-y-auto overflow-x-hidden font-primary">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
