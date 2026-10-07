import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  const metrics = [
    { value: "5+ Years", label: "Professional Experience" },
    { value: "30+", label: "Completed Projects" },
    { value: "99.98%", label: "Deployment Reliability" },
    { value: "100ms", label: "P99 Target Latency" },
  ];

  return (
    <section id="home" className={styles.heroSection}>
      <div className={styles.heroContent}>
        <div className={styles.leftCol}>
          <div className={styles.availabilityBadge}>
            <span className={styles.pulseDot} />
            Available for Q4/2026 Engineering Roles
          </div>

          <h1 className={styles.title}>
            Architecting <span className={styles.gradientHighlight}>Modern Web</span> Systems & Fluid Interfaces
          </h1>

          <p className={styles.subtitle}>
            Hi, I’m <strong>Charles Lising</strong> — a Full-Stack Engineer specializing in Next.js 16, React 19, TypeScript, and high-throughput cloud services. I engineer scalable web products with obsessively crafted UI and zero performance compromise.
          </p>

          <div className={styles.ctaGroup}>
            <a href="#projects" className={styles.primaryBtn}>
              Explore Featured Work ↓
            </a>
            <a href="#contact" className={styles.secondaryBtn}>
              Contact Me ✉
            </a>
          </div>
        </div>

        <div className={styles.avatarCard}>
          <div className={styles.avatarGlow} />
          <div className={styles.avatarFrame}>
            <Image
              src="/avatar.jpg"
              alt="Charles Lising"
              width={320}
              height={320}
              className={styles.avatarImg}
              priority
            />
          </div>
          <div className={styles.avatarFloatBadge}>
            <span>🚀</span> Next.js 16 Full-Stack
          </div>
        </div>
      </div>

      <div className={styles.metricsGrid}>
        {metrics.map((m) => (
          <div key={m.label} className={styles.metricItem}>
            <span className={styles.metricValue}>{m.value}</span>
            <span className={styles.metricLabel}>{m.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
