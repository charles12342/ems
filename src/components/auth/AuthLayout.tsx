import Image from "next/image";
import type { ReactNode } from "react";
import styles from "@/app/page.module.css";
export default function AuthLayout({ children }: { children: ReactNode }) {
  return <main className={styles.page}><aside className={styles.brandPanel} aria-label="JobQuest"><div className={styles.brand}><p className={styles.brandName}><svg className={styles.brandMark} viewBox="0 0 32 32" aria-hidden="true">{Array.from({length: 7}, (_, index) => <path key={index} transform={"rotate(" + index * (360 / 7) + " 16 16)"} d="M16 16C9 15 5 9 9 3C8 10 14 8 16 16Z" fill="currentColor" />)}</svg>JobQuest</p><p className={styles.brandSubtitle}>Employee Management System</p></div><div className={styles.tagline}><p>Empower<br/>People<br/>Build<br/><span>Better Workplaces</span></p><div className={styles.accent}/></div><div className={styles.illustration}><Image src="/images/loginside.png" alt="" width={496} height={413} sizes="(max-width: 600px) 0px, 350px" preload /></div><p className={styles.brandFooter}>A smarter way to manage<br/>your team.</p></aside><section className={styles.loginArea}>{children}</section></main>;
}
export function AuthCard({ title, subtitle, children }: { title: ReactNode; subtitle: ReactNode; children: ReactNode }) {
  return <div className={styles.card}><header className={styles.cardHeader}><h1>{title}</h1><p>{subtitle}</p></header>{children}</div>;
}
