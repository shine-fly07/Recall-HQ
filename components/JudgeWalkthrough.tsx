"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  Brain, 
  Building2, 
  Calendar, 
  Layers, 
  X,
  Play
} from "lucide-react";
import { VenueBriefing } from "@/types";

interface JudgeWalkthroughProps {
  onSelectScenario: (scenario: {
    venueName: string;
    location: string;
    date: string;
    capacity: number;
    eventType: string;
    budget: number;
    notes: string;
  }) => void;
}

const SCENARIOS = [
  {
    step: 1,
    title: "Scenario 1: HICC Novotel (The Hidden Freight Elevator Lockout)",
    venueName: "HICC Novotel",
    location: "HITEC City, Hyderabad",
    date: "2026-07-15",
    capacity: 650,
    eventType: "Conference",
    budget: 1800000,
    notes: "Planning our annual regional tech conference with heavy stage LED truss rig and 650 delegates.",
    disasterPrevented: "Freight elevator unscheduled maintenance locked out stage rigging for 1 hour; 20% vegetarian catering deficit.",
    hindsightCatch: "RecallHQ proactively mandates 48h North lift lockouts and raises vegetarian buffet allocation to 65% for Hyderabad delegates."
  },
  {
    step: 2,
    title: "Scenario 2: T-Hub Phase 2 (The 300-Person Acoustic Feedback Trap)",
    venueName: "T-Hub Phase 2",
    location: "Knowledge City, Raidurg, Hyderabad",
    date: "2026-11-12",
    capacity: 350,
    eventType: "Hackathon",
    budget: 850000,
    notes: "Hackathon with live keynote and 350 active laptops in Auditorium 1.",
    disasterPrevented: "Severe PA feedback squeal in Auditorium 1 once crowd exceeded 300; 2.4GHz Wi-Fi clashing with roving mics.",
    hindsightCatch: "RecallHQ contracts third-party audio engineer with hardware DSP suppressors and switches mics to UHF/DECT bands."
  },
  {
    step: 3,
    title: "Scenario 3: Cyber Pearl Lawn (The Monsoon Flooding Washout)",
    venueName: "Cyber Pearl Open Lawn",
    location: "HITEC City, Madhapur, Hyderabad",
    date: "2026-10-14",
    capacity: 200,
    eventType: "Meetup",
    budget: 450000,
    notes: "Planning a 200-person evening developer meetup with dinner and lighting talks.",
    disasterPrevented: "Sudden August rainfall flooded lawn in 20 mins; Basement 2 emergency move had HVAC failure and zero cellular reception.",
    hindsightCatch: "RecallHQ blocks open lawn bookings in monsoon season without an upper-floor dry ballroom fallback and temporary mobile repeaters."
  },
  {
    step: 4,
    title: "Scenario 4: ITC Kohenur (The 6:30 PM Valet Gridlock)",
    venueName: "ITC Kohenur",
    location: "HITEC City, Durgam Cheruvu Lake, Hyderabad",
    date: "2027-01-10",
    capacity: 400,
    eventType: "Executive Dinner",
    budget: 2500000,
    notes: "High-profile VIP investor dinner running concurrently with other hotel events.",
    disasterPrevented: "Hotel valet reached 100% capacity by 6:30 PM due to concurrent weddings; 30-min gridlock on Inorbit bridge.",
    hindsightCatch: "RecallHQ cross-verifies concurrent ballroom bookings 5 days early and leases Mindspace overflow lot with electric golf shuttles."
  }
];

export default function JudgeWalkthrough({ onSelectScenario }: JudgeWalkthroughProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const scenario = SCENARIOS[currentStep];

  const handleLaunchScenario = () => {
    onSelectScenario({
      venueName: scenario.venueName,
      location: scenario.location,
      date: scenario.date,
      capacity: scenario.capacity,
      eventType: scenario.eventType,
      budget: scenario.budget,
      notes: scenario.notes
    });
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger Bar */}
      <div className="relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-900/80 p-4 shadow-xl backdrop-blur-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-400 to-indigo-500 text-slate-950 font-black shadow-md shadow-amber-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">Enterprise Evaluation & Scenario Walkthrough</span>
              <span className="rounded bg-indigo-500/20 px-2 py-0.5 text-[10px] font-semibold text-indigo-300 border border-indigo-500/30">
                Live Scenario Tour
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Test how Vectorize Hindsight memory catches 4 real-world event catastrophes that stateless AI misses.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {SCENARIOS.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => {
                setCurrentStep(idx);
                setIsOpen(true);
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/90 text-xs font-medium text-slate-300 hover:text-white hover:border-indigo-500/50 hover:bg-slate-800 transition-all cursor-pointer"
            >
              <span>Scenario {s.step}</span>
            </button>
          ))}

          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-violet-500 transition-all cursor-pointer"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>Start Judge Tour</span>
          </button>
        </div>
      </div>

      {/* Modal / Walkthrough Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-2xl rounded-3xl border border-indigo-500/40 bg-slate-900 p-6 sm:p-8 shadow-2xl relative">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white p-1 rounded-lg border border-slate-800 bg-slate-950"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Step Counter */}
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-2">
              <span>CASE STUDY {scenario.step} OF 4</span>
              <span>•</span>
              <span className="text-slate-400">{scenario.venueName}</span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white">
              {scenario.title}
            </h3>

            {/* Scenario Breakdown */}
            <div className="mt-5 space-y-4">
              {/* What Happens Without Memory */}
              <div className="rounded-xl border border-rose-500/20 bg-rose-950/20 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-300 mb-1.5">
                  <AlertTriangle className="h-4 w-4 text-rose-400" />
                  Past Failure Precedent (Trapped in Spreadsheet / History):
                </div>
                <p className="text-xs text-rose-200/90 leading-relaxed">
                  {scenario.disasterPrevented}
                </p>
              </div>

              {/* How RecallHQ Solves It */}
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Persistent Hindsight Memory Solution:
                </div>
                <p className="text-xs text-emerald-200/90 leading-relaxed">
                  {scenario.hindsightCatch}
                </p>
              </div>

              {/* Event Metadata */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-400 pt-1 font-mono">
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="block text-slate-500 text-[10px]">CAPACITY</span>
                  <span className="text-white font-semibold">{scenario.capacity} pax</span>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="block text-slate-500 text-[10px]">DATE</span>
                  <span className="text-white font-semibold">{scenario.date}</span>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="block text-slate-500 text-[10px]">BUDGET</span>
                  <span className="text-white font-semibold">INR {scenario.budget.toLocaleString()}</span>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="block text-slate-500 text-[10px]">TYPE</span>
                  <span className="text-white font-semibold">{scenario.eventType}</span>
                </div>
              </div>
            </div>

            {/* Navigation & Action Footer */}
            <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  disabled={currentStep === 0}
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-xs text-slate-300 hover:text-white disabled:opacity-40"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Prev
                </button>
                <button
                  disabled={currentStep === SCENARIOS.length - 1}
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-xs text-slate-300 hover:text-white disabled:opacity-40"
                >
                  Next <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <button
                onClick={handleLaunchScenario}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 hover:from-emerald-400 hover:to-indigo-500 transition-all cursor-pointer"
              >
                <span>Load & Test in RecallHQ Planner</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

