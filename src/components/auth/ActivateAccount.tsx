"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import AuthLayout, { AuthCard } from "./AuthLayout";
import AuthField from "./AuthField";
import CredentialsForm from "./CredentialsForm";
import { activationErrors } from "./validation";
import styles from "@/app/page.module.css";
export default function ActivateAccount() {
  const [employeeId, setEmployeeId] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [activated, setActivated] = useState(false);
  const errors = submitted ? activationErrors(employeeId, email) : { employeeId: "", email: "" };
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    const next = activationErrors(employeeId, email);
    if (next.employeeId || next.email) event.currentTarget.querySelector<HTMLInputElement>(next.employeeId ? "#employee-id" : "#company-email")?.focus();
    else setActivated(true);
  }
  if (activated) return <CredentialsForm mode="setup" />;
  return <AuthLayout><AuthCard title={<>Activate Your<br/>Account</>} subtitle={<>Happy to see you please enter your Employee ID<br/>and Email to Activate your account</>}>
    <form onSubmit={submit} noValidate>
      <AuthField id="employee-id" label="Employee ID" placeholder="Employee ID" value={employeeId} onChange={setEmployeeId} error={errors.employeeId}/>
      <AuthField id="company-email" label="Company Email" kind="email" autoComplete="email" placeholder="Company Email" value={email} onChange={setEmail} error={errors.email}/>
      <button className={styles.loginButton} type="submit">Activate</button>
    </form>
    <p className={styles.footer}>Already have an active account? <Link className={styles.textLink} href="/">Back to Login</Link></p>
  </AuthCard></AuthLayout>;
}
