"use client";

import React, { useState, useEffect } from "react";
import { 
  Brain, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Layers, 
  Building2, 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Cpu, 
  Search, 
  Lock, 
  Download, 
  ChevronRight,
  Play,
  RotateCcw,
  Sliders,
  Scale,
  Award,
  Star
} from "lucide-react";
import { UserProfile } from "./AuthModal";

interface LandingPageProps {
  onEnterApp: (tab?: string) => void;
  onOpenAuth: () => void;
  currentUser: UserProfile | null;
}

export default function LandingPage({
  onEnterApp,
  onOpenAuth,
  currentUser
}: LandingPageProps) {
  const [activeSimulation, setActiveSimulation] = useState<"cyberpearl" | "novotel" | "thub" | "itc">("cyberpearl");
  const [attendeeCount, setAttendeeCount] = useState<number>(350);
  const [averageBudget, setAverageBudget] = useState<number>(1200000);
  const [activeTabVisual, setActiveTabVisual] = useState<"withMemory" | "withoutMemory">("withMemory");

  // Rotating live ticker
  const [liveTickerIndex, setLiveTickerIndex] = useState(0);
  const TICKER_ITEMS = [
    "⚡ HICC Novotel: Freight elevator lockout mitigated (48h North lift lock enforced)",
    "🌧️ Cyber Pearl: Monsoon lawn washout prevented (Dry ballroom rider pre-signed)",
    "🎙️ T-Hub Phase 2: Auditorium 1 acoustic feedback suppressed via DSP notch filters",
    "🚗 ITC Kohenur: 6:30 PM valet gridlock resolved via Mindspace overflow shuttles",
    "🥗 Regional Ratio Alert: Hyderabad tech conferences require 65% vegetarian buffer"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTickerIndex((prev) => (prev + 1) % TICKER_ITEMS.length);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  // Calculate simulated ROI
  const calculatedRiskSaved = Math.round((averageBudget * 0.18) + (attendeeCount * 120));
  const setupHoursSaved = Math.round((attendeeCount / 50) * 1.8);

  return (
    <div className="relative overflow-hidden text-slate-100 space-y-24 py-6">
      {/* Dynamic Animated Ambient Background Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-pink-600/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse duration-1000" />
      <div className="absolute top-96 -left-40 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[800px] -right-40 w-[550px] h-[550px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* 1. Live Incident Mitigation Ticker */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="inline-flex w-full items-center justify-between rounded-full border border-indigo-500/30 bg-slate-900/80 px-4 py-2 backdrop-blur-xl shadow-lg shadow-indigo-950/40 text-xs">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span className="font-semibold text-indigo-400 shrink-0 uppercase tracking-wider text-[10px]">
              Live Memory Stream:
            </span>
            <span className="text-slate-200 truncate transition-all duration-500">
              {TICKER_ITEMS[liveTickerIndex]}
            </span>
          </div>
          <button
            onClick={() => onEnterApp("inspector")}
            className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 shrink-0 pl-3 border-l border-slate-800 cursor-pointer"
          >
            Trace Memory
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* 2. Hero Section */}
      <div className="text-center max-w-4xl mx-auto px-4 space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300 shadow-sm backdrop-blur-md">
          <Sparkles className="h-4 w-4 text-indigo-400" />
          <span>Enterprise Event Intelligence • Powered by Vectorize Hindsight</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
          Stop Repeating Costly{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 animate-gradient">
            Venue Disasters.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          The autonomous headquarters for your event memory. RecallHQ recalls every unannounced freight lift lockout, acoustic feedback loop, lawn waterlogging, and catering disparity <strong>before</strong> you sign the contract.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onEnterApp("planner")}
            className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Zap className="h-4 w-4" />
            Launch Command Center
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={() => onEnterApp("inspector")}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-sm backdrop-blur-xl transition-all cursor-pointer"
          >
            <Brain className="h-4 w-4 text-indigo-400" />
            Explore Memory Inspector
          </button>

          {!currentUser && (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl border border-slate-800 bg-slate-950/60 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-sm transition-all cursor-pointer"
            >
              <Lock className="h-3.5 w-3.5" />
              Sign In to Workspace
            </button>
          )}
        </div>

        {/* Trust Badges */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Zero-Hallucination Grounding</span>
          </div>
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-indigo-400" />
            <span>Vectorize Hindsight Persistent API</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-amber-400" />
            <span>Groq High-Speed LLM Inference</span>
          </div>
        </div>
      </div>

      {/* 3. Interactive Live Simulation Preview Widget (Award-Winning Showcase) */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-500 animate-pulse" />
                <h3 className="text-base font-bold text-white">Live Grounded Intelligence Simulation</h3>
              </div>
              <p className="text-xs text-slate-400">
                Observe how persistent hindsight memory transforms generic event planning into disaster-proof execution.
              </p>
            </div>

            {/* Contrast Switcher */}
            <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <button
                onClick={() => setActiveTabVisual("withMemory")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  activeTabVisual === "withMemory"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Brain className="h-3.5 w-3.5" />
                With RecallHQ Memory
              </button>
              <button
                onClick={() => setActiveTabVisual("withoutMemory")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  activeTabVisual === "withoutMemory"
                    ? "bg-rose-900/60 text-rose-200 border border-rose-500/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <AlertTriangle className="h-3.5 w-3.5" />
                Without Memory (Stateless)
              </button>
            </div>
          </div>

          {/* Scenario Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {[
              { id: "cyberpearl", name: "Cyber Pearl Lawn", label: "Monsoon Flooding Washout" },
              { id: "novotel", name: "HICC Novotel", label: "Freight Elevator Lockdown" },
              { id: "thub", name: "T-Hub Phase 2", label: "Auditorium 1 Mic Howling" },
              { id: "itc", name: "ITC Kohenur", label: "6:30 PM Valet Saturation" }
            ].map((sc) => (
              <button
                key={sc.id}
                onClick={() => setActiveSimulation(sc.id as any)}
                className={`px-3 py-1.5 rounded-xl transition-all shrink-0 cursor-pointer ${
                  activeSimulation === sc.id
                    ? "bg-slate-800 text-indigo-300 border border-indigo-500/40 font-semibold"
                    : "bg-slate-950/60 text-slate-400 border border-slate-800/80 hover:text-slate-200"
                }`}
              >
                {sc.name} <span className="text-[10px] text-slate-500">({sc.label})</span>
              </button>
            ))}
          </div>

          {/* Interactive Screen Output */}
          {activeTabVisual === "withMemory" ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              <div className="md:col-span-7 rounded-2xl border border-indigo-500/30 bg-slate-950/80 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    ● Factual Precedents Recalled (98% Confidence)
                  </span>
                  <span className="text-xs text-slate-400 font-mono">RRF Rank #1</span>
                </div>

                {activeSimulation === "cyberpearl" && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <AlertTriangle className="h-4 w-4 text-amber-400" />
                      Cyber Pearl Open Lawn • Precedent Incident Identified
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      "August monsoon precipitation flooded lawn drainage channels in 20 minutes, forcing an emergency relocation to Basement 2. Attendees suffered HVAC failure and complete cellular signal loss across Airtel and Jio networks."
                    </p>
                    <div className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-950/20 text-xs text-emerald-300 space-y-1">
                      <div className="font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        Automated Operational Rider Action
                      </div>
                      <p className="text-[11px] text-slate-300">
                        Mandated upper-floor dry ballroom contract rider. Dispatched temporary cellular signal repeaters and backup dehumidifiers.
                      </p>
                    </div>
                  </div>
                )}

                {activeSimulation === "novotel" && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <AlertTriangle className="h-4 w-4 text-amber-400" />
                      HICC Novotel • Elevator & Catering Precedent
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      "Unscheduled weekday freight lift servicing locked stage rigging out for 1 hour. Vegetarian buffet was depleted by 1:30 PM due to standard 45% hotel default vs actual 65% Hyderabad tech attendee demand."
                    </p>
                    <div className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-950/20 text-xs text-emerald-300 space-y-1">
                      <div className="font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        Automated Operational Rider Action
                      </div>
                      <p className="text-[11px] text-slate-300">
                        Pre-reserved North service freight elevator 48 hours prior with facility director signoff. Adjusted BEO ratio to 65% vegetarian allocation.
                      </p>
                    </div>
                  </div>
                )}

                {activeSimulation === "thub" && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <AlertTriangle className="h-4 w-4 text-amber-400" />
                      T-Hub Phase 2 • Acoustic Feedback Hazard
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      "Auditorium 1 house soundboard lacks DSP parametric notch filters, producing severe mic howling when attendance exceeded 300 delegates. Roving wireless microphones suffered 2.4GHz Wi-Fi clashing."
                    </p>
                    <div className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-950/20 text-xs text-emerald-300 space-y-1">
                      <div className="font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        Automated Operational Rider Action
                      </div>
                      <p className="text-[11px] text-slate-300">
                        Contracted third-party sound engineer with dedicated hardware DSP feedback suppressors. Switched roving microphones to UHF/DECT band.
                      </p>
                    </div>
                  </div>
                )}

                {activeSimulation === "itc" && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <AlertTriangle className="h-4 w-4 text-amber-400" />
                      ITC Kohenur • Valet Saturation Hazard
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      "Hotel valet staging bays hit 100% capacity by 6:30 PM due to concurrent weddings in the Grand Ballroom, causing a 30-minute traffic gridlock back to Inorbit bridge."
                    </p>
                    <div className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-950/20 text-xs text-emerald-300 space-y-1">
                      <div className="font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        Automated Operational Rider Action
                      </div>
                      <p className="text-[11px] text-slate-300">
                        Cross-verified concurrent hotel banquet bookings 5 days early. Pre-leased Mindspace overflow lot with continuous electric golf cart shuttles.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Memory Inspector Live Telemetry Box */}
              <div className="md:col-span-5 rounded-2xl border border-slate-800 bg-slate-950/90 p-5 space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-indigo-400 font-mono uppercase tracking-wider block mb-1">
                    Vectorize Hindsight Graph Node
                  </span>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-900">
                      <span className="text-slate-400">Retrieval Vector:</span>
                      <span className="text-white font-mono">Dense + Temporal RRF</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-900">
                      <span className="text-slate-400">Confidence Score:</span>
                      <span className="text-emerald-400 font-mono font-bold">96.8%</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-900">
                      <span className="text-slate-400">Recall Latency:</span>
                      <span className="text-indigo-300 font-mono">18ms</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Grounding Source:</span>
                      <span className="text-purple-300 font-mono">Bank: universal_prod</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onEnterApp("planner")}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
                >
                  <Play className="h-3.5 w-3.5" />
                  Test Live in Event Planner
                </button>
              </div>
            </div>
          ) : (
            /* Without Memory (Stateless AI) View */
            <div className="rounded-2xl border border-rose-900/40 bg-slate-950/90 p-6 space-y-4">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider">
                <AlertTriangle className="h-4 w-4" />
                Generic Stateless AI Output (Zero Persistent Memory)
              </div>
              <p className="text-xs text-slate-400 italic leading-relaxed">
                "To organize your event at this venue, make sure to plan 4-6 weeks ahead. Ensure you test the sound system before guests arrive, confirm dietary choices with the catering team, and provide clear parking directions on your invites."
              </p>
              <div className="p-3.5 rounded-xl border border-rose-500/20 bg-rose-950/20 text-xs text-rose-300 space-y-1">
                <div className="font-semibold text-rose-200">Critical Blindspots:</div>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-slate-300">
                  <li>Zero awareness that the freight elevator has weekday service lockouts.</li>
                  <li>Blind to the 20% vegetarian catering deficit known from regional tech attendance.</li>
                  <li>Unaware that Auditorium 1 experiences mic howling past 300 guests without DSP suppressors.</li>
                  <li>Completely missed monsoon lawn drainage failure and basement cellular blackout.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. Enterprise Feature Pillars */}
      <div className="max-w-6xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Designed for Mission-Critical Event Operations
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            From single tech meetups to 10,000-attendee corporate conferences, RecallHQ turns past failures into competitive immunity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-3 hover:border-indigo-500/40 transition-all">
            <div className="h-10 w-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Brain className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Persistent Hindsight Memory</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every retrospective, audio glitch, elevator lockout, and catering shortfall is embedded into Vectorize Hindsight's neural bank with venue, season, and capacity tags.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-3 hover:border-indigo-500/40 transition-all">
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Automated Operations Riders</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Auto-generates printable and exportable Markdown operations riders with department-specific checklists for Logistics, AV & Tech, Catering, and Venue Security.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-3 hover:border-indigo-500/40 transition-all">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Enterprise Privacy & PII Scrubbing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automated PII redaction cleans attendee emails, phone numbers, and vendor names before committing data to shared memory banks, ensuring SOC2 and GDPR compliance.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Interactive ROI & Risk Avoidance Calculator */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/30 via-slate-900/70 to-slate-950/80 p-6 sm:p-8 backdrop-blur-2xl space-y-6">
          <div className="flex items-center gap-2">
            <Sliders className="h-5 w-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-white">Interactive Venue Risk & ROI Calculator</h3>
          </div>
          <p className="text-xs text-slate-300">
            Estimate logistical capital protected and setup hours reclaimed using RecallHQ's proactive memory grounding:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-300 mb-1.5">
                  <span>Target Attendance:</span>
                  <span className="font-mono text-indigo-300 font-bold">{attendeeCount} guests</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="2000"
                  step="50"
                  value={attendeeCount}
                  onChange={(e) => setAttendeeCount(Number(e.target.value))}
                  className="w-full accent-indigo-500 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-300 mb-1.5">
                  <span>Venue & Operations Budget:</span>
                  <span className="font-mono text-indigo-300 font-bold">INR {averageBudget.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="200000"
                  max="5000000"
                  step="100000"
                  value={averageBudget}
                  onChange={(e) => setAverageBudget(Number(e.target.value))}
                  className="w-full accent-indigo-500 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-indigo-500/30 bg-slate-950/70 space-y-3 flex flex-col justify-center">
              <div>
                <span className="text-xs text-slate-400">Estimated Disaster Capital Protected:</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono mt-0.5">
                  INR {calculatedRiskSaved.toLocaleString()}
                </div>
              </div>
              <div>
                <span className="text-xs text-slate-400">Emergency Setup Overhead Saved:</span>
                <div className="text-lg font-bold text-indigo-300 font-mono mt-0.5">
                  ~{setupHoursSaved} operational hours / event
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Commercial Tiers / "Go-to-Sell Product" */}
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
            <Award className="h-3.5 w-3.5" />
            Enterprise Deployment Tiers
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Ready to Deploy Across Your Organization
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Choose the deployment tier that matches your venue footprint and regional scaling requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Tier 1 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Growth Team</span>
              <div className="text-2xl font-extrabold text-white">
                INR 24,999 <span className="text-xs text-slate-400 font-normal">/ month</span>
              </div>
              <p className="text-xs text-slate-400">
                Ideal for growing event operations planning 2-5 large regional events per quarter.
              </p>
              <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  Up to 25 Dedicated Venue Memories
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  Vectorize Hindsight Cloud SDK
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  Standard Grounded Briefing Generator
                </li>
              </ul>
            </div>
            <button
              onClick={() => onEnterApp("planner")}
              className="w-full py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-all cursor-pointer"
            >
              Get Started
            </button>
          </div>

          {/* Tier 2 (Featured) */}
          <div className="relative rounded-2xl border-2 border-indigo-500 bg-slate-900/90 p-6 space-y-5 flex flex-col justify-between shadow-2xl shadow-indigo-600/20">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
              Most Popular Enterprise
            </div>
            <div className="space-y-3 pt-1">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Enterprise Pro</span>
              <div className="text-2xl font-extrabold text-white">
                INR 74,999 <span className="text-xs text-slate-400 font-normal">/ month</span>
              </div>
              <p className="text-xs text-slate-400">
                For corporate event divisions and conference producers requiring unlimited institutional recall.
              </p>
              <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  Unlimited Venue Memory Nodes
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  Automated Operations Rider Export
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  Cross-Venue Risk Comparison Engine
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  Fast Groq LLM Grounded Chat Agent
                </li>
              </ul>
            </div>
            <button
              onClick={() => onEnterApp("planner")}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              Start Enterprise Deployment
            </button>
          </div>

          {/* Tier 3 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Global Consortium</span>
              <div className="text-2xl font-extrabold text-white">
                Custom <span className="text-xs text-slate-400 font-normal">SLA</span>
              </div>
              <p className="text-xs text-slate-400">
                Multi-region venue chains, hotel networks, and sovereign convention bureaus.
              </p>
              <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  Dedicated On-Prem / VPC Memory Cluster
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  Automated PII Scrubbing Compliance
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  24/7 Dedicated Logistics Systems Architect
                </li>
              </ul>
            </div>
            <button
              onClick={onOpenAuth}
              className="w-full py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-all cursor-pointer"
            >
              Contact Solutions Team
            </button>
          </div>
        </div>
      </div>

      {/* 7. Final Call to Action */}
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-950 p-8 sm:p-12 space-y-5">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Transform Your Event Operations Today
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Experience how persistent hindsight memory eliminates repeat logistical failures before your next event begins.
          </p>
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => onEnterApp("planner")}
              className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/40 transition-all flex items-center gap-2 cursor-pointer"
            >
              Enter RecallHQ Command Center
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

