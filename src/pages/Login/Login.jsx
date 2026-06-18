import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./AuthPages.module.css";
import { Zap, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const handle = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Check your credentials.",
      );
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
          <h1 className={styles.heading}>Welcome back</h1>
          <p className={styles.sub}>Sign in to your arena account</p>

          {error && <div className={styles.errorBanner}>{error}</div>}

          <form onSubmit={submit} className={styles.form} noValidate>
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
                autoComplete="email"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Password</label>
              <div className={styles.inputWrap}>
                <input
                  className={styles.input}
                  type={showPw ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handle}
                  required
                  autoComplete="current-password"
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

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? (
                <span className={styles.spinner} />
              ) : (
                <>
                  SIGN IN
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className={styles.switchText}>
            Don't have an account?{" "}
            <Link to="/register" className={styles.switchLink}>
              Create one
            </Link>
          </p>
        </div>
      </div>

      <div className={styles.visual}>
        <img
          src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900&q=80"
          alt="Robotics"
          className={styles.visualImg}
        />
        <div className={styles.visualOverlay} />
        <div className={styles.visualQuote}>
          <p>
            "Benchmark your skills on India's national robotics leaderboard."
          </p>
        </div>
      </div>
    </div>
  );
}
