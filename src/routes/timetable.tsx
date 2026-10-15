import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Clock, DoorOpen, User, Coffee } from "lucide-react";
import { AppShell, EmptyState, PageHeader } from "@/components/AppShell";
import { days, timetable, todayName } from "@/lib/data";

export const Route = createFileRoute("/timetable")({
  head: () => ({
    meta: [
      { title: "Timetable — SmartCampus" },
      { name: "description", content: "Weekly class timetable with subjects, times, rooms and faculty." },
      { property: "og:title", content: "Timetable — SmartCampus" },
      { property: "og:description", content: "Weekly class timetable with subjects, times, rooms and faculty." },
    ],
  }),
  component: Timetable,
});

function Timetable() {
  const [day, setDay] = useState("Monday");
  useEffect(() => {
    const t = todayName();
    if (days.includes(t)) setDay(t);
  }, []);
  const list = timetable.filter((c) => c.day === day);

  return (
    <AppShell>
      <PageHeader title="Timetable" subtitle="Your weekly class schedule." />
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
        {days.map((d) => (
          <button
            key={d}
            onClick={() => setDay(d)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition ${day === d ? "bg-primary text-primary-foreground" : "border bg-card text-muted-foreground hover:text-foreground"}`}
          >
            {d}
          </button>
        ))}
      </div>
      {list.length === 0 ? (
        <EmptyState icon={<Coffee size={20} />} title={`No classes on ${day}`} text="Nothing scheduled for this day." />
      ) : (
        <div className="space-y-3">
          {list.map((c) => (
            <div key={c.id} className="flex flex-col gap-3 rounded-2xl border bg-card p-5 shadow-sm sm:flex-row sm:items-center">
              <div className="flex shrink-0 items-center gap-2 font-semibold text-primary sm:w-36">
                <Clock size={16} className="text-highlight" />{c.start}–{c.end}
              </div>
              <p className="flex-1 font-semibold text-foreground">{c.subject}</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><DoorOpen size={14} />{c.room}</span>
                <span className="flex items-center gap-1"><User size={14} />{c.faculty}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </AppShell>
  );
}
