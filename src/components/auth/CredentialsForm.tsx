"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import AuthLayout, { AuthCard } from "./AuthLayout";
import AuthField from "./AuthField";
import { passwordRules } from "./validation";
import styles from "@/app/page.module.css";
const requirements = ["At least 8 characters", "Includes uppercase and lowercase letters", "Includes a number or special character"];
export default function CredentialsForm({ mode }: { mode: "setup" | "change" }) {
  const setup = mode === "setup";
  const [username, setUsername] = useState("@Lorem123");
  const [current, setCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const rules = passwordRules(password);
  const errors = { identity: submitted && !(setup ? username.trim() : current) ? (setup ? "Please enter your username." : "Please enter your current password.") : "", password: submitted && !rules.every(Boolean) ? "Please meet all password requirements." : "", confirm: (submitted || Boolean(confirm)) && (!confirm || confirm !== password) ? "Passwords must match." : "" };
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    const identityValid = Boolean(setup ? username.trim() : current);
    if (identityValid && rules.every(Boolean) && confirm === password) setSuccess(true);
    else event.currentTarget.querySelector<HTMLInputElement>(!identityValid ? (setup ? "#setup-username" : "#current-password") : !rules.every(Boolean) ? "#new-password" : "#confirm-password")?.focus();
  }
  return <AuthLayout><AuthCard title={setup ? "Update User Credentials" : "Change Password"} subtitle={setup ? "Update your default username and password" : <>For your security, please use a strong password that<br/>you don’t use elsewhere</>}>
    {success ? <div role="status"><p className={styles.successMessage}>{setup ? "Credentials updated for this preview." : "Password updated for this preview."} No account changes have been saved.</p><p className={styles.footer}><Link className={styles.textLink} href="/">Back to Login</Link></p></div> : <form onSubmit={submit} noValidate>
      {setup ? <AuthField id="setup-username" label="Username" placeholder="@Lorem123" autoComplete="username" value={username} onChange={setUsername} error={errors.identity}/> : <AuthField id="current-password" label="Current Password" kind="password" placeholder="Enter your current password" autoComplete="current-password" value={current} onChange={setCurrent} error={errors.identity}/>}
      <AuthField id="new-password" label={setup ? "Password" : "New Password"} kind="password" placeholder={setup ? "Password" : "Enter your new password"} autoComplete="new-password" value={password} onChange={setPassword} error={errors.password} describedBy="password-requirements"/>
      <ul id="password-requirements" className={styles.requirements}>{requirements.map((text, index) => <li key={text} className={rules[index] ? styles.requirementMet : submitted ? styles.requirementError : undefined}><span aria-hidden="true">{rules[index] ? "✓" : "○"}</span> {text}<span className={styles.srOnly}>{rules[index] ? " — met" : " — not met"}</span></li>)}</ul>
      <AuthField id="confirm-password" label={setup ? "Confirm Password" : "Confirm New Password"} kind="password" placeholder={setup ? "Confirm Password" : "Re-enter your new password"} autoComplete="new-password" value={confirm} onChange={setConfirm} error={errors.confirm}/>
      <button className={styles.loginButton} type="submit">{setup ? "Update Credentials" : "Update Password"}</button>
    </form>}
  </AuthCard></AuthLayout>;
}
