"use client";

import { useState } from "react";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const emailAddress = "charles.lising.dev@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    // Simulate real-time dispatch
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.sectionBadge}>Get In Touch</span>
        <h2 className={styles.sectionTitle}>Let’s Build Something Exceptional</h2>
        <p className={styles.sectionSubtitle}>
          Have a project in mind, looking for a senior engineer, or want to discuss modern web systems? Reach out below.
        </p>
      </div>

      <div className={styles.contactLayout}>
        <div className={styles.infoCard}>
          <h3 className={styles.infoTitle}>Connect Directly</h3>
          <p className={styles.infoText}>
            I’m always open to discussing new software engineering contracts, full-time senior positions, and technical consulting.
          </p>

          <div className={styles.contactList}>
            <div className={styles.contactItem}>
              <div className={styles.contactMeta}>
                <span className={styles.contactLabel}>Email</span>
                <span className={styles.contactValue}>{emailAddress}</span>
              </div>
              <button
                className={`${styles.copyBtn} ${copiedEmail ? styles.copied : ""}`}
                onClick={handleCopyEmail}
                type="button"
                aria-label="Copy Email"
              >
                {copiedEmail ? "✓ Copied" : "Copy"}
              </button>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactMeta}>
                <span className={styles.contactLabel}>GitHub</span>
                <span className={styles.contactValue}>github.com/charles-lising</span>
              </div>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.copyBtn}
              >
                Profile ↗
              </a>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactMeta}>
                <span className={styles.contactLabel}>LinkedIn</span>
                <span className={styles.contactValue}>linkedin.com/in/charles-lising</span>
              </div>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.copyBtn}
              >
                Connect ↗
              </a>
            </div>
          </div>
        </div>

        <form className={styles.formCard} onSubmit={handleSubmit}>
          {submitted && (
            <div className={styles.successMessage} role="status">
              <span>✓</span>
              <span>Thank you! Your message has been received. I will get back to you promptly.</span>
            </div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>
              Your Name *
            </label>
            <input
              id="name"
              type="text"
              required
              placeholder="e.g. Sarah Connor"
              className={styles.input}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Your Email Address *
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="sarah@example.com"
              className={styles.input}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="subject" className={styles.label}>
              Subject
            </label>
            <input
              id="subject"
              type="text"
              placeholder="Project Inquiry / Opportunity"
              className={styles.input}
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="message" className={styles.label}>
              Your Message *
            </label>
            <textarea
              id="message"
              required
              placeholder="Tell me about your project, timeline, or vision..."
              className={styles.textarea}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? "Transmitting Message..." : "Send Message ↗"}
          </button>
        </form>
      </div>
    </section>
  );
}
