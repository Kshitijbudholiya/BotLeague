import React from "react";
import Leaderboard from "../../components/Leaderboard/Leaderboard";
import { ADVANTAGES } from "../../data/siteData";
import styles from "./Advantage.module.css";

export default function Advantage() {
  return (
    <section className={styles.section} id="advantage">
      <p className={styles.label}>WHY REGISTER?</p>
      <div className={styles.inner}>
        <div className={styles.left}>
          <h2 className={styles.title}>
            THE LEAGUE
            <br />
            <span className={styles.accent}>ADVANTAGE</span>
          </h2>
          <div className={styles.list}>
            {ADVANTAGES.map((adv) => (
              <div key={adv.title} className={styles.item}>
                <div className={`${styles.iconBox} ${styles[adv.variant]}`}>
                  {adv.icon}
                </div>
                <div>
                  <h3 className={styles.advTitle}>{adv.title}</h3>
                  <p className={styles.advDesc}>{adv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.right}>
          <Leaderboard />
        </div>
      </div>
    </section>
  );
}
