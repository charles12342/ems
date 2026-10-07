"use client";

import { useState } from "react";
import styles from "./QuantumFooter.module.css";

export default function QuantumFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.brandCol}>
          <div className={styles.brandName}>
            <span>⚡ QUANTUM X</span>
          </div>
          <p className={styles.brandDesc}>
            Next-generation 5G flagship computing built with 3nm Quantum Bionic processors, 200MP Night Sight optics, and 120W HyperCharge.
          </p>
        </div>

        <div className={styles.newsletterCol}>
          <div className={styles.newsletterTitle}>Get $50 Off Your First Order</div>
          <div className={styles.newsletterDesc}>
            Subscribe for early VIP hardware drops, exclusive software beta updates, and special promo codes.
          </div>
          {subscribed ? (
            <div style={{ color: "#34d399", fontWeight: "700", fontSize: "0.9rem" }}>
              ✓ Code &apos;QUANTUM50&apos; sent to your email!
            </div>
          ) : (
            <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className={styles.emailInput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className={styles.subscribeBtn}>
                Claim $50
              </button>
            </form>
          )}
        </div>

        <div className={styles.linksGrid}>
          <div className={styles.linkGroup}>
            <span className={styles.groupTitle}>Products</span>
            <a href="#hero" className={styles.link}>Quantum X Pro</a>
            <a href="#hero" className={styles.link}>Quantum X Ultra</a>
            <a href="#interactive-hub" className={styles.link}>120W GaN Charger</a>
            <a href="#configurator" className={styles.link}>Quantum Pods Pro</a>
          </div>

          <div className={styles.linkGroup}>
            <span className={styles.groupTitle}>Support</span>
            <a href="#configurator" className={styles.link}>Track Order</a>
            <a href="#configurator" className={styles.link}>Quantum Care+</a>
            <a href="#configurator" className={styles.link}>Trade-In Program</a>
            <a href="#configurator" className={styles.link}>Store Locator</a>
          </div>
        </div>
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.statusPill}>
          <span className={styles.statusDot} />
          <span>Global Warehouse Online • Same-Day Dispatch Active</span>
        </div>
        <div>
          © {new Date().getFullYear()} Quantum Mobile Technologies Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
