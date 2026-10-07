import styles from "./QuantumNavbar.module.css";

export default function QuantumNavbar() {
  return (
    <header className={styles.navbar}>
      <a href="#hero" className={styles.brand}>
        <div className={styles.brandLogo}>Q</div>
        <span>QUANTUM X</span>
        <span className={styles.brandBadge}>PRO 5G</span>
      </a>

      <nav aria-label="Main Navigation">
        <ul className={styles.navLinks}>
          <li>
            <a href="#features" className={styles.navLink}>
              Features
            </a>
          </li>
          <li>
            <a href="#interactive-hub" className={styles.navLink}>
              Live Tech Lab
            </a>
          </li>
          <li>
            <a href="#camera" className={styles.navLink}>
              200MP Optics
            </a>
          </li>
          <li>
            <a href="#compare" className={styles.navLink}>
              Comparison
            </a>
          </li>
          <li>
            <a href="#configurator" className={styles.navLink}>
              Buy Now
            </a>
          </li>
        </ul>
      </nav>

      <div className={styles.navActions}>
        <a href="#configurator" className={styles.orderBtn}>
          Order Now — From $999 ⚡
        </a>
      </div>
    </header>
  );
}
