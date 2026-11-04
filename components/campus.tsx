"use client";

import { useEffect, useMemo, useState } from "react";

type IconProps = { className?: string; strokeWidth?: number };

const iconPaths: Record<string, string> = {
  Activity: "M3 12h4l3-9 4 18 3-9h4",
  AlertTriangle: "M10.3 3.9 2.8 17a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0ZM12 9v4m0 4h.01",
  ArrowDownRight: "M7 7l10 10M17 7v10H7",
  ArrowUpRight: "M7 17 17 7M7 7h10v10",
  Bell: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 12h4",
  Building2: "M3 21h18M5 21V5l7-3v19m0-14h7v14M8 7h1m-1 4h1m-1 4h1m7-4h1m-1 4h1",
  CalendarDays: "M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2Zm3 10h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01",
  Check: "m5 12 4 4L19 6",
  CheckCircle2: "M22 11.1V12a10 10 0 1 1-5.9-9.1M22 4 12 14l-3-3",
  ChevronDown: "m6 9 6 6 6-6",
  CircleUserRound: "M18 20a6 6 0 0 0-12 0m6-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm10 2a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z",
  ClipboardList: "M9 5H5v16h14V5h-4M9 3h6v4H9zM8 12h8m-8 4h8",
  Clock3: "M12 8v4l3 2m7-2a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z",
  Filter: "M4 5h16l-6 7v6l-4 2v-8L4 5Z",
  LayoutDashboard: "M3 3h8v8H3zm10 0h8v5h-8zm0 7h8v11h-8zM3 13h8v8H3z",
  Loader2: "M12 2v4m0 12v4m10-10h-4M6 12H2m17.1-7.1-2.8 2.8M7.7 16.3l-2.8 2.8m14.2 0-2.8-2.8M7.7 7.7 4.9 4.9",
  MapPin: "M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Zm-5 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  Menu: "M4 6h16M4 12h16M4 18h16",
  MessageSquare: "M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 3.9a8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z",
  MoreHorizontal: "M5 12h.01M12 12h.01M19 12h.01",
  PanelLeftClose: "M3 3h18v18H3zM9 3v18m6-12-3 3 3 3",
  Plus: "M12 5v14m-7-7h14",
  Search: "m21 21-4.3-4.3M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z",
  Settings2: "M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M2 14h4m4-6h4m4 8h4",
  ShieldCheck: "M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Zm-4-11 3 3 5-5",
  Sparkles: "m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Zm7 12 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z",
  Ticket: "M2 9a3 3 0 0 0 0 6v4h20v-4a3 3 0 0 1 0-6V5H2v4Zm12-4v2m0 4v2m0 4v2",
  TrendingUp: "m22 7-8.5 8.5-5-5L2 17m14-10h6v6",
  Users2: "M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m6-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm10 10v-2a4 4 0 0 0-3-3.9m-1-12a4 4 0 0 1 0 7.8",
  Wrench: "M14.7 6.3a5 5 0 0 0-6.4 6.4L3 18l3 3 5.3-5.3a5 5 0 0 0 6.4-6.4L15 12l-3-3 2.7-2.7Z",
  X: "M18 6 6 18M6 6l12 12",
};

function createIcon(name: keyof typeof iconPaths) {
  return function InlineIcon({ className, strokeWidth = 1.8 }: IconProps) {
    return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}><path d={iconPaths[name]} /></svg>;
  };
}

const Activity = createIcon("Activity");
const AlertTriangle = createIcon("AlertTriangle");
const ArrowDownRight = createIcon("ArrowDownRight");
const ArrowUpRight = createIcon("ArrowUpRight");
const Bell = createIcon("Bell");
const Building2 = createIcon("Building2");
const CalendarDays = createIcon("CalendarDays");
const Check = createIcon("Check");
const CheckCircle2 = createIcon("CheckCircle2");
const ChevronDown = createIcon("ChevronDown");
const CircleUserRound = createIcon("CircleUserRound");
const ClipboardList = createIcon("ClipboardList");
const Clock3 = createIcon("Clock3");
const Filter = createIcon("Filter");
const LayoutDashboard = createIcon("LayoutDashboard");
const Loader2 = createIcon("Loader2");
const MapPin = createIcon("MapPin");
const Menu = createIcon("Menu");
const MessageSquare = createIcon("MessageSquare");
const MoreHorizontal = createIcon("MoreHorizontal");
const PanelLeftClose = createIcon("PanelLeftClose");
const Plus = createIcon("Plus");
const Search = createIcon("Search");
const Settings2 = createIcon("Settings2");
const ShieldCheck = createIcon("ShieldCheck");
const Sparkles = createIcon("Sparkles");
const Ticket = createIcon("Ticket");
const TrendingUp = createIcon("TrendingUp");
const Users2 = createIcon("Users2");
const Wrench = createIcon("Wrench");
const X = createIcon("X");

type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
type IssueStatus = "REPORTED" | "ASSESSED" | "ASSIGNED" | "IN_PROGRESS" | "ON_HOLD" | "RESOLVED" | "CLOSED";
type DashboardRole = "STUDENT" | "ADMIN" | "TECHNICIAN";

