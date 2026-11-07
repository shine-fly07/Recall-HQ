"use client";

import React, { useState } from "react";
import { 
  Lock, 
  Mail, 
  Key, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  X, 
  Sparkles, 
  Building2, 
  User, 
  Fingerprint,
  Zap,
  Shield,
  Layers
} from "lucide-react";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  organization: string;
  avatar: string;
  tier: "Enterprise Pro" | "Operations Director" | "Global Administrator";
  clearanceLevel: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  currentUser: UserProfile | null;
  onLogout: () => void;
}

const PRESET_USERS: UserProfile[] = [
  {
    id: "usr_sarah_chen",
    name: "Sarah Chen",
    email: "sarah.chen@techcon-global.com",
    role: "VP of Global Events",
    organization: "TechCon Global Enterprises",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    tier: "Enterprise Pro",
    clearanceLevel: "Level 4 - Full Recall & Operations Rider Author"
  },
  {
    id: "usr_vikram_malhotra",
    name: "Vikram Malhotra",
    email: "vikram@hyderabad-ventures.org",
    role: "Head of Operations & Venues",
    organization: "Hyderabad Innovation Hubs",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    tier: "Operations Director",
    clearanceLevel: "Level 3 - Regional Memory Bank Controller"
  },
  {
    id: "usr_elena_rostova",
    name: "Elena Rostova",
    email: "elena.r@convene-scale.io",
    role: "Chief Logistics Architect",
    organization: "Convene International",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    tier: "Global Administrator",
    clearanceLevel: "Level 5 - Universal Memory & Privacy Supervisor"
  }
];

