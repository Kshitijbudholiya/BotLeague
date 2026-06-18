import React from "react";
import { CATEGORIES } from "../../data/siteData";
import styles from "./Categories.module.css";
import { ArrowRight } from "lucide-react";

export default function Categories() {
  return (
    <section className={styles.section} id="categories">
      <h2 className={styles.title}>CATEGORIES</h2>

      <div className={styles.grid}>
        {CATEGORIES.map((cat) => (
          <div key={cat.title} className={styles.card}>
            <div className={`${styles.iconWrap} ${styles[cat.iconBg]}`}>
              <span className={styles.icon}>{cat.icon}</span>
            </div>

            <h3 className={styles.catTitle}>{cat.title}</h3>

            {cat.sub && <p className={styles.catSub}>{cat.sub}</p>}

            <p className={styles.catDesc}>{cat.desc}</p>
            <button className={styles.learnMore}>
              LEARN MORE 
              <ArrowRight fontSize={18}/>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
