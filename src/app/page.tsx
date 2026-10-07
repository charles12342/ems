"use client";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import { useState, type FormEvent } from "react";
import styles from "./page.module.css";
export default function LoginPage() {
 const [username,setUsername]=useState("");
 const [password,setPassword]=useState("");
 const [visible,setVisible]=useState(false);
 const [remember,setRemember]=useState(false);
 const [submitted,setSubmitted]=useState(false);
 // Set true to preview the invalid-login variation. No authentication is simulated.
 const [loginFailed,setLoginFailed]=useState(false);
 const [notice,setNotice]=useState("");
 const userError=loginFailed || (submitted && !username.trim());
 const passwordError=loginFailed || (submitted && !password);
 function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); setSubmitted(true); setNotice(""); if (!username.trim() || !password) { e.currentTarget.querySelector<HTMLInputElement>(!username.trim() ? "#username" : "#password")?.focus(); } else { setNotice("Your fields are complete. Login is not connected yet."); } }
 return <AuthLayout><div className={styles.card}><header className={styles.cardHeader}><h1 id="login-heading">Welcome Back!</h1><p>Stay updated on your professional world</p></header>
 <form onSubmit={submit} noValidate>{loginFailed && <div className={styles.alert} role="alert"><strong>Login failed.</strong><p>Please check your Username and Password and try again</p></div>}
 <div className={styles.field}><label htmlFor="username">Username</label><div className={styles.inputWrap}><svg className={styles.inputIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/></svg><input id="username" name="username" autoComplete="username" placeholder="@Lorem1" required value={username} aria-invalid={userError} aria-describedby={userError ? "username-error" : undefined} onChange={e=>{setUsername(e.target.value);setLoginFailed(false);setNotice("");}}/></div>{userError && <p id="username-error" className={styles.error}>{loginFailed ? "Please check your username." : "Please enter your username."}</p>}</div>
 <div className={styles.field}><label htmlFor="password">Password</label><div className={styles.inputWrap}><svg className={styles.inputIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 15v2"/></svg><input id="password" name="password" autoComplete="current-password" type={visible ? "text" : "password"} placeholder="Password" required value={password} aria-invalid={passwordError} aria-describedby={passwordError ? "password-error" : undefined} onChange={e=>{setPassword(e.target.value);setLoginFailed(false);setNotice("");}}/><button className={styles.eyeButton} type="button" aria-label={visible ? "Hide password" : "Show password"} aria-pressed={visible} aria-controls="password" onClick={()=>setVisible(!visible)}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>{!visible && <path d="m3 3 18 18"/>}</svg></button></div>{passwordError && <p id="password-error" className={styles.error}>{loginFailed ? "Please check your password." : "Please enter your password."}</p>}</div>
 <div className={styles.options}><label className={styles.remember}><input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)}/>Remember me</label><button type="button" className={styles.textLink} onClick={()=>setNotice("Password recovery is not available yet.")}>Forgot Password?</button></div><button type="submit" className={styles.loginButton}>Login</button><p role="status" className={styles.notice}>{notice}</p></form><div className={styles.divider} aria-hidden="true"><span>or</span></div><p className={styles.footer}>Don’t have an account? <Link href="/activate-account" className={styles.textLink}>Go to activate your account</Link></p></div></AuthLayout>;
}
