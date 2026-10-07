"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./InteractiveConfigurator.module.css";

type FinishId = "cyan" | "violet" | "black" | "silver";
type TierId = "256" | "512" | "1024";

interface Finish {
  id: FinishId;
  name: string;
  color: string;
  image: string;
}

interface Tier {
  id: TierId;
  ram: string;
  storage: string;
  price: number;
}

interface TradeInOption {
  device: string;
  discount: number;
}

export default function InteractiveConfigurator() {
  const [selectedFinish, setSelectedFinish] = useState<FinishId>("cyan");
  const [selectedTier, setSelectedTier] = useState<TierId>("512");
  const [tradeInIndex, setTradeInIndex] = useState<number>(0);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [orderCode, setOrderCode] = useState<string | null>(null);

  const finishes: Finish[] = [
    { id: "cyan", name: "Cosmic Cyan", color: "#06b6d4", image: "/quantum_hero.jpg" },
    { id: "violet", name: "Nebula Violet", color: "#8b5cf6", image: "/quantum_camera.jpg" },
    { id: "black", name: "Phantom Black", color: "#111424", image: "/quantum_chip.jpg" },
    { id: "silver", name: "Titanium Silver", color: "#e2e8f0", image: "/quantum_hero.jpg" },
  ];

  const tiers: Tier[] = [
    { id: "256", ram: "12 GB", storage: "256 GB", price: 999 },
    { id: "512", ram: "16 GB", storage: "512 GB", price: 1149 },
    { id: "1024", ram: "24 GB Extreme", storage: "1 TB", price: 1349 },
  ];

  const tradeInOptions: TradeInOption[] = [
    { device: "No Trade-in Device", discount: 0 },
    { device: "iPhone 15 / 16 Pro Max (-$480)", discount: 480 },
    { device: "Samsung Galaxy S24 / S25 Ultra (-$450)", discount: 450 },
    { device: "Google Pixel 8 / 9 Pro (-$380)", discount: 380 },
    { device: "Other Qualifying Smartphone (-$200)", discount: 200 },
  ];

  const currentFinish = finishes.find((f) => f.id === selectedFinish) || finishes[0];
  const currentTier = tiers.find((t) => t.id === selectedTier) || tiers[1];
  const currentDiscount = tradeInOptions[tradeInIndex].discount;
  const finalPrice = Math.max(0, currentTier.price - currentDiscount);
  const monthlyPrice = Math.round(finalPrice / 24);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setSubmitting(true);
    setTimeout(() => {
      setOrderCode(`QX-PRIORITY-${Math.floor(10000 + Math.random() * 90000)}`);
      setSubmitting(false);
    }, 800);
  };

  return (
    <section id="configurator" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.badge}>INSTANT PRE-ORDER DISPATCH</span>
        <h2 className={styles.title}>
          Customize Your <span className={styles.titleGlow}>Quantum X Pro</span>
        </h2>
        <p className={styles.subtitle}>
          Includes free 120W GaN SuperCharger in the box, 2-Year Quantum Care+ VIP warranty, and express worldwide delivery.
        </p>
      </div>

      <div className={styles.configLayout}>
        <div className={styles.previewCol}>
          <div className={styles.previewFrame}>
            <Image
              src={currentFinish.image}
              alt={currentFinish.name}
              fill
              sizes="(max-width: 960px) 100vw, 500px"
              className={styles.previewImg}
            />
          </div>

          <div className={styles.priceBreakdown}>
            <div className={styles.priceRow}>
              <span>Selected Color</span>
              <span className={styles.priceRowVal}>{currentFinish.name}</span>
            </div>
            <div className={styles.priceRow}>
              <span>RAM & Storage</span>
              <span className={styles.priceRowVal}>{currentTier.ram} + {currentTier.storage}</span>
            </div>
            {currentDiscount > 0 && (
              <div className={`${styles.priceRow} ${styles.discountRow}`}>
                <span>Trade-In Instant Credit</span>
                <span className={styles.priceRowVal}>-${currentDiscount}</span>
              </div>
            )}
            <div className={styles.priceRow}>
              <span>VIP Shipping & Delivery</span>
              <span className={styles.priceRowVal} style={{ color: "#34d399" }}>FREE (48 Hours)</span>
            </div>

            <div className={styles.totalRow}>
              <div>
                <div className={styles.totalLabel}>Total Due Today</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>or ${monthlyPrice}/mo for 24 mos (0% APR)</div>
              </div>
              <div className={styles.totalNum}>${finalPrice}</div>
            </div>
          </div>
        </div>

        <div className={styles.optionsCol}>
          <div className={styles.optionBlock}>
            <div className={styles.optionHeader}>
              <span className={styles.optionTitle}>1. Choose Color Finish</span>
              <span className={styles.selectedBadge}>{currentFinish.name}</span>
            </div>

            <div className={styles.finishGrid}>
              {finishes.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={`${styles.finishBtn} ${selectedFinish === f.id ? styles.finishBtnActive : ""}`}
                  onClick={() => setSelectedFinish(f.id)}
                  aria-pressed={selectedFinish === f.id}
                >
                  <div className={styles.colorCircle} style={{ backgroundColor: f.color }} />
                  <span className={styles.finishLabel}>{f.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.optionBlock}>
            <div className={styles.optionHeader}>
              <span className={styles.optionTitle}>2. Choose Memory & Storage</span>
              <span className={styles.selectedBadge}>{currentTier.storage}</span>
            </div>

            <div className={styles.tierGrid}>
              {tiers.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`${styles.tierBtn} ${selectedTier === t.id ? styles.tierBtnActive : ""}`}
                  onClick={() => setSelectedTier(t.id)}
                  aria-pressed={selectedTier === t.id}
                >
                  <span className={styles.tierTitle}>{t.storage}</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{t.ram}</span>
                  <span className={styles.tierPrice}>${t.price}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.optionBlock}>
            <div className={styles.optionHeader}>
              <span className={styles.optionTitle}>3. Instant Trade-In Credit</span>
              <span className={styles.selectedBadge}>Save up to $480</span>
            </div>

            <select
              className={styles.tradeInSelect}
              value={tradeInIndex}
              onChange={(e) => setTradeInIndex(parseInt(e.target.value))}
              aria-label="Select Trade-In Device"
            >
              {tradeInOptions.map((opt, i) => (
                <option key={opt.device} value={i}>
                  {opt.device}
                </option>
              ))}
            </select>
          </div>

          {orderCode ? (
            <div className={styles.successBox} role="status">
              <span style={{ fontWeight: "800", fontSize: "1.1rem" }}>🎉 Priority Order Confirmed!</span>
              <div className={styles.orderCode}>{orderCode}</div>
              <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                Order confirmed for {fullName} ({email}). Your Quantum X Pro ({currentFinish.name}, {currentTier.storage}) will dispatch with express VIP tracking.
              </span>
            </div>
          ) : (
            <form className={styles.checkoutForm} onSubmit={handleCheckout}>
              <div className={styles.inputRow}>
                <input
                  type="text"
                  required
                  placeholder="Full Legal Name"
                  className={styles.textInput}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <input
                  type="email"
                  required
                  placeholder="Email for Tracking"
                  className={styles.textInput}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className={styles.orderSubmitBtn}
                disabled={submitting}
              >
                {submitting ? "Securing VIP Allocation..." : `Lock In Priority Pre-Order // $${finalPrice} ⚡`}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
