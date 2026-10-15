import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MapPin, CalendarDays, Megaphone, Clock, ArrowRight, Coffee } from "lucide-react";
import { AppShell, EmptyState, categoryStyle } from "@/components/AppShell";
import { notices, timetable, todayName } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SmartCampus — Student Dashboard" },
      { name: "description", content: "Your campus at a glance: today's classes, notices and quick links." },
      { property: "og:title", content: "SmartCampus — Student Dashboard" },
      { property: "og:description", content: "Your campus at a glance: today's classes, notices and quick links." },
    ],
  }),
  component: Dashboard,
});

const quick = [
  { to: "/navigator", label: "Find a place", desc: "Rooms, labs & offices", icon: MapPin },
  { to: "/timetable", label: "Timetable", desc: "Weekly class schedule", icon: CalendarDays },
  { to: "/notices", label: "Notices", desc: "Latest announcements", icon: Megaphone },
] as const;

function Dashboard() {
  const [day, setDay] = useState<string | null>(null);
  useEffect(() => setDay(todayName()), []);
  const today = timetable.filter((c) => c.day === day);
  const hour = new Date().getHours();
  const greet = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <AppShell>
      <section className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-6 text-primary-foreground shadow-lg sm:p-8">
        <p className="text-sm text-highlight">{day ?? ""}</p>
        <h1 className="font-display mt-1 text-2xl font-bold sm:text-3xl">{greet}, Student 👋</h1>
        <p className="mt-2 max-w-lg text-primary-foreground/80">
          You have {today.length} {today.length === 1 ? "class" : "classes"} today and {notices.length} notices on the board.
        </p>
      </section>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {quick.map(({ to, label, desc, icon: Icon }) => (
          <Link key={to} to={to} className="group flex items-center gap-4 rounded-2xl border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground"><Icon size={20} /></div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-foreground">{label}</p>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
            <ArrowRight size={18} className="text-muted-foreground transition group-hover:translate-x-1 group-hover:text-highlight" />
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Today's classes</h2>
            <Link to="/timetable" className="text-sm font-medium text-primary hover:underline">Full timetable</Link>
          </div>
          {today.length === 0 ? (
            <EmptyState icon={<Coffee size={20} />} title="No classes today" text="Enjoy your free day!" />
          ) : (
            <ul className="space-y-3">
              {today.map((c) => (
                <li key={c.id} className="flex items-center gap-4 rounded-xl bg-muted/60 p-3">
                  <div className="flex shrink-0 items-center gap-1 text-sm font-medium text-primary"><Clock size={14} />{c.start}</div>
                  <div className="min-w-0">
                    <p className="truncate font-medium">{c.subject}</p>
                    <p className="text-xs text-muted-foreground">{c.room} · {c.faculty}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className="rounded-2xl border bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Recent notices</h2>
            <Link to="/notices" className="text-sm font-medium text-primary hover:underline">View all</Link>
          </div>
          <ul className="space-y-3">
            {notices.slice(0, 4).map((n) => (
              <li key={n.id} className="rounded-xl bg-muted/60 p-3">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${categoryStyle[n.category]}`}>{n.category}</span>
                <p className="mt-1 font-medium">{n.title}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}
