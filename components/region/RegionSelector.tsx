"use client";

import { useMemo } from "react";
import { getRegionData } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import { Globe2, MapPin } from "lucide-react";

export function RegionSelector() {
  const regionData = getRegionData();
  const { countryId, regionId, setRegion } = useAppStore();

  const countries = regionData.countries;
  const selectedCountry = countries.find((c) => c.id === countryId) ?? countries[0];
  const regions = selectedCountry?.regions ?? [];
  const selectedRegion = regions.find((r) => r.id === regionId) ?? regions[0];

  const countryOptions = useMemo(() => countries, [countries]);

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)] px-4 py-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center gap-2 text-sm font-semibold">
          <Globe2 className="h-4 w-4 text-[var(--color-primary)]" aria-hidden="true" />
          Region context
        </div>
        <div className="flex flex-1 flex-col gap-2 sm:flex-row">
          <label className="flex flex-1 items-center gap-2">
            <span className="text-xs text-black/60 dark:text-white/60">Country</span>
            <select
              className="h-10 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-3 text-sm"
              value={selectedCountry?.id}
              onChange={(e) => {
                const nextCountry = e.target.value;
                const nextRegions =
                  regionData.countries.find((c) => c.id === nextCountry)?.regions ?? [];
                setRegion(nextCountry, nextRegions[0]?.id ?? "");
              }}
            >
              {countryOptions.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-1 items-center gap-2">
            <span className="text-xs text-black/60 dark:text-white/60">State/Region</span>
            <select
              className="h-10 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-3 text-sm"
              value={selectedRegion?.id}
              onChange={(e) => setRegion(selectedCountry.id, e.target.value)}
            >
              {regions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      {selectedRegion?.notes?.length ? (
        <div className="mt-3 text-sm text-black/70 dark:text-white/70">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-black/60 dark:text-white/60">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Notes
          </div>
          <ul className="mt-2 grid gap-1.5">
            {selectedRegion.notes.map((n) => (
              <li key={n} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black/40 dark:bg-white/40" />
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

