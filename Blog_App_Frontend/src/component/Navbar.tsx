import React, { useState } from "react";
import { useAuth } from "../context/auth/auth.context";
import { NavLink } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

export const Navbar: React.FC = () => {
  const { logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    logout()
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">inkedIn</div>
      </div>

      <div className={`navbar-center ${menuOpen ? "active" : ""}`}>
        <NavLink to="/" end onClick={() => setMenuOpen(false)}>
          Explore
        </NavLink>
        <NavLink to="/myblogs" onClick={() => setMenuOpen(false)}>
          My Blogs
        </NavLink>
        <NavLink to="/favorites" onClick={() => setMenuOpen(false)}>
          Favorites
        </NavLink>
      </div>

      <div className="navbar-right">
        <div className="user-dropdown">
          <FaUserCircle className="user-icon" onClick={toggleDropdown} />
          {dropdownOpen && (
            <div className="dropdown-menu">
              {/* <div className="dropdown-item">Profile</div> */}
              <div className="dropdown-item" onClick={handleLogout}>Logout</div>
            </div>
          )}
        </div>
        <div className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};
