"use client";
import { useState } from "react";
import styles from "@/app/page.module.css";

type Props = { id: string; label: string; value: string; onChange: (value: string) => void; placeholder?: string; error?: string; kind?: "text" | "email" | "password"; autoComplete?: string; describedBy?: string };
export default function AuthField({ id, label, value, onChange, placeholder, error, kind = "text", autoComplete, describedBy }: Props) {
  const [visible, setVisible] = useState(false);
  return <div className={styles.field}>
    <label htmlFor={id}>{label}</label>
    <div className={styles.inputWrap}>
      <svg className={styles.inputIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        {kind === "password" ? <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 15v2"/></> : kind === "email" ? <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></> : <><circle cx="12" cy="8" r="4"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/></>}
      </svg>
      <input id={id} name={id} required type={kind === "password" && visible ? "text" : kind} value={value} onChange={event => onChange(event.target.value)} placeholder={placeholder} autoComplete={autoComplete} aria-invalid={Boolean(error)} aria-describedby={[error ? id + "-error" : "", describedBy].filter(Boolean).join(" ") || undefined}/>
      {kind === "password" && <button type="button" className={styles.eyeButton} aria-label={(visible ? "Hide " : "Show ") + label.toLowerCase()} aria-pressed={visible} aria-controls={id} onClick={() => setVisible(!visible)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>{!visible && <path d="m3 3 18 18"/>}</svg></button>}
    </div>
    {error && <p id={id + "-error"} className={styles.error}>{error}</p>}
  </div>;
}
