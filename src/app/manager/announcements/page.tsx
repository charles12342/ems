"use client";

import React, { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useEms, AnnouncementCategory } from "@/context/EmsStore";
import styles from "@/components/employee/EmployeeStyles.module.css";

export default function ManagerAnnouncementsPage() {
  const { currentUser, announcements, createAnnouncement, archiveAnnouncement } = useEms();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<AnnouncementCategory>("COMPANY_UPDATE");
  const [message, setMessage] = useState("");
  const [attachmentName, setAttachmentName] = useState("");
  const [successNote, setSuccessNote] = useState("");

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    createAnnouncement({
      title: title.trim(),
      category,
      message: message.trim(),
      authorName: `${currentUser.personalInfo.firstName} ${currentUser.personalInfo.lastName}`,
      department: currentUser.department,
      status: "PUBLISHED",
      attachmentName: attachmentName.trim() || undefined,
    });

    setTitle("");
    setMessage("");
    setAttachmentName("");
    setSuccessNote("Announcement successfully published to the company board!");
    setTimeout(() => setSuccessNote(""), 4000);
  };

  return (
    <AppShell title="Announcements Studio">
      <div className={styles.pageContainer}>
        {/* Header */}
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#151515" }}>Manager Bulletin Studio</h2>
          <p style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>
            Broadcast organization-wide notices, policy memos, and department alerts.
          </p>
        </div>

        {successNote && (
          <div
            style={{
              padding: "12px 16px",
              background: "#ecfdf5",
              border: "1px solid #a7f3d0",
              color: "#065f46",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            ✓ {successNote}
          </div>
        )}

        {/* Dual Pane Layout: Composer & Live Preview */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24, alignItems: "start" }}>
          {/* Left: Composer Form */}
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
              Draft New Bulletin
            </h3>

            <form onSubmit={handlePublish} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                  Bulletin Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Q4 Townhall & Year-End Schedule"
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
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as AnnouncementCategory)}
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
                  <option value="COMPANY_UPDATE">Company Update</option>
                  <option value="POLICY">Policy Memo</option>
                  <option value="EVENTS">Office Event</option>
                  <option value="OTHERS">General Bulletin</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                  Announcement Body
                </label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter full announcement contents..."
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
                  Attachment File Name (Optional)
                </label>
                <input
                  type="text"
                  value={attachmentName}
                  onChange={(e) => setAttachmentName(e.target.value)}
                  placeholder="e.g. Q4_Schedule_Memo.pdf"
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
                }}
              >
                Publish Bulletin Immediately
              </button>
            </form>
          </div>

          {/* Right: Live Card Preview */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#64748b", textTransform: "uppercase", marginBottom: 8 }}>
              Employee Live Preview
            </div>

            <div
              style={{
                background: "#ffffff",
                border: "2px dashed #590b28",
                borderRadius: 12,
                padding: 24,
                boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span
                  style={{
                    padding: "3px 10px",
                    borderRadius: 12,
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    backgroundColor: "#fef3c7",
                    color: "#b45309",
                  }}
                >
                  {category}
                </span>
                <span style={{ fontSize: 12, color: "#8a94a6" }}>Today</span>
              </div>

              <h4 style={{ fontSize: 18, fontWeight: 800, color: "#111827", marginBottom: 10 }}>
                {title || "Untitled Announcement Preview"}
              </h4>

              <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.5, minHeight: 60, whiteSpace: "pre-line" }}>
                {message || "Type in the form on the left to see live rendering preview of the announcement..."}
              </p>

              {attachmentName && (
                <div
                  style={{
                    marginTop: 14,
                    padding: "8px 12px",
                    borderRadius: 6,
                    background: "#f0fdf4",
                    border: "1px solid #bbf7d0",
                    fontSize: 12,
                    color: "#166534",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  📎 {attachmentName}
                </div>
              )}

              <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid #f0ede8", fontSize: 12, color: "#8a94a6" }}>
                Posted by {currentUser.personalInfo.firstName} {currentUser.personalInfo.lastName} ({currentUser.department})
              </div>
            </div>

            {/* List of Published Announcements with Archive Button */}
            <div style={{ marginTop: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#64748b", textTransform: "uppercase", marginBottom: 12 }}>
                Active Published Notices ({announcements.filter((a) => a.status === "PUBLISHED").length})
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {announcements
                  .filter((a) => a.status === "PUBLISHED")
                  .map((item) => (
                    <div
                      key={item.id}
                      style={{
                        background: "#ffffff",
                        border: "1px solid #e2ddd6",
                        borderRadius: 8,
                        padding: "12px 16px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#151515" }}>{item.title}</div>
                        <div style={{ fontSize: 11, color: "#64748b" }}>
                          {item.datePosted} • {item.category}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => archiveAnnouncement(item.id)}
                        style={{
                          background: "#fee2e2",
                          color: "#b91c1c",
                          border: "none",
                          borderRadius: 6,
                          padding: "5px 10px",
                          fontSize: 11,
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        Archive
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
