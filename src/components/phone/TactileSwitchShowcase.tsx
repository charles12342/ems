"use client";

import { useState } from "react";
import styles from "./TactileSwitchShowcase.module.css";

type SwitchMode = "presence" | "mono" | "airgap";

interface ModeDetail {
  id: SwitchMode;
  notch: string;
  name: string;
  subtitle: string;
  description: string;
  mechanicalTravel: string;
  screenTime: string;
  screenDate: string;
  glanceTitle: string;
  glanceContent: string;
}

export default function TactileSwitchShowcase() {
  const [activeMode, setActiveMode] = useState<SwitchMode>("presence");

  const modes: ModeDetail[] = [
    {
      id: "presence",
      notch: "01",
      name: "Presence Mode",
      subtitle: "Zero Algorithmic Intrusion",
      description:
        "Standard cellular connectivity with automated feed muting. Only direct contacts and urgent calendar events pass through.",
      mechanicalTravel: "TOP DETENT // 0.0 MM",
      screenTime: "09:41",
      screenDate: "THURSDAY, OCTOBER 26",
      glanceTitle: "ALLOWED COMMUNICATIONS",
      glanceContent: "2 direct calls allowed • Zero notifications pending",
    },
    {
      id: "mono",
      notch: "02",
      name: "Monochrome Glance",
      subtitle: "High-Contrast Reading & Writing",
      description:
        "OLED display locks into pure 1-bit high-contrast black & white typography. Eliminates dopamine color hooks entirely.",
      mechanicalTravel: "CENTER DETENT // 3.0 MM",
      screenTime: "09:41",
      screenDate: "MONOCHROME 1-BIT ACTIVE",
      glanceTitle: "DEEP FOCUS AGENDA",
      glanceContent: "Draft architecture proposal • Meeting at 14:00",
    },
    {
      id: "airgap",
      notch: "03",
      name: "Hardware Air-Gap",
      subtitle: "Physical Mic & Radios Cutoff",
      description:
        "Engages an integrated micro-relay that physically severs electrical power to all microphones, cameras, and radio modems.",
      mechanicalTravel: "BOTTOM DETENT // 6.0 MM",
      screenTime: "09:41",
      screenDate: "PHYSICAL DISCONNECT",
      glanceTitle: "HARDWARE ISOLATION",
      glanceContent: "Mics severed • Baseband powered down • Zero RF",
    },
  ];

  const current = modes.find((m) => m.id === activeMode) || modes[0];

  return (
    <section id="switch" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.sectionLabel}>MECHANICAL ARCHITECTURE</span>
        <h2 className={styles.sectionTitle}>The 3-Position Tactile Slider</h2>
        <p className={styles.sectionDesc}>
          A physical, knurled grade-5 titanium switch directly wired to system states. Change your relationship with technology with a single mechanical click.
        </p>
      </div>

      <div className={styles.interactiveContainer}>
        <div className={styles.switchControlPanel}>
          <div className={styles.switchAssembly}>
            <div className={styles.assemblyHeader}>
              <span>SWITCH POSITION:</span>
              <span className={styles.activePositionIndicator}>
                {current.mechanicalTravel}
              </span>
            </div>

            <div className={styles.modesList}>
              {modes.map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  className={`${styles.modeButton} ${
                    activeMode === mode.id ? styles.modeButtonActive : ""
                  }`}
                  onClick={() => setActiveMode(mode.id)}
                  aria-pressed={activeMode === mode.id}
                >
                  <div className={styles.notchIcon}>{mode.notch}</div>
                  <div className={styles.modeTextGroup}>
                    <div className={styles.modeTitle}>{mode.name}</div>
                    <div className={styles.modeDesc}>{mode.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.displaySimulator}>
          <div
            className={styles.phoneChassisMock}
            style={{
              filter:
                activeMode === "mono"
                  ? "grayscale(100%) contrast(120%)"
                  : activeMode === "airgap"
                  ? "contrast(90%) brightness(85%)"
                  : "none",
            }}
          >
            <div className={styles.notchBar} />

            <div className={styles.screenContent}>
              <div>
                <div className={styles.clockHero}>{current.screenTime}</div>
                <div className={styles.dateRow}>{current.screenDate}</div>
              </div>

              <div className={styles.glanceCard}>
                <div className={styles.glanceLabel}>{current.glanceTitle}</div>
                <div className={styles.glanceVal}>{current.glanceContent}</div>
              </div>

              {activeMode === "airgap" && (
                <div className={styles.hardwareCutoffWarning}>
                  ⚠ PHYSICAL RELAYS OPEN // ALL WIRELESS CHANNELS OFFLINE
                </div>
              )}
            </div>

            <div className={styles.bottomStatusBar}>
              <span>AETHER OS 1.0</span>
              <span>
                {activeMode === "airgap" ? "NO SIGNAL (AIRGAP)" : "100% SECURE"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
