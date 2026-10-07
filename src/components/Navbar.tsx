import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <a href="#home" className={styles.brand}>
        <div className={styles.brandLogo}>CL</div>
        <span>Charles Lising</span>
      </a>

      <nav aria-label="Main Navigation">
        <ul className={styles.navLinks}>
          <li>
            <a href="#about" className={styles.navLink}>
              About
            </a>
          </li>
          <li>
            <a href="#projects" className={styles.navLink}>
              Projects
            </a>
          </li>
          <li>
            <a href="#experience" className={styles.navLink}>
              Experience
            </a>
          </li>
          <li>
            <a href="#skills" className={styles.navLink}>
              Skills
            </a>
          </li>
          <li>
            <a href="#contact" className={styles.navLink}>
              Contact
            </a>
          </li>
        </ul>
      </nav>

      <div className={styles.navAction}>
        <a href="#contact" className={styles.contactBtn}>
          Let&apos;s Talk ↗
        </a>
      </div>
    </header>
  );
}
