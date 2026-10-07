import styles from "./TechSpecs.module.css";

interface SpecCategory {
  title: string;
  specs: { key: string; val: string }[];
}

export default function TechSpecs() {
  const categories: SpecCategory[] = [
    {
      title: "Chassis & Physical Architecture",
      specs: [
        { key: "Frame Construction", val: "Grade-5 (Ti-6Al-4V) Monolithic Forged Titanium" },
        { key: "Rear Enclosure", val: "Micro-textured Matte Technical Ceramic" },
        { key: "Dimensions", val: "148.6 mm × 71.2 mm × 7.85 mm" },
        { key: "Mass / Weight", val: "186 grams balanced center of inertia" },
        { key: "Mechanical Control", val: "3-position physical knurled slider switch" },
        { key: "Ingress Rating", val: "IP68 (6 meters depth for 30 minutes)" },
      ],
    },
    {
      title: "Display & Optical Cover",
      specs: [
        { key: "Display Panel", val: "6.36″ LTPO 3.0 Pro-OLED (1 to 120Hz dynamic)" },
        { key: "Resolution", val: "2778 × 1284 px at 460 ppi" },
        { key: "Peak Brightness", val: "2,600 nits outdoor sunlight mode" },
        { key: "Cover Crystal", val: "Mohs hardness 9 synthetic sapphire crystal" },
        { key: "Display Modes", val: "Full RGB, 1-bit Monochrome, Low-power E-Ink Emulation" },
      ],
    },
    {
      title: "Optics & Sensor Pipeline",
      specs: [
        { key: "Main Camera", val: "50 MP 1.0″-equivalent sensor • 24mm f/1.4 aperture" },
        { key: "Portrait Prime", val: "50 MP • 50mm f/1.4 mechanical ring aperture" },
        { key: "Telephoto Periscope", val: "50 MP • 120mm f/2.8 optical glass periscope" },
        { key: "Lens Coating", val: "Nano-structure anti-reflective sapphire" },
        { key: "Raw Capture", val: "True 14-bit DNG uncompressed color telemetry" },
      ],
    },
    {
      title: "Silicon & Battery Architecture",
      specs: [
        { key: "Processing Unit", val: "Aether Matrix-8 3nm 8-core CPU + 16-core NPU" },
        { key: "Memory Subsystem", val: "16 GB LPDDR5X unified memory" },
        { key: "Internal Storage", val: "256 GB / 512 GB / 1 TB UFS 4.0 storage" },
        { key: "Battery Cell", val: "4,850 mAh high-density silicon-anode cell" },
        { key: "Fast Charging", val: "65W Wired USB-PD 3.1 • 30W Magnetic Wireless" },
      ],
    },
  ];

  return (
    <section id="specs" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.sectionLabel}>TECHNICAL DATA SHEET</span>
        <h2 className={styles.sectionTitle}>Full Engineering Specifications</h2>
      </div>

      <div className={styles.specsGrid}>
        {categories.map((cat) => (
          <div key={cat.title} className={styles.categoryCard}>
            <h3 className={styles.categoryTitle}>{cat.title}</h3>
            <div className={styles.specTable}>
              {cat.specs.map((item) => (
                <div key={item.key} className={styles.specRow}>
                  <span className={styles.specKey}>{item.key}</span>
                  <span className={styles.specVal}>{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
