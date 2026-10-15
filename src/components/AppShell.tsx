import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { LayoutDashboard, MapPin, CalendarDays, Megaphone, GraduationCap, Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/navigator", label: "Campus Navigator", icon: MapPin },
  { to: "/timetable", label: "Timetable", icon: CalendarDays },
  { to: "/notices", label: "Notice Board", icon: Megaphone },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const links = (
    <nav className="flex flex-col gap-1">
      {nav.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          onClick={() => setOpen(false)}
          activeOptions={{ exact: true }}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/75 transition hover:bg-sidebar-accent hover:text-sidebar-foreground data-[status=active]:bg-sidebar-primary data-[status=active]:text-sidebar-primary-foreground"
        >
          <Icon size={18} /> {label}
        </Link>
      ))}
    </nav>
  );
  const brand = (
    <div className="flex items-center gap-2 px-2 py-1">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
        <GraduationCap size={20} />
      </div>
      <span className="font-display text-lg font-bold text-sidebar-foreground">SmartCampus</span>
    </div>
  );
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col gap-8 bg-sidebar p-5 lg:flex">
        {brand}
        {links}
      </aside>
      <header className="sticky top-0 z-30 flex items-center justify-between bg-sidebar px-4 py-3 lg:hidden">
        {brand}
        <button aria-label="Open menu" onClick={() => setOpen(true)} className="rounded-lg p-2 text-sidebar-foreground hover:bg-sidebar-accent">
          <Menu />
        </button>
      </header>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-72 flex-col gap-8 bg-sidebar p-5">
            <div className="flex items-center justify-between">
              {brand}
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="rounded-lg p-2 text-sidebar-foreground hover:bg-sidebar-accent">
                <X />
              </button>
            </div>
            {links}
          </aside>
        </div>
      )}
      <main className="lg:pl-64">
        <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-10">{children}</div>
      </main>
    </div>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">{title}</h1>
      {subtitle && <p className="mt-1 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

export function EmptyState({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-dashed bg-card p-10 text-center">
      <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-foreground">{icon}</div>
      <p className="font-semibold text-foreground">{title}</p>
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

export const categoryStyle: Record<string, string> = {
  Academic: "bg-primary/10 text-primary",
  Events: "bg-accent text-accent-foreground",
  General: "bg-muted text-muted-foreground",
};
