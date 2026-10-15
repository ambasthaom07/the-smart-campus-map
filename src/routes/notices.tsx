import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Inbox, CalendarDays } from "lucide-react";
import { AppShell, EmptyState, PageHeader, categoryStyle } from "@/components/AppShell";
import { notices } from "@/lib/data";

export const Route = createFileRoute("/notices")({
  head: () => ({
    meta: [
      { title: "Notice Board — SmartCampus" },
      { name: "description", content: "Academic, event and general notices for students." },
      { property: "og:title", content: "Notice Board — SmartCampus" },
      { property: "og:description", content: "Academic, event and general notices for students." },
    ],
  }),
  component: Notices,
});

const cats = ["All", "Academic", "Events", "General"] as const;

function Notices() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [q, setQ] = useState("");
  const s = q.trim().toLowerCase();
  const list = notices.filter(
    (n) => (cat === "All" || n.category === cat) && (!s || (n.title + n.body).toLowerCase().includes(s)),
  );

  return (
    <AppShell>
      <PageHeader title="Notice Board" subtitle="Stay updated with campus announcements." />
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${cat === c ? "bg-primary text-primary-foreground" : "border bg-card text-muted-foreground hover:text-foreground"}`}
            >
              {c} <span className="opacity-70">({c === "All" ? notices.length : notices.filter((n) => n.category === c).length})</span>
            </button>
          ))}
        </div>
        <div className="relative sm:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search notices" className="w-full rounded-xl border bg-card py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
        </div>
      </div>
      {list.length === 0 ? (
        <EmptyState icon={<Inbox size={20} />} title="No notices found" text="Try another category or search term." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {list.map((n) => (
            <article key={n.id} className="rounded-2xl border bg-card p-5 shadow-sm">
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryStyle[n.category]}`}>{n.category}</span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <CalendarDays size={12} />
                  {new Date(n.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </span>
              </div>
              <h3 className="font-semibold text-foreground">{n.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{n.body}</p>
            </article>
          ))}
        </div>
      )}
    </AppShell>
  );
}
