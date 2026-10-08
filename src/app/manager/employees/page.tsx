"use client";

import React, { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useEms } from "@/context/EmsStore";
import styles from "@/components/employee/EmployeeStyles.module.css";

export default function ManagerEmployeesPage() {
  const { currentUser, users, dtrRecords } = useEms();
  const [searchTerm, setSearchTerm] = useState("");

  const deptMembers = users.filter((u) => u.department === currentUser.department);

  const filteredMembers = deptMembers.filter(
    (m) =>
      `${m.personalInfo.firstName} ${m.personalInfo.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.employeeId.includes(searchTerm)
  );

  // Week days Mon to Fri
  const weekDays = [
    { label: "Mon", date: "2026-10-05" },
    { label: "Tue", date: "2026-10-06" },
    { label: "Wed", date: "2026-10-07" },
    { label: "Thu", date: "2026-10-08" },
    { label: "Fri", date: "2026-10-09" },
  ];

  const getAttendanceForDay = (empId: string, date: string) => {
    const record = dtrRecords.find((r) => r.employeeId === empId && r.date === date);
    if (!record) return { status: "PRESENT", time: "08:00 AM" }; // fallback mock
    return { status: record.status, time: record.timeIn || "—" };
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PRESENT":
        return { bg: "#dcfce7", color: "#15803d", label: "Present" };
      case "LATE":
        return { bg: "#fef3c7", color: "#b45309", label: "Late" };
      case "ABSENT":
        return { bg: "#fee2e2", color: "#b91c1c", label: "Absent" };
      case "ON_LEAVE":
        return { bg: "#e0f2fe", color: "#0369a1", label: "On Leave" };
      default:
        return { bg: "#f3f4f6", color: "#4b5563", label: status };
    }
  };

  return (
    <AppShell title="Department Attendance & Directory">
      <div className={styles.pageContainer}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "#151515" }}>
              Weekly Attendance Grid (Mon – Fri)
            </h2>
            <p style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>
              Current Week: Oct 05, 2026 – Oct 09, 2026 • Department: <strong>{currentUser.department}</strong>
            </p>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <input
              type="text"
              placeholder="Search member..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: "8px 14px",
                borderRadius: 8,
                border: "1px solid #d1d5db",
                fontSize: 13,
                outline: "none",
              }}
            />
            <button
              type="button"
              onClick={() => alert("Attendance summary report exported as CSV!")}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                background: "#590b28",
                color: "#fff",
                border: "none",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Export Report
            </button>
          </div>
        </div>

        {/* 5-Day Weekly Grid Table */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2ddd6",
            borderRadius: 12,
            padding: 24,
            boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
            overflowX: "auto",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e8e4dc", color: "#64748b" }}>
                <th style={{ padding: "12px 14px" }}>Employee</th>
                <th style={{ padding: "12px 14px" }}>Role / Title</th>
                {weekDays.map((w) => (
                  <th key={w.date} style={{ padding: "12px 14px", textAlign: "center" }}>
                    {w.label} ({w.date.slice(5)})
                  </th>
                ))}
                <th style={{ padding: "12px 14px", textAlign: "right" }}>Total Hours</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr key={member.id} style={{ borderBottom: "1px solid #f1ede6" }}>
                  <td style={{ padding: "14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          background: "#590b28",
                          color: "#fff",
                          display: "grid",
                          placeItems: "center",
                          fontWeight: 700,
                          fontSize: 12,
                        }}
                      >
                        {member.personalInfo.firstName[0]}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: "#111827" }}>
                          {member.personalInfo.firstName} {member.personalInfo.lastName}
                        </div>
                        <div style={{ fontSize: 11, color: "#8a94a6" }}>ID: {member.employeeId}</div>
                      </div>
                    </div>
                  </td>

                  <td style={{ padding: "14px", color: "#4b5563" }}>{member.position}</td>

                  {weekDays.map((w) => {
                    const att = getAttendanceForDay(member.employeeId, w.date);
                    const badge = getStatusBadge(att.status);

                    return (
                      <td key={w.date} style={{ padding: "14px", textAlign: "center" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "3px 8px",
                            borderRadius: 6,
                            fontSize: 11,
                            fontWeight: 700,
                            background: badge.bg,
                            color: badge.color,
                          }}
                        >
                          {badge.label}
                        </span>
                        <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 2 }}>{att.time}</div>
                      </td>
                    );
                  })}

                  <td style={{ padding: "14px", textAlign: "right", fontWeight: 700, color: "#111827" }}>
                    40.0 hrs
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
