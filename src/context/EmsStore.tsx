"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Role = "EMPLOYEE" | "DEPARTMENT_MANAGER";
export type AttendanceStatus = "PRESENT" | "LATE" | "ABSENT" | "ON_LEAVE" | "NOT_CLOCKED_IN";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";
export type TaskStatus = "TODO" | "IN_PROGRESS" | "COMPLETED" | "OVERDUE";
export type LeaveType = "VACATION" | "SICK" | "SPECIAL" | "MATERNITY";
export type LeaveStatus = "PENDING" | "APPROVED" | "REJECTED";
export type AnnouncementCategory = "COMPANY_UPDATE" | "POLICY" | "EVENTS" | "OTHERS";
export type AnnouncementStatus = "PUBLISHED" | "DRAFT" | "ARCHIVED";

export interface UserAccount {
  id: string;
  employeeId: string;
  username: string;
  email: string;
  role: Role;
  department: string;
  position: string;
  isActivated: boolean;
  avatarUrl: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    alternateEmail: string;
    contactNumber: string;
    address: string;
    birthDate: string;
    gender: string;
    civilStatus: string;
  };
  companyInfo: {
    dateHired: string;
    employmentType: string;
    workLocation: string;
    reportsTo: string;
  };
}

export interface DTRRecord {
  id: string;
  employeeId: string;
  date: string; // YYYY-MM-DD
  dayOfWeek: string;
  timeIn?: string;
  timeOut?: string;
  totalHours: number;
  status: AttendanceStatus;
  remarks?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  category: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  startDate: string;
  dueDate: string;
  assignedTo: string[]; // employee IDs
  assignedBy: string;   // Manager Name
  department: string;
  remarks?: string;
  attachmentName?: string;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  category: AnnouncementCategory;
  message: string;
  authorName: string;
  department: string;
  datePosted: string;
  status: AnnouncementStatus;
  attachmentName?: string;
}

export interface LeaveRequestItem {
  id: string; // e.g. "LR-2026-081"
  employeeId: string;
  employeeName: string;
  department: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  reasonDetails?: string;
  contactNumber: string;
  attachmentName?: string;
  status: LeaveStatus;
  dateFiled: string;
  managerRemarks?: string;
  rejectionReason?: string;
  history: {
    timestamp: string;
    action: string;
    actor: string;
  }[];
}

export interface LeaveBalance {
  vacation: { available: number; total: number };
  sick: { available: number; total: number };
  special: { available: number; total: number };
  maternity: { available: number; total: number };
}

