import Image from "next/image";
import styles from "./HardwareOptics.module.css";

export default function HardwareOptics() {
  return (
    <section id="optics" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.sectionLabel}>OPTICS & MATERIALS</span>
        <h2 className={styles.sectionTitle}>Precision Optical Engineering</h2>
        <p className={styles.sectionDesc}>
          Every element is cut from solid crystal sapphire and forged titanium. No plastic bezels, no artificial image smearing.
        </p>
      </div>

      <div className={styles.featureGrid}>
        <article className={styles.mediaCard}>
          <div className={styles.imageFrame}>
            <Image
              src="/phone_lens.jpg"
              alt="Triple Sapphire Lens Assembly Detail"
              fill
              sizes="(max-width: 860px) 100vw, 50vw"
              className={styles.cardImg}
            />
          </div>
          <div className={styles.cardBody}>
            <span className={styles.cardCategory}>OPTICAL MATRIX</span>
            <h3 className={styles.cardTitle}>Triple Sapphire Optical Engine</h3>
            <p className={styles.cardText}>
              Three mechanical prime lenses housed in individual knurled rings. Delivers pure physical depth of field, authentic focal compression, and true 14-bit RAW color depth without algorithm distortion.
            </p>

            <div className={styles.specsList}>
              <div className={styles.specRow}>
                <span className={styles.specName}>Wide Optical Sensor</span>
                <span className={styles.specValue}>24mm • f/1.4 Aperture • 50MP</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specName}>Portrait Prime</span>
                <span className={styles.specValue}>50mm • f/1.4 Aperture • 50MP</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specName}>Periscope Telephoto</span>
                <span className={styles.specValue}>120mm • f/2.8 Aperture • 50MP</span>
              </div>
            </div>
          </div>
        </article>

        <article className={styles.mediaCard}>
          <div className={styles.imageFrame}>
            <Image
              src="/phone_display.jpg"
              alt="Distraction-Free OLED Monochrome Interface"
              fill
              sizes="(max-width: 860px) 100vw, 50vw"
              className={styles.cardImg}
            />
          </div>
          <div className={styles.cardBody}>
            <span className={styles.cardCategory}>CALM INTERACTION</span>
            <h3 className={styles.cardTitle}>Distraction-Free Typography OS</h3>
            <p className={styles.cardText}>
              Built on our custom microkernel OS. Features zero algorithmic engagement hooks, zero app store surveillance trackers, and an architectural type hierarchy that puts your thoughts first.
            </p>

            <div className={styles.specsList}>
              <div className={styles.specRow}>
                <span className={styles.specName}>Panel Technology</span>
                <span className={styles.specValue}>Custom 6.36″ LTPO 3.0 Pro-OLED</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specName}>Dynamic Refresh</span>
                <span className={styles.specValue}>1Hz to 120Hz Ultra-Low Power</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specName}>Peak Luminance</span>
                <span className={styles.specValue}>2,600 Nits Outdoor Sunlight</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
