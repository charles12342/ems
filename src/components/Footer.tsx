"use client";

import styles from "./Footer.module.css";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.brandCol}>
          <div className={styles.brand}>Charles Lising</div>
          <p className={styles.brandDesc}>
            Full-Stack Software Engineer • Next.js & React Systems
          </p>
        </div>

        <ul className={styles.linksRow}>
          <li>
            <a href="#about" className={styles.link}>
              About
            </a>
          </li>
          <li>
            <a href="#projects" className={styles.link}>
              Projects
            </a>
          </li>
          <li>
            <a href="#experience" className={styles.link}>
              Experience
            </a>
          </li>
          <li>
            <a href="#skills" className={styles.link}>
              Skills
            </a>
          </li>
          <li>
            <a href="#contact" className={styles.link}>
              Contact
            </a>
          </li>
        </ul>

        <button
          className={styles.backToTop}
          onClick={scrollToTop}
          aria-label="Back to Top"
        >
          ↑ Back to Top
        </button>
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.statusIndicator}>
          <span className={styles.statusDot} />
          <span>Next.js 16 • Turbopack • Production Ready</span>
        </div>
        <div>
          © {new Date().getFullYear()} Charles Lising. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