// Initial Mock Seed Data
const INITIAL_USERS: UserAccount[] = [
  {
    id: "usr-1",
    employeeId: "24-2545-483",
    username: "@charles_employee",
    email: "lisingcharles@gmail.com",
    role: "EMPLOYEE",
    department: "Software Engineering",
    position: "Frontend Software Engineer",
    isActivated: true,
    avatarUrl: "/avatar.jpg",
    personalInfo: {
      firstName: "Charles",
      lastName: "Lising",
      alternateEmail: "lisingcharles@gmail.com",
      contactNumber: "+63 912 345 6789",
      address: "Manila, Philippines",
      birthDate: "2003-05-06",
      gender: "Male",
      civilStatus: "Single",
    },
    companyInfo: {
      dateHired: "2024-01-15",
      employmentType: "Regular / Full-time",
      workLocation: "Main Office (Building 2)",
      reportsTo: "Charles Joshua Lising (Department Manager)",
    },
  },
  {
    id: "usr-2",
    employeeId: "21-1022-101",
    username: "@charles_manager",
    email: "charleslising0506@gmail.com",
    role: "DEPARTMENT_MANAGER",
    department: "Software Engineering",
    position: "Software Engineering Manager",
    isActivated: true,
    avatarUrl: "/avatar.jpg",
    personalInfo: {
      firstName: "Charles Joshua",
      lastName: "Lising",
      alternateEmail: "charleslising0506@gmail.com",
      contactNumber: "+63 917 888 1234",
      address: "Quezon City, Philippines",
      birthDate: "1998-05-06",
      gender: "Male",
      civilStatus: "Single",
    },
    companyInfo: {
      dateHired: "2021-03-01",
      employmentType: "Permanent / Department Head",
      workLocation: "Main Office (Executive Wing)",
      reportsTo: "VP of Engineering",
    },
  },
  {
    id: "usr-3",
    employeeId: "24-3011-204",
    username: "@gabriel_enrile",
    email: "gabriel.enrile@quicktouch.com",
    role: "EMPLOYEE",
    department: "Software Engineering",
    position: "UI/UX Product Designer",
    isActivated: true,
    avatarUrl: "/avatar.jpg",
    personalInfo: {
      firstName: "Gabriel",
      lastName: "Enrile",
      alternateEmail: "gabriel@enrile.design",
      contactNumber: "+63 918 901 2345",
      address: "Makati City, Philippines",
      birthDate: "2002-09-14",
      gender: "Male",
      civilStatus: "Single",
    },
    companyInfo: {
      dateHired: "2024-03-01",
      employmentType: "Regular / Full-time",
      workLocation: "Main Office (Building 2)",
      reportsTo: "Maria Santos (Engineering Manager)",
    },
  },
  {
    id: "usr-4",
    employeeId: "24-4102-330",
    username: "@shayne_villaroman",
    email: "shayne.villaroman@quicktouch.com",
    role: "EMPLOYEE",
    department: "Software Engineering",
    position: "QA & Automation Specialist",
    isActivated: true,
    avatarUrl: "/avatar.jpg",
    personalInfo: {
      firstName: "Shayne",
      lastName: "Villaroman",
      alternateEmail: "shayne@villaroman.net",
      contactNumber: "+63 920 445 6789",
      address: "Taguig City, Philippines",
      birthDate: "2003-02-18",
      gender: "Female",
      civilStatus: "Single",
    },
    companyInfo: {
      dateHired: "2024-04-10",
      employmentType: "Probationary / Full-time",
      workLocation: "Main Office (Building 2)",
      reportsTo: "Maria Santos (Engineering Manager)",
    },
  },
  {
    id: "usr-5",
    employeeId: "24-5501-772",
    username: "@reyn_database",
    email: "reyn.database@quicktouch.com",
    role: "EMPLOYEE",
    department: "Software Engineering",
    position: "Database Architect",
    isActivated: true,
    avatarUrl: "/avatar.jpg",
    personalInfo: {
      firstName: "Reyn",
      lastName: "Del Rosario",
      alternateEmail: "reyn@delrosario.dev",
      contactNumber: "+63 919 777 3456",
      address: "Pasig City, Philippines",
      birthDate: "2001-08-12",
      gender: "Male",
      civilStatus: "Single",
    },
    companyInfo: {
      dateHired: "2024-02-15",
      employmentType: "Regular / Full-time",
      workLocation: "Main Office (Building 2)",
      reportsTo: "Maria Santos (Engineering Manager)",
    },
  },
];

