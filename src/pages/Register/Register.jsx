import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./AuthPages.module.css";
import { Zap, Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    teamName: "",
    city: "",
    role: "member",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [step, setStep] = useState(1);

  const handle = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const nextStep = (e) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) return setError("Full name is required.");
    if (!form.email.trim()) return setError("Email is required.");
    if (form.password.length < 6)
      return setError("Password must be at least 6 characters.");
    if (form.password !== form.confirmPassword)
      return setError("Passwords do not match.");
    setStep(2);
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        teamName: form.teamName,
        city: form.city,
        role: form.role,
      });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.panel}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>
            <Zap size={28} />
          </span>

          <span>
            <span className={styles.logoRed}>BOT</span>LEAGUE
          </span>
        </Link>

        <div className={styles.card}>
          <h1 className={styles.heading}>Join the Arena</h1>
          <p className={styles.sub}>Create your BotLeague account</p>

          <div className={styles.steps}>
            <div
              className={`${styles.stepDot} ${step >= 1 ? styles.stepActive : ""}`}
            >
              1
            </div>

            <div
              className={`${styles.stepLine} ${step >= 2 ? styles.stepLineActive : ""}`}
            />

            <div
              className={`${styles.stepDot} ${step >= 2 ? styles.stepActive : ""}`}
            >
              2
            </div>
          </div>
          <div className={styles.stepLabels}>
            <span>Account</span>
            <span>Profile</span>
          </div>

          {error && <div className={styles.errorBanner}>{error}</div>}

          {step === 1 && (
            <form onSubmit={nextStep} className={styles.form} noValidate>
              <div className={styles.field}>
                <label className={styles.label}>Full Name</label>
                <input
                  className={styles.input}
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handle}
                  required
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Email</label>
                <input
                  className={styles.input}
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handle}
                  required
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Password</label>
                <div className={styles.inputWrap}>
                  <input
                    className={styles.input}
                    type={showPw ? "text" : "password"}
                    name="password"
                    placeholder="Min 6 characters"
                    value={form.password}
                    onChange={handle}
                    required
                  />

                  <button
                    type="button"
                    className={styles.eyeBtn}
                    onClick={() => setShowPw((p) => !p)}
                    tabIndex={-1}
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Confirm Password</label>
                <input
                  className={styles.input}
                  type="password"
                  name="confirmPassword"
                  placeholder="Repeat password"
                  value={form.confirmPassword}
                  onChange={handle}
                  required
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                CONTINUE
                <ArrowRight size={18} />
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={submit} className={styles.form} noValidate>
              <div className={styles.field}>
                <label className={styles.label}>
                  Team Name <span className={styles.optional}>(optional)</span>
                </label>
                <input
                  className={styles.input}
                  type="text"
                  name="teamName"
                  placeholder="Your robot team"
                  value={form.teamName}
                  onChange={handle}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>
                  City <span className={styles.optional}>(optional)</span>
                </label>
                <input
                  className={styles.input}
                  type="text"
                  name="city"
                  placeholder="Mumbai, Delhi…"
                  value={form.city}
                  onChange={handle}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>I want to join as</label>
                <select
                  className={`${styles.input} ${styles.select}`}
                  name="role"
                  value={form.role}
                  onChange={handle}
                >
                  <option value="member">Community Member</option>
                  <option value="judge">Judge</option>
                  <option value="volunteer">Volunteer</option>
                </select>
              </div>

              <div className={styles.btnRow}>
                <button
                  type="button"
                  className={styles.backBtn}
                  onClick={() => setStep(1)}
                >
                  <ArrowLeft size={18} />
                  BACK
                </button>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={loading}
                >
                  {loading ? (
                    <span className={styles.spinner} />
                  ) : (
                    <>
                      CREATE ACCOUNT
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          <p className={styles.switchText}>
            Already have an account?{" "}
            <Link to="/login" className={styles.switchLink}>
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <div className={styles.visual}>
        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80"
          alt="Circuit board"
          className={styles.visualImg}
        />
        <div className={styles.visualOverlay} />
        <div className={styles.visualQuote}>
          <p>"Your professional robotics legacy — tracked and verified."</p>
        </div>
      </div>
    </div>
  );
}
