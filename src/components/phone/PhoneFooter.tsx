import styles from "./PhoneFooter.module.css";

export default function PhoneFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.brandCol}>
          <div className={styles.brandName}>AETHER / 01</div>
          <p className={styles.brandTagline}>
            An uncompromising physical computing instrument engineered for calm productivity and lifelong repairability.
          </p>
        </div>

        <div className={styles.linksCol}>
          <div className={styles.linkGroup}>
            <span className={styles.groupTitle}>Architecture</span>
            <a href="#hardware" className={styles.link}>Titanium Chassis</a>
            <a href="#switch" className={styles.link}>Tactile Switch</a>
            <a href="#optics" className={styles.link}>Sapphire Optics</a>
            <a href="#specs" className={styles.link}>Tech Specs</a>
          </div>

          <div className={styles.linkGroup}>
            <span className={styles.groupTitle}>Customer Care</span>
            <a href="#configure" className={styles.link}>Batch 01 Pre-order</a>
            <a href="#configure" className={styles.link}>Global Warranty</a>
            <a href="#configure" className={styles.link}>Repair Manuals</a>
            <a href="#configure" className={styles.link}>Recycling Program</a>
          </div>

          <div className={styles.linkGroup}>
            <span className={styles.groupTitle}>Ethics</span>
            <a href="#specs" className={styles.link}>Zero Surveillance OS</a>
            <a href="#specs" className={styles.link}>Supply Chain Integrity</a>
            <a href="#specs" className={styles.link}>Right to Repair</a>
          </div>
        </div>
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.telemetryBadge}>
          SERIES 01 // 2,500 NUMBERED UNITS WORLDWIDE
        </div>
        <div>
          © {new Date().getFullYear()} Aether Hardware Labs Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
