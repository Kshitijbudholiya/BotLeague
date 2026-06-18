import React from "react";
import { FEATURES } from "../../data/siteData";
import styles from "./WhatIs.module.css";

export default function WhatIs() {
  return (
    <section className={styles.section} id="about">
      <div className={styles.inner}>
        <div className={styles.left}>
          <h2 className={styles.title}>WHAT IS BOTLEAGUE?</h2>

          <div className={styles.grid}>
            {FEATURES.map((f) => (
              <div key={f.num} className={styles.feature}>
                <span className={styles.num}>{f.num}</span>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.right}>
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80"
            alt="Robotics circuitry"
            className={styles.img}
          />
          <div className={styles.imgBadge}>
            <span className={styles.imgBadgeNum}>10K+</span>
            <span className={styles.imgBadgeLabel}>Teams Nationwide</span>
          </div>
        </div>
      </div>
    </section>
  );
}
