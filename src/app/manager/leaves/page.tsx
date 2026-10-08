"use client";

import React, { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useEms, LeaveRequestItem, LeaveStatus } from "@/context/EmsStore";
import styles from "@/components/employee/EmployeeStyles.module.css";

export default function ManagerLeavesPage() {
  const { leaveRequests, adjudicateLeave } = useEms();

  const [activeTab, setActiveTab] = useState<"ALL" | LeaveStatus>("PENDING");
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequestItem | null>(null);
  const [actionType, setActionType] = useState<"APPROVE" | "REJECT" | null>(null);
  const [remarks, setRemarks] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const filteredRequests = leaveRequests.filter((req) => {
    if (activeTab === "ALL") return true;
    return req.status === activeTab;
  });

  const handleOpenAdjudicate = (req: LeaveRequestItem, type: "APPROVE" | "REJECT") => {
    setSelectedRequest(req);
    setActionType(type);
    setRemarks(type === "APPROVE" ? "Approved by department manager" : "");
    setErrorMessage("");
  };

  const handleConfirmDecision = () => {
    if (!selectedRequest || !actionType) return;

    if (actionType === "REJECT" && !remarks.trim()) {
      setErrorMessage("Please provide a reason for rejecting this leave application.");
      return;
    }

    const decision: "APPROVED" | "REJECTED" = actionType === "APPROVE" ? "APPROVED" : "REJECTED";
    adjudicateLeave(selectedRequest.id, decision, remarks.trim());

    setSelectedRequest(null);
    setActionType(null);
    setRemarks("");
  };

  return (
    <AppShell title="Leave Requests Adjudication">
      <div className={styles.pageContainer}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "#151515" }}>Leave Adjudication Queue</h2>
            <p style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>
              Review, approve, or reject team leave filings with official audit remarks.
            </p>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            {(["PENDING", "APPROVED", "REJECTED", "ALL"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  background: activeTab === tab ? "#590b28" : "#f1ede6",
                  color: activeTab === tab ? "#ffffff" : "#4a5568",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Adjudication Table */}
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
                <th style={{ padding: "12px 14px" }}>Ref ID</th>
                <th style={{ padding: "12px 14px" }}>Employee Name</th>
                <th style={{ padding: "12px 14px" }}>Leave Type</th>
                <th style={{ padding: "12px 14px" }}>Inclusive Dates</th>
                <th style={{ padding: "12px 14px" }}>Days</th>
                <th style={{ padding: "12px 14px" }}>Reason</th>
                <th style={{ padding: "12px 14px" }}>Status</th>
                <th style={{ padding: "12px 14px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center", padding: 36, color: "#888" }}>
                    No leave requests found in this status.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr key={req.id} style={{ borderBottom: "1px solid #f1ede6" }}>
                    <td style={{ padding: "14px", fontWeight: 700, color: "#111827" }}>{req.id}</td>
                    <td style={{ padding: "14px", fontWeight: 600, color: "#374151" }}>
                      {req.employeeName}
                      <div style={{ fontSize: 11, color: "#8a94a6", fontWeight: 400 }}>{req.department}</div>
                    </td>
                    <td style={{ padding: "14px", color: "#590b28", fontWeight: 600 }}>{req.leaveType}</td>
                    <td style={{ padding: "14px", color: "#4b5563" }}>
                      {req.startDate} to {req.endDate}
                    </td>
                    <td style={{ padding: "14px", fontWeight: 700 }}>{req.totalDays}</td>
                    <td style={{ padding: "14px", color: "#6b7280", maxWidth: 200 }}>{req.reason}</td>
                    <td style={{ padding: "14px" }}>
                      <span
                        style={{
                          padding: "4px 8px",
                          borderRadius: 6,
                          fontSize: 11,
                          fontWeight: 700,
                          backgroundColor:
                            req.status === "APPROVED"
                              ? "#dcfce7"
                              : req.status === "REJECTED"
                              ? "#fee2e2"
                              : "#fef3c7",
                          color:
                            req.status === "APPROVED"
                              ? "#15803d"
                              : req.status === "REJECTED"
                              ? "#b91c1c"
                              : "#b45309",
                        }}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td style={{ padding: "14px" }}>
                      {req.status === "PENDING" ? (
                        <div style={{ display: "flex", gap: 8 }}>
                          <button
                            type="button"
                            onClick={() => handleOpenAdjudicate(req, "APPROVE")}
                            style={{
                              padding: "6px 12px",
                              borderRadius: 6,
                              background: "#059669",
                              color: "#fff",
                              border: "none",
                              fontWeight: 600,
                              fontSize: 12,
                              cursor: "pointer",
                            }}
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenAdjudicate(req, "REJECT")}
                            style={{
                              padding: "6px 12px",
                              borderRadius: 6,
                              background: "#dc2626",
                              color: "#fff",
                              border: "none",
                              fontWeight: 600,
                              fontSize: 12,
                              cursor: "pointer",
                            }}
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span style={{ fontSize: 12, color: "#8a94a6" }}>
                          {req.managerRemarks || req.rejectionReason || "Decided"}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Adjudication Modal */}
        {selectedRequest && actionType && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.45)",
              display: "grid",
              placeItems: "center",
              zIndex: 9999,
              padding: 20,
            }}
            onClick={() => setSelectedRequest(null)}
          >
            <div
              style={{
                background: "#ffffff",
                borderRadius: 14,
                maxWidth: 480,
                width: "100%",
                padding: 28,
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "#111827", marginBottom: 8 }}>
                {actionType === "APPROVE" ? "Confirm Leave Approval" : "Reject Leave Request"}
              </h3>
              <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>
                Request {selectedRequest.id} filed by <strong>{selectedRequest.employeeName}</strong> for{" "}
                {selectedRequest.totalDays} day(s) of {selectedRequest.leaveType} leave.
              </p>

              {errorMessage && (
                <div style={{ color: "#dc2626", fontSize: 12, marginBottom: 10, fontWeight: 600 }}>
                  {errorMessage}
                </div>
              )}

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                  {actionType === "APPROVE" ? "Approval Remarks (Optional)" : "Rejection Reason (Required)"}
                </label>
                <textarea
                  rows={3}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder={
                    actionType === "APPROVE"
                      ? "e.g. Approved. Cover arrangement confirmed."
                      : "e.g. Critical project milestone overlapping with dates."
                  }
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: 6,
                    border: "1px solid #d1d5db",
                    fontSize: 13,
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setSelectedRequest(null)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 6,
                    border: "1px solid #d1d5db",
                    background: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDecision}
                  style={{
                    padding: "8px 18px",
                    borderRadius: 6,
                    background: actionType === "APPROVE" ? "#059669" : "#dc2626",
                    color: "#fff",
                    border: "none",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {actionType === "APPROVE" ? "Confirm Approval" : "Confirm Rejection"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
