import styles from "./QuantumComparison.module.css";

export default function QuantumComparison() {
  const rows = [
    {
      feature: "Processor Fabrication",
      quantum: "3nm Quantum Matrix Bionic (3.8M AnTuTu)",
      compA: "4nm Legacy Gen 3 (2.1M AnTuTu)",
      compB: "3nm A-Series (2.4M AnTuTu)",
    },
    {
      feature: "Primary Optical Sensor",
      quantum: "200 MP (1/1.12″ Sensor + 16-in-1 Fusion)",
      compA: "50 MP (1/1.3″ Sensor)",
      compB: "48 MP (1/1.28″ Sensor)",
    },
    {
      feature: "Charging Architecture",
      quantum: "120W HyperCharge (18 Mins 0-100%)",
      compA: "45W Fast Charging (65 Mins)",
      compB: "27W MagSafe (85 Mins)",
    },
    {
      feature: "Display Refresh & Brightness",
      quantum: "144 Hz LTPO 4.0 • 3,000 Nits Peak",
      compA: "120 Hz LTPO • 2,600 Nits",
      compB: "120 Hz ProMotion • 2,000 Nits",
    },
    {
      feature: "Vapor Chamber Thermal Cooling",
      quantum: "6,500 mm² Cryo-Matrix Vapor Loop",
      compA: "Standard Heat Pipe",
      compB: "Graphite Sheet Only",
    },
    {
      feature: "Starting MSRP (256GB)",
      quantum: "$999 (Charger Included in Box)",
      compA: "$1,199 (No Charger)",
      compB: "$1,199 (No Charger)",
    },
  ];

  return (
    <section id="compare" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.badge}>HEAD-TO-HEAD BENCHMARK</span>
        <h2 className={styles.title}>
          How Quantum X Pro <span className={styles.titleGlow}>Outperforms the Field</span>
        </h2>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.compTable}>
          <thead>
            <tr>
              <th className={styles.featureHead}>Specification</th>
              <th className={styles.highlightCol}>
                Quantum X Pro <span className={styles.quantumBadge}>WINNER</span>
              </th>
              <th className={styles.otherCol}>Competitor S25 Ultra</th>
              <th className={styles.otherCol}>Competitor 16 Pro Max</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.feature}>
                <td className={styles.featureHead}>{r.feature}</td>
                <td className={styles.highlightCol}>{r.quantum}</td>
                <td className={styles.otherCol}>{r.compA}</td>
                <td className={styles.otherCol}>{r.compB}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
