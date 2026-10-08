"use client";

import React from "react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import { useEms } from "@/context/EmsStore";
import styles from "@/components/employee/EmployeeStyles.module.css";

export default function ManagerDashboardPage() {
  const { currentUser, users, tasks, leaveRequests, announcements, adjudicateLeave } = useEms();

  // Metrics calculations
  const teamMembers = users.filter((u) => u.department === currentUser.department);
  const pendingLeaves = leaveRequests.filter((l) => l.status === "PENDING");
  const deptTasks = tasks.filter((t) => t.department === currentUser.department);
  const completedTasks = deptTasks.filter((t) => t.status === "COMPLETED").length;
  const inProgressTasks = deptTasks.filter((t) => t.status === "IN_PROGRESS").length;
  const overdueTasks = deptTasks.filter((t) => t.status === "OVERDUE").length;

  return (
    <AppShell title="Department Manager Command Center">
      <div className={styles.pageContainer}>
        {/* Welcome Banner */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "#151515" }}>
              Manager Command Dashboard
            </h2>
            <p style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>
              Department: <strong>{currentUser.department}</strong> • Team Size: {teamMembers.length} Employees
            </p>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <Link
              href="/manager/tasks"
              style={{
                padding: "9px 16px",
                borderRadius: 8,
                background: "#590b28",
                color: "#ffffff",
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              + Assign Task
            </Link>
            <Link
              href="/manager/announcements"
              style={{
                padding: "9px 16px",
                borderRadius: 8,
                background: "#f1ede6",
                color: "#151515",
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              + Post Notice
            </Link>
          </div>
        </div>

        {/* 4 KPI Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 18 }}>
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2ddd6",
              borderRadius: 12,
              padding: 20,
              boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>
              Team Present Today
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#059669", marginTop: 6 }}>
              {teamMembers.length - 1} / {teamMembers.length}
            </div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
              1 member currently on planned leave
            </div>
          </div>

          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2ddd6",
              borderRadius: 12,
              padding: 20,
              boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>
              Pending Leave Filings
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#d97706", marginTop: 6 }}>
              {pendingLeaves.length}
            </div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
              Requires manager adjudication
            </div>
          </div>

          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2ddd6",
              borderRadius: 12,
              padding: 20,
              boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>
              Active Tasks In Flight
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#2563eb", marginTop: 6 }}>
              {inProgressTasks}
            </div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
              {completedTasks} completed • {overdueTasks} overdue
            </div>
          </div>

          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2ddd6",
              borderRadius: 12,
              padding: 20,
              boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>
              Published Bulletins
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#590b28", marginTop: 6 }}>
              {announcements.length}
            </div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
              Active company announcements
            </div>
          </div>
        </div>

        {/* Action Grids */}
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 24 }}>
          {/* Pending Leave Requests Card */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2ddd6",
              borderRadius: 12,
              padding: 24,
              boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#151515" }}>
                Leave Requests Awaiting Approval ({pendingLeaves.length})
              </h3>
              <Link href="/manager/leaves" style={{ fontSize: 12, color: "#590b28", fontWeight: 600 }}>
                View All →
              </Link>
            </div>

            {pendingLeaves.length === 0 ? (
              <div style={{ padding: 32, textAlign: "center", color: "#64748b", background: "#faf9f6", borderRadius: 8 }}>
                No pending leave applications in your department queue.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {pendingLeaves.map((req) => (
                  <div
                    key={req.id}
                    style={{
                      border: "1px solid #e8e4dc",
                      borderRadius: 10,
                      padding: "14px 16px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: "#faf9f6",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>
                        {req.employeeName} — <span style={{ color: "#590b28" }}>{req.leaveType}</span>
                      </div>
                      <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>
                        {req.startDate} to {req.endDate} ({req.totalDays} day/s) • Reason: {req.reason}
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        type="button"
                        onClick={() => adjudicateLeave(req.id, "APPROVED", "Approved by manager")}
                        style={{
                          padding: "6px 12px",
                          borderRadius: 6,
                          background: "#059669",
                          color: "#fff",
                          border: "none",
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => adjudicateLeave(req.id, "REJECTED", "Staffing requirements")}
                        style={{
                          padding: "6px 12px",
                          borderRadius: 6,
                          background: "#dc2626",
                          color: "#fff",
                          border: "none",
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Team Status Overview */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2ddd6",
              borderRadius: 12,
              padding: 24,
              boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#151515" }}>
                Team Directory Snapshot
              </h3>
              <Link href="/manager/employees" style={{ fontSize: 12, color: "#590b28", fontWeight: 600 }}>
                Attendance Grid →
              </Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 12px",
                    borderRadius: 8,
                    background: "#faf9f6",
                    border: "1px solid #f0ede8",
                  }}
                >
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
                        fontSize: 13,
                        fontWeight: 700,
                      }}
                    >
                      {member.personalInfo.firstName[0]}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>
                        {member.personalInfo.firstName} {member.personalInfo.lastName}
                      </div>
                      <div style={{ fontSize: 11, color: "#6b7280" }}>{member.position}</div>
                    </div>
                  </div>

                  <span
                    style={{
                      padding: "3px 8px",
                      borderRadius: 10,
                      fontSize: 11,
                      fontWeight: 600,
                      background: "#dcfce7",
                      color: "#166534",
                    }}
                  >
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
