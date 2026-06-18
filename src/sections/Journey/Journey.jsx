import React from "react";
import { JOURNEY_STEPS } from "../../data/siteData";
import styles from "./Journey.module.css";

export default function Journey() {
  return (
    <section className={styles.section} id="journey">
      <p className={styles.label}>USER JOURNEY</p>
      <h2 className={styles.title}>YOUR PATH TO THE LEAGUE</h2>

      <p className={styles.sub}>
        5 Arenas · Grades · Prizes · Prestige · and more
      </p>

      <div className={styles.steps}>
        {JOURNEY_STEPS.map((step, i) => (
          <React.Fragment key={i}>
            <div className={styles.step}>
              <div
                className={`${styles.icon} ${step.active ? styles.iconActive : ""}`}
              >
                {step.icon}
              </div>

              <span className={styles.stepNum}>{step.num}</span>
              <p className={styles.stepLabel}>
                {step.label.split("\n").map((line, j) => (
                  <React.Fragment key={j}>
                    {line}
                    {j < step.label.split("\n").length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            </div>
            {i < JOURNEY_STEPS.length - 1 && (
              <div
                className={`${styles.connector} ${step.active ? styles.connectorActive : ""}`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
