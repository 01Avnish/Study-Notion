import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import logo from "../../assets/logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { categories } from "../../services/apis";
import { apiConnector } from "../../services/operations/apiconnector";
import { logout } from "../../services/operations/authAPI";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [sublinks, setSublinks] = useState([]);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchSublinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setSublinks(result.data.data);
    } catch (error) {
      console.error("Error fetching the category lists:", error);
    }
  };

  useEffect(() => {
    fetchSublinks();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const handleLogout = () => {
    dispatch(logout(navigate));
    // toast.success("Logged out successfully");
  };

  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} height={42} width={160} loading="lazy" alt="Logo" />
        </Link>

        {/* Nav Links */}
        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="flex items-center gap-x-1 cursor-pointer">
                    <p
                      className={
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }
                    >
                      {link.title}
                    </p>
                    <IoIosArrowDropdownCircle />
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Right side */}
        <div className="flex gap-x-4 items-center">
          {/* Cart */}
          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-100 text-xs font-bold text-black rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {/* Auth Buttons */}
          {!token && (
            <>
              <Link to="/login">
                <button className="border border-richblack-700 bg-richblack-800 text-richblack-5 px-4 py-2 hover:bg-blue-400 hover:text-richblack-900 transition-all duration-200 rounded-lg">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="border border-richblack-700 bg-richblack-800 text-richblack-5 px-4 py-2 hover:bg-blue-400 hover:text-richblack-900 transition-all duration-200 rounded-lg">
                  Sign Up
                </button>
              </Link>
            </>
          )}

          {/* Profile Dropdown Replacement */}
          {token && (
            <div className="relative group">
              <button className="bg-richblack-800 text-richblack-5 px-4 py-2 rounded-lg">
                {user?.firstName || "Profile"}
              </button>
              <div className="absolute right-0 top-full mt-2 hidden w-40 bg-white rounded shadow-lg group-hover:block z-50">
                <Link
                  to="/dashboard/my-profile"
                  className="block px-4 py-2 text-sm text-richblack-900 hover:bg-richblack-100"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-richblack-100"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
