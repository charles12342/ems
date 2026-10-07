"use client";

import { useState, useEffect } from "react";
import styles from "./InteractiveFeatureHub.module.css";

type TabType = "charge" | "processor" | "camera" | "display";

export default function InteractiveFeatureHub() {
  const [activeTab, setActiveTab] = useState<TabType>("charge");

  // Lab 1: Charging simulation state
  const [battery, setBattery] = useState(24);
  const [isCharging, setIsCharging] = useState(false);
  const chargeSpeed = 120;

  // Lab 2: Processor Overclock state
  const [clockGhz, setClockGhz] = useState(3.6);

  // Lab 4: Refresh rate state
  const [refreshRate, setRefreshRate] = useState<60 | 120 | 144>(144);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCharging && battery < 100) {
      interval = setInterval(() => {
        setBattery((prev) => {
          if (prev >= 100) {
            setIsCharging(false);
            return 100;
          }
          return prev + 4;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isCharging, battery]);

  const startCharging = () => {
    if (battery >= 100) setBattery(15);
    setIsCharging(true);
  };

  const calculatedFps = Math.round(clockGhz * 36);
  const calculatedTops = Math.round(clockGhz * 22);

  return (
    <section id="interactive-hub" className={styles.section}>
      <div className={styles.header}>
        <div className={styles.badge}>
          <span>⚡</span> QUANTUM INTERACTIVE TECH LAB
        </div>
        <h2 className={styles.title}>
          Test the Technology <span className={styles.titleGlow}>In Real Time</span>
        </h2>
        <p className={styles.subtitle}>
          Engage with live simulators for our 120W HyperCharge, 3nm Bionic Overclocking, 200MP Night Optics, and 144Hz Display.
        </p>
      </div>

      <div className={styles.labContainer}>
        <div className={styles.tabBar} role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === "charge"}
            className={`${styles.tabBtn} ${activeTab === "charge" ? styles.tabBtnActive : ""}`}
            onClick={() => setActiveTab("charge")}
          >
            <span>⚡</span> 120W HyperCharge Lab
          </button>
          <button
            role="tab"
            aria-selected={activeTab === "processor"}
            className={`${styles.tabBtn} ${activeTab === "processor" ? styles.tabBtnActive : ""}`}
            onClick={() => setActiveTab("processor")}
          >
            <span>🧠</span> 3nm Quantum Processor
          </button>
          <button
            role="tab"
            aria-selected={activeTab === "camera"}
            className={`${styles.tabBtn} ${activeTab === "camera" ? styles.tabBtnActive : ""}`}
            onClick={() => setActiveTab("camera")}
          >
            <span>📸</span> 200MP Night Sight AI
          </button>
          <button
            role="tab"
            aria-selected={activeTab === "display"}
            className={`${styles.tabBtn} ${activeTab === "display" ? styles.tabBtnActive : ""}`}
            onClick={() => setActiveTab("display")}
          >
            <span>✨</span> 144Hz OLED Motion
          </button>
        </div>

        <div className={styles.labContent}>
          {activeTab === "charge" && (
            <div className={styles.chargeLab}>
              <div className={styles.chargeVisual}>
                <div className={styles.batteryMeter}>{battery}%</div>
                <div className={styles.chargeStatusText}>
                  {isCharging ? "⚡ 120W HyperCharge Active (Super Fast)" : battery === 100 ? "✓ Battery 100% Fully Charged" : "○ Charger Ready"}
                </div>
                <div className={styles.chargeBarTrack}>
                  <div className={styles.chargeBarFill} style={{ width: `${battery}%` }} />
                </div>
              </div>

              <div className={styles.chargeControls}>
                <h3 className={styles.chargeTitle}>0 to 100% in Just 18 Minutes</h3>
                <p className={styles.chargeDesc}>
                  Dual-charge pumps with GaN V-Series cooling architecture deliver sustained 120-watt power while keeping cell temperatures below 37°C.
                </p>

                <div className={styles.chargeStatsGrid}>
                  <div className={styles.chargeStatCard}>
                    <span className={styles.chargeStatNum}>{chargeSpeed}W</span>
                    <span className={styles.chargeStatLabel}>Max Input Wattage</span>
                  </div>
                  <div className={styles.chargeStatCard}>
                    <span className={styles.chargeStatNum}>5,400 mAh</span>
                    <span className={styles.chargeStatLabel}>Dual-Cell Silicon Anode</span>
                  </div>
                </div>

                <button
                  className={styles.actionButton}
                  onClick={startCharging}
                  type="button"
                >
                  {isCharging ? "Charging in Progress..." : battery === 100 ? "Reset & Re-Charge ⚡" : "Start 120W Rapid Charge ⚡"}
                </button>
              </div>
            </div>
          )}

          {activeTab === "processor" && (
            <div className={styles.chipLab}>
              <div className={styles.sliderBox}>
                <div className={styles.sliderRow}>
                  <span>CPU Turbo Frequency:</span>
                  <span style={{ color: "var(--accent-cyan)" }}>{clockGhz.toFixed(1)} GHz</span>
                </div>
                <input
                  type="range"
                  min="2.4"
                  max="4.4"
                  step="0.1"
                  value={clockGhz}
                  onChange={(e) => setClockGhz(parseFloat(e.target.value))}
                  className={styles.rangeInput}
                  aria-label="Processor Clock Frequency"
                />

                <div className={styles.chargeStatsGrid}>
                  <div className={styles.chargeStatCard}>
                    <span className={styles.chargeStatNum}>{calculatedFps} FPS</span>
                    <span className={styles.chargeStatLabel}>Genshin 4K Ultra Raytracing</span>
                  </div>
                  <div className={styles.chargeStatCard}>
                    <span className={styles.chargeStatNum}>{calculatedTops} TOPS</span>
                    <span className={styles.chargeStatLabel}>Neural Engine Throughput</span>
                  </div>
                </div>
              </div>

              <div className={styles.chargeControls}>
                <h3 className={styles.chargeTitle}>3nm Quantum Matrix Bionic</h3>
                <p className={styles.chargeDesc}>
                  8 High-Performance cores, 16 Neural Engine clusters, and Hardware-Accelerated Ray Tracing. Experience PC-grade performance directly in the palm of your hand.
                </p>

                <div className={styles.chargeStatsGrid}>
                  <div className={styles.chargeStatCard}>
                    <span className={styles.chargeStatNum}>3.84M+</span>
                    <span className={styles.chargeStatLabel}>AnTuTu Benchmark Record</span>
                  </div>
                  <div className={styles.chargeStatCard}>
                    <span className={styles.chargeStatNum}>34.2°C</span>
                    <span className={styles.chargeStatLabel}>Vapor Chamber Chilled Peak</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "camera" && (
            <div className={styles.chargeLab}>
              <div className={styles.chargeVisual}>
                <div style={{ fontSize: "3rem", fontWeight: "900", color: "#ec4899" }}>
                  200 MP
                </div>
                <p style={{ color: "#fff", fontWeight: "600", textAlign: "center" }}>
                  1/1.12″ Ultra Sensor • Optical 16-in-1 Pixel Fusion
                </p>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <span style={{ background: "rgba(236,72,153,0.2)", color: "#f472b6", padding: "0.3rem 0.8rem", borderRadius: "8px", fontSize: "0.8rem", fontWeight: "700" }}>
                    Night Sight 3.0
                  </span>
                  <span style={{ background: "rgba(6,182,212,0.2)", color: "#22d3ee", padding: "0.3rem 0.8rem", borderRadius: "8px", fontSize: "0.8rem", fontWeight: "700" }}>
                    8K HDR Video
                  </span>
                </div>
              </div>

              <div className={styles.chargeControls}>
                <h3 className={styles.chargeTitle}>Capture Midnight as Bright as Noon</h3>
                <p className={styles.chargeDesc}>
                  Our 200MP Quad-Bayer optical engine collects 450% more photon data in ultra-low-light conditions. Laser autofocus locks in under 0.05 seconds.
                </p>
                <div className={styles.chargeStatsGrid}>
                  <div className={styles.chargeStatCard}>
                    <span className={styles.chargeStatNum}>16-in-1</span>
                    <span className={styles.chargeStatLabel}>Pixel Fusion Matrix</span>
                  </div>
                  <div className={styles.chargeStatCard}>
                    <span className={styles.chargeStatNum}>f/1.4</span>
                    <span className={styles.chargeStatLabel}>Dual Physical Aperture</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "display" && (
            <div className={styles.chargeLab}>
              <div className={styles.chargeVisual}>
                <div style={{ fontSize: "3.5rem", fontWeight: "900", color: "var(--accent-cyan)" }}>
                  {refreshRate} Hz
                </div>
                <p style={{ color: "#fff", fontWeight: "600" }}>
                  LTPO 4.0 Pro-OLED Ultra-Fluid Response
                </p>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {[60, 120, 144].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setRefreshRate(rate as 60 | 120 | 144)}
                      style={{
                        padding: "0.5rem 1rem",
                        borderRadius: "8px",
                        background: refreshRate === rate ? "var(--accent-cyan)" : "rgba(255,255,255,0.08)",
                        color: refreshRate === rate ? "#000" : "#fff",
                        fontWeight: "700",
                        fontSize: "0.85rem",
                      }}
                    >
                      {rate}Hz
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.chargeControls}>
                <h3 className={styles.chargeTitle}>Silky Smooth 144Hz Gaming OLED</h3>
                <p className={styles.chargeDesc}>
                  Adaptive refresh dynamically ramps down to 1Hz when reading to conserve battery, and leaps to 144Hz with 480Hz touch sampling for esports gaming precision.
                </p>
                <div className={styles.chargeStatsGrid}>
                  <div className={styles.chargeStatCard}>
                    <span className={styles.chargeStatNum}>3,000 Nits</span>
                    <span className={styles.chargeStatLabel}>Peak Sunlight Brightness</span>
                  </div>
                  <div className={styles.chargeStatCard}>
                    <span className={styles.chargeStatNum}>1.07 Billion</span>
                    <span className={styles.chargeStatLabel}>10-bit HDR10+ Colors</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
