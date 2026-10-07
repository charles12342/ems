import styles from "./PhoneNavbar.module.css";

export default function PhoneNavbar() {
  return (
    <header className={styles.navbar}>
      <a href="#overview" className={styles.brand}>
        <span className={styles.brandName}>AETHER / 01</span>
        <span className={styles.brandEdition}>GRADE-5 TITANIUM</span>
      </a>

      <nav aria-label="Product Navigation">
        <ul className={styles.navLinks}>
          <li>
            <a href="#hardware" className={styles.navLink}>
              Hardware
            </a>
          </li>
          <li>
            <a href="#switch" className={styles.navLink}>
              Tactile Switch
            </a>
          </li>
          <li>
            <a href="#optics" className={styles.navLink}>
              Triple Optics
            </a>
          </li>
          <li>
            <a href="#configure" className={styles.navLink}>
              Configurator
            </a>
          </li>
          <li>
            <a href="#specs" className={styles.navLink}>
              Specifications
            </a>
          </li>
        </ul>
      </nav>

      <div className={styles.reserveAction}>
        <a href="#configure" className={styles.reserveBtn}>
          Reserve Device
        </a>
      </div>
    </header>
  );
}