const INITIAL_DTR: DTRRecord[] = [
  { id: "dtr-1", employeeId: "24-2545-483", date: "2026-10-01", dayOfWeek: "Thursday", timeIn: "07:55 AM", timeOut: "05:05 PM", totalHours: 9.1, status: "PRESENT", remarks: "On time" },
  { id: "dtr-2", employeeId: "24-2545-483", date: "2026-10-02", dayOfWeek: "Friday", timeIn: "08:14 AM", timeOut: "05:10 PM", totalHours: 8.9, status: "LATE", remarks: "14 mins late" },
  { id: "dtr-3", employeeId: "24-2545-483", date: "2026-10-05", dayOfWeek: "Monday", timeIn: "07:50 AM", timeOut: "05:00 PM", totalHours: 9.0, status: "PRESENT", remarks: "Early arrival" },
  { id: "dtr-4", employeeId: "24-2545-483", date: "2026-10-06", dayOfWeek: "Tuesday", timeIn: "08:00 AM", timeOut: "05:00 PM", totalHours: 9.0, status: "PRESENT", remarks: "Regular shift" },
  { id: "dtr-5", employeeId: "24-2545-483", date: "2026-10-07", dayOfWeek: "Wednesday", timeIn: "07:58 AM", timeOut: "05:02 PM", totalHours: 9.0, status: "PRESENT", remarks: "Regular shift" },
  { id: "dtr-6", employeeId: "24-2545-483", date: "2026-10-08", dayOfWeek: "Thursday", timeIn: "08:02 AM", timeOut: undefined, totalHours: 0, status: "PRESENT", remarks: "Clocked in today" },
  
  // Records for other employees for weekly grid
  { id: "dtr-10", employeeId: "24-3011-204", date: "2026-10-08", dayOfWeek: "Thursday", timeIn: "08:32 AM", timeOut: undefined, totalHours: 0, status: "LATE", remarks: "Late 32m" },
  { id: "dtr-11", employeeId: "24-4102-330", date: "2026-10-08", dayOfWeek: "Thursday", timeIn: "07:50 AM", timeOut: undefined, totalHours: 0, status: "PRESENT", remarks: "On time" },
  { id: "dtr-12", employeeId: "24-5501-772", date: "2026-10-08", dayOfWeek: "Thursday", timeIn: undefined, timeOut: undefined, totalHours: 0, status: "ON_LEAVE", remarks: "Approved Vacation Leave" },
];

const INITIAL_TASKS: TaskItem[] = [
  {
    id: "tsk-1",
    title: "Implement Responsive Desktop Layout for EMS",
    category: "Development",
    description: "Build clean, persistent sidebar shell adhering to Quicktouch velvet burgundy guidelines and desktop ergonomic rules.",
    priority: "HIGH",
    status: "IN_PROGRESS",
    startDate: "2026-10-06",
    dueDate: "2026-10-10",
    assignedTo: ["24-2545-483"],
    assignedBy: "Maria Santos",
    department: "Software Engineering",
    remarks: "Progressing smoothly on React 19 App router.",
  },
  {
    id: "tsk-2",
    title: "Audit Daily Time Record (DTR) Calculation Logic",
    category: "Quality Assurance",
    description: "Verify that work duration correctly deducts 1 hour lunch break and handles grace period for morning clock-ins.",
    priority: "MEDIUM",
    status: "TODO",
    startDate: "2026-10-08",
    dueDate: "2026-10-14",
    assignedTo: ["24-2545-483", "24-4102-330"],
    assignedBy: "Maria Santos",
    department: "Software Engineering",
  },
  {
    id: "tsk-3",
    title: "Produce High-Fidelity Figma Component Library",
    category: "Design System",
    description: "Export all color tokens, status chips, and split-pane view specifications into shared design tokens.",
    priority: "LOW",
    status: "COMPLETED",
    startDate: "2026-09-28",
    dueDate: "2026-10-05",
    assignedTo: ["24-3011-204"],
    assignedBy: "Maria Santos",
    department: "Software Engineering",
    remarks: "Delivered on Figma and approved by Gabriel Enrile.",
  },
  {
    id: "tsk-4",
    title: "Optimize PostgreSQL Schema for Leave Records",
    category: "Database",
    description: "Ensure index coverage for employee ID and date range queries in the upcoming release.",
    priority: "HIGH",
    status: "TODO",
    startDate: "2026-10-07",
    dueDate: "2026-10-12",
    assignedTo: ["24-5501-772"],
    assignedBy: "Maria Santos",
    department: "Software Engineering",
  },
];

