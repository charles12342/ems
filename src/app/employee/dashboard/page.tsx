"use client";

import React from "react";
import AppShell from "@/components/layout/AppShell";
import styles from "./dashboard.module.css";

export default function EmployeeDashboardPage() {
  return (
    <AppShell title="Dashboard">
      <div className={styles.dashboardWrapper}>
        {/* Welcome Greeting */}
        <h1 className={styles.headerTitle}>Good Morning, Lorem</h1>
        <p className={styles.headerSubtitle}>Here’s what’s happening today.</p>

        {/* Top 3 Summary Cards */}
        <div className={styles.topCardsGrid}>
          {/* Card 1: Attendance Today */}
          <div className={styles.metricCard}>
            <div className={styles.cardBody}>
              <div className={`${styles.iconBox} ${styles.iconBoxGreen}`}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="12" cy="12" r="9" />
                  <polyline points="12 7 12 12 15 14" />
                </svg>
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardHeading}>Attendance today</span>
                <span className={styles.cardLargeStatus}>Present</span>
                <span className={styles.cardLargeTime}>8:30 AM</span>
                <span className={styles.cardSmallLabel}>Time In</span>
              </div>
            </div>
            <div className={styles.cardFooter}>
              <a href="#" onClick={(e) => e.preventDefault()} className={styles.footerLinkGreen}>
                View My DTR →
              </a>
            </div>
          </div>

          {/* Card 2: My Task */}
          <div className={styles.metricCard}>
            <div className={styles.cardBody}>
              <div className={`${styles.iconBox} ${styles.iconBoxPurple}`}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <rect x="8" y="2" width="8" height="4" rx="1" />
                  <path d="m9 14 2 2 4-4" />
                </svg>
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardHeading}>My Task</span>
                <span className={styles.cardLargeNumber}>3</span>
                <span className={styles.cardSmallLabel}>Active Tasks</span>
                <span className={styles.cardPurpleNumber}>1</span>
                <span className={styles.cardSmallLabel}>Due Today</span>
              </div>
            </div>
            <div className={styles.cardFooter}>
              <a href="#" onClick={(e) => e.preventDefault()} className={styles.footerLinkPurple}>
                View My Tasks →
              </a>
            </div>
          </div>

          {/* Card 3: Leave Balance */}
          <div className={styles.metricCard}>
            <div className={styles.cardBody}>
              <div className={`${styles.iconBox} ${styles.iconBoxBlue}`}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <circle cx="8" cy="14" r="1" fill="currentColor" />
                  <circle cx="12" cy="14" r="1" fill="currentColor" />
                  <circle cx="16" cy="14" r="1" fill="currentColor" />
                </svg>
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardHeading}>Leave Balance</span>
                <span className={styles.cardLargeNumber}>8</span>
                <span className={styles.cardSmallLabel}>Days Available</span>
                <span className={styles.cardBlueNumber}>1</span>
                <span className={styles.cardSmallLabel}>Pending Request</span>
              </div>
            </div>
            <div className={styles.cardFooter}>
              <a href="#" onClick={(e) => e.preventDefault()} className={styles.footerLinkBlue}>
                Go to Leave Request →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom 2 Main Panels */}
        <div className={styles.bottomPanelsGrid}>
          {/* Left: Recent Announcement Panel */}
          <div className={styles.panelContainer}>
            <div className={styles.panelHeader}>
              <svg className={styles.panelIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 5.882V19.24a1.76 1.76 0 0 1-3.417.592l-2.147-6.15H3.5A1.5 1.5 0 0 1 2 12.182v-2.364A1.5 1.5 0 0 1 3.5 8.318h1.936l2.147-6.15A1.76 1.76 0 0 1 11 2.76v3.122z" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
              <span>Recent Announcement</span>
            </div>

            <div className={styles.announcementList}>
              {/* Item 1: Company Policy Update */}
              <div className={styles.announcementItem}>
                <div className={styles.announcementIconBox}>
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="3" fill="#0284c7" />
                    <line x1="7" y1="8" x2="17" y2="8" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                    <line x1="7" y1="12" x2="17" y2="12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                    <line x1="7" y1="16" x2="13" y2="16" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className={styles.announcementContent}>
                  <strong className={styles.announcementTitle}>Company Policy Update</strong>
                  <p className={styles.announcementDesc}>
                    Please be informed that the new company policy will take effect starting July 5, 2026.
                  </p>
                </div>
              </div>

              {/* Item 2: Payroll Realease */}
              <div className={styles.announcementItem}>
                <div className={styles.announcementIconBox}>
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="3" fill="#a855f7" />
                    <rect x="6" y="8" width="12" height="10" rx="1.5" stroke="#ffffff" strokeWidth="1.8" />
                    <line x1="9" y1="6" x2="9" y2="9" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                    <line x1="15" y1="6" x2="15" y2="9" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                    <line x1="6" y1="12" x2="18" y2="12" stroke="#ffffff" strokeWidth="1.6" />
                  </svg>
                </div>
                <div className={styles.announcementContent}>
                  <strong className={styles.announcementTitle}>Payroll Realease</strong>
                  <p className={styles.announcementDesc}>
                    Payroll for the month of June will be released in July 10, 2026.
                  </p>
                </div>
              </div>

              {/* Item 3: Team Building Activity */}
              <div className={styles.announcementItem}>
                <div className={styles.announcementIconBox}>
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="3" fill="#f59e0b" />
                    <circle cx="12" cy="10" r="3" stroke="#ffffff" strokeWidth="1.8" />
                    <path d="M7 18c0-2.5 2.2-4 5-4s5 1.5 5 4" stroke="#ffffff" strokeWidth="1.8" />
                  </svg>
                </div>
                <div className={styles.announcementContent}>
                  <strong className={styles.announcementTitle}>Team Building Activity</strong>
                  <p className={styles.announcementDesc}>
                    Join us for our team building activity on July 15, 2026 at 9:00 AM.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.panelFooter}>
              <a href="#" onClick={(e) => e.preventDefault()} className={styles.footerLinkBlue}>
                View all announcement →
              </a>
            </div>
          </div>

          {/* Right: My Attendance Today Panel */}
          <div className={styles.panelContainer}>
            <div className={styles.panelHeader}>
              <svg className={styles.panelIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>My Attendance Today</span>
            </div>

            <div className={styles.attendanceContent}>
              {/* All set banner */}
              <div className={styles.alertBanner}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>You are all set for today!</span>
              </div>

              {/* Rows */}
              <div className={styles.attendanceRows}>
                {/* Row 1: Date */}
                <div className={styles.attendanceRow}>
                  <div className={`${styles.rowLabelGroup} ${styles.rowLabelDark}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>Date</span>
                  </div>
                  <span className={styles.rowValueDark}>August 01, 2026</span>
                </div>

                {/* Row 2: Time In */}
                <div className={styles.attendanceRow}>
                  <div className={`${styles.rowLabelGroup} ${styles.rowLabelGreen}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="9" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>Time In</span>
                  </div>
                  <span className={styles.rowValueGreen}>8:30 AM</span>
                </div>

                {/* Row 3: Time Out */}
                <div className={styles.attendanceRow}>
                  <div className={`${styles.rowLabelGroup} ${styles.rowLabelOrange}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="9" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>Time Out</span>
                  </div>
                  <span className={styles.rowValueOrange}>-</span>
                </div>

                {/* Row 4: Total Hours */}
                <div className={styles.attendanceRow}>
                  <div className={`${styles.rowLabelGroup} ${styles.rowLabelBlue}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="9" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>Total Hours</span>
                  </div>
                  <span className={styles.rowValueBlue}>-</span>
                </div>

                {/* Row 5: Status */}
                <div className={styles.attendanceRow}>
                  <div className={`${styles.rowLabelGroup} ${styles.rowLabelGreen}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span>Status</span>
                  </div>
                  <span className={styles.rowValueGreen}>Present</span>
                </div>
              </div>
            </div>

            <div className={styles.panelFooter}>
              <a href="#" onClick={(e) => e.preventDefault()} className={styles.footerLinkBlue}>
                View all DTR →
              </a>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
