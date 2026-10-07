import Image from "next/image";
import styles from "./PhoneHero.module.css";

export default function PhoneHero() {
  const specs = [
    { label: "Chassis Material", value: "Grade-5 Forged Titanium" },
    { label: "Tactile Control", value: "3-Stage Knurled Switch" },
    { label: "Optical Matrix", value: "Triple Sapphire Optics" },
    { label: "Display Fidelity", value: "6.36″ 120Hz Pro-OLED" },
  ];

  return (
    <section id="overview" className={styles.heroSection}>
      <div className={styles.introBlock}>
        <span className={styles.modelStamp}>AETHER HARDWARE LABS // SERIES 01</span>
        <h1 className={styles.title}>A phone designed to be held, not consumed.</h1>
        <p className={styles.subtitle}>
          Forged grade-5 titanium unibody, mechanical three-position slider, optical triple sapphire camera system, and an operating system engineered to respect human attention.
        </p>

        <div className={styles.ctaGroup}>
          <a href="#configure" className={styles.primaryCta}>
            Reserve Aether 01
          </a>
          <a href="#switch" className={styles.secondaryCta}>
            Explore Hardware Switch
          </a>
        </div>
      </div>

      <div className={styles.productShowcase}>
        <Image
          src="/phone_hero.jpg"
          alt="Aether 01 Titanium Smartphone"
          fill
          priority
          sizes="(max-width: 1040px) 100vw, 1040px"
          className={styles.heroImage}
        />
        <div className={styles.imageOverlayDetails}>
          <div className={styles.detailTag}>FIG. 01 — 30° PROFILE ELEVATION</div>
          <div className={styles.detailTag}>INTEGRATED MECHANICAL SLIDER</div>
        </div>
      </div>

      <div className={styles.specStrip}>
        {specs.map((item) => (
          <div key={item.label} className={styles.specBlock}>
            <span className={styles.specLabel}>{item.label}</span>
            <span className={styles.specVal}>{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
