"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import { useEms, LeaveType } from "@/context/EmsStore";
import styles from "@/components/employee/EmployeeStyles.module.css";

export default function EmployeeLeavePage() {
  const router = useRouter();
  const { currentUser, leaveBalances, leaveRequests, submitLeaveRequest } = useEms();

  const [leaveType, setLeaveType] = useState<LeaveType>("VACATION");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [contactNumber, setContactNumber] = useState(currentUser.personalInfo.contactNumber || "");
  const [errorMessage, setErrorMessage] = useState("");

  // Calculate working days duration (ignoring weekends)
  const calculateDays = (start: string, end: string): number => {
    if (!start || !end) return 0;
    const s = new Date(start);
    const e = new Date(end);
    if (s > e) return 0;

    let count = 0;
    const cur = new Date(s);
    while (cur <= e) {
      const day = cur.getDay();
      if (day !== 0 && day !== 6) {
        count++;
      }
      cur.setDate(cur.getDate() + 1);
    }
    return count;
  };

  const calculatedDays = calculateDays(startDate, endDate);

  // Available balance for chosen leave type
  const getAvailableBalance = (type: LeaveType): number => {
    switch (type) {
      case "VACATION":
        return leaveBalances.vacation.available;
      case "SICK":
        return leaveBalances.sick.available;
      case "SPECIAL":
        return leaveBalances.special.available;
      case "MATERNITY":
        return leaveBalances.maternity.available;
      default:
        return 0;
    }
  };

  const currentAvailable = getAvailableBalance(leaveType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!startDate || !endDate) {
      setErrorMessage("Please select both start date and end date.");
      return;
    }

    if (calculatedDays <= 0) {
      setErrorMessage("End date must be after or equal to start date (at least 1 weekday).");
      return;
    }

    if (calculatedDays > currentAvailable) {
      setErrorMessage(`Insufficient leave balance. You only have ${currentAvailable} day(s) available.`);
      return;
    }

    if (!reason.trim()) {
      setErrorMessage("Please state the reason for your leave request.");
      return;
    }

    const refId = submitLeaveRequest({
      employeeId: currentUser.employeeId,
      employeeName: `${currentUser.personalInfo.firstName} ${currentUser.personalInfo.lastName}`,
      department: currentUser.department,
      leaveType,
      startDate,
      endDate,
      totalDays: calculatedDays,
      reason: reason.trim(),
      contactNumber,
      attachmentName: "medical_cert_scan.pdf",
    });

    router.push(`/employee/leave/confirmed?id=${refId}`);
  };

  // User's own leave requests
  const myLeaves = leaveRequests.filter((r) => r.employeeId === currentUser.employeeId);

  return (
    <AppShell title="Leave Application & Balances">
      <div className={styles.pageContainer}>
        {/* Title Header */}
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#151515" }}>Leave Management</h2>
          <p style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>
            File leave requests, track remaining allowances, and monitor application approvals.
          </p>
        </div>

        {/* Leave Balances Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          <div
            style={{
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: 12,
              padding: "18px 20px",
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, color: "#166534", textTransform: "uppercase" }}>
              Vacation Leave
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#15803d", marginTop: 8 }}>
              {leaveBalances.vacation.available}
              <span style={{ fontSize: 14, fontWeight: 500, color: "#166534" }}>
                {" "}
                / {leaveBalances.vacation.total} days
              </span>
            </div>
            <div style={{ fontSize: 11, color: "#15803d", marginTop: 4 }}>Standard annual paid vacation</div>
          </div>

          <div
            style={{
              background: "#eff6ff",
              border: "1px solid #bfdbfe",
              borderRadius: 12,
              padding: "18px 20px",
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, color: "#1e40af", textTransform: "uppercase" }}>
              Sick Leave
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#1d4ed8", marginTop: 8 }}>
              {leaveBalances.sick.available}
              <span style={{ fontSize: 14, fontWeight: 500, color: "#1e40af" }}>
                {" "}
                / {leaveBalances.sick.total} days
              </span>
            </div>
            <div style={{ fontSize: 11, color: "#1d4ed8", marginTop: 4 }}>Paid medical and health allowance</div>
          </div>

          <div
            style={{
              background: "#fdf4ff",
              border: "1px solid #f0abfc",
              borderRadius: 12,
              padding: "18px 20px",
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, color: "#86198f", textTransform: "uppercase" }}>
              Special Leave
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#a21caf", marginTop: 8 }}>
              {leaveBalances.special.available}
              <span style={{ fontSize: 14, fontWeight: 500, color: "#86198f" }}>
                {" "}
                / {leaveBalances.special.total} days
              </span>
            </div>
            <div style={{ fontSize: 11, color: "#a21caf", marginTop: 4 }}>Emergency & bereavement allowance</div>
          </div>

          <div
            style={{
              background: "#fff7ed",
              border: "1px solid #fed7aa",
              borderRadius: 12,
              padding: "18px 20px",
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, color: "#9a3412", textTransform: "uppercase" }}>
              Maternity / Paternity
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#c2410c", marginTop: 8 }}>
              {leaveBalances.maternity.available}
              <span style={{ fontSize: 14, fontWeight: 500, color: "#9a3412" }}>
                {" "}
                / {leaveBalances.maternity.total} days
              </span>
            </div>
            <div style={{ fontSize: 11, color: "#c2410c", marginTop: 4 }}>Statutory family leave allowance</div>
          </div>
        </div>

        {/* Leave Filing Form & History Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1.5fr", gap: 24, alignItems: "start" }}>
          {/* Filing Form Card */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2ddd6",
              borderRadius: 12,
              padding: 24,
              boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
            }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#151515", marginBottom: 16 }}>
              File a New Leave Request
            </h3>

            {errorMessage && (
              <div
                style={{
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  color: "#b91c1c",
                  padding: "10px 14px",
                  borderRadius: 8,
                  fontSize: 13,
                  marginBottom: 16,
                }}
              >
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                  Leave Category
                </label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value as LeaveType)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 8,
                    border: "1px solid #d1d5db",
                    fontSize: 14,
                    outline: "none",
                    background: "#f9fafb",
                  }}
                >
                  <option value="VACATION">Vacation Leave (VL)</option>
                  <option value="SICK">Sick Leave (SL)</option>
                  <option value="SPECIAL">Special Privilege Leave (SPL)</option>
                  <option value="MATERNITY">Maternity / Paternity Leave</option>
                </select>
                <div style={{ fontSize: 11, color: "#6b7280", marginTop: 4 }}>
                  Available balance: <strong>{currentAvailable} days</strong>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 8,
                      border: "1px solid #d1d5db",
                      fontSize: 14,
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 8,
                      border: "1px solid #d1d5db",
                      fontSize: 14,
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              {calculatedDays > 0 && (
                <div
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    background: "#fdf5f7",
                    border: "1px solid #f6dbe2",
                    color: "#590b28",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  Total Duration: {calculatedDays} business day(s) requested
                </div>
              )}

              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                  Reason / Purpose
                </label>
                <textarea
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Specify details or reason for leave..."
                  required
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 8,
                    border: "1px solid #d1d5db",
                    fontSize: 14,
                    outline: "none",
                    resize: "vertical",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                  Contact Number While On Leave
                </label>
                <input
                  type="text"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  placeholder="+63 9XX XXX XXXX"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 8,
                    border: "1px solid #d1d5db",
                    fontSize: 14,
                    outline: "none",
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  marginTop: 8,
                  padding: "12px 20px",
                  borderRadius: 8,
                  background: "#590b28",
                  color: "#ffffff",
                  fontSize: 14,
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  transition: "background 140ms ease",
                }}
              >
                Submit Leave Application
              </button>
            </form>
          </div>

          {/* Leave History Table Card */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2ddd6",
              borderRadius: 12,
              padding: 24,
              boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
            }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#151515", marginBottom: 16 }}>
              My Leave Applications History
            </h3>

            {myLeaves.length === 0 ? (
              <div style={{ textAlign: "center", padding: 36, color: "#64748b" }}>
                <p style={{ fontSize: 14 }}>No leave requests filed yet.</p>
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, textAlign: "left" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #e8e4dc", color: "#64748b" }}>
                      <th style={{ padding: "10px 12px" }}>Ref ID</th>
                      <th style={{ padding: "10px 12px" }}>Type</th>
                      <th style={{ padding: "10px 12px" }}>Date Range</th>
                      <th style={{ padding: "10px 12px" }}>Days</th>
                      <th style={{ padding: "10px 12px" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myLeaves.map((leave) => (
                      <tr key={leave.id} style={{ borderBottom: "1px solid #f1ede6" }}>
                        <td style={{ padding: "12px 12px", fontWeight: 700, color: "#111827" }}>
                          {leave.id}
                        </td>
                        <td style={{ padding: "12px 12px", color: "#374151" }}>
                          {leave.leaveType}
                        </td>
                        <td style={{ padding: "12px 12px", color: "#4b5563" }}>
                          {leave.startDate} to {leave.endDate}
                        </td>
                        <td style={{ padding: "12px 12px", fontWeight: 600 }}>
                          {leave.totalDays}
                        </td>
                        <td style={{ padding: "12px 12px" }}>
                          <span
                            style={{
                              padding: "4px 8px",
                              borderRadius: 6,
                              fontSize: 11,
                              fontWeight: 700,
                              textTransform: "uppercase",
                              backgroundColor:
                                leave.status === "APPROVED"
                                  ? "#dcfce7"
                                  : leave.status === "REJECTED"
                                  ? "#fee2e2"
                                  : "#fef3c7",
                              color:
                                leave.status === "APPROVED"
                                  ? "#15803d"
                                  : leave.status === "REJECTED"
                                  ? "#b91c1c"
                                  : "#b45309",
                            }}
                          >
                            {leave.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
