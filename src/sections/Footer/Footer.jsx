import React, { useState } from "react";
import { Link } from "react-router-dom";
import { QUICK_LINKS, COMPANY_LINKS } from "../../data/siteData";
import styles from "./Footer.module.css";
import { Play, Camera, Briefcase, MessageCircle, Zap } from "lucide-react";

const SOCIAL = [
  { icon: Play, label: "YouTube" },
  { icon: Camera, label: "Instagram" },
  { icon: Briefcase, label: "LinkedIn" },
  { icon: MessageCircle, label: "Twitter" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSent(true);
      setEmail("");
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoIcon}>
              <Zap size={28} />
            </span>
            <span className={styles.logoText}>
              <span className={styles.logoBold}>BOT</span>LEAGUE
            </span>
          </Link>
          <p className={styles.tagline}>
            India's National Robotics
            <br />
            League &amp; Arena Platform
          </p>
          <div className={styles.social}>
            {SOCIAL.map((s) => {
              const Icon = s.icon;

              return (
                <button
                  key={s.label}
                  className={styles.socialBtn}
                  aria-label={s.label}
                >
                  <Icon size={20} strokeWidth={2} />
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.col}>
          <p className={styles.colTitle}>QUICK LINKS</p>
          <ul className={styles.links}>
            {QUICK_LINKS.map((l) => (
              <li key={l}>
                <a href="#" className={styles.link}>
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <p className={styles.colTitle}>COMPANY</p>
          <ul className={styles.links}>
            {COMPANY_LINKS.map((l) => (
              <li key={l}>
                <a href="#" className={styles.link}>
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <p className={styles.colTitle}>STAY UPDATED</p>
          <p className={styles.newsletterDesc}>
            Get event alerts, rankings &amp; league news.
          </p>
          {sent ? (
            <p className={styles.newsletterThanks}>✓ You're subscribed!</p>
          ) : (
            <form onSubmit={handleNewsletter} className={styles.newsletterForm}>
              <input
                className={styles.newsletterInput}
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className={styles.newsletterBtn}>
                GO
              </button>
            </form>
          )}
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© 2025 BotLeague. All rights reserved.</span>
        <span className={styles.bottomRight}>
          <Link to="/login" className={styles.footerAuthLink}>
            Login
          </Link>
          <span>·</span>
          <Link to="/register" className={styles.footerAuthLink}>
            Register
          </Link>
        </span>
      </div>
    </footer>
  );
}
