"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import LandingPage from "@/components/LandingPage";
import AuthModal, { UserProfile } from "@/components/AuthModal";
import EventPlannerForm from "@/components/EventPlannerForm";
import MemoryInspector from "@/components/MemoryInspector";
import PastEventsTable from "@/components/PastEventsTable";
import InteractiveChat from "@/components/InteractiveChat";
import TimelineCalendar from "@/components/TimelineCalendar";
import VenueBriefingCard from "@/components/VenueBriefingCard";
import JudgeWalkthrough from "@/components/JudgeWalkthrough";
import VenueComparison from "@/components/VenueComparison";
import { VenueBriefing, EventRecord, HindsightMemoryNode } from "@/types";
import { 
  Brain, 
  Sparkles, 
  Building2, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck, 
  Zap, 
  RotateCcw,
  LayoutDashboard
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("landing");
  const [currentBriefing, setCurrentBriefing] = useState<VenueBriefing | null>(null);
  const [isPlanning, setIsPlanning] = useState<boolean>(false);
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [allMemories, setAllMemories] = useState<HindsightMemoryNode[]>([]);
  
  // Authentication State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  // Load initial events & memories
  const loadInitialData = async () => {
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      if (data.events) {
        setEvents(data.events);
      }

      const memRes = await fetch("/api/hindsight");
      const memData = await memRes.json();
      if (memData.memories) {
        setAllMemories(memData.memories);
      }
    } catch (err) {
      console.warn("Error loading data", err);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const handlePlanGenerated = (briefing: VenueBriefing) => {
    setCurrentBriefing(briefing);
  };

  const handleLaunchScenarioFromWalkthrough = async (scenario: {
    venueName: string;
    location: string;
    date: string;
    capacity: number;
    eventType: string;
    budget: number;
    notes: string;
  }) => {
    setActiveTab("planner");
    setIsPlanning(true);
    try {
      const response = await fetch("/api/plan-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scenario),
      });
      const data = await response.json();
      if (data.data) {
        setCurrentBriefing(data.data);
      }
    } catch (err) {
      console.error("Failed to run scenario", err);
    } finally {
      setIsPlanning(false);
    }
  };

  const handleSelectTimelineEvent = (event: EventRecord) => {
    setActiveTab("planner");
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-white relative z-10">
      {/* Top Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* User Authentication & Verification Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onLoginSuccess={(user) => setCurrentUser(user)}
        onLogout={() => setCurrentUser(null)}
      />

      {/* Primary View Routing */}
      {activeTab === "landing" ? (
        /* High-End Award-Winning Animated Landing Page */
        <main className="flex-1 w-full">
          <LandingPage 
            onEnterApp={(tab) => setActiveTab(tab || "planner")} 
            onOpenAuth={() => setIsAuthOpen(true)}
            currentUser={currentUser}
          />
        </main>
      ) : (
        /* Enterprise Command Center & Workspace Dashboards */
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
          {/* Workspace Header Strip */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-indigo-950/40 via-slate-900/60 to-slate-950/90 p-6 sm:p-8 backdrop-blur-2xl shadow-xl">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-2xl space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300 border border-indigo-500/20">
                  <Brain className="h-3.5 w-3.5 text-indigo-400" />
                  Autonomous Persistent Event Memory • Enterprise Edition
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  RecallHQ Enterprise Command Center
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Persistent hindsight memory recalls past venue limitations, unannounced maintenance delays, monsoon lawn floodings, acoustic feedbacks, and catering disparities before contracting.
                </p>
              </div>

              {/* Quick Metrics Cards */}
              <div className="grid grid-cols-2 gap-3 shrink-0">
                <div className="p-3.5 rounded-2xl border border-slate-800 bg-slate-900/90 shadow-md">
                  <div className="text-xs text-slate-400 font-medium">Memory Bank</div>
                  <div className="mt-1 text-xl font-bold text-white flex items-center gap-1.5">
                    <span className="text-emerald-400 font-mono">{allMemories.length || 8}</span>
                    <span className="text-xs text-slate-400 font-normal">nodes</span>
                  </div>
                  <div className="text-[10px] text-indigo-400 mt-0.5 font-medium">Vectorize Hindsight</div>
                </div>

                <div className="p-3.5 rounded-2xl border border-slate-800 bg-slate-900/90 shadow-md">
                  <div className="text-xs text-slate-400 font-medium">Precedent Venues</div>
                  <div className="mt-1 text-xl font-bold text-white flex items-center gap-1.5">
                    <span className="text-indigo-400 font-mono">{events.length || 4}</span>
                    <span className="text-xs text-slate-400 font-normal">mapped</span>
                  </div>
                  <div className="text-[10px] text-emerald-400 mt-0.5 font-medium">100% Grounded</div>
                </div>
              </div>
            </div>
          </div>

          {/* Scenario Walkthrough Banner */}
          <JudgeWalkthrough onSelectScenario={handleLaunchScenarioFromWalkthrough} />

          {/* Tab 1: Briefing & Planner */}
          {activeTab === "planner" && (
            <div className="space-y-8 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5">
                  <EventPlannerForm 
                    onPlanGenerated={handlePlanGenerated} 
                    onPlanningStateChange={setIsPlanning}
                  />
                </div>

                <div className="lg:col-span-7">
                  {currentBriefing ? (
                    <VenueBriefingCard 
                      briefing={currentBriefing} 
                      onOpenInspector={() => setActiveTab("inspector")}
                    />
                  ) : (
                    <div className="h-full flex flex-col justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-8 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800/80 text-indigo-400 shadow-md">
                        <Sparkles className="h-6 w-6" />
                      </div>
                      <h3 className="mt-4 text-base font-semibold text-slate-200">No Briefing Generated Yet</h3>
                      <p className="mt-1 text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                        Select one of the venue presets on the left or use the Scenario Walkthrough banner above to trigger real-time Hindsight memory recall.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Embedded Live Memory Inspector directly underneath planner */}
              <div className="pt-4">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-white">Live Memory Inspector</h3>
                    <p className="text-xs text-slate-400">
                      Inspecting real-time Vectorize Hindsight semantic graph nodes and comparing with stateless agent.
                    </p>
                  </div>
                </div>
                <MemoryInspector 
                  briefing={currentBriefing}
                  recalledMemories={allMemories}
                  isPlanning={isPlanning}
                />
              </div>
            </div>
          )}

          {/* Tab 2: Memory Inspector (Showpiece Full Page) */}
          {activeTab === "inspector" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <MemoryInspector 
                briefing={currentBriefing} 
                recalledMemories={allMemories} 
                isPlanning={isPlanning} 
              />
            </div>
          )}

          {/* Tab 3: Venue Comparison Matrix */}
          {activeTab === "compare" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <VenueComparison events={events} />
            </div>
          )}

          {/* Tab 4: Retrospective Memory Bank */}
          {activeTab === "events" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <PastEventsTable onEventLogged={loadInitialData} />
            </div>
          )}

          {/* Tab 5: Interactive Q&A Agent */}
          {activeTab === "chat" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <InteractiveChat />
            </div>
          )}

          {/* Tab 6: Seasonal Heatmap */}
          {activeTab === "timeline" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <TimelineCalendar 
                events={events} 
                onSelectEvent={handleSelectTimelineEvent} 
              />
            </div>
          )}
        </main>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-indigo-600/30 text-indigo-400 flex items-center justify-center font-bold text-xs">
              R
            </div>
            <span>
              RecallHQ • The headquarters for your event memory • Enterprise AI Edition
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Powered by <strong className="text-indigo-400 font-semibold">Vectorize Hindsight</strong></span>
            <span>•</span>
            <span>Inference by <strong className="text-amber-400 font-semibold">Groq API</strong></span>
            <span>•</span>
            <span>Privacy Engine <strong className="text-emerald-400 font-semibold">PII Scrubbed</strong></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
