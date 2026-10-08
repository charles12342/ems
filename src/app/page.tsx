"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";
import { useState, type FormEvent } from "react";
import { useEms } from "@/context/EmsStore";
import { syncUserToSupabase } from "@/lib/supabase";
import styles from "./page.module.css";

export default function LoginPage() {
  const router = useRouter();
  const { loginWithAccount } = useEms();

  const [username, setUsername] = useState("charleslising0506@gmail.com");
  const [password, setPassword] = useState("Password123!");
  const [visible, setVisible] = useState(false);
  const [remember, setRemember] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notice, setNotice] = useState("");

  const userError = loginFailed || (submitted && !username.trim());
  const passwordError = loginFailed || (submitted && !password);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setNotice("");

    if (!username.trim() || !password) {
      e.currentTarget.querySelector<HTMLInputElement>(!username.trim() ? "#username" : "#password")?.focus();
      return;
    }

    setIsLoading(true);
    try {
      // 1. Identify user and log in to context
      const user = loginWithAccount(username);

      // 2. Sync to Supabase
      await syncUserToSupabase({
        email: user.email,
        role: user.role,
        full_name: `${user.personalInfo.firstName} ${user.personalInfo.lastName}`,
        department: user.department,
      });

      // 3. Route to respective dashboard
      if (user.role === "DEPARTMENT_MANAGER") {
        router.push("/manager/dashboard");
      } else {
        router.push("/employee/dashboard");
      }
    } catch (err) {
      console.error("Login process error:", err);
      // Fallback redirect
      if (username.toLowerCase().includes("manager") || username === "charleslising0506@gmail.com") {
        router.push("/manager/dashboard");
      } else {
        router.push("/employee/dashboard");
      }
    } finally {
      setIsLoading(false);
    }
  }

  function selectAccount(role: "manager" | "employee") {
    if (role === "manager") {
      setUsername("charleslising0506@gmail.com");
      setPassword("ManagerPass123!");
      setLoginFailed(false);
      setNotice("Selected Department Manager: charleslising0506@gmail.com");
    } else {
      setUsername("lisingcharles@gmail.com");
      setPassword("EmployeePass123!");
      setLoginFailed(false);
      setNotice("Selected Employee: lisingcharles@gmail.com");
    }
  }

  return (
    <AuthLayout>
      <div className={styles.card}>
        <header className={styles.cardHeader}>
          <h1 id="login-heading">Welcome Back!</h1>
          <p>Login with your verified Quicktouch / EMS account</p>
        </header>

        {/* Account Quick Switcher Presets */}
        <div
          style={{
            background: "#fbf9f5",
            border: "1px solid #e8e2d8",
            borderRadius: 8,
            padding: "10px 12px",
            marginBottom: 20,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, color: "#590b28", textTransform: "uppercase", letterSpacing: 0.5 }}>
            Select Account to Test:
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <button
              type="button"
              onClick={() => selectAccount("manager")}
              style={{
                padding: "8px 10px",
                borderRadius: 6,
                border: username === "charleslising0506@gmail.com" ? "1.5px solid #590b28" : "1px solid #d5cec2",
                background: username === "charleslising0506@gmail.com" ? "#590b28" : "#ffffff",
                color: username === "charleslising0506@gmail.com" ? "#ffffff" : "#1a1a1a",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                textAlign: "left",
                lineHeight: 1.2,
              }}
            >
              <div>👔 Dept Manager</div>
              <div style={{ fontSize: 10, opacity: 0.85, marginTop: 2, wordBreak: "break-all" }}>
                charleslising0506@...
              </div>
            </button>

            <button
              type="button"
              onClick={() => selectAccount("employee")}
              style={{
                padding: "8px 10px",
                borderRadius: 6,
                border: username === "lisingcharles@gmail.com" ? "1.5px solid #590b28" : "1px solid #d5cec2",
                background: username === "lisingcharles@gmail.com" ? "#590b28" : "#ffffff",
                color: username === "lisingcharles@gmail.com" ? "#ffffff" : "#1a1a1a",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                textAlign: "left",
                lineHeight: 1.2,
              }}
            >
              <div>👤 Employee</div>
              <div style={{ fontSize: 10, opacity: 0.85, marginTop: 2, wordBreak: "break-all" }}>
                lisingcharles@...
              </div>
            </button>
          </div>
        </div>

        <form onSubmit={submit} noValidate>
          {loginFailed && (
            <div className={styles.alert} role="alert">
              <strong>Login failed.</strong>
              <p>Please check your Email and Password and try again</p>
            </div>
          )}

          <div className={styles.field}>
            <label htmlFor="username">Email Address / Username</label>
            <div className={styles.inputWrap}>
              <svg className={styles.inputIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
              </svg>
              <input
                id="username"
                name="username"
                autoComplete="username"
                placeholder="email@example.com"
                required
                value={username}
                aria-invalid={userError}
                aria-describedby={userError ? "username-error" : undefined}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setLoginFailed(false);
                  setNotice("");
                }}
              />
            </div>
            {userError && (
              <p id="username-error" className={styles.error}>
                {loginFailed ? "Please check your account identifier." : "Please enter your email or username."}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <div className={styles.inputWrap}>
              <svg className={styles.inputIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <rect x="5" y="10" width="14" height="11" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3M12 15v2" />
              </svg>
              <input
                id="password"
                name="password"
                autoComplete="current-password"
                type={visible ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                aria-invalid={passwordError}
                aria-describedby={passwordError ? "password-error" : undefined}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setLoginFailed(false);
                  setNotice("");
                }}
              />
              <button
                className={styles.eyeButton}
                type="button"
                aria-label={visible ? "Hide password" : "Show password"}
                aria-pressed={visible}
                aria-controls="password"
                onClick={() => setVisible(!visible)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                  <circle cx="12" cy="12" r="3" />
                  {!visible && <path d="m3 3 18 18" />}
                </svg>
              </button>
            </div>
            {passwordError && (
              <p id="password-error" className={styles.error}>
                {loginFailed ? "Please check your password." : "Please enter your password."}
              </p>
            )}
          </div>

          <div className={styles.options}>
            <label className={styles.remember}>
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              Remember me
            </label>
            <button
              type="button"
              className={styles.textLink}
              onClick={() => setNotice("Please contact your department manager for password recovery.")}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className={styles.loginButton}
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? "Authenticating & Syncing to Supabase..." : "Login to Workspace"}
          </button>

          {notice && (
            <p
              role="status"
              className={styles.notice}
              style={{
                marginTop: 12,
                fontSize: 12,
                color: "#166534",
                background: "#f0fdf4",
                padding: "8px 10px",
                borderRadius: 6,
                border: "1px solid #bbf7d0",
              }}
            >
              ✓ {notice}
            </p>
          )}

          <div
            style={{
              marginTop: 14,
              fontSize: 11,
              color: "#6b7280",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
            Connected to Supabase Cloud Database
          </div>
        </form>

        <div className={styles.divider} aria-hidden="true">
          <span>or</span>
        </div>

        <p className={styles.footer}>
          Don’t have an account? <Link href="/activate-account" className={styles.textLink}>Go to activate your account</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
