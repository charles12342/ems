"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";

function ConfirmedContent() {
  const searchParams = useSearchParams();
  const refId = searchParams.get("id") || "LR-2026-081";

  return (
    <div
      style={{
        maxWidth: 580,
        margin: "40px auto",
        textAlign: "center",
        background: "#ffffff",
        border: "1px solid #e2ddd6",
        borderRadius: 16,
        padding: "48px 36px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: "#ecfdf5",
          color: "#059669",
          display: "grid",
          placeItems: "center",
          margin: "0 auto 20px",
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h2 style={{ fontSize: 24, fontWeight: 800, color: "#111827", marginBottom: 8 }}>
        Leave Request Submitted!
      </h2>
      <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.5, marginBottom: 24 }}>
        Your leave application has been logged and queued for department manager review and adjudication.
      </p>

      <div
        style={{
          background: "#faf9f6",
          border: "1px solid #e8e4dc",
          borderRadius: 10,
          padding: "16px 20px",
          marginBottom: 28,
        }}
      >
        <div style={{ fontSize: 12, color: "#6b7280", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600 }}>
          Tracking Reference Number
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: "#590b28", marginTop: 4 }}>
          {refId}
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <Link
          href="/employee/leave"
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            border: "1px solid #d1d5db",
            background: "#ffffff",
            color: "#374151",
            fontSize: 13,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          View Leave Records
        </Link>
        <Link
          href="/employee/dashboard"
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            background: "#590b28",
            color: "#ffffff",
            fontSize: 13,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default function LeaveConfirmedPage() {
  return (
    <AppShell title="Application Confirmation">
      <Suspense fallback={<div>Loading confirmation...</div>}>
        <ConfirmedContent />
      </Suspense>
    </AppShell>
  );
}
