"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Building2, Layers } from "lucide-react";

const VENUES = [
  {
    name: "Keynote Convention Hall",
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2400&q=80",
    tag: "Auditorium & Stage"
  },
  {
    name: "Grand Executive Conclave",
    url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=2400&q=80",
    tag: "Summit Ballroom"
  },
  {
    name: "Innovation Hub Pavilion",
    url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=2400&q=80",
    tag: "Tech Campus & Breakouts"
  }
];

export default function AnimatedVenueBackground() {
  const [currentVenueIndex, setCurrentVenueIndex] = useState(0);

  // Auto-cycle through luxury venues every 20 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVenueIndex((prev) => (prev + 1) % VENUES.length);
    }, 20000);
    return () => clearInterval(timer);
  }, []);

  const active = VENUES[currentVenueIndex];

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-slate-950">
      {/* 1. Visibly Moving Venue Image with Dynamic Ken Burns Zoom & Drift */}
      <div
        key={active.url}
        className="absolute -inset-10 bg-cover bg-center transition-all duration-1000 ease-out will-change-transform opacity-60"
        style={{
          backgroundImage: `url('${active.url}')`,
          animation: "venuePanZoom 18s ease-in-out infinite alternate",
          filter: "brightness(0.65) contrast(1.1) saturate(1.2)",
        }}
      />

      {/* 2. Soft Gradient Scrims that preserve image clarity while ensuring card text is 100% crisp */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/80 backdrop-blur-[0.5px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-slate-950/70" />

      {/* 3. Floating Animated Glowing Memory Orbs (Simulating Vector Hindsight Nodes) */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-500/20 blur-[100px] pointer-events-none"
        style={{ animation: "orbFloat1 12s ease-in-out infinite alternate" }}
      />
      <div 
        className="absolute top-1/2 right-1/4 w-[450px] h-[450px] rounded-full bg-purple-500/15 blur-[120px] pointer-events-none"
        style={{ animation: "orbFloat2 15s ease-in-out infinite alternate" }}
      />
      <div 
        className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-sky-500/15 blur-[90px] pointer-events-none"
        style={{ animation: "orbFloat3 10s ease-in-out infinite alternate" }}
      />

      {/* 4. Subtle Shimmering Light Sweep across the Venue */}
      <div 
        className="absolute inset-0 opacity-20 bg-gradient-to-r from-transparent via-indigo-400/10 to-transparent pointer-events-none"
        style={{ animation: "lightSweep 8s linear infinite" }}
      />

      {/* 5. Minimal Scene Indicator (Bottom-Left) */}
      <div className="absolute bottom-4 left-4 pointer-events-auto z-20 hidden md:flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700/80 bg-slate-900/90 backdrop-blur-xl shadow-xl text-xs text-slate-300">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <Building2 className="h-3.5 w-3.5 text-indigo-400" />
          <span className="font-semibold">{active.name}</span>
          <span className="text-[10px] text-slate-500 font-mono">({active.tag})</span>
          <button
            onClick={() => setCurrentVenueIndex((prev) => (prev + 1) % VENUES.length)}
            className="ml-1 px-2 py-0.5 rounded-full bg-slate-800 hover:bg-slate-700 text-indigo-300 text-[10px] font-semibold transition-all cursor-pointer"
          >
            Switch
          </button>
        </div>
      </div>
    </div>
  );
}
