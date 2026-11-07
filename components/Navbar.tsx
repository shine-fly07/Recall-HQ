"use client";

import React, { useState, useEffect } from "react";
import { 
  Brain, 
  Sparkles, 
  Key, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  Layers,
  Cpu,
  RefreshCw,
  Zap,
  Scale,
  User,
  ShieldCheck,
  Lock,
  ChevronDown,
  Calendar,
  Database,
  MessageSquare,
  SunMedium,
  Compass
} from "lucide-react";
import { UserProfile } from "./AuthModal";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser?: UserProfile | null;
  onOpenAuth?: () => void;
}

export default function Navbar({ 
  activeTab, 
  setActiveTab,
  currentUser = null,
  onOpenAuth = () => {}
}: NavbarProps) {
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [hindsightStatus, setHindsightStatus] = useState<any>({
    isConfigured: false,
    activeEngine: "Hindsight Neural Engine (Local Hybrid)",
    bankId: "recallhq-universal"
  });
  const [groqStatus, setGroqStatus] = useState<any>({
    isConfigured: false,
    model: "openai/gpt-oss-120b",
    provider: "Grounded Memory Engine"
  });

  const fetchStatus = async () => {
    try {
      const res = await fetch("/api/hindsight");
      const data = await res.json();
      if (data.hindsight) setHindsightStatus(data.hindsight);
      if (data.groq) setGroqStatus(data.groq);
    } catch (err) {
      console.warn("Could not fetch status", err);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const navTabs = [
    { id: "landing", label: "Overview", icon: Sparkles },
    { id: "planner", label: "Planner", icon: Calendar },
    { id: "inspector", label: "Inspector", icon: Brain },
    { id: "compare", label: "Venue Matrix", icon: Scale },
    { id: "events", label: "Memory Bank", icon: Database },
    { id: "chat", label: "Q&A Agent", icon: MessageSquare },
    { id: "timeline", label: "Radar", icon: Compass },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16 gap-3">
          {/* Logo & Branding */}
          <div 
            onClick={() => setActiveTab("landing")}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-all">
              <Brain className="h-5 w-5" />
              <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                  RecallHQ
                </span>
                <span className="inline-flex items-center rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-bold text-indigo-400 border border-indigo-500/25">
                  Enterprise AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 whitespace-nowrap hidden sm:block">
                Autonomous Event Memory • Hindsight v2.4
              </p>
            </div>
          </div>

          {/* Navigation Tabs - Clean, Structured & Single-Line */}
          <nav className="hidden lg:flex items-center gap-1 rounded-full bg-slate-900/90 p-1.5 border border-slate-800 shadow-inner">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls: User Profile + Engine Config */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* User Identity Button */}
            {currentUser ? (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 h-9 px-3 rounded-full border border-indigo-500/30 bg-indigo-950/40 hover:bg-indigo-900/50 transition-all text-xs cursor-pointer group"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="h-5 w-5 rounded-full object-cover ring-1 ring-indigo-400"
                />
                <span className="font-semibold text-white text-xs hidden sm:inline">
                  {currentUser.name.split(" ")[0]}
                </span>
                <span className="hidden xl:inline-flex items-center px-1.5 py-0.2 rounded bg-indigo-500/20 text-[9px] text-indigo-300 font-mono">
                  {currentUser.tier.split(" ")[0]}
                </span>
                <ChevronDown className="h-3 w-3 text-slate-400 group-hover:text-white" />
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 h-9 px-4 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-indigo-600/25 transition-all cursor-pointer whitespace-nowrap"
              >
                <Lock className="h-3.5 w-3.5" />
                <span>Sign In</span>
              </button>
            )}

            {/* Engine Config Modal Trigger */}
            <button
              onClick={() => setShowConfigModal(true)}
              className="flex items-center gap-1.5 h-9 px-3 rounded-full border border-slate-800 bg-slate-900/90 text-xs font-medium text-slate-300 hover:border-indigo-500/50 hover:bg-slate-800 transition-all cursor-pointer whitespace-nowrap"
              title="Inspect Hindsight & Groq API connections"
            >
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="hidden md:inline text-[11px] font-medium text-slate-300">Engine</span>
              <Key className="h-3.5 w-3.5 text-indigo-400" />
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Navigation Scrollbar with Single-Line Guarantee */}
        <div className="lg:hidden border-t border-slate-800/80 px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800/60"
                }`}
              >
                <Icon className={`h-3 w-3 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Engine Status & Credentials Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-3xl border border-slate-700/80 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-2xl text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Key className="h-5 w-5 text-indigo-400" />
                <h3 className="text-sm font-bold text-white">Engine & API Connectivity</h3>
              </div>
              <button
                onClick={() => setShowConfigModal(false)}
                className="text-xs text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              {/* Vectorize Hindsight Status */}
              <div className="p-3.5 rounded-2xl border border-slate-800 bg-slate-950/70">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-indigo-400" />
                    <span className="font-semibold text-white">Vectorize Hindsight</span>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                    hindsightStatus.isConfigured 
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-indigo-500/10 text-indigo-300 border-indigo-500/20"
                  }`}>
                    {hindsightStatus.isConfigured ? "Live Cloud Connected" : "Local Neural Hybrid Engine"}
                  </span>
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  Memory Bank: <code className="text-indigo-300 font-mono">{hindsightStatus.bankId}</code>
                </p>
                <p className="text-slate-400 mt-0.5 text-[11px]">
                  Endpoint: <code className="text-slate-300 font-mono">{hindsightStatus.apiUrl}</code>
                </p>
                <div className="mt-2 text-[10px] text-slate-500">
                  To connect your custom Hindsight API key, set <code className="text-indigo-300">HINDSIGHT_API_KEY</code> in <code className="text-slate-300">.env.local</code>.
                </div>
              </div>

              {/* Groq LLM Status */}
              <div className="p-3.5 rounded-2xl border border-slate-800 bg-slate-950/70">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-400" />
                    <span className="font-semibold text-white">Groq LLM Inference</span>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                    groqStatus.isConfigured 
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-300 border-amber-500/20"
                  }`}>
                    {groqStatus.isConfigured ? "Groq Cloud Active" : "Grounded Fallback Engine"}
                  </span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Configured Model: <code className="text-amber-300 font-mono">{groqStatus.model}</code>
                </p>
                <div className="mt-2 text-[10px] text-slate-500">
                  To enable live Groq cloud inference, set <code className="text-amber-300">GROQ_API_KEY</code> in <code className="text-slate-300">.env.local</code>.
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setShowConfigModal(false)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold cursor-pointer transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