const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: "ann-1",
    title: "Mid-October All-Hands & Technical Showcase",
    category: "EVENTS",
    message: "Join us this Friday at 3:00 PM in Conference Hall A for our monthly department all-hands. We will demo the new Quicktouch EMS platform alongside live feedback sessions.",
    authorName: "Maria Santos (Engineering Manager)",
    department: "Software Engineering",
    datePosted: "2026-10-07",
    status: "PUBLISHED",
    attachmentName: "Q4_Townhall_Agenda.pdf",
  },
  {
    id: "ann-2",
    title: "Updated Leave Filing Policy and Cutoff Guidelines",
    category: "POLICY",
    message: "Employees are reminded that all planned vacation leaves exceeding 3 days must be submitted at least one week in advance. Emergency and medical leaves must attach valid certificates.",
    authorName: "Maria Santos (Engineering Manager)",
    department: "Software Engineering",
    datePosted: "2026-10-04",
    status: "PUBLISHED",
  },
  {
    id: "ann-3",
    title: "Cloud Infrastructure Scheduled Maintenance",
    category: "COMPANY_UPDATE",
    message: "The development sandbox servers will undergo routine kernel security updates this Saturday between 1:00 AM and 5:00 AM. Please ensure active branches are committed.",
    authorName: "IT Operations Lead",
    department: "Software Engineering",
    datePosted: "2026-10-02",
    status: "PUBLISHED",
    attachmentName: "Maintenance_Notice_v2.pdf",
  },
];

const INITIAL_LEAVE_REQUESTS: LeaveRequestItem[] = [
  {
    id: "LR-2026-081",
    employeeId: "24-2545-483",
    employeeName: "Charles Joshua Lising",
    department: "Software Engineering",
    leaveType: "VACATION",
    startDate: "2026-10-19",
    endDate: "2026-10-21",
    totalDays: 3,
    reason: "Personal rest and family gathering",
    reasonDetails: "Annual leave taken during midterm break. Will be reachable by emergency phone.",
    contactNumber: "+63 912 345 6789",
    status: "PENDING",
    dateFiled: "2026-10-06",
    history: [
      { timestamp: "2026-10-06 09:30 AM", action: "Request submitted by employee", actor: "Charles Joshua Lising" },
      { timestamp: "2026-10-06 10:00 AM", action: "Queued for Department Manager review", actor: "System" },
    ],
  },
  {
    id: "LR-2026-079",
    employeeId: "24-5501-772",
    employeeName: "Reyn Del Rosario",
    department: "Software Engineering",
    leaveType: "VACATION",
    startDate: "2026-10-08",
    endDate: "2026-10-09",
    totalDays: 2,
    reason: "Out of town family travel",
    contactNumber: "+63 919 777 3456",
    status: "APPROVED",
    dateFiled: "2026-10-01",
    managerRemarks: "Approved. Handed off DB maintenance to Charles.",
    history: [
      { timestamp: "2026-10-01 11:20 AM", action: "Request submitted by employee", actor: "Reyn Del Rosario" },
      { timestamp: "2026-10-02 02:15 PM", action: "Approved with remarks", actor: "Maria Santos" },
    ],
  },
];

const INITIAL_BALANCES: Record<string, LeaveBalance> = {
  "24-2545-483": {
    vacation: { available: 12, total: 15 },
    sick: { available: 9, total: 10 },
    special: { available: 3, total: 3 },
    maternity: { available: 0, total: 0 },
  },
};

