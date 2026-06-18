import React from "react";
import { Link } from "react-router-dom";
import styles from "./Hero.module.css";
import { Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.overlayLeft} />
      <div className={styles.overlayGlow} />

      <div className={styles.badge}>
        <span className={styles.badgeDot} />
        LIVE — BENGALURU REGIONALS
      </div>

      <div className={styles.content}>
        <p className={styles.eyebrow}>INDIA'S ULTIMATE</p>
        <h1 className={styles.title}>
          ROBOTICS
          <br />
          <span className={styles.titleAccent}>ARENA</span>
        </h1>

        <p className={styles.subtitle}>
          Build · Compete · Rank · The National
          <br />
          Ecosystem for Robotics Arena
        </p>

        <div className={styles.cta}>
          <Link to="/register" className={styles.btnPrimary}>
            <Zap size={18} />
            CREATE ACCOUNT
          </Link>
          <a href="#events" className={styles.btnOutline}>
            EXPLORE EVENTS
          </a>
        </div>

        <div className={styles.stats}>
          {[
            { value: "50+", label: "Events / Year" },
            { value: "10K+", label: "Registered Teams" },
            { value: "28", label: "States Covered" },
          ].map((s) => (
            <div key={s.label} className={styles.statItem}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.visual}>
        <img
          src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900&q=80"
          alt="Robotics Arena"
          className={styles.heroImg}
        />
        <div className={styles.visualOverlay} />
      </div>
    </section>
  );
}