type Issue = {
  issue_id: number;
  title: string;
  status: IssueStatus;
  severity: Severity;
  priority_score: string;
  room_number: string;
  building_name: string;
  reported_by_name: string;
};

type ReportForm = {
  title: string;
  description: string;
  severity: Severity;
  room_number: string;
  floor_number: number;
  category_id: number;
  affected_users: number;
  location_criticality: number;
  recurrence_factor: number;
};

const initialReportForm: ReportForm = {
  title: "",
  description: "",
  severity: "MEDIUM",
  room_number: "606",
  floor_number: 6,
  category_id: 1,
  affected_users: 1,
  location_criticality: 3,
  recurrence_factor: 1,
};

const mockIssues: Issue[] = [
  {
    issue_id: 11,
    title: "Broken AC in Lab 3",
    status: "REPORTED",
    severity: "HIGH",
    priority_score: "150.00",
    room_number: "101",
    building_name: "Science Block",
    reported_by_name: "Alice Student",
  },
  {
    issue_id: 12,
    title: "Water leak near north stairwell",
    status: "IN_PROGRESS",
    severity: "CRITICAL",
    priority_score: "280.00",
    room_number: "G-04",
    building_name: "Engineering Hall",
    reported_by_name: "Marcus Lee",
  },
  {
    issue_id: 13,
    title: "Projector bulb needs replacing",
    status: "REPORTED",
    severity: "MEDIUM",
    priority_score: "84.50",
    room_number: "204",
    building_name: "Arts & Media",
    reported_by_name: "Nora Patel",
  },
  {
    issue_id: 14,
    title: "Loose desk power outlet",
    status: "RESOLVED",
    severity: "HIGH",
    priority_score: "132.00",
    room_number: "3.12",
    building_name: "Library West",
    reported_by_name: "James Wilson",
  },
  {
    issue_id: 15,
    title: "Flickering hallway light",
    status: "IN_PROGRESS",
    severity: "LOW",
    priority_score: "38.25",
    room_number: "1.08",
    building_name: "Student Commons",
    reported_by_name: "Priya Shah",
  },
  {
    issue_id: 16,
    title: "Door access reader offline",
    status: "REPORTED",
    severity: "CRITICAL",
    priority_score: "245.00",
    room_number: "B-11",
    building_name: "Innovation Center",
    reported_by_name: "Owen Brooks",
  },
];

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Report Issue", icon: Plus },
  { label: "My Tickets", icon: Ticket, count: 4 },
  { label: "Settings", icon: Settings2 },
];

const severityStyles: Record<Severity, { badge: string; dot: string; label: string; accent: string }> = {
  CRITICAL: {
    badge: "border-[var(--cf-red)]/30 bg-[var(--cf-red)]/10 text-[var(--cf-red)]",
    dot: "bg-[var(--cf-red)]",
    label: "Critical",
    accent: "from-[var(--cf-red)]/15 to-transparent",
  },
  HIGH: {
    badge: "border-[var(--cf-gold)]/40 bg-[var(--cf-gold)]/15 text-[var(--cf-dark)]",
    dot: "bg-[var(--cf-gold)]",
    label: "High",
    accent: "from-[var(--cf-gold)]/15 to-transparent",
  },
  MEDIUM: {
    badge: "border-[var(--cf-gold)]/40 bg-[var(--cf-gold)]/15 text-[var(--cf-dark)]",
    dot: "bg-[var(--cf-gold)]",
    label: "Medium",
    accent: "from-[var(--cf-gold)]/15 to-transparent",
  },
  LOW: {
    badge: "border-[var(--cf-slate)]/30 bg-[var(--cf-slate)]/10 text-[var(--cf-slate)]",
    dot: "bg-[var(--cf-slate)]",
    label: "Low",
    accent: "from-[var(--cf-slate)]/15 to-transparent",
  },
};

const statusMeta: Record<IssueStatus, { label: string; color: string; dot: string }> = {
  REPORTED: { label: "Reported", color: "text-[var(--cf-slate)]", dot: "bg-[var(--cf-slate)]" },
  ASSESSED: { label: "Assessed", color: "text-[var(--cf-slate)]", dot: "bg-[var(--cf-slate)]" },
  ASSIGNED: { label: "Assigned", color: "text-[var(--cf-slate)]", dot: "bg-[var(--cf-slate)]" },
  IN_PROGRESS: { label: "In progress", color: "text-[var(--cf-slate)]", dot: "bg-[var(--cf-slate)]" },
  ON_HOLD: { label: "On hold", color: "text-[var(--cf-gold)]", dot: "bg-[var(--cf-gold)]" },
  RESOLVED: { label: "Resolved", color: "text-[var(--cf-slate)]", dot: "bg-[var(--cf-slate)]" },
  CLOSED: { label: "Closed", color: "text-[var(--cf-slate)]", dot: "bg-[var(--cf-slate)]" },
};

