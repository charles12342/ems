"use client";

import React, { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useEms } from "@/context/EmsStore";
import styles from "@/components/employee/EmployeeStyles.module.css";

export default function EmployeeProfilePage() {
  const { currentUser, updatePersonalInfo } = useEms();
  const [activeTab, setActiveTab] = useState<"personal" | "company">("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [saveNotice, setSaveNotice] = useState("");

  const [formData, setFormData] = useState({
    firstName: currentUser.personalInfo.firstName,
    lastName: currentUser.personalInfo.lastName,
    alternateEmail: currentUser.personalInfo.alternateEmail,
    contactNumber: currentUser.personalInfo.contactNumber,
    address: currentUser.personalInfo.address,
    birthDate: currentUser.personalInfo.birthDate,
    gender: currentUser.personalInfo.gender,
    civilStatus: currentUser.personalInfo.civilStatus,
  });

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    updatePersonalInfo(currentUser.employeeId, formData);
    setIsEditing(false);
    setSaveNotice("Personal information updated successfully.");
    setTimeout(() => setSaveNotice(""), 3500);
  }

  return (
    <AppShell title="Account Information">
      <div className={styles.pageContainer}>
        {/* Profile Card Header */}
        <div className={styles.box} style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "#590b28",
              color: "#fff",
              display: "grid",
              placeItems: "center",
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            {currentUser.personalInfo.firstName.charAt(0)}
          </div>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "#151515" }}>
              {currentUser.personalInfo.firstName} {currentUser.personalInfo.lastName}
            </h2>
            <p style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>
              {currentUser.position} • {currentUser.department}
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <span className={`${styles.statusChip} ${styles.chipPresent}`}>Active Employee</span>
              <span style={{ fontSize: 11, background: "#f1ede5", padding: "4px 8px", borderRadius: 4, color: "#555" }}>
                ID: {currentUser.employeeId}
              </span>
            </div>
          </div>
        </div>

        {saveNotice && (
          <div style={{ padding: "10px 16px", background: "#ecfdf5", border: "1px solid #a7f3d0", color: "#065f46", borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
            {saveNotice}
          </div>
        )}

        {/* Tab Navigation */}
        <div className={styles.box}>
          <div className={styles.tabsRow}>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === "personal" ? styles.tabBtnActive : ""}`}
              onClick={() => setActiveTab("personal")}
            >
              Personal Information (Editable)
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === "company" ? styles.tabBtnActive : ""}`}
              onClick={() => setActiveTab("company")}
            >
              Company Information (Locked)
            </button>
          </div>

          {activeTab === "personal" ? (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <p style={{ fontSize: 13, color: "#64748b" }}>
                  Review or update your personal contact and address details.
                </p>
                {!isEditing && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    style={{
                      padding: "8px 16px",
                      background: "#590b28",
                      color: "#fff",
                      borderRadius: 6,
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              <form onSubmit={handleSave}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>First Name</label>
                    <input
                      disabled={!isEditing}
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      style={{ width: "100%", padding: "10px 12px", border: "1px solid #d8d3c9", borderRadius: 6, background: isEditing ? "#fff" : "#fbf9f5" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Last Name</label>
                    <input
                      disabled={!isEditing}
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      style={{ width: "100%", padding: "10px 12px", border: "1px solid #d8d3c9", borderRadius: 6, background: isEditing ? "#fff" : "#fbf9f5" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Company Email (Primary)</label>
                    <input
                      disabled
                      value={currentUser.email}
                      style={{ width: "100%", padding: "10px 12px", border: "1px solid #d8d3c9", borderRadius: 6, background: "#fbf9f5" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Alternate Email</label>
                    <input
                      disabled={!isEditing}
                      value={formData.alternateEmail}
                      onChange={(e) => setFormData({ ...formData, alternateEmail: e.target.value })}
                      style={{ width: "100%", padding: "10px 12px", border: "1px solid #d8d3c9", borderRadius: 6, background: isEditing ? "#fff" : "#fbf9f5" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Contact Number</label>
                    <input
                      disabled={!isEditing}
                      value={formData.contactNumber}
                      onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                      style={{ width: "100%", padding: "10px 12px", border: "1px solid #d8d3c9", borderRadius: 6, background: isEditing ? "#fff" : "#fbf9f5" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Home Address</label>
                    <input
                      disabled={!isEditing}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      style={{ width: "100%", padding: "10px 12px", border: "1px solid #d8d3c9", borderRadius: 6, background: isEditing ? "#fff" : "#fbf9f5" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Date of Birth</label>
                    <input
                      type="date"
                      disabled={!isEditing}
                      value={formData.birthDate}
                      onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                      style={{ width: "100%", padding: "10px 12px", border: "1px solid #d8d3c9", borderRadius: 6, background: isEditing ? "#fff" : "#fbf9f5" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Civil Status</label>
                    <select
                      disabled={!isEditing}
                      value={formData.civilStatus}
                      onChange={(e) => setFormData({ ...formData, civilStatus: e.target.value })}
                      style={{ width: "100%", padding: "10px 12px", border: "1px solid #d8d3c9", borderRadius: 6, background: isEditing ? "#fff" : "#fbf9f5" }}
                    >
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  </div>
                </div>

                {isEditing && (
                  <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
                    <button
                      type="submit"
                      style={{ padding: "10px 24px", background: "#590b28", color: "#fff", borderRadius: 6, fontWeight: 600, cursor: "pointer" }}
                    >
                      Update Profile
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      style={{ padding: "10px 20px", background: "#ede8df", color: "#555", borderRadius: 6, fontWeight: 600, cursor: "pointer" }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>
          ) : (
            <div>
              <div style={{ padding: "12px 16px", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, marginBottom: 20, color: "#92400e", fontSize: 13, fontWeight: 600 }}>
                🔒 Assigned by the company — Locked for editing. Only HR or department administrators can modify organizational records.
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 4 }}>Employee ID</label>
                  <input disabled value={currentUser.employeeId} style={{ width: "100%", padding: "10px 12px", border: "1px solid #e0dbd0", borderRadius: 6, background: "#fbf9f5", fontWeight: 700 }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 4 }}>Department</label>
                  <input disabled value={currentUser.department} style={{ width: "100%", padding: "10px 12px", border: "1px solid #e0dbd0", borderRadius: 6, background: "#fbf9f5" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 4 }}>Designation / Position</label>
                  <input disabled value={currentUser.position} style={{ width: "100%", padding: "10px 12px", border: "1px solid #e0dbd0", borderRadius: 6, background: "#fbf9f5" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 4 }}>Date Hired</label>
                  <input disabled value={currentUser.companyInfo.dateHired} style={{ width: "100%", padding: "10px 12px", border: "1px solid #e0dbd0", borderRadius: 6, background: "#fbf9f5" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 4 }}>Employment Type</label>
                  <input disabled value={currentUser.companyInfo.employmentType} style={{ width: "100%", padding: "10px 12px", border: "1px solid #e0dbd0", borderRadius: 6, background: "#fbf9f5" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 4 }}>Reports To</label>
                  <input disabled value={currentUser.companyInfo.reportsTo} style={{ width: "100%", padding: "10px 12px", border: "1px solid #e0dbd0", borderRadius: 6, background: "#fbf9f5" }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