interface EmsContextType {
  currentUser: UserAccount;
  setCurrentUser: (user: UserAccount) => void;
  users: UserAccount[];
  switchRole: (role: Role) => void;
  loginWithAccount: (identifier: string) => UserAccount;
  // DTR / Attendance
  dtrRecords: DTRRecord[];
  isClockedIn: boolean;
  clockInTime: string | null;
  toggleClock: () => void;
  // Tasks
  tasks: TaskItem[];
  updateTaskStatus: (taskId: string, status: TaskStatus, remarks?: string) => void;
  createTask: (task: Omit<TaskItem, "id">) => void;
  deleteTask: (taskId: string) => void;
  // Announcements
  announcements: AnnouncementItem[];
  createAnnouncement: (announcement: Omit<AnnouncementItem, "id" | "datePosted">) => void;
  archiveAnnouncement: (id: string) => void;
  // Leaves
  leaveRequests: LeaveRequestItem[];
  leaveBalances: LeaveBalance;
  submitLeaveRequest: (req: Omit<LeaveRequestItem, "id" | "status" | "dateFiled" | "history">) => string;
  adjudicateLeave: (id: string, decision: "APPROVED" | "REJECTED", reasonOrRemarks: string) => void;
  // Profile update
  updatePersonalInfo: (employeeId: string, info: UserAccount["personalInfo"]) => void;
}

const EmsContext = createContext<EmsContextType | undefined>(undefined);

