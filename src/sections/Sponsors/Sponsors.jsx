import React from "react";
import { SPONSORS } from "../../data/siteData";
import styles from "./Sponsors.module.css";

export default function Sponsors() {
  return (
    <section className={styles.section}>
      <h3 className={styles.title}>SPONSORS</h3>
      
      <div className={styles.row}>
        {SPONSORS.map((s, i) => (
          <div key={i} className={styles.item}>
            <div className={styles.logo}>{s.icon}</div>
            <span className={styles.name}>{s.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
