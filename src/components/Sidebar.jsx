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

import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const handleLogout = () => {
    // Add your logout logic here
    // For example: clear localStorage, redirect to login, etc.
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4">
        <h2 className="text-xl font-bold">Dashboard</h2>
      </div>
      <nav className="mt-8 flex-1">
        <ul>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `block py-2.5 px-4 rounded transition duration-200 ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
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
                `block py-2.5 px-4 rounded transition duration-200 ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
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
                `block py-2.5 px-4 rounded transition duration-200 ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
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
                `block py-2.5 px-4 rounded transition duration-200 ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
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
                `block py-2.5 px-4 rounded transition duration-200 ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
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
                `block py-2.5 px-4 rounded transition duration-200 ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
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
                `block py-2.5 px-4 rounded transition duration-200 ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
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
                `block py-2.5 px-4 rounded transition duration-200 ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
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
                `block py-2.5 px-4 rounded transition duration-200 ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
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
                `block py-2.5 px-4 rounded transition duration-200 ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
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
                `block py-2.5 px-4 rounded transition duration-200 ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
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
                `block py-2.5 px-4 rounded transition duration-200 ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
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
                `block py-2.5 px-4 rounded transition duration-200 ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
                }`
              }
            >
              Customers
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user-mangement"
              className={({ isActive }) =>
                `block py-2.5 px-4 rounded transition duration-200 ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
                }`
              }
            >
              User Mangement
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contacts"
              className={({ isActive }) =>
                `block py-2.5 px-4 rounded transition duration-200 ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
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
          <div className="flex items-center space-x-3">
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
                A
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-white text-sm font-medium">Akash_dev</span>
              <span className="text-gray-400 text-xs">Administrator</span>
            </div>
          </div>
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
