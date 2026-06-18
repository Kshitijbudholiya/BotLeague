import React, { useState } from "react";
import { ecosystemAPI } from "../../services/api";
import styles from "./Ecosystem.module.css";

const ROLES = [
  { id: "judge", label: "BECOME A JUDGE" },
  { id: "volunteer", label: "VOLUNTEER" },
  { id: "community", label: "COMMUNITY MEMBER" },
];

function SignupCard({ role }) {
  const [form, setForm] = useState({ name: "", location: "", email: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handle = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim())
      return setError("Name and email are required.");
    setLoading(true);

    try {
      await ecosystemAPI.signup({ ...form, role: role.id });
      setSubmitted(true);
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={styles.card}>
        <div className={styles.cardTitle}>{role.label}</div>
        <div className={styles.success}>
          <span className={styles.successIcon}>✓</span>
          <p>You're in! We'll reach out soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>{role.label}</div>
      {error && <div className={styles.errMsg}>{error}</div>}

      <form onSubmit={submit} className={styles.form} noValidate>
        <input
          className={styles.input}
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handle}
        />
        <input
          className={styles.input}
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handle}
        />
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handle}
        />
        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? <span className={styles.spinner} /> : "SIGN UP"}
        </button>
      </form>
    </div>
  );
}

export default function Ecosystem() {
  return (
    <section className={styles.section} id="ecosystem">
      <h2 className={styles.title}>JOIN THE ECOSYSTEM</h2>
      <div className={styles.grid}>
        {ROLES.map((role) => (
          <SignupCard key={role.id} role={role} />
        ))}
      </div>
    </section>
  );
}
