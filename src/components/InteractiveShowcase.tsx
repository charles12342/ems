"use client";

import { useState } from "react";
import styles from "./InteractiveShowcase.module.css";

type Tab = "quickstart" | "architecture" | "demo";

export default function InteractiveShowcase() {
  const [activeTab, setActiveTab] = useState<Tab>("quickstart");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [counter, setCounter] = useState<number>(0);

  const commands = [
    { label: "Development Server", cmd: "npm run dev", desc: "Starts Turbopack hot reload dev server on localhost:3000" },
    { label: "Production Build", cmd: "npm run build", desc: "Compiles optimized static & server assets with Turbopack" },
    { label: "Code Quality / Lint", cmd: "npm run lint", desc: "Runs ESLint 9 to ensure best practices and clean code" },
  ];

  const files = [
    { name: "src/app/layout.tsx", tag: "Server Component", desc: "Root HTML shell, Google Fonts injection, global styles, and metadata." },
    { name: "src/app/page.tsx", tag: "Server Component", desc: "The main home page route rendered with fast server-side streaming." },
    { name: "src/app/globals.css", tag: "Vanilla CSS", desc: "Curated design system tokens, color palettes, and base styling." },
    { name: "src/components/", tag: "Client & Server", desc: "Modular, reusable components with interactive states and pure styles." },
  ];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  return (
    <section className={styles.showcaseContainer} aria-label="Interactive Showcase">
      <div className={styles.headerBar}>
        <div className={styles.tabList} role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === "quickstart"}
            className={`${styles.tabButton} ${activeTab === "quickstart" ? styles.tabButtonActive : ""}`}
            onClick={() => setActiveTab("quickstart")}
          >
            🚀 Quick Start
          </button>
          <button
            role="tab"
            aria-selected={activeTab === "architecture"}
            className={`${styles.tabButton} ${activeTab === "architecture" ? styles.tabButtonActive : ""}`}
            onClick={() => setActiveTab("architecture")}
          >
            📁 Architecture
          </button>
          <button
            role="tab"
            aria-selected={activeTab === "demo"}
            className={`${styles.tabButton} ${activeTab === "demo" ? styles.tabButtonActive : ""}`}
            onClick={() => setActiveTab("demo")}
          >
            ⚡ Live State Demo
          </button>
        </div>

        <div className={styles.statusBadge}>
          <span className={styles.statusDot}></span>
          Next.js 16 • Turbopack Ready
        </div>
      </div>

      <div className={styles.contentPanel}>
        {activeTab === "quickstart" && (
          <div className={styles.commandList}>
            {commands.map((item, idx) => (
              <div key={item.cmd} className={styles.commandItem}>
                <div className={styles.commandInfo}>
                  <span className={styles.commandLabel}>{item.label}</span>
                  <code className={styles.commandCode}>{item.cmd}</code>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{item.desc}</span>
                </div>
                <button
                  className={`${styles.copyButton} ${copiedIndex === idx ? styles.copiedBadge : ""}`}
                  onClick={() => handleCopy(item.cmd, idx)}
                  aria-label={`Copy ${item.cmd}`}
                >
                  {copiedIndex === idx ? "✓ Copied" : "Copy"}
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "architecture" && (
          <div className={styles.archGrid}>
            {files.map((file) => (
              <div key={file.name} className={styles.fileCard}>
                <div className={styles.fileName}>
                  <code>{file.name}</code>
                  <span className={styles.fileTag}>{file.tag}</span>
                </div>
                <p className={styles.fileDesc}>{file.desc}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "demo" && (
          <div className={styles.interactiveBox}>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
              React 19 Client Component state update demonstration:
            </p>
            <div className={styles.counterValue}>{counter}</div>
            <div className={styles.buttonGroup}>
              <button
                className={styles.actionButton}
                onClick={() => setCounter((c) => c - 1)}
              >
                – Decrement
              </button>
              <button
                className={`${styles.actionButton} ${styles.actionButtonPrimary}`}
                onClick={() => setCounter((c) => c + 1)}
              >
                + Increment
              </button>
              <button
                className={styles.actionButton}
                onClick={() => setCounter(0)}
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