const statusOptions: IssueStatus[] = ["REPORTED", "ASSESSED", "ASSIGNED", "IN_PROGRESS", "ON_HOLD", "RESOLVED", "CLOSED"];

function normalizeIssue(issue: Issue): Issue {
  return {
    ...issue,
    status: typeof issue.status === "string" && Object.prototype.hasOwnProperty.call(statusMeta, issue.status)
      ? issue.status
      : "REPORTED",
  };
}

function formatScore(score: string) {
  return Number(score).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Sidebar({ onNavigate, role, userName }: { onNavigate: (label: string) => void; role: DashboardRole; userName: string }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[272px] flex-col border-r border-white/10 bg-[var(--cf-dark)] px-4 py-5 text-white backdrop-blur-xl lg:flex">
      <div className="flex items-center gap-3 px-3">
        <div className="relative flex size-10 items-center justify-center overflow-hidden rounded-[14px] bg-[var(--cf-dark)] shadow-[0_10px_24px_-10px_rgba(15,23,42,0.7)]">
          <div className="absolute -right-2 -top-3 size-8 rounded-full bg-[var(--cf-slate)]/80 blur-xl" />
          <Wrench className="relative size-[18px] text-white" strokeWidth={2.2} />
        </div>
        <div>
          <div className="font-semibold tracking-[-0.03em] text-white">CampusFix</div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--cf-beige)]">Operations OS</div>
        </div>
      </div>

      <div className="mt-10 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--cf-beige)]">Workspace</div>
      <nav className="mt-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => onNavigate(item.label)}
              className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                item.active
                  ? "bg-[var(--cf-beige)] text-[var(--cf-dark)] shadow-[0_12px_24px_-16px_rgba(15,23,42,0.8)]"
                  : "text-[var(--cf-beige)] hover:bg-[var(--cf-slate)] hover:text-white"
              }`}
            >
              <Icon className={`size-[18px] ${item.active ? "text-[var(--cf-dark)]" : "text-[var(--cf-beige)] group-hover:text-white"}`} strokeWidth={1.8} />
              <span className="flex-1">{item.label}</span>
              {item.count ? <span className={`rounded-full px-2 py-0.5 text-[11px] ${item.active ? "bg-[var(--cf-slate)] text-white" : "bg-[var(--cf-gold)] text-[var(--cf-dark)]"}`}>{item.count}</span> : null}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-white/10 bg-[var(--cf-slate)] p-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-white">
          <Sparkles className="size-4 text-[var(--cf-beige)]" />
          <span>Smart campus insights</span>
        </div>
        <p className="mt-2 text-xs leading-5 text-[var(--cf-beige)]">Prioritize maintenance work before it disrupts the day.</p>
        <button onClick={() => onNavigate("Weekly pulse")} className="mt-3 text-xs font-semibold text-white transition hover:text-[var(--cf-beige)]">View weekly pulse <span aria-hidden="true">↗</span></button>
      </div>

      <div className="mt-4 flex items-center gap-3 border-t border-white/10 px-3 pt-4">
        <div className="flex size-9 items-center justify-center rounded-xl bg-[var(--cf-beige)] text-xs font-semibold text-[var(--cf-dark)]">AS</div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-white">{userName}</div>
          <div className="text-xs text-[var(--cf-beige)]">{role} account</div>
        </div>
        <MoreHorizontal className="size-4 text-[var(--cf-beige)]" />
      </div>
    </aside>
  );
}

function MobileNav({ open, onClose, onNavigate }: { open: boolean; onClose: () => void; onNavigate: (label: string) => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button className="absolute inset-0 bg-[var(--cf-dark)]/30 backdrop-blur-sm" aria-label="Close navigation" onClick={onClose} />
      <aside className="relative flex h-full w-[286px] flex-col border-r border-[var(--cf-slate)] bg-white px-4 py-5 shadow-2xl">
        <div className="flex items-center justify-between px-3">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-[14px] bg-[var(--cf-dark)] text-white"><Wrench className="size-[18px]" /></div>
            <div className="font-semibold tracking-[-0.03em] text-[var(--cf-dark)]">CampusFix</div>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-[var(--cf-slate)] hover:bg-[var(--cf-slate)] hover:text-[var(--cf-slate)]"><PanelLeftClose className="size-4" /></button>
        </div>
        <div className="mt-10 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--cf-slate)]">Workspace</div>
        <nav className="mt-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.label} onClick={() => { onNavigate(item.label); onClose(); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium ${item.active ? "bg-[var(--cf-dark)] text-white" : "text-[var(--cf-slate)] hover:bg-[var(--cf-slate)]"}`}>
                <Icon className={`size-[18px] ${item.active ? "text-[var(--cf-slate)]" : "text-[var(--cf-slate)]"}`} />
                <span className="flex-1">{item.label}</span>
                {item.count ? <span className="rounded-full bg-[var(--cf-slate)] px-2 py-0.5 text-[11px] text-[var(--cf-slate)]">{item.count}</span> : null}
              </button>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}

