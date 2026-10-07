"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./DeviceConfigurator.module.css";

type FinishId = "obsidian" | "titanium" | "champagne";
type StorageId = "256" | "512" | "1024";

interface FinishOption {
  id: FinishId;
  name: string;
  colorHex: string;
  image: string;
}

interface StorageOption {
  id: StorageId;
  label: string;
  price: number;
}

export default function DeviceConfigurator() {
  const [selectedFinish, setSelectedFinish] = useState<FinishId>("obsidian");
  const [selectedStorage, setSelectedStorage] = useState<StorageId>("256");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservationCode, setReservationCode] = useState<string | null>(null);

  const finishes: FinishOption[] = [
    {
      id: "obsidian",
      name: "Matte Obsidian",
      colorHex: "#16181e",
      image: "/phone_hero.jpg",
    },
    {
      id: "titanium",
      name: "Raw Forged Titanium",
      colorHex: "#8e95a5",
      image: "/phone_lens.jpg",
    },
    {
      id: "champagne",
      name: "Satin Champagne",
      colorHex: "#d8c8b8",
      image: "/phone_display.jpg",
    },
  ];

  const storages: StorageOption[] = [
    { id: "256", label: "256 GB", price: 1099 },
    { id: "512", label: "512 GB", price: 1249 },
    { id: "1024", label: "1 TB Titanium Edition", price: 1449 },
  ];

  const currentFinish = finishes.find((f) => f.id === selectedFinish) || finishes[0];
  const currentStorage = storages.find((s) => s.id === selectedStorage) || storages[0];

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const code = `AETHER01-${Math.floor(1000 + Math.random() * 9000)}`;
      setReservationCode(code);
      setIsSubmitting(false);
    }, 900);
  };

  return (
    <section id="configure" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.sectionLabel}>FIRST PRODUCTION BATCH</span>
        <h2 className={styles.sectionTitle}>Configure Your Aether 01</h2>
        <p className={styles.sectionDesc}>
          Limited to 2,500 numbered units in Series 01. Each device includes a solid titanium serial card and 3-year global hardware warranty.
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
              className={styles.previewImage}
            />
          </div>

          <div className={styles.orderSummaryBox}>
            <div className={styles.summaryRow}>
              <span>Chassis Finish</span>
              <span className={styles.summaryRowVal}>{currentFinish.name}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Storage Capacity</span>
              <span className={styles.summaryRowVal}>{currentStorage.label}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Estimated Dispatch</span>
              <span className={styles.summaryRowVal}>November 2026</span>
            </div>
            <div className={styles.totalRow}>
              <span>Deposit Due Today</span>
              <span className={styles.totalPrice}>${currentStorage.price}</span>
            </div>
          </div>
        </div>

        <div className={styles.optionsCol}>
          <div className={styles.optionSection}>
            <div className={styles.optionHeader}>
              <span className={styles.optionTitle}>Select Material Finish</span>
              <span className={styles.selectedName}>{currentFinish.name}</span>
            </div>

            <div className={styles.finishGrid}>
              {finishes.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={`${styles.finishBtn} ${
                    selectedFinish === f.id ? styles.finishBtnActive : ""
                  }`}
                  onClick={() => setSelectedFinish(f.id)}
                  aria-pressed={selectedFinish === f.id}
                >
                  <div
                    className={styles.colorSwatch}
                    style={{ backgroundColor: f.colorHex }}
                  />
                  <span className={styles.finishLabel}>{f.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.optionSection}>
            <div className={styles.optionHeader}>
              <span className={styles.optionTitle}>Select Storage Tier</span>
              <span className={styles.selectedName}>{currentStorage.label}</span>
            </div>

            <div className={styles.storageGrid}>
              {storages.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`${styles.storageBtn} ${
                    selectedStorage === s.id ? styles.storageBtnActive : ""
                  }`}
                  onClick={() => setSelectedStorage(s.id)}
                  aria-pressed={selectedStorage === s.id}
                >
                  <span className={styles.storageSize}>{s.id === "1024" ? "1 TB" : `${s.id} GB`}</span>
                  <span className={styles.storagePrice}>${s.price}</span>
                </button>
              ))}
            </div>
          </div>

          {reservationCode ? (
            <div className={styles.confirmedBox} role="status">
              <span>✓ Reservation Confirmed</span>
              <span className={styles.confirmedSerial}>{reservationCode}</span>
              <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                A confirmation with your numbered build slot has been registered for {name} ({email}).
              </span>
            </div>
          ) : (
            <form className={styles.reserveForm} onSubmit={handleReserve}>
              <input
                type="text"
                required
                placeholder="Full Name"
                className={styles.inputField}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                required
                placeholder="Email Address for Serial Reservation"
                className={styles.inputField}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className={styles.reserveSubmitBtn}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Allocating Serial Number..."
                  : `Reserve Unit // $${currentStorage.price}`}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
