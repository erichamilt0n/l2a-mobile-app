import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

/**
 * UserMenu component displays user-related actions like logout
 * @returns React component with user menu
 */
export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  /**
   * Toggle menu open/closed state
   */
  const handleToggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  /**
   * Handle user logout by clearing session and redirecting
   */
  const handleLogout = useCallback(() => {
    // Clear user session
    localStorage.removeItem("userToken");
    sessionStorage.removeItem("userSession");

    // Close menu
    setIsOpen(false);

    // Redirect to login page
    navigate("/login");
  }, [navigate]);

  return (
    <div className="user-menu">
      <button
        data-testid="user-menu"
        onClick={handleToggleMenu}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Menu
      </button>

      {isOpen && (
        <div className="user-menu__dropdown" role="menu">
          <button
            data-testid="logout-button"
            onClick={handleLogout}
            role="menuitem"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
