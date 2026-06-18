import React from "react";
import styles from "./SectionLabel.module.css";

export default function SectionLabel({
  children,
  color = "yellow",
  className = "",
}) {
  return (
    <p className={`${styles.label} ${styles[color]} ${className}`}>
      {children}
    </p>
  );
}
