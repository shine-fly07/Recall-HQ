"use client";

import React, { useState } from "react";
import { 
  Scale, 
  Building2, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  MapPin,
  Users
} from "lucide-react";
import { EventRecord } from "@/types";

interface VenueComparisonProps {
  events: EventRecord[];
}

const VENUE_OPTIONS = [
  { id: "venue_hicc_novotel", name: "HICC Novotel", location: "HITEC City" },
  { id: "venue_thub_p2", name: "T-Hub Phase 2", location: "Knowledge City" },
  { id: "venue_cyberpearl_lawn", name: "Cyber Pearl Open Lawn", location: "HITEC City" },
  { id: "venue_itc_kohenur", name: "ITC Kohenur", location: "Durgam Cheruvu" }
];

export default function VenueComparison({ events }: VenueComparisonProps) {
  const [venueA, setVenueA] = useState(VENUE_OPTIONS[0].name);
  const [venueB, setVenueB] = useState(VENUE_OPTIONS[1].name);

  const getVenueData = (name: string) => {
    const matched = events.find(e => e.venueName.toLowerCase().includes(name.toLowerCase()));
    return matched;
  };

  const dataA = getVenueData(venueA);
  const dataB = getVenueData(venueB);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl backdrop-blur-xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-indigo-400" />
            <h2 className="text-base font-semibold text-white">Venue Intelligence & Risk Comparison</h2>
          </div>
          <p className="text-xs text-slate-400">
            Compare past institutional memories and failure modes between two prospective Hyderabad venues.
          </p>
        </div>

        <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300 border border-indigo-500/20 font-mono">
          Persistent Memory Analysis
        </span>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl border border-indigo-500/30 bg-slate-950/70 shadow-sm">
          <label className="text-xs font-bold text-indigo-300 block mb-2 uppercase tracking-wider flex items-center gap-1.5">
            <Building2 className="h-3.5 w-3.5 text-indigo-400" />
            Select Primary Venue (A):
          </label>
          <select
            value={venueA}
            onChange={(e) => setVenueA(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
          >
            {VENUE_OPTIONS.map(v => (
              <option key={v.id} value={v.name}>{v.name} ({v.location})</option>
            ))}
          </select>
        </div>

        <div className="p-4 rounded-2xl border border-purple-500/30 bg-slate-950/70 shadow-sm">
          <label className="text-xs font-bold text-purple-300 block mb-2 uppercase tracking-wider flex items-center gap-1.5">
            <Building2 className="h-3.5 w-3.5 text-purple-400" />
            Select Comparative Venue (B):
          </label>
          <select
            value={venueB}
            onChange={(e) => setVenueB(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-xs text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 font-medium"
          >
            {VENUE_OPTIONS.map(v => (
              <option key={v.id} value={v.name}>{v.name} ({v.location})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card A */}
        <div className="rounded-2xl border border-indigo-500/30 bg-slate-950/70 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-indigo-900/40">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-indigo-400" />
                {venueA}
              </h3>
              <span className="text-[11px] text-slate-400">{dataA?.location || "Hyderabad"}</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              Capacity: {dataA?.capacity || "N/A"} pax
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-rose-300 uppercase tracking-wider block mb-1 flex items-center gap-1">
              <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
              Documented Failure Incidents:
            </span>
            <ul className="space-y-1 text-xs text-slate-300">
              {dataA?.incidents?.map((inc, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-rose-400 mt-0.5">•</span>
                  <span>{inc}</span>
                </li>
              )) || <li>No severe incidents recorded.</li>}
            </ul>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider block mb-1 flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Learned Mitigation Action:
            </span>
            <ul className="space-y-1 text-xs text-emerald-200/90">
              {dataA?.insights?.map((ins, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-emerald-400 mt-0.5">✓</span>
                  <span>{ins}</span>
                </li>
              )) || <li>Standard logistics checklist.</li>}
            </ul>
          </div>
        </div>

        {/* Card B */}
        <div className="rounded-2xl border border-purple-500/30 bg-slate-950/70 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-purple-900/40">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-purple-400" />
                {venueB}
              </h3>
              <span className="text-[11px] text-slate-400">{dataB?.location || "Hyderabad"}</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
              Capacity: {dataB?.capacity || "N/A"} pax
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-rose-300 uppercase tracking-wider block mb-1 flex items-center gap-1">
              <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
              Documented Failure Incidents:
            </span>
            <ul className="space-y-1 text-xs text-slate-300">
              {dataB?.incidents?.map((inc, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-rose-400 mt-0.5">•</span>
                  <span>{inc}</span>
                </li>
              )) || <li>No severe incidents recorded.</li>}
            </ul>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider block mb-1 flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Learned Mitigation Action:
            </span>
            <ul className="space-y-1 text-xs text-emerald-200/90">
              {dataB?.insights?.map((ins, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-emerald-400 mt-0.5">✓</span>
                  <span>{ins}</span>
                </li>
              )) || <li>Standard logistics checklist.</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