export function EmsProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<UserAccount[]>(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState<UserAccount>(INITIAL_USERS[0]);
  const [dtrRecords, setDtrRecords] = useState<DTRRecord[]>(INITIAL_DTR);
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(INITIAL_ANNOUNCEMENTS);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequestItem[]>(INITIAL_LEAVE_REQUESTS);
  const [leaveBalances, setLeaveBalances] = useState<LeaveBalance>(INITIAL_BALANCES["24-2545-483"]);

  const [isClockedIn, setIsClockedIn] = useState<boolean>(true);
  const [clockInTime, setClockInTime] = useState<string | null>("08:02 AM");

  // Load from localStorage if present
  useEffect(() => {
    try {
      const savedUserRole = localStorage.getItem("quicktouch_user_role");
      if (savedUserRole === "DEPARTMENT_MANAGER") {
        setCurrentUser(INITIAL_USERS[1]);
      }
    } catch {
      // Ignore fallback
    }
  }, []);

  function switchRole(role: Role) {
    if (role === "DEPARTMENT_MANAGER") {
      setCurrentUser(INITIAL_USERS[1]);
      localStorage.setItem("quicktouch_user_role", "DEPARTMENT_MANAGER");
    } else {
      setCurrentUser(INITIAL_USERS[0]);
      localStorage.setItem("quicktouch_user_role", "EMPLOYEE");
    }
  }

  function loginWithAccount(identifier: string): UserAccount {
    const clean = identifier.trim().toLowerCase();
    const isManager =
      clean === "charleslising0506@gmail.com" ||
      clean.includes("manager") ||
      clean.includes("santos") ||
      clean === "@charles_manager";

    const targetUser = isManager ? INITIAL_USERS[1] : INITIAL_USERS[0];
    setCurrentUser(targetUser);
    localStorage.setItem("quicktouch_user_role", targetUser.role);
    return targetUser;
  }

  function toggleClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
    const todayStr = now.toISOString().split("T")[0];

    if (!isClockedIn) {
      setIsClockedIn(true);
      setClockInTime(timeStr);
      const newRecord: DTRRecord = {
        id: "dtr-" + Date.now(),
        employeeId: currentUser.employeeId,
        date: todayStr,
        dayOfWeek: now.toLocaleDateString([], { weekday: "long" }),
        timeIn: timeStr,
        totalHours: 0,
        status: "PRESENT",
        remarks: "Clocked in online",
      };
      setDtrRecords((prev) => [newRecord, ...prev]);
    } else {
      setIsClockedIn(false);
      setDtrRecords((prev) =>
        prev.map((rec) => {
          if (rec.date === todayStr && rec.employeeId === currentUser.employeeId) {
            return {
              ...rec,
              timeOut: timeStr,
              totalHours: 8.5,
              remarks: "Shift completed",
            };
          }
          return rec;
        })
      );
    }
  }

  function updateTaskStatus(taskId: string, status: TaskStatus, remarks?: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status, remarks: remarks || t.remarks } : t))
    );
  }

  function createTask(task: Omit<TaskItem, "id">) {
    const newTask: TaskItem = {
      ...task,
      id: "tsk-" + Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
  }

  function deleteTask(taskId: string) {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  }

  function createAnnouncement(announcement: Omit<AnnouncementItem, "id" | "datePosted">) {
    const todayStr = new Date().toISOString().split("T")[0];
    const newAnn: AnnouncementItem = {
      ...announcement,
      id: "ann-" + Date.now(),
      datePosted: todayStr,
    };
    setAnnouncements((prev) => [newAnn, ...prev]);
  }

  function archiveAnnouncement(id: string) {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "ARCHIVED" } : a))
    );
  }

  function submitLeaveRequest(req: Omit<LeaveRequestItem, "id" | "status" | "dateFiled" | "history">): string {
    const newId = "LR-2026-0" + (Math.floor(Math.random() * 80) + 20);
    const todayStr = new Date().toISOString().split("T")[0];
    const timeNow = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const newReq: LeaveRequestItem = {
      ...req,
      id: newId,
      status: "PENDING",
      dateFiled: todayStr,
      history: [
        { timestamp: `${todayStr} ${timeNow}`, action: "Request submitted by employee", actor: req.employeeName },
        { timestamp: `${todayStr} ${timeNow}`, action: "Queued for Manager review", actor: "System" },
      ],
    };

    setLeaveRequests((prev) => [newReq, ...prev]);
    return newId;
  }

  function adjudicateLeave(id: string, decision: "APPROVED" | "REJECTED", reasonOrRemarks: string) {
    const todayStr = new Date().toISOString().split("T")[0];
    const timeNow = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setLeaveRequests((prev) =>
      prev.map((req) => {
        if (req.id === id) {
          const updated: LeaveRequestItem = {
            ...req,
            status: decision,
            managerRemarks: decision === "APPROVED" ? reasonOrRemarks : undefined,
            rejectionReason: decision === "REJECTED" ? reasonOrRemarks : undefined,
            history: [
              ...req.history,
              {
                timestamp: `${todayStr} ${timeNow}`,
                action: decision === "APPROVED" ? "Leave Approved by Manager" : `Leave Rejected: ${reasonOrRemarks}`,
                actor: "Maria Santos",
              },
            ],
          };

          // If approved, decrement balance
          if (decision === "APPROVED") {
            setLeaveBalances((b) => {
              if (req.leaveType === "VACATION") {
                return { ...b, vacation: { ...b.vacation, available: Math.max(0, b.vacation.available - req.totalDays) } };
              } else if (req.leaveType === "SICK") {
                return { ...b, sick: { ...b.sick, available: Math.max(0, b.sick.available - req.totalDays) } };
              }
              return b;
            });
          }

          return updated;
        }
        return req;
      })
    );
  }

  function updatePersonalInfo(employeeId: string, info: UserAccount["personalInfo"]) {
    setUsers((prev) =>
      prev.map((u) => (u.employeeId === employeeId ? { ...u, personalInfo: { ...info } } : u))
    );
    if (currentUser.employeeId === employeeId) {
      setCurrentUser((prev) => ({ ...prev, personalInfo: { ...info } }));
    }
  }

  return (
    <EmsContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        users,
        switchRole,
        loginWithAccount,
        dtrRecords,
        isClockedIn,
        clockInTime,
        toggleClock,
        tasks,
        updateTaskStatus,
        createTask,
        deleteTask,
        announcements,
        createAnnouncement,
        archiveAnnouncement,
        leaveRequests,
        leaveBalances,
        submitLeaveRequest,
        adjudicateLeave,
        updatePersonalInfo,
      }}
    >
      {children}
    </EmsContext.Provider>
  );
}

export function useEms() {
  const context = useContext(EmsContext);
  if (!context) {
    throw new Error("useEms must be used within an EmsProvider");
  }
  return context;
}