function Topbar({ onOpenMenu, onSearch, onNotify, role, userName, userEmail }: { onOpenMenu: () => void; onSearch: (value: string) => void; onNotify: () => void; role: DashboardRole; userName: string; userEmail: string }) {
  const [profileOpen, setProfileOpen] = useState(false);

  async function handleLogout() {
    try {
      const response = await fetch("/api/logout", { method: "POST" });
      if (!response.ok) {
        throw new Error("Logout failed");
      }
      window.location.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  }

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--cf-slate)]/70 bg-[var(--cf-beige)]/85 backdrop-blur-xl">
      <div className="flex h-[74px] items-center gap-4 px-4 sm:px-6 lg:px-10">
        <button className="rounded-xl border border-[var(--cf-slate)] bg-white p-2.5 text-[var(--cf-slate)] shadow-sm lg:hidden" onClick={onOpenMenu} aria-label="Open navigation"><Menu className="size-5" /></button>
        <div className="relative hidden max-w-[420px] flex-1 md:block">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-[17px] -translate-y-1/2 text-[var(--cf-slate)]" />
          <input aria-label="Search workspace" onChange={(event) => onSearch(event.target.value)} placeholder="Search issues, buildings, people..." className="h-11 w-full rounded-xl border border-[var(--cf-slate)] bg-white/80 pl-10 pr-14 text-sm text-[var(--cf-dark)] outline-none transition placeholder:text-[var(--cf-slate)] focus:border-[var(--cf-slate)] focus:ring-4 focus:ring-[var(--cf-slate)]/70" />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-[var(--cf-slate)] bg-[var(--cf-slate)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--cf-slate)]">⌘ K</span>
        </div>
        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4">
          <button onClick={onNotify} className="relative rounded-xl p-2.5 text-[var(--cf-slate)] transition hover:bg-white hover:text-[var(--cf-dark)]" aria-label="Notifications">
            <Bell className="size-[19px]" strokeWidth={1.8} />
            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-[var(--cf-slate)] ring-2 ring-[var(--cf-beige)]" />
          </button>
          <div className="hidden h-7 w-px bg-[var(--cf-slate)] sm:block" />
          <button onClick={() => setProfileOpen((open) => !open)} className="flex items-center gap-3 rounded-xl py-1.5 pl-1.5 pr-2 transition hover:bg-white" aria-label="Open profile menu" aria-expanded={profileOpen}>
            <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--cf-slate)] to-[var(--cf-beige)] text-xs font-semibold text-white shadow-sm">{initials(userName)}</div>
            <div className="hidden text-left sm:block"><div className="text-sm font-semibold text-[var(--cf-dark)]">{userName}</div><div className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--cf-slate)]">{role}</div></div>
            <ChevronDown className="hidden size-4 text-[var(--cf-slate)] sm:block" />
          </button>
          {profileOpen ? <div className="absolute right-0 top-14 z-50 w-56 rounded-xl border border-[var(--cf-slate)] bg-white p-2 shadow-xl">
            <div className="border-b border-[var(--cf-slate)] px-3 py-2">
              <p className="truncate text-sm font-semibold text-[var(--cf-dark)]">{userName}</p>
              <p className="truncate text-xs text-[var(--cf-slate)]">{userEmail}</p>
            </div>
            <button onClick={() => void handleLogout()} className="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-[var(--cf-red)] hover:bg-[var(--cf-red)]">Log out</button>
          </div> : null}
        </div>
      </div>
    </header>
  );
}

function StatCard({ label, value, delta, direction, icon: Icon, tone }: { label: string; value: string | number; delta: string; direction: "up" | "down"; icon: typeof Activity; tone: "slate" | "red" | "gold" | "dark" }) {
  const toneStyles = {
    slate: "bg-[var(--cf-slate)]",
    red: "bg-[var(--cf-red)]",
    gold: "bg-[var(--cf-gold)]",
    dark: "bg-[var(--cf-dark)]",
  }[tone];

  return (
    <div className={`group relative overflow-hidden rounded-2xl border border-white/20 p-5 text-white shadow-[0_12px_28px_-16px_rgba(56,50,44,0.5)] transition duration-300 hover:-translate-y-0.5 ${toneStyles}`}>
      <div className="relative flex items-start justify-between gap-3">
        <div><div className="text-xs font-semibold text-white/80">{label}</div><div className="mt-3 text-[29px] font-semibold tracking-[-0.05em] text-white">{value}</div></div>
        <div className="flex size-10 items-center justify-center rounded-xl bg-white/20 text-white ring-1 ring-white/30"><Icon className="size-[19px]" strokeWidth={1.8} /></div>
      </div>
      <div className="relative mt-4 flex items-center gap-1.5 text-xs"><span className="flex items-center gap-0.5 font-semibold text-white">{direction === "up" ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}{delta}</span><span className="text-white/70">vs last month</span></div>
    </div>
  );
}

