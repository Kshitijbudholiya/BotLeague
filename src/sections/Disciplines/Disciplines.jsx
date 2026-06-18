import React from "react";
import { DISCIPLINES } from "../../data/siteData";
import styles from "./Disciplines.module.css";

function DisciplineCard({ disc }) {
  return (
    <div className={styles.card}>
      <img src={disc.img} alt={disc.label} className={styles.img} />
      <div className={styles.overlay} />
      <div className={styles.label}>{disc.label}</div>
    </div>
  );
}

export default function Disciplines() {
  const row1 = DISCIPLINES.slice(0, 4);
  const row2 = DISCIPLINES.slice(4);
  return (
    <section className={styles.section} id="disciplines">
      <p className={styles.sports}>SPORTS</p>
      <h2 className={styles.title}>COMPETITION DISCIPLINES</h2>

      <div className={styles.row}>
        {row1.map((d) => (
          <DisciplineCard key={d.id} disc={d} />
        ))}
      </div>

      <div className={`${styles.row} ${styles.rowBottom}`}>
        {row2.map((d) => (
          <DisciplineCard key={d.id} disc={d} />
        ))}
      </div>
    </section>
  );
}