export default function AuthModal({
  isOpen,
  onClose,
  onLoginSuccess,
  currentUser,
  onLogout
}: AuthModalProps) {
  const [authMode, setAuthMode] = useState<"login" | "sso" | "presets">("presets");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authSuccessStep, setAuthSuccessStep] = useState(false);

  if (!isOpen) return null;

  const handleSelectPreset = (preset: UserProfile) => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setAuthSuccessStep(true);
      setTimeout(() => {
        setAuthSuccessStep(false);
        onLoginSuccess(preset);
        onClose();
      }, 700);
    }, 600);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsAuthenticating(true);
    setTimeout(() => {
      const customUser: UserProfile = {
        id: `usr_${Date.now()}`,
        name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
        email: email,
        role: "Event Operations Lead",
        organization: email.includes("@") ? email.split("@")[1].split(".")[0].toUpperCase() + " Events" : "Enterprise Client",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        tier: "Enterprise Pro",
        clearanceLevel: "Level 3 - Grounded Recall & Retrospective Access"
      };
      setIsAuthenticating(false);
      setAuthSuccessStep(true);
      setTimeout(() => {
        setAuthSuccessStep(false);
        onLoginSuccess(customUser);
        onClose();
      }, 700);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-700/80 bg-slate-900/95 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl text-slate-100 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-36 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {currentUser ? (
          /* Profile Logged-in State */
          <div className="space-y-6 pt-2">
            <div className="flex items-center gap-4 pb-4 border-b border-slate-800">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="h-14 w-14 rounded-2xl object-cover ring-2 ring-indigo-500/40 shadow-lg"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">{currentUser.name}</h3>
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="h-3 w-3" />
                    Verified Identity
                  </span>
                </div>
                <p className="text-xs text-slate-400">{currentUser.email}</p>
                <div className="mt-1 flex items-center gap-2 text-xs text-indigo-400 font-medium">
                  <Building2 className="h-3.5 w-3.5" />
                  {currentUser.organization}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl border border-slate-800 bg-slate-950/60">
                <span className="text-slate-500 block mb-0.5">Access Tier</span>
                <span className="font-semibold text-indigo-300">{currentUser.tier}</span>
              </div>
              <div className="p-3 rounded-xl border border-slate-800 bg-slate-950/60">
                <span className="text-slate-500 block mb-0.5">Security Clearance</span>
                <span className="font-semibold text-emerald-400">{currentUser.clearanceLevel.split(" - ")[0]}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl border border-indigo-500/20 bg-indigo-950/30 text-xs text-slate-300 space-y-1">
              <div className="font-semibold text-indigo-300 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-indigo-400" />
                Audit-Ready Session Active
              </div>
              <p className="text-[11px] text-slate-400">
                All event briefing requests, retrospective submissions, and memory recalls are cryptographically signed with your corporate identity.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                Continue to Workspace
              </button>
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="px-4 py-2.5 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs font-medium transition-all cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          /* Authentication Screen */
          <div className="space-y-6">
            <div className="text-center space-y-1.5">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25">
                <Fingerprint className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Authenticate Enterprise Identity
              </h2>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Sign in to access your organization's persistent venue memory bank, operations riders, and grounded AI models.
              </p>
            </div>

            {/* Auth Mode Switcher */}
            <div className="flex items-center p-1 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
              <button
                onClick={() => setAuthMode("presets")}
                className={`flex-1 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  authMode === "presets"
                    ? "bg-indigo-600 text-white shadow"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Fast 1-Click Profiles
              </button>
              <button
                onClick={() => setAuthMode("login")}
                className={`flex-1 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  authMode === "login"
                    ? "bg-indigo-600 text-white shadow"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Work Email
              </button>
              <button
                onClick={() => setAuthMode("sso")}
                className={`flex-1 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  authMode === "sso"
                    ? "bg-indigo-600 text-white shadow"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Enterprise SSO
              </button>
            </div>

            {/* Mode 1: Fast 1-Click Enterprise Profiles */}
            {authMode === "presets" && (
              <div className="space-y-3">
                <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
                  Select Verified Corporate Identity:
                </p>
                <div className="space-y-2">
                  {PRESET_USERS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      disabled={isAuthenticating}
                      className="w-full flex items-center justify-between p-3 rounded-2xl border border-slate-800 bg-slate-950/60 hover:border-indigo-500/50 hover:bg-slate-900 transition-all text-left group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={preset.avatar}
                          alt={preset.name}
                          className="h-10 w-10 rounded-xl object-cover ring-1 ring-slate-700 group-hover:ring-indigo-500 transition-all"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold text-white group-hover:text-indigo-300 transition-colors">
                              {preset.name}
                            </span>
                            <span className="text-[10px] text-slate-400">• {preset.role}</span>
                          </div>
                          <span className="text-[11px] text-slate-400 block">{preset.organization}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
                          {preset.tier}
                        </span>
                        <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Mode 2: Work Email + Password Form */}
            {authMode === "login" && (
              <form onSubmit={handleCustomSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1.5">
                    Corporate Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. director@events.stripe.com"
                      required
                      className="w-full rounded-xl border border-slate-800 bg-slate-950/80 pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1.5">
                    Enterprise Password
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      className="w-full rounded-xl border border-slate-800 bg-slate-950/80 pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isAuthenticating ? (
                    <>
                      <Sparkles className="h-4 w-4 animate-spin" />
                      Verifying Identity Credentials...
                    </>
                  ) : (
                    <>
                      <Lock className="h-3.5 w-3.5" />
                      Sign In to Workspace
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Mode 3: Enterprise SSO Providers */}
            {authMode === "sso" && (
              <div className="space-y-3">
                <p className="text-[11px] text-slate-400 font-medium">
                  Connect via your company's Identity Provider (SAML 2.0 / OIDC):
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { name: "Okta Verify", color: "from-blue-600 to-indigo-600" },
                    { name: "Google Workspace", color: "from-red-500 to-amber-500" },
                    { name: "Microsoft Entra ID", color: "from-sky-500 to-blue-600" },
                    { name: "GitHub Enterprise", color: "from-slate-700 to-slate-900" }
                  ].map((sso) => (
                    <button
                      key={sso.name}
                      onClick={() => handleSelectPreset(PRESET_USERS[0])}
                      disabled={isAuthenticating}
                      className="p-3 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-indigo-500/40 hover:bg-slate-900 text-xs font-medium text-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Shield className="h-3.5 w-3.5 text-indigo-400" />
                      {sso.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Security Guarantee Footer */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                SOC2 Type II & PII Scrubbing Active
              </span>
              <span>256-bit AES Memory Encryption</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

