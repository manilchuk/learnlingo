import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/useAuth";
import AuthModal from "../AuthForms/AuthModal";
import css from "./Header.module.css";

const Header = () => {
  const { user, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const openLogin = () => {
    setAuthMode("login");
    setIsAuthModalOpen(true);
  };

  const openRegister = () => {
    setAuthMode("register");
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <header className={css.header}>
        <div className={css.container}>
          <Link to="/" className={css.logo}>
            <span className={css.logoIcon}></span>
            LearnLingo
          </Link>

          <nav className={css.nav}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${css.link} ${css.active}` : css.link
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/teachers"
              className={({ isActive }) =>
                isActive ? `${css.link} ${css.active}` : css.link
              }
            >
              Teachers
            </NavLink>
            {user && (
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  isActive ? `${css.link} ${css.active}` : css.link
                }
              >
                Favorites
              </NavLink>
            )}
          </nav>

          <div className={css.actions}>
            {user ? (
              <>
                <span className={css.userName}>
                  {user.displayName || user.email}
                </span>
                <button className={css.logoutButton} onClick={logout}>
                  Log out
                </button>
              </>
            ) : (
              <>
                <button className={css.loginButton} onClick={openLogin}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3"
                      stroke="#121417"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Log in
                </button>
                <button className={css.registerButton} onClick={openRegister}>
                  Registration
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          initialMode={authMode}
        />
      )}
    </>
  );
};

export default Header;
