/* eslint-env browser */

import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Image from "@/components/ui/Image";
import { generateImageUrl } from "@/utils/imageUtils";

interface HeaderProps {
  /** Whether the user is authenticated */
  isAuthenticated?: boolean;
  /** User's display name */
  userName?: string;
}

interface NavLinksProps {
  /** Whether the user is authenticated */
  isAuthenticated: boolean;
  /** User's display name */
  userName?: string;
}

/**
 * Navigation links component based on auth state
 */
const NavLinks = ({ isAuthenticated, userName }: NavLinksProps) => (
  <ul className="nav-links">
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/about">About</Link>
    </li>
    {isAuthenticated ? (
      <>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/profile">{userName || "Profile"}</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </>
    ) : (
      <>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </>
    )}
  </ul>
);

/**
 * Header component with navigation and user info
 */
const Header = ({ isAuthenticated = false, userName }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /**
   * Handles menu toggle click
   */
  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const logoUrl = generateImageUrl("/assets/logo.png", {
    width: 150,
    height: 40,
    quality: 90,
    format: "webp",
  });

  return (
    <header className="site-header">
      <div className="header-content">
        <Link to="/" className="logo-link">
          <Image
            src={logoUrl}
            alt="Lodge 2A Logo"
            width={150}
            height={40}
            priority
            fallback="/assets/logo-fallback.png"
            objectFit="contain"
          />
        </Link>

        <nav className={`main-nav ${isMenuOpen ? "open" : ""}`}>
          <button
            className="menu-toggle"
            onClick={handleMenuToggle}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <span className="menu-icon" />
          </button>
          <NavLinks isAuthenticated={isAuthenticated} userName={userName} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
