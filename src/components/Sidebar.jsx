// import React from "react";
// import { NavLink } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div className="h-screen w-64 bg-gray-800 text-white">
//       <div className="p-4">
//         <h2 className="text-xl font-bold">Dashboard</h2>
//       </div>
//       <nav className="mt-8">
//         <ul>
//           <li>
//             <NavLink
//               to="/"
//               end
//               className={({ isActive }) =>
//                 `block py-2.5 px-4 rounded transition duration-200 ${
//                   isActive ? "bg-gray-700" : "hover:bg-gray-700"
//                 }`
//               }
//             >
//               Home
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/upload"
//               className={({ isActive }) =>
//                 `block py-2.5 px-4 rounded transition duration-200 ${
//                   isActive ? "bg-gray-700" : "hover:bg-gray-700"
//                 }`
//               }
//             >
//               Upload Product
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/products"
//               className={({ isActive }) =>
//                 `block py-2.5 px-4 rounded transition duration-200 ${
//                   isActive ? "bg-gray-700" : "hover:bg-gray-700"
//                 }`
//               }
//             >
//               Products
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/analytics"
//               className={({ isActive }) =>
//                 `block py-2.5 px-4 rounded transition duration-200 ${
//                   isActive ? "bg-gray-700" : "hover:bg-gray-700"
//                 }`
//               }
//             >
//               Analytics
//             </NavLink>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const { userInfo, logoutUser } = useContext(AuthContext);
  const [dataSource, setDataSource] = useState("localStorage");

  useEffect(() => {
    // Check if userInfo has full backend data (more fields than just basic login response)
    if (userInfo?.name && userInfo?.email && userInfo?.createdAt) {
      setDataSource("backend");
    } else {
      setDataSource("localStorage");
    }
  }, [userInfo]);

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <div className="h-screen w-64 bg-gradient-to-b from-gray-800 via-gray-800 to-gray-900 text-white flex flex-col font-primary shadow-2xl">
      <div className="pt-8 pb-3 px-3 border-b border-gray-700/50">
        <h2 className="text-2xl font-secondary font-bold uppercase tracking-wide bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          BDL Dashboard
        </h2>
      </div>
      <nav className="mt-6 flex-1 px-2">
        <ul className="space-y-1">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `block py-2 px-3 rounded-lg transition-all duration-200 font-medium text-sm tracking-wide ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-lg transform scale-[0.98]"
                    : "hover:bg-gray-700/70 text-gray-200 hover:text-white hover:transform hover:scale-[0.98]"
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mokupzone-banner"
              end
              className={({ isActive }) =>
                `block py-2 px-3 rounded-lg transition-all duration-200 font-medium text-sm tracking-wide ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-lg transform scale-[0.98]"
                    : "hover:bg-gray-700/70 text-gray-200 hover:text-white hover:transform hover:scale-[0.98]"
                }`
              }
            >
              MokupZone Banner
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recent-work-banner"
              end
              className={({ isActive }) =>
                `block py-2 px-3 rounded-lg transition-all duration-200 font-medium text-sm tracking-wide ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-lg transform scale-[0.98]"
                    : "hover:bg-gray-700/70 text-gray-200 hover:text-white hover:transform hover:scale-[0.98]"
                }`
              }
            >
              Recent Work Banner
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/groups-series-subseries"
              end
              className={({ isActive }) =>
                `block py-2 px-3 rounded-lg transition-all duration-200 font-medium text-sm tracking-wide ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-lg transform scale-[0.98]"
                    : "hover:bg-gray-700/70 text-gray-200 hover:text-white hover:transform hover:scale-[0.98]"
                }`
              }
            >
              Groups, Series and Subseries
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `block py-2 px-3 rounded-lg transition-all duration-200 font-medium text-sm tracking-wide ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-lg transform scale-[0.98]"
                    : "hover:bg-gray-700/70 text-gray-200 hover:text-white hover:transform hover:scale-[0.98]"
                }`
              }
            >
              Products Upload
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/specifications"
              className={({ isActive }) =>
                `block py-2 px-3 rounded-lg transition-all duration-200 font-medium text-sm tracking-wide ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-lg transform scale-[0.98]"
                    : "hover:bg-gray-700/70 text-gray-200 hover:text-white hover:transform hover:scale-[0.98]"
                }`
              }
            >
              Specifications
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mockup-zone"
              className={({ isActive }) =>
                `block py-2 px-3 rounded-lg transition-all duration-200 font-medium text-sm tracking-wide ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-lg transform scale-[0.98]"
                    : "hover:bg-gray-700/70 text-gray-200 hover:text-white hover:transform hover:scale-[0.98]"
                }`
              }
            >
              Mockup Zone
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recent-work"
              className={({ isActive }) =>
                `block py-2 px-3 rounded-lg transition-all duration-200 font-medium text-sm tracking-wide ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-lg transform scale-[0.98]"
                    : "hover:bg-gray-700/70 text-gray-200 hover:text-white hover:transform hover:scale-[0.98]"
                }`
              }
            >
              Recent Work
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/greeting"
              className={({ isActive }) =>
                `block py-2 px-3 rounded-lg transition-all duration-200 font-medium text-sm tracking-wide ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-lg transform scale-[0.98]"
                    : "hover:bg-gray-700/70 text-gray-200 hover:text-white hover:transform hover:scale-[0.98]"
                }`
              }
            >
              Greeting
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `block py-2 px-3 rounded-lg transition-all duration-200 font-medium text-sm tracking-wide ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-lg transform scale-[0.98]"
                    : "hover:bg-gray-700/70 text-gray-200 hover:text-white hover:transform hover:scale-[0.98]"
                }`
              }
            >
              Services
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/academy"
              className={({ isActive }) =>
                `block py-2 px-3 rounded-lg transition-all duration-200 font-medium text-sm tracking-wide ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-lg transform scale-[0.98]"
                    : "hover:bg-gray-700/70 text-gray-200 hover:text-white hover:transform hover:scale-[0.98]"
                }`
              }
            >
              Academy
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `block py-2 px-3 rounded-lg transition-all duration-200 font-medium text-sm tracking-wide ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-lg transform scale-[0.98]"
                    : "hover:bg-gray-700/70 text-gray-200 hover:text-white hover:transform hover:scale-[0.98]"
                }`
              }
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/customer"
              className={({ isActive }) =>
                `block py-2 px-3 rounded-lg transition-all duration-200 font-medium text-sm tracking-wide ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-lg transform scale-[0.98]"
                    : "hover:bg-gray-700/70 text-gray-200 hover:text-white hover:transform hover:scale-[0.98]"
                }`
              }
            >
              Customers
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user-profile"
              className={({ isActive }) =>
                `block py-2 px-3 rounded-lg transition-all duration-200 font-medium text-sm tracking-wide ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-lg transform scale-[0.98]"
                    : "hover:bg-gray-700/70 text-gray-200 hover:text-white hover:transform hover:scale-[0.98]"
                }`
              }
            >
              My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user-mangement"
              className={({ isActive }) =>
                `block py-2 px-3 rounded-lg transition-all duration-200 font-medium text-sm tracking-wide ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-lg transform scale-[0.98]"
                    : "hover:bg-gray-700/70 text-gray-200 hover:text-white hover:transform hover:scale-[0.98]"
                }`
              }
            >
              User Management
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contacts"
              className={({ isActive }) =>
                `block py-2 px-3 rounded-lg transition-all duration-200 font-medium text-sm tracking-wide ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-lg transform scale-[0.98]"
                    : "hover:bg-gray-700/70 text-gray-200 hover:text-white hover:transform hover:scale-[0.98]"
                }`
              }
            >
              Contacts
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* User Profile with Logout */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center justify-between bg-gray-900 rounded-lg p-3">
          <NavLink
            to="/user-profile"
            className="flex items-center space-x-3 flex-1 hover:bg-gray-800 rounded-lg p-2 transition duration-200"
          >
            <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src="/api/placeholder/40/40"
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div
                className="w-full h-full bg-gray-600 rounded-full flex items-center justify-center text-white text-sm font-medium"
                style={{ display: "none" }}
              >
                {userInfo?.name ? userInfo.name.charAt(0).toUpperCase() : "U"}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-white text-sm font-semibold font-primary tracking-wide">
                {userInfo?.name || "User"}
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-xs font-medium font-primary">
                  {userInfo?.role
                    ? userInfo.role.charAt(0).toUpperCase() +
                      userInfo.role.slice(1)
                    : "User"}
                </span>
                <div
                  className={`w-2 h-2 rounded-full ${
                    dataSource === "backend" ? "bg-green-500" : "bg-yellow-500"
                  }`}
                  title={
                    dataSource === "backend"
                      ? "Data from Backend"
                      : "Data from localStorage"
                  }
                />
              </div>
            </div>
          </NavLink>
          <button
            onClick={handleLogout}
            className="w-8 h-8 bg-gray-700 hover:bg-red-600 rounded-full flex items-center justify-center transition duration-200 group"
            title="Logout"
          >
            <svg
              className="w-4 h-4 text-gray-300 group-hover:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
