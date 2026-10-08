"use client";

import React, { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useEms, AnnouncementItem, AnnouncementCategory } from "@/context/EmsStore";
import styles from "@/components/employee/EmployeeStyles.module.css";

export default function EmployeeAnnouncementsPage() {
  const { announcements } = useEms();
  const [activeTab, setActiveTab] = useState<"ALL" | AnnouncementCategory>("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNotice, setSelectedNotice] = useState<AnnouncementItem | null>(null);

  // Filter announcements
  const published = announcements.filter((a) => a.status === "PUBLISHED");
  const filtered = published.filter((a) => {
    const matchesTab = activeTab === "ALL" || a.category === activeTab;
    const matchesSearch =
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getCategoryBadgeClass = (category: AnnouncementCategory) => {
    switch (category) {
      case "COMPANY_UPDATE":
        return styles.badgeUpdate;
      case "POLICY":
        return styles.badgePolicy;
      case "EVENTS":
        return styles.badgeEvent;
      default:
        return styles.badgeGeneral;
    }
  };

  const getCategoryLabel = (category: AnnouncementCategory) => {
    switch (category) {
      case "COMPANY_UPDATE":
        return "Company Update";
      case "POLICY":
        return "Company Policy";
      case "EVENTS":
        return "Office Event";
      default:
        return "Notice";
    }
  };

  return (
    <AppShell title="Announcements & Notices">
      <div className={styles.pageContainer}>
        {/* Header Title & Subtitle */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "#151515" }}>Company Announcements</h2>
            <p style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>
              Stay updated with organizational memos, policy updates, and team schedules.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 13, color: "#64748b" }}>
              Total notices: <strong>{published.length}</strong>
            </span>
          </div>
        </div>

        {/* Tab & Search Controls */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #e2ddd6",
            paddingBottom: 14,
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          {/* Category Tabs */}
          <div style={{ display: "flex", gap: 8 }}>
            {[
              { id: "ALL", label: "All Notices" },
              { id: "COMPANY_UPDATE", label: "Company Updates" },
              { id: "POLICY", label: "Policies" },
              { id: "EVENTS", label: "Events" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: "8px 16px",
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: activeTab === tab.id ? "#590b28" : "#f1ede6",
                  color: activeTab === tab.id ? "#ffffff" : "#4a5568",
                  transition: "all 140ms ease",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ position: "relative", minWidth: 260 }}>
            <input
              type="text"
              placeholder="Search announcements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 14px 8px 36px",
                borderRadius: 8,
                border: "1px solid #d0d0d0",
                fontSize: 13,
                outline: "none",
                background: "#fafafa",
              }}
            />
            <svg
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                width: 16,
                height: 16,
                color: "#888",
              }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>

        {/* Notices Cards Grid */}
        {filtered.length === 0 ? (
          <div
            style={{
              padding: 48,
              textAlign: "center",
              background: "#faf9f6",
              borderRadius: 12,
              border: "1px dashed #d5d0c8",
              color: "#64748b",
            }}
          >
            <p style={{ fontSize: 15, fontWeight: 600 }}>No announcements found</p>
            <p style={{ fontSize: 13, marginTop: 4 }}>
              Try adjusting your category filter or search keywords.
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 20 }}>
            {filtered.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e8e4dc",
                  borderRadius: 12,
                  padding: 22,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                  transition: "transform 140ms ease, box-shadow 140ms ease",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedNotice(item)}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: 12,
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        backgroundColor:
                          item.category === "COMPANY_UPDATE"
                            ? "#e0f2fe"
                            : item.category === "POLICY"
                            ? "#fee2e2"
                            : "#fef3c7",
                        color:
                          item.category === "COMPANY_UPDATE"
                            ? "#0369a1"
                            : item.category === "POLICY"
                            ? "#b91c1c"
                            : "#b45309",
                      }}
                    >
                      {getCategoryLabel(item.category)}
                    </span>
                    <span style={{ fontSize: 12, color: "#8a94a6" }}>{item.datePosted}</span>
                  </div>

                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "#111827", marginBottom: 8, lineHeight: 1.3 }}>
                    {item.title}
                  </h3>

                  <p
                    style={{
                      fontSize: 13,
                      color: "#4b5563",
                      lineHeight: 1.5,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {item.message}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: 18,
                    paddingTop: 14,
                    borderTop: "1px solid #f0ede8",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontSize: 12, color: "#6b7280" }}>
                    Posted by: <strong>{item.authorName}</strong>
                  </div>

                  {item.attachmentName ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 12,
                        color: "#590b28",
                        fontWeight: 600,
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                      </svg>
                      <span>PDF Attachment</span>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detailed Modal Dialog */}
        {selectedNotice && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.45)",
              display: "grid",
              placeItems: "center",
              zIndex: 9999,
              padding: 20,
            }}
            onClick={() => setSelectedNotice(null)}
          >
            <div
              style={{
                background: "#ffffff",
                borderRadius: 16,
                maxWidth: 600,
                width: "100%",
                padding: 32,
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                position: "relative",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div>
                  <span
                    style={{
                      padding: "4px 12px",
                      borderRadius: 12,
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      backgroundColor: "#f1ede6",
                      color: "#590b28",
                    }}
                  >
                    {getCategoryLabel(selectedNotice.category)}
                  </span>
                  <div style={{ fontSize: 12, color: "#8a94a6", marginTop: 6 }}>
                    Posted on {selectedNotice.datePosted} by {selectedNotice.authorName} ({selectedNotice.department})
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedNotice(null)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 20,
                    color: "#888",
                  }}
                >
                  ✕
                </button>
              </div>

              <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 16 }}>
                {selectedNotice.title}
              </h2>

              <div
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "#374151",
                  whiteSpace: "pre-line",
                  marginBottom: 24,
                  padding: "16px 20px",
                  background: "#faf9f6",
                  borderRadius: 8,
                  border: "1px solid #ebe6df",
                }}
              >
                {selectedNotice.message}
              </div>

              {selectedNotice.attachmentName && (
                <div
                  style={{
                    padding: "14px 18px",
                    borderRadius: 10,
                    background: "#f0fdf4",
                    border: "1px solid #bbf7d0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 24,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#15803d" }}>
                        {selectedNotice.attachmentName}
                      </div>
                      <div style={{ fontSize: 11, color: "#65a30d" }}>Official Document (PDF)</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => alert(`Downloading attachment: ${selectedNotice.attachmentName}`)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: 6,
                      background: "#16a34a",
                      color: "#fff",
                      border: "none",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Download
                  </button>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setSelectedNotice(null)}
                  style={{
                    padding: "10px 24px",
                    borderRadius: 8,
                    background: "#590b28",
                    color: "#ffffff",
                    border: "none",
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  Close Notice
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
