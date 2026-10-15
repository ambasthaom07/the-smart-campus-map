import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Building2, Layers, DoorOpen, Navigation, SearchX, X } from "lucide-react";
import { AppShell, EmptyState, PageHeader } from "@/components/AppShell";
import { facilities, type Facility } from "@/lib/data";

export const Route = createFileRoute("/navigator")({
  head: () => ({
    meta: [
      { title: "Campus Navigator — SmartCampus" },
      { name: "description", content: "Search classrooms, labs, library, canteen and offices with simple directions." },
      { property: "og:title", content: "Campus Navigator — SmartCampus" },
      { property: "og:description", content: "Search classrooms, labs, library, canteen and offices with simple directions." },
    ],
  }),
  component: Navigator,
});

const types = ["All", "Classroom", "Laboratory", "Library", "Canteen", "Administration"] as const;

function Navigator() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<(typeof types)[number]>("All");
  const [selected, setSelected] = useState<Facility | null>(null);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    return facilities.filter(
      (f) =>
        (type === "All" || f.type === type) &&
        (!s || [f.name, f.building, f.room, f.type].some((v) => v.toLowerCase().includes(s))),
    );
  }, [q, type]);

  return (
    <AppShell>
      <PageHeader title="Campus Navigator" subtitle="Find any facility and get simple walking directions." />
      <div className="relative mb-4">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name, building or room (e.g. A-101, library)"
          className="w-full rounded-2xl border bg-card py-3 pl-11 pr-10 shadow-sm outline-none focus:ring-2 focus:ring-ring"
        />
        {q && (
          <button aria-label="Clear search" onClick={() => setQ("")} className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground">
            <X size={16} />
          </button>
        )}
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${type === t ? "bg-primary text-primary-foreground" : "border bg-card text-muted-foreground hover:text-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>
      {results.length === 0 ? (
        <EmptyState icon={<SearchX size={20} />} title="No facilities found" text="Try a different search term or category." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelected(f)}
              className={`rounded-2xl border bg-card p-5 text-left shadow-sm transition hover:shadow-md ${selected?.id === f.id ? "ring-2 ring-highlight" : ""}`}
            >
              <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">{f.type}</span>
              <p className="mt-2 font-semibold text-foreground">{f.name}</p>
              <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                <p className="flex items-center gap-2"><Building2 size={14} />{f.building}</p>
                <p className="flex items-center gap-2"><Layers size={14} />{f.floor} floor</p>
                <p className="flex items-center gap-2"><DoorOpen size={14} />Room {f.room}</p>
              </div>
              <p className="mt-3 text-sm font-medium text-primary">Show directions →</p>
            </button>
          ))}
        </div>
      )}
      {selected && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setSelected(null)} />
          <div className="relative w-full max-w-md rounded-2xl bg-card p-6 shadow-xl">
            <button aria-label="Close" onClick={() => setSelected(null)} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"><X size={18} /></button>
            <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground"><Navigation size={20} /></div>
            <h2 className="font-display text-xl font-bold">{selected.name}</h2>
            <p className="text-sm text-muted-foreground">{selected.building} · {selected.floor} floor · {selected.room}</p>
            <p className="mt-4 rounded-xl bg-muted p-4 text-sm leading-relaxed">{selected.directions}</p>
            <button onClick={() => setSelected(null)} className="mt-5 w-full rounded-xl bg-primary py-2.5 font-medium text-primary-foreground hover:bg-primary/90">Got it</button>
          </div>
        </div>
      )}
    </AppShell>
  );
}
