"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import AuthLayout, { AuthCard } from "./AuthLayout";
import AuthField from "./AuthField";
import { activationErrors } from "./validation";
import { sendActivationEmail } from "@/lib/emailjs";
import { verifyEmployeeForActivation, activateEmployee, generateTempPassword } from "@/lib/supabase";
import styles from "@/app/page.module.css";
export default function ActivateAccount() {
  const [employeeId, setEmployeeId] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [activated, setActivated] = useState<{ username: string; email: string } | null>(null);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const errors = submitted ? activationErrors(employeeId, email) : { employeeId: "", email: "" };
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setSendError("");
    const next = activationErrors(employeeId, email);
    if (next.employeeId || next.email) { event.currentTarget.querySelector<HTMLInputElement>(next.employeeId ? "#employee-id" : "#company-email")?.focus(); return; }
    setSending(true);
    const id = employeeId.trim(), mail = email.trim();
    try {
      const check = await verifyEmployeeForActivation(id, mail);
      if (check.status === "not_found") { setSendError("Employee ID and email do not match any employee record."); return; }
      if (check.status === "already_activated") { setSendError("This account is already activated. Please log in instead."); return; }
      const tempPassword = generateTempPassword();
      // Email first: if sending fails nothing is changed and the user can simply retry.
      await sendActivationEmail({ email: mail, employeeId: id, firstName: check.first_name, username: check.username, tempPassword });
      const ok = await activateEmployee(id, mail, tempPassword);
      if (!ok) { setSendError("This account is already activated. Please log in instead."); return; }
      setActivated({ username: check.username, email: mail });
    } catch (err) {
      console.error(err);
      setSendError("Something went wrong while activating your account. Please try again.");
    } finally {
      setSending(false);
    }
  }
  if (activated) return <AuthLayout><AuthCard title={<>Account<br/>Activated!</>} subtitle={<>Your login credentials have been sent to<br/><strong>{activated.email}</strong></>}>
    <div role="status" style={{ background: "#fbf9f5", border: "1px solid #e8e2d8", borderRadius: 8, padding: "14px 16px", marginBottom: 20, fontSize: 14, lineHeight: 1.6 }}>
      <div><strong>Username:</strong> {activated.username}</div>
      <div><strong>Temporary password:</strong> check your email inbox (or Spam folder)</div>
      <div style={{ marginTop: 8, color: "#6b6b6b", fontSize: 13 }}>Please change your password after your first login.</div>
    </div>
    <Link className={styles.loginButton} href="/" style={{ display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>Go to Login</Link>
  </AuthCard></AuthLayout>;
  return <AuthLayout><AuthCard title={<>Activate Your<br/>Account</>} subtitle={<>Happy to see you please enter your Employee ID<br/>and Email to Activate your account</>}>
    <form onSubmit={submit} noValidate>
      <AuthField id="employee-id" label="Employee ID" placeholder="Employee ID" value={employeeId} onChange={setEmployeeId} error={errors.employeeId}/>
      <AuthField id="company-email" label="Company Email" kind="email" autoComplete="email" placeholder="Company Email" value={email} onChange={setEmail} error={errors.email}/>
      {sendError && <p role="alert" style={{ color: "#d93025", fontSize: 14, margin: "0 0 12px" }}>{sendError}</p>}
      <button className={styles.loginButton} type="submit" disabled={sending} aria-busy={sending}>{sending ? "Activating…" : "Activate"}</button>
    </form>
    <p className={styles.footer}>Already have an active account? <Link className={styles.textLink} href="/">Back to Login</Link></p>
  </AuthCard></AuthLayout>;
}
