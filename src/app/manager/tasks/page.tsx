"use client";

import React, { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useEms, TaskPriority, TaskStatus } from "@/context/EmsStore";
import styles from "@/components/employee/EmployeeStyles.module.css";

export default function ManagerTasksPage() {
  const { currentUser, users, tasks, createTask, deleteTask, updateTaskStatus } = useEms();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Frontend Engineering");
  const [priority, setPriority] = useState<TaskPriority>("MEDIUM");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  const deptMembers = users.filter((u) => u.department === currentUser.department);
  const deptTasks = tasks.filter((t) => t.department === currentUser.department);

  const filteredTasks = deptTasks.filter((t) => {
    if (filterStatus === "ALL") return true;
    return t.status === filterStatus;
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !dueDate) return;

    createTask({
      title: title.trim(),
      category,
      description: description.trim(),
      priority,
      status: "TODO",
      startDate: startDate || new Date().toISOString().split("T")[0],
      dueDate,
      assignedTo: selectedEmployees.length > 0 ? selectedEmployees : [deptMembers[0]?.employeeId || ""],
      assignedBy: `${currentUser.personalInfo.firstName} ${currentUser.personalInfo.lastName}`,
      department: currentUser.department,
    });

    // Reset
    setTitle("");
    setDescription("");
    setSelectedEmployees([]);
    setIsModalOpen(false);
  };

  const toggleEmployeeSelection = (empId: string) => {
    setSelectedEmployees((prev) =>
      prev.includes(empId) ? prev.filter((id) => id !== empId) : [...prev, empId]
    );
  };

  return (
    <AppShell title="Department Task Management">
      <div className={styles.pageContainer}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "#151515" }}>Department Task Board</h2>
            <p style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>
              Assign, delegate, and track team deliverables for the {currentUser.department} team.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            style={{
              padding: "10px 18px",
              borderRadius: 8,
              background: "#590b28",
              color: "#ffffff",
              fontSize: 13,
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
            }}
          >
            + Assign New Task
          </button>
        </div>

        {/* Status Filter Tabs */}
        <div style={{ display: "flex", gap: 8, borderBottom: "1px solid #e2ddd6", paddingBottom: 12 }}>
          {["ALL", "TODO", "IN_PROGRESS", "COMPLETED", "OVERDUE"].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFilterStatus(st)}
              style={{
                padding: "6px 14px",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                background: filterStatus === st ? "#590b28" : "#f1ede6",
                color: filterStatus === st ? "#ffffff" : "#4a5568",
              }}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Task Table */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2ddd6",
            borderRadius: 12,
            padding: 20,
            boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
            overflowX: "auto",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e8e4dc", color: "#64748b" }}>
                <th style={{ padding: "10px 12px" }}>Task Title</th>
                <th style={{ padding: "10px 12px" }}>Category</th>
                <th style={{ padding: "10px 12px" }}>Priority</th>
                <th style={{ padding: "10px 12px" }}>Assigned To</th>
                <th style={{ padding: "10px 12px" }}>Due Date</th>
                <th style={{ padding: "10px 12px" }}>Status</th>
                <th style={{ padding: "10px 12px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: 32, color: "#888" }}>
                    No tasks found for the selected filter.
                  </td>
                </tr>
              ) : (
                filteredTasks.map((t) => (
                  <tr key={t.id} style={{ borderBottom: "1px solid #f0ede8" }}>
                    <td style={{ padding: "12px", fontWeight: 700, color: "#111827", maxWidth: 220 }}>
                      {t.title}
                    </td>
                    <td style={{ padding: "12px", color: "#64748b" }}>{t.category}</td>
                    <td style={{ padding: "12px" }}>
                      <span
                        style={{
                          padding: "3px 8px",
                          borderRadius: 6,
                          fontSize: 11,
                          fontWeight: 700,
                          backgroundColor:
                            t.priority === "HIGH"
                              ? "#fee2e2"
                              : t.priority === "MEDIUM"
                              ? "#fef3c7"
                              : "#e0f2fe",
                          color:
                            t.priority === "HIGH"
                              ? "#b91c1c"
                              : t.priority === "MEDIUM"
                              ? "#b45309"
                              : "#0369a1",
                        }}
                      >
                        {t.priority}
                      </span>
                    </td>
                    <td style={{ padding: "12px", color: "#374151" }}>
                      {t.assignedTo.join(", ")}
                    </td>
                    <td style={{ padding: "12px", color: "#4b5563" }}>{t.dueDate}</td>
                    <td style={{ padding: "12px" }}>
                      <select
                        value={t.status}
                        onChange={(e) => updateTaskStatus(t.id, e.target.value as TaskStatus)}
                        style={{
                          padding: "4px 8px",
                          borderRadius: 6,
                          border: "1px solid #d1d5db",
                          fontSize: 12,
                          fontWeight: 600,
                          background: "#fafafa",
                        }}
                      >
                        <option value="TODO">TODO</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="OVERDUE">OVERDUE</option>
                      </select>
                    </td>
                    <td style={{ padding: "12px" }}>
                      <button
                        type="button"
                        onClick={() => deleteTask(t.id)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#dc2626",
                          cursor: "pointer",
                          fontWeight: 600,
                          fontSize: 12,
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal Wizard to Assign Task */}
        {isModalOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.5)",
              display: "grid",
              placeItems: "center",
              zIndex: 9999,
              padding: 20,
            }}
            onClick={() => setIsModalOpen(false)}
          >
            <div
              style={{
                background: "#ffffff",
                borderRadius: 16,
                maxWidth: 540,
                width: "100%",
                padding: 28,
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#111827" }}>Assign New Team Task</h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#888" }}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateTask} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 4 }}>
                    Task Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Implement Screen 15 Attendance Grid"
                    required
                    style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "1px solid #d1d5db" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 4 }}>
                      Category
                    </label>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "1px solid #d1d5db" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 4 }}>
                      Priority
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as TaskPriority)}
                      style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "1px solid #d1d5db" }}
                    >
                      <option value="LOW">Low</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HIGH">High Priority</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 4 }}>
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "1px solid #d1d5db" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 4 }}>
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      required
                      style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "1px solid #d1d5db" }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 4 }}>
                    Assign Employees
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
                    {deptMembers.map((m) => (
                      <button
                        key={m.employeeId}
                        type="button"
                        onClick={() => toggleEmployeeSelection(m.employeeId)}
                        style={{
                          padding: "6px 12px",
                          borderRadius: 20,
                          fontSize: 12,
                          fontWeight: 600,
                          border: "1px solid #d1d5db",
                          cursor: "pointer",
                          background: selectedEmployees.includes(m.employeeId) ? "#590b28" : "#f3f4f6",
                          color: selectedEmployees.includes(m.employeeId) ? "#fff" : "#374151",
                        }}
                      >
                        {m.personalInfo.firstName} ({m.employeeId})
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 4 }}>
                    Task Instructions / Scope
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide deliverables details..."
                    style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "1px solid #d1d5db" }}
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 10 }}>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
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
                    type="submit"
                    style={{
                      padding: "8px 18px",
                      borderRadius: 6,
                      background: "#590b28",
                      color: "#fff",
                      border: "none",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Create Task
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