function SeverityBadge({ severity }: { severity: Severity }) {
  const style = severityStyles[severity];
  return <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${style.badge}`}><span className={`size-1.5 rounded-full ${style.dot}`} />{style.label}</span>;
}

function StatusSelect({ issue, pending, onChange, readOnly }: { issue: Issue; pending: boolean; onChange: (issue: Issue, nextStatus: IssueStatus) => void; readOnly: boolean }) {
  const meta = statusMeta[issue.status];
  if (readOnly) return <span className={`text-xs font-semibold ${meta.color}`}>{meta.label}</span>;
  return (
    <div className="relative inline-flex items-center">
      {pending ? <Loader2 className="mr-2 size-3.5 animate-spin text-[var(--cf-slate)]" /> : <span className={`mr-2 size-1.5 rounded-full ${meta.dot}`} />}
      <select value={issue.status} onChange={(event) => onChange(issue, event.target.value as IssueStatus)} disabled={pending} className={`cursor-pointer appearance-none bg-transparent pr-5 text-xs font-semibold outline-none disabled:cursor-wait ${meta.color}`} aria-label={`Update status for ${issue.title}`}>
        {statusOptions.map((status) => <option key={status} value={status}>{statusMeta[status].label}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-0 size-3.5 text-[var(--cf-slate)]" />
    </div>
  );
}

function IssueCard({ issue, pending, onChange, onNotice, role }: { issue: Issue; pending: boolean; onChange: (issue: Issue, nextStatus: IssueStatus) => void; onNotice: (message: string) => void; role: DashboardRole }) {
  const cardStyles = issue.severity === "CRITICAL"
    ? "bg-[var(--cf-red)] text-white"
    : issue.severity === "HIGH"
      ? "bg-[var(--cf-gold)] text-[var(--cf-dark)]"
      : issue.severity === "MEDIUM"
        ? "bg-[var(--cf-beige)] text-[var(--cf-dark)]"
        : "bg-[var(--cf-slate)] text-white";
  const secondaryText = issue.severity === "CRITICAL" || issue.severity === "LOW" ? "text-white/75" : "text-[var(--cf-dark)]/70";
  const borderColor = issue.severity === "CRITICAL" || issue.severity === "LOW" ? "border-white/25" : "border-[var(--cf-dark)]/20";

  return (
    <article className={`group relative overflow-hidden rounded-2xl border p-5 shadow-[0_12px_28px_-16px_rgba(56,50,44,0.5)] transition duration-300 hover:-translate-y-0.5 ${borderColor} ${cardStyles}`}>
      <div className="relative flex items-start justify-between gap-4"><SeverityBadge severity={issue.severity} /><button onClick={() => onNotice(`More actions for issue #${issue.issue_id} are coming soon.`)} className="rounded-lg p-1 text-[var(--cf-slate)] transition hover:bg-[var(--cf-slate)] hover:text-[var(--cf-slate)]" aria-label={`More actions for ${issue.title}`}><MoreHorizontal className="size-[18px]" /></button></div>
      <h3 className="relative mt-4 line-clamp-1 text-[15px] font-semibold tracking-[-0.02em]">{issue.title}</h3>
      <div className={`relative mt-2 flex items-center gap-1.5 text-xs ${secondaryText}`}><MapPin className="size-3.5" />{issue.building_name}<span className="opacity-60">·</span>Room {issue.room_number}</div>
      <div className={`relative mt-5 grid grid-cols-2 gap-3 border-y py-3.5 ${borderColor}`}><div><div className={`text-[10px] font-semibold uppercase tracking-[0.13em] ${secondaryText}`}>Priority score</div><div className="mt-1 text-sm font-semibold">{formatScore(issue.priority_score)} <span className={`text-xs font-normal ${secondaryText}`}>pts</span></div></div><div><div className={`text-[10px] font-semibold uppercase tracking-[0.13em] ${secondaryText}`}>Reported by</div><div className="mt-1 flex items-center gap-1.5 text-xs font-medium"><span className="flex size-5 items-center justify-center rounded-md bg-white/25 text-[8px] font-bold">{initials(issue.reported_by_name)}</span>{issue.reported_by_name}</div></div></div>
      <div className="relative mt-4 flex items-center justify-between"><StatusSelect issue={issue} pending={pending} onChange={onChange} readOnly={role === "STUDENT"} /><button onClick={() => onNotice(`Issue #${issue.issue_id}: ${issue.title}`)} className="text-xs font-semibold text-[var(--cf-slate)] opacity-0 transition hover:text-[var(--cf-dark)] group-hover:opacity-100">View details <span aria-hidden="true">↗</span></button></div>
    </article>
  );
}

