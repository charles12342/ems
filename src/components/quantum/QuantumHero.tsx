import Image from "next/image";
import styles from "./QuantumHero.module.css";

export default function QuantumHero() {
  const metrics = [
    { value: "3.8M+", label: "AnTuTu V11 Benchmark" },
    { value: "200 MP", label: "Quantum AI Night Sensor" },
    { value: "144 Hz", label: "Super Curved Fluid OLED" },
    { value: "18 Mins", label: "0-100% 120W HyperCharge" },
  ];

  return (
    <section id="hero" className={styles.heroSection}>
      <div className={styles.intro}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          QUANTUM X PRO 5G // 3NM AI BIONIC MATRIX
        </div>

        <h1 className={styles.title}>
          Beyond Next Gen. <br />
          <span className={styles.titleHighlight}>Pure Quantum Velocity.</span>
        </h1>

        <p className={styles.subtitle}>
          The world&apos;s first smartphone powered by the 3nm Quantum Bionic processor, 200MP Night Sight Optical Matrix, and 120W HyperCharge architecture.
        </p>

        <div className={styles.ctaGroup}>
          <a href="#configurator" className={styles.primaryCta}>
            Pre-Order from $999 ⚡
          </a>
          <a href="#interactive-hub" className={styles.secondaryCta}>
            Explore Tech Lab ↗
          </a>
        </div>
      </div>

      <div className={styles.showcaseContainer}>
        <Image
          src="/quantum_hero.jpg"
          alt="Quantum X Pro 5G Smartphone"
          fill
          priority
          sizes="(max-width: 1100px) 100vw, 1100px"
          className={styles.heroImg}
        />

        <div className={styles.floatingChip1}>
          <span>📸</span> 200MP Quad AI Telemetry
        </div>

        <div className={styles.floatingChip2}>
          <span>⚡</span> 120W Dual-Cell HyperCharge
        </div>
      </div>

      <div className={styles.metricStrip}>
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
