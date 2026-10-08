"use client";

import React, { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useEms, TaskItem, TaskStatus } from "@/context/EmsStore";
import styles from "@/components/employee/EmployeeStyles.module.css";

export default function EmployeeTasksPage() {
  const { currentUser, tasks, updateTaskStatus } = useEms();
  const [filterTab, setFilterTab] = useState<"ALL" | "IN_PROGRESS" | "COMPLETED">("ALL");
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const [newStatus, setNewStatus] = useState<TaskStatus>("IN_PROGRESS");
  const [remarks, setRemarks] = useState("");

  const myTasks = tasks.filter((t) => t.assignedTo.includes(currentUser.employeeId));
  const filteredTasks = myTasks.filter((t) => {
    if (filterTab === "IN_PROGRESS") return t.status === "IN_PROGRESS";
    if (filterTab === "COMPLETED") return t.status === "COMPLETED";
    return true;
  });

  function openDrawer(task: TaskItem) {
    setSelectedTask(task);
    setNewStatus(task.status);
    setRemarks(task.remarks || "");
  }

  function handleSaveUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (selectedTask) {
      updateTaskStatus(selectedTask.id, newStatus, remarks);
      setSelectedTask(null);
    }
  }

  return (
    <AppShell title="My Assigned Tasks">
      <div className={styles.pageContainer}>
        {/* Header & Filter Tabs */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#151515" }}>Duties & Work Deliverables</h2>
            <p style={{ fontSize: 13, color: "#64748b" }}>
              Tasks assigned by Department Manager • Department: {currentUser.department}
            </p>
          </div>
        </div>

        <div className={styles.box}>
          <div className={styles.tabsRow}>
            <button
              type="button"
              className={`${styles.tabBtn} ${filterTab === "ALL" ? styles.tabBtnActive : ""}`}
              onClick={() => setFilterTab("ALL")}
            >
              All Tasks ({myTasks.length})
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${filterTab === "IN_PROGRESS" ? styles.tabBtnActive : ""}`}
              onClick={() => setFilterTab("IN_PROGRESS")}
            >
              In Progress ({myTasks.filter((t) => t.status === "IN_PROGRESS").length})
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${filterTab === "COMPLETED" ? styles.tabBtnActive : ""}`}
              onClick={() => setFilterTab("COMPLETED")}
            >
              Completed ({myTasks.filter((t) => t.status === "COMPLETED").length})
            </button>
          </div>

          {/* Tasks Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                style={{
                  border: "1px solid #e2ddd6",
                  borderRadius: 10,
                  padding: 20,
                  background: "#ffffff",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 14,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: 4,
                        background: task.priority === "HIGH" ? "#fee2e2" : task.priority === "MEDIUM" ? "#fef3c7" : "#ecfdf5",
                        color: task.priority === "HIGH" ? "#b91c1c" : task.priority === "MEDIUM" ? "#92400e" : "#047857",
                      }}
                    >
                      {task.priority} Priority
                    </span>
                    <span
                      className={`${styles.statusChip} ${
                        task.status === "COMPLETED"
                          ? styles.chipPresent
                          : task.status === "IN_PROGRESS"
                          ? styles.chipLate
                          : styles.chipPending
                      }`}
                    >
                      {task.status.replace("_", " ")}
                    </span>
                  </div>

                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#151515", lineHeight: 1.3 }}>{task.title}</h3>
                  <p style={{ fontSize: 13, color: "#64748b", marginTop: 6, lineHeight: 1.5 }}>{task.description}</p>
                </div>

                <div style={{ borderTop: "1px solid #f1ece5", paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontSize: 11, color: "#64748b", display: "block" }}>Due Date</span>
                    <strong style={{ fontSize: 12, color: "#151515" }}>{task.dueDate}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => openDrawer(task)}
                    style={{
                      padding: "6px 14px",
                      background: "#590b28",
                      color: "#fff",
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Update Status
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide-over Drawer for Status Update */}
        {selectedTask && (
          <div className={styles.drawerOverlay} onClick={() => setSelectedTask(null)}>
            <div className={styles.drawerContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.drawerHeader}>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "#151515" }}>Update Task Progress</h3>
                  <p style={{ fontSize: 12, color: "#64748b" }}>ID: {selectedTask.id}</p>
                </div>
                <button type="button" className={styles.drawerClose} onClick={() => setSelectedTask(null)}>
                  ✕
                </button>
              </div>

              <div style={{ background: "#fbf9f5", padding: 14, borderRadius: 8, border: "1px solid #e8e3dc" }}>
                <strong style={{ fontSize: 14, color: "#151515" }}>{selectedTask.title}</strong>
                <p style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>Assigned by: {selectedTask.assignedBy}</p>
                <p style={{ fontSize: 12, color: "#64748b" }}>Due Date: {selectedTask.dueDate}</p>
              </div>

              <form onSubmit={handleSaveUpdate} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Task Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as TaskStatus)}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 6, border: "1px solid #d8d3c9", background: "#fff", fontSize: 13 }}
                  >
                    <option value="TODO">To-Do (Pending)</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="OVERDUE">Overdue</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Progress Remarks / Notes</label>
                  <textarea
                    rows={4}
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Provide details on deliverable progress..."
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 6, border: "1px solid #d8d3c9", background: "#fff", fontSize: 13 }}
                  />
                </div>

                <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                  <button
                    type="submit"
                    style={{ flex: 1, padding: "11px", background: "#590b28", color: "#fff", borderRadius: 6, fontWeight: 600, cursor: "pointer" }}
                  >
                    Save Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedTask(null)}
                    style={{ padding: "11px 18px", background: "#ede8df", color: "#555", borderRadius: 6, fontWeight: 600, cursor: "pointer" }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