export default function CampusFixDashboard({ role, userId, userName, userEmail }: { role: DashboardRole; userId: number; userName: string; userEmail: string }) {
  const [issues, setIssues] = useState<Issue[]>(mockIssues);
  const [isLoading, setIsLoading] = useState(false);
  const [apiNotice, setApiNotice] = useState("Mock data active · connect /api/issues for live updates");
  const [query, setQuery] = useState("");
  const [severity, setSeverity] = useState<"ALL" | Severity>("ALL");
  const [status, setStatus] = useState<"ALL" | IssueStatus>("ALL");
  const [pendingIds, setPendingIds] = useState<number[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportForm, setReportForm] = useState<ReportForm>(initialReportForm);
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function loadIssues() {
      try {
        const response = await fetch("/api/issues", { headers: { Accept: "application/json" } });
        if (!response.ok) throw new Error("API unavailable");
        const data = (await response.json()) as Issue[];
        if (!cancelled && Array.isArray(data) && data.length > 0) {
          setIssues(data.map(normalizeIssue));
          setApiNotice("Live issue feed connected");
        }
      } catch {
        if (!cancelled) setApiNotice("Mock data active · API connection ready");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    // Keep the mock-first experience visible while the optional live feed negotiates.
    loadIssues();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 3600);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const stats = useMemo(() => ({
    total: issues.length,
    critical: issues.filter((issue) => issue.severity === "CRITICAL").length,
    inProgress: issues.filter((issue) => issue.status === "IN_PROGRESS").length,
    resolved: issues.filter((issue) => issue.status === "RESOLVED" || issue.status === "CLOSED").length,
  }), [issues]);

  const filteredIssues = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return issues.filter((issue) => {
      const matchesQuery = !normalizedQuery || [issue.title, issue.building_name, issue.room_number, issue.reported_by_name].some((value) => value.toLowerCase().includes(normalizedQuery));
      const matchesSeverity = severity === "ALL" || issue.severity === severity;
      const matchesStatus = status === "ALL" || issue.status === status;
      return matchesQuery && matchesSeverity && matchesStatus;
    });
  }, [issues, query, severity, status]);

  async function updateStatus(issue: Issue, nextStatus: IssueStatus) {
    if (issue.status === nextStatus) return;
    const previousStatus = issue.status;
    setIssues((current) => current.map((item) => item.issue_id === issue.issue_id ? { ...item, status: nextStatus } : item));
    setPendingIds((current) => [...current, issue.issue_id]);
    try {
      if (role === "STUDENT") throw new Error("Students cannot update issue status");
      const response = await fetch(`/api/issues/${issue.issue_id}`, { method: "PATCH", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ status: nextStatus }) });
      if (!response.ok) throw new Error("Status update failed");
      setToast(`Issue #${issue.issue_id} marked ${statusMeta[nextStatus].label.toLowerCase()}`);
    } catch {
      setIssues((current) => current.map((item) => item.issue_id === issue.issue_id ? { ...item, status: previousStatus } : item));
      setToast("Could not save that update. The issue was restored.");
    } finally {
      setPendingIds((current) => current.filter((id) => id !== issue.issue_id));
    }
  }

  async function handleReportSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmittingReport(true);

    try {
      const response = await fetch("/api/issues", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...reportForm, reported_by: userId }),
      });
      if (!response.ok) {
        const errorBody = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(errorBody?.error || "Failed to submit issue");
      }

      const refreshedResponse = await fetch("/api/issues", { headers: { Accept: "application/json" } });
      if (!refreshedResponse.ok) throw new Error("Issue submitted, but the list could not be refreshed");
      const refreshedIssues = (await refreshedResponse.json()) as Issue[];
      if (!Array.isArray(refreshedIssues)) throw new Error("Issue submitted, but the API returned an invalid list");

      setIssues(refreshedIssues.map(normalizeIssue));
      setReportForm(initialReportForm);
      setIsReportModalOpen(false);
      setToast("Issue reported successfully.");
    } catch (error) {
      setToast(error instanceof Error ? error.message : "Could not submit the issue.");
    } finally {
      setIsSubmittingReport(false);
    }
  }

  function handleNavigate(label: string) {
    if (label === "Report Issue") {
      if (role === "STUDENT" || role === "ADMIN") setIsReportModalOpen(true);
      return;
    }
    if (label === "My Tickets") {
      setStatus("ALL");
      setToast("Showing all tickets assigned to your account.");
      return;
    }
    if (label !== "Dashboard") setToast(`${label} is ready for your next workflow.`);
  }

  return (
    <div className="min-h-screen bg-[var(--cf-beige)] text-[var(--cf-dark)] selection:bg-[var(--cf-slate)] selection:text-[var(--cf-dark)]">
      <Sidebar onNavigate={handleNavigate} role={role} userName={userName} />
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} onNavigate={handleNavigate} />
      <div className="lg:pl-[272px]">
        <Topbar onOpenMenu={() => setMobileOpen(true)} onSearch={setQuery} onNotify={() => setToast("You have no new notifications.")} role={role} userName={userName} userEmail={userEmail} />
        <main className="mx-auto max-w-[1500px] px-4 pb-10 pt-8 sm:px-6 lg:px-10 lg:pt-10">
          <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-[var(--cf-slate)]"><span className="flex size-5 items-center justify-center rounded-md bg-[var(--cf-slate)]"><Activity className="size-3" /></span> Tuesday, November 3, 2026</div>
              <h1 className="text-[30px] font-semibold tracking-[-0.055em] text-[var(--cf-dark)] sm:text-[36px]">Dashboard Overview</h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--cf-slate)]">Keep your campus moving. Here&apos;s what needs your attention today.</p>
            </div>
            {(role === "STUDENT" || role === "ADMIN") && <button onClick={() => setIsReportModalOpen(true)} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[var(--cf-dark)] px-4 text-sm font-semibold text-white shadow-[0_12px_24px_-14px_rgba(15,23,42,0.8)] transition hover:-translate-y-0.5 hover:bg-[var(--cf-slate)]"><Plus className="size-[17px]" strokeWidth={2.2} />Report New Issue</button>}
          </section>

          <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Total issues" value={stats.total} delta="12.8%" direction="up" icon={ClipboardList} tone="slate" />
            <StatCard label="Critical issues" value={stats.critical.toString().padStart(2, "0")} delta="4.2%" direction="down" icon={AlertTriangle} tone="red" />
            <StatCard label="In progress" value={stats.inProgress.toString().padStart(2, "0")} delta="8.4%" direction="up" icon={Clock3} tone="gold" />
            <StatCard label="Resolved" value={stats.resolved.toString().padStart(2, "0")} delta="18.1%" direction="up" icon={CheckCircle2} tone="dark" />
          </section>

          <section className="mt-9 flex flex-col gap-5 border-b border-[var(--cf-slate)]/80 pb-5 lg:flex-row lg:items-end lg:justify-between">
            <div><div className="flex items-center gap-2"><h2 className="text-lg font-semibold tracking-[-0.03em] text-[var(--cf-dark)]">Recent issues</h2><span className="rounded-full bg-[var(--cf-slate)]/80 px-2 py-0.5 text-[11px] font-semibold text-[var(--cf-slate)]">{filteredIssues.length} shown</span></div><p className="mt-1 text-sm text-[var(--cf-slate)]">A live view of maintenance requests across campus.</p></div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="relative min-w-0 sm:w-56"><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--cf-dark)]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search issues..." className="h-10 w-full rounded-xl border border-[var(--cf-dark)]/20 bg-[var(--cf-beige)] pl-9 pr-3 text-xs text-[var(--cf-dark)] outline-none transition placeholder:text-[var(--cf-slate)] focus:border-[var(--cf-slate)] focus:ring-4 focus:ring-[var(--cf-slate)]/30" /></label>
              <label className="relative"><Filter className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-[var(--cf-dark)]" /><select value={severity} onChange={(event) => setSeverity(event.target.value as "ALL" | Severity)} className="h-10 w-full appearance-none rounded-xl border border-[var(--cf-dark)]/20 bg-[var(--cf-slate)] pl-9 pr-9 text-xs font-medium text-white outline-none transition focus:border-[var(--cf-beige)] focus:ring-4 focus:ring-[var(--cf-slate)]/30 sm:w-40"><option value="ALL">All severities</option><option value="CRITICAL">Critical</option><option value="HIGH">High</option><option value="MEDIUM">Medium</option><option value="LOW">Low</option></select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-white" /></label>
              <label className="relative"><select value={status} onChange={(event) => setStatus(event.target.value as "ALL" | IssueStatus)} className="h-10 w-full appearance-none rounded-xl border border-[var(--cf-dark)]/20 bg-[var(--cf-beige)] px-3 pr-9 text-xs font-medium text-[var(--cf-dark)] outline-none transition focus:border-[var(--cf-slate)] focus:ring-4 focus:ring-[var(--cf-slate)]/30 sm:w-36"><option value="ALL">All statuses</option>{statusOptions.map((option) => <option key={option} value={option}>{statusMeta[option].label}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-[var(--cf-dark)]" /></label>
            </div>
          </section>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-[var(--cf-slate)]"><span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--cf-slate)] bg-white px-2.5 py-1.5"><span className={`size-1.5 rounded-full ${apiNotice.includes("Live") ? "bg-[var(--cf-slate)]" : "bg-[var(--cf-slate)]"}`} />{apiNotice}</span><span className="hidden items-center gap-1.5 sm:inline-flex"><ShieldCheck className="size-3.5 text-[var(--cf-slate)]" />Data refreshes automatically</span></div>

          {isLoading ? (
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3"><div className="h-64 animate-pulse rounded-2xl bg-[var(--cf-slate)]/60" /><div className="h-64 animate-pulse rounded-2xl bg-[var(--cf-slate)]/60" /><div className="h-64 animate-pulse rounded-2xl bg-[var(--cf-slate)]/60" /></div>
          ) : filteredIssues.length > 0 ? (
            <section className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filteredIssues.map((issue) => <IssueCard key={issue.issue_id} issue={issue} pending={pendingIds.includes(issue.issue_id)} onChange={updateStatus} onNotice={setToast} role={role} />)}</section>
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-[var(--cf-slate)] bg-white px-6 py-16 text-center"><div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-[var(--cf-slate)] text-[var(--cf-slate)]"><Search className="size-5" /></div><h3 className="mt-4 text-sm font-semibold text-[var(--cf-dark)]">No issues match these filters</h3><p className="mt-1 text-sm text-[var(--cf-slate)]">Try widening your search or clearing one of the filters.</p><button onClick={() => { setQuery(""); setSeverity("ALL"); setStatus("ALL"); }} className="mt-4 text-xs font-semibold text-[var(--cf-slate)] hover:text-[var(--cf-dark)]">Clear all filters</button></div>
          )}
        </main>
      </div>
      {isReportModalOpen ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-[var(--cf-dark)]/50 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsReportModalOpen(false); }}>
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 text-[var(--cf-dark)] shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="report-issue-title">
            <button type="button" onClick={() => setIsReportModalOpen(false)} className="absolute right-4 top-4 rounded-lg p-1 text-[var(--cf-slate)] transition hover:bg-[var(--cf-slate)] hover:text-[var(--cf-slate)]" aria-label="Close report form">
              <X className="size-5" />
            </button>
            <h2 id="report-issue-title" className="pr-8 text-2xl font-semibold tracking-[-0.03em]">Report a New Issue</h2>
            <form onSubmit={handleReportSubmit} className="mt-6 space-y-4">
              <label className="block text-sm font-semibold text-[var(--cf-slate)]">
                Title
                <input required value={reportForm.title} onChange={(event) => setReportForm((current) => ({ ...current, title: event.target.value }))} placeholder="e.g., Broken chair in Lab 2" className="mt-1.5 w-full rounded-xl border border-[var(--cf-slate)] bg-white p-3 text-sm font-normal text-[var(--cf-dark)] outline-none placeholder:text-[var(--cf-slate)] focus:border-[var(--cf-slate)] focus:ring-4 focus:ring-[var(--cf-slate)]/60" />
              </label>
              <label className="block text-sm font-semibold text-[var(--cf-slate)]">
                Description
                <textarea required value={reportForm.description} onChange={(event) => setReportForm((current) => ({ ...current, description: event.target.value }))} placeholder="Describe the issue..." rows={3} className="mt-1.5 w-full rounded-xl border border-[var(--cf-slate)] bg-white p-3 text-sm font-normal text-[var(--cf-dark)] outline-none placeholder:text-[var(--cf-slate)] focus:border-[var(--cf-slate)] focus:ring-4 focus:ring-[var(--cf-slate)]/60" />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-[var(--cf-slate)]">
                  Severity
                  <select value={reportForm.severity} onChange={(event) => setReportForm((current) => ({ ...current, severity: event.target.value as Severity }))} className="mt-1.5 w-full rounded-xl border border-[var(--cf-slate)] bg-white p-3 text-sm font-normal text-[var(--cf-dark)] outline-none focus:border-[var(--cf-slate)] focus:ring-4 focus:ring-[var(--cf-slate)]/60">
                    <option value="LOW">Low</option><option value="MEDIUM">Medium</option><option value="HIGH">High</option><option value="CRITICAL">Critical</option>
                  </select>
                </label>
                <label className="block text-sm font-semibold text-[var(--cf-slate)]">
                  Room number
                  <input required value={reportForm.room_number ?? ""} onChange={(event) => setReportForm((current) => ({ ...current, room_number: event.target.value }))} placeholder="606" className="mt-1.5 w-full rounded-xl border border-[var(--cf-slate)] bg-white p-3 text-sm font-normal text-[var(--cf-dark)] outline-none placeholder:text-[var(--cf-slate)] focus:border-[var(--cf-slate)] focus:ring-4 focus:ring-[var(--cf-slate)]/60" />
                </label>
                <label className="block text-sm font-semibold text-[var(--cf-slate)]">
                  Floor number
                  <input type="number" min={0} required value={reportForm.floor_number ?? 0} onChange={(event) => setReportForm((current) => ({ ...current, floor_number: Number(event.target.value) }))} className="mt-1.5 w-full rounded-xl border border-[var(--cf-slate)] bg-white p-3 text-sm font-normal text-[var(--cf-dark)] outline-none focus:border-[var(--cf-slate)] focus:ring-4 focus:ring-[var(--cf-slate)]/60" />
                  <span className="mt-1 block text-xs font-normal text-[var(--cf-slate)]">Use 0 for the ground floor.</span>
                </label>
              </div>
              <button type="submit" disabled={isSubmittingReport} className="flex h-11 w-full items-center justify-center rounded-xl bg-[var(--cf-slate)] text-sm font-semibold text-white transition hover:bg-[var(--cf-slate)] disabled:cursor-wait disabled:opacity-60">
                {isSubmittingReport ? "Submitting..." : "Submit Issue"}
              </button>
            </form>
          </div>
        </div>
      ) : null}
      {toast ? <div role="status" className="fixed bottom-5 right-5 z-50 flex max-w-[calc(100vw-40px)] items-start gap-3 rounded-2xl border border-[var(--cf-slate)] bg-[var(--cf-dark)] px-4 py-3 text-sm text-white shadow-2xl"><div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white/15"><Check className="size-3 text-[var(--cf-slate)]" /></div><span className="leading-5">{toast}</span><button onClick={() => setToast(null)} className="ml-1 text-white/50 hover:text-white" aria-label="Dismiss notification"><X className="size-4" /></button></div> : null}
    </div>
  );
}
