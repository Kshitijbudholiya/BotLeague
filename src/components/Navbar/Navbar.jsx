import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { NAV_LINKS } from "../../data/siteData";
import styles from "./Navbar.module.css";
import {
  Zap,
  Play,
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  Trophy,
  LogOut,
} from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target))
        setDropOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setDropOpen(false);
  };

  return (
    <>
      <div className={styles.announce}>
        <span className={styles.announceTag}>#209</span>
        <span className={styles.announceText}>
          Episode 11: Bengaluru Regionals — Live now
        </span>

        <button className={styles.watchBtn}>
          <Play size={10} fill="currentColor" />
          WATCH LIVE
        </button>
      </div>

      <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>
            <Zap size={26} />
          </span>

          <span className={styles.logoWordmark}>
            <span className={styles.logoBold}>BOT</span>LEAGUE
          </span>
        </Link>

        <ul className={`${styles.links} ${menuOpen ? styles.linksOpen : ""}`}>
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={styles.link}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}

          <li className={styles.mobileOnly}>
            {user ? (
              <button className={styles.mobileLogout} onClick={handleLogout}>
                LOGOUT
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className={styles.link}
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`${styles.link} ${styles.mobileRegister}`}
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </li>
        </ul>

        <div className={styles.actions}>
          {user ? (
            <div className={styles.userMenu} ref={dropRef}>
              <button
                className={styles.userBtn}
                onClick={() => setDropOpen((p) => !p)}
              >
                <span className={styles.userAvatar}>
                  {user.name[0].toUpperCase()}
                </span>
                <span className={styles.userName}>
                  {user.name.split(" ")[0]}
                </span>

                <span className={styles.chevron}>
                  {dropOpen ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </span>
              </button>
              {dropOpen && (
                <div className={styles.dropdown}>
                  <div className={styles.dropHeader}>
                    <span className={styles.dropName}>{user.name}</span>
                    <span className={styles.dropEmail}>{user.email}</span>
                  </div>

                  <button
                    className={styles.dropItem}
                    onClick={() => {
                      setDropOpen(false);
                    }}
                  >
                    <LayoutDashboard size={16} />
                    Dashboard
                  </button>

                  <button
                    className={styles.dropItem}
                    onClick={() => {
                      setDropOpen(false);
                    }}
                  >
                    <Trophy size={16} />
                    My Rankings
                  </button>

                  <div className={styles.dropDivider} />
                  <button
                    className={`${styles.dropItem} ${styles.dropLogout}`}
                    onClick={handleLogout}
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className={styles.loginBtn}>
                LOGIN
              </Link>
              <Link to="/register" className={styles.registerBtn}>
                REGISTER NOW
              </Link>
            </>
          )}
        </div>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barX1 : ""}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barHide : ""}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barX2 : ""}`} />
        </button>
      </nav>

      {menuOpen && (
        <div
          className={styles.menuOverlay}
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
