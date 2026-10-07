import Image from "next/image";
import styles from "./ProductGallery.module.css";

export default function ProductGallery() {
  return (
    <section id="camera" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.badge}>CUTTING-EDGE HARDWARE</span>
        <h2 className={styles.title}>
          Engineered to <span className={styles.titleGlow}>Dominate Every Category</span>
        </h2>
        <p className={styles.subtitle}>
          From next-generation computational optics to cryogenic vapor chamber cooling, Quantum X Pro sets the gold standard.
        </p>
      </div>

      <div className={styles.galleryGrid}>
        <article className={styles.showcaseCard}>
          <div className={styles.imageBox}>
            <Image
              src="/quantum_camera.jpg"
              alt="200MP Quad AI Camera Matrix"
              fill
              sizes="(max-width: 860px) 100vw, 50vw"
              className={styles.cardImg}
            />
          </div>
          <div className={styles.cardBody}>
            <span className={styles.cardCategory}>OPTICAL SUPREMACY</span>
            <h3 className={styles.cardTitle}>200MP Quad AI Matrix with Laser Radar</h3>
            <p className={styles.cardDesc}>
              A colossal 1/1.12-inch primary sensor backed by dual optical image stabilization (OIS), 100x Space Zoom, and real-time AI semantic segmentation.
            </p>
            <div className={styles.featureTagList}>
              <span className={styles.tag}>200MP Wide (f/1.4)</span>
              <span className={styles.tag}>50MP Periscope (5x Optical)</span>
              <span className={styles.tag}>50MP Ultra-Wide 122°</span>
              <span className={styles.tag}>8K 60FPS Dolby Vision</span>
            </div>
          </div>
        </article>

        <article className={styles.showcaseCard}>
          <div className={styles.imageBox}>
            <Image
              src="/quantum_chip.jpg"
              alt="3nm Quantum Neural Processor"
              fill
              sizes="(max-width: 860px) 100vw, 50vw"
              className={styles.cardImg}
            />
          </div>
          <div className={styles.cardBody}>
            <span className={styles.cardCategory}>SILICON DOMINANCE</span>
            <h3 className={styles.cardTitle}>3nm Quantum Bionic Architecture</h3>
            <p className={styles.cardDesc}>
              Built on TSMC’s latest 3-nanometer fabrication. Boasts an 8-core CPU, 16-core Neural Engine, and hardware-accelerated ray tracing with zero thermal throttling.
            </p>
            <div className={styles.featureTagList}>
              <span className={styles.tag}>3.84M+ AnTuTu Score</span>
              <span className={styles.tag}>95 TOPS AI Engine</span>
              <span className={styles.tag}>144 FPS Ray Tracing</span>
              <span className={styles.tag}>Cryo-Vapor Chamber</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
