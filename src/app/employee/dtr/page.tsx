"use client";

import React, { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useEms } from "@/context/EmsStore";
import styles from "@/components/employee/EmployeeStyles.module.css";

export default function EmployeeDtrPage() {
  const { currentUser, dtrRecords } = useEms();
  const [selectedMonth, setSelectedMonth] = useState("2026-10");

  const myRecords = dtrRecords.filter((r) => r.employeeId === currentUser.employeeId);
  
  // Calculate summary metrics
  const daysPresent = myRecords.filter((r) => r.status === "PRESENT").length;
  const daysLate = myRecords.filter((r) => r.status === "LATE").length;
  const daysAbsent = myRecords.filter((r) => r.status === "ABSENT").length;
  const totalHours = myRecords.reduce((sum, r) => sum + (r.totalHours || 0), 0).toFixed(1);

  return (
    <AppShell title="Daily Time Record (DTR)">
      <div className={styles.pageContainer}>
        {/* Month Selector & Action Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#151515" }}>Attendance History</h2>
            <p style={{ fontSize: 13, color: "#64748b" }}>
              Employee ID: <strong style={{ color: "#151515" }}>{currentUser.employeeId}</strong> • Department: {currentUser.department}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <label htmlFor="month-select" style={{ fontSize: 13, fontWeight: 600, color: "#555" }}>
              Viewing Period:
            </label>
            <select
              id="month-select"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              style={{
                padding: "8px 14px",
                borderRadius: 8,
                border: "1px solid #d1cbbf",
                background: "#ffffff",
                fontSize: 13,
                fontWeight: 600,
                color: "#151515",
                outline: "none",
              }}
            >
              <option value="2026-10">October 2026</option>
              <option value="2026-09">September 2026</option>
              <option value="2026-08">August 2026</option>
            </select>
          </div>
        </div>

        {/* 4 Summary Cards */}
        <div className={styles.kpiGrid}>
          <div className={styles.kpiCard}>
            <span className={styles.kpiTitle}>Days Present</span>
            <div className={styles.kpiValue} style={{ color: "#059669" }}>
              {daysPresent} Days
            </div>
            <span className={styles.kpiSubtext}>Regular attendance</span>
          </div>

          <div className={styles.kpiCard}>
            <span className={styles.kpiTitle}>Days Late</span>
            <div className={styles.kpiValue} style={{ color: "#d97706" }}>
              {daysLate} Days
            </div>
            <span className={styles.kpiSubtext}>Grace period applied</span>
          </div>

          <div className={styles.kpiCard}>
            <span className={styles.kpiTitle}>Total Hours Rendered</span>
            <div className={styles.kpiValue} style={{ color: "#590b28" }}>
              {totalHours} hrs
            </div>
            <span className={styles.kpiSubtext}>Excluding break periods</span>
          </div>

          <div className={styles.kpiCard}>
            <span className={styles.kpiTitle}>Days Absent</span>
            <div className={styles.kpiValue} style={{ color: "#dc2626" }}>
              {daysAbsent} Days
            </div>
            <span className={styles.kpiSubtext}>Unexcused absences</span>
          </div>
        </div>

        {/* DTR Table Grid */}
        <div className={styles.box}>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Day</th>
                  <th>Time In</th>
                  <th>Time Out</th>
                  <th>Total Hours</th>
                  <th>Status</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {myRecords.map((rec) => {
                  let chipClass = styles.chipPresent;
                  if (rec.status === "LATE") chipClass = styles.chipLate;
                  if (rec.status === "ABSENT") chipClass = styles.chipAbsent;
                  if (rec.status === "ON_LEAVE") chipClass = styles.chipLeave;

                  return (
                    <tr key={rec.id}>
                      <td style={{ fontWeight: 600 }}>{rec.date}</td>
                      <td>{rec.dayOfWeek}</td>
                      <td style={{ fontVariantNumeric: "tabular-nums" }}>{rec.timeIn || "--:--"}</td>
                      <td style={{ fontVariantNumeric: "tabular-nums" }}>{rec.timeOut || "Active"}</td>
                      <td style={{ fontVariantNumeric: "tabular-nums", fontWeight: 700 }}>
                        {rec.totalHours > 0 ? `${rec.totalHours} hrs` : "In Progress"}
                      </td>
                      <td>
                        <span className={`${styles.statusChip} ${chipClass}`}>{rec.status.replace("_", " ")}</span>
                      </td>
                      <td style={{ color: "#64748b" }}>{rec.remarks || "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
