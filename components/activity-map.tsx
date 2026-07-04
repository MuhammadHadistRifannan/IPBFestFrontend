"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Globe, MapPin, MoreHorizontal, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Hub {
  id: string;
  name: string;
  coords: { x: number; y: number }; // Percentage coordinates on SVG (0-100)
  rate: string;
  status: "active" | "maintenance" | "critical";
  volume: string;
}

const recyclingHubs: Hub[] = [
  {
    id: "hub-1",
    name: "Jakarta Operations (HQ)",
    coords: { x: 74, y: 68 },
    rate: "94.2%",
    status: "active",
    volume: "1,240 Tons/mo",
  },
  {
    id: "hub-2",
    name: "San Francisco Sorting Facility",
    coords: { x: 20, y: 35 },
    rate: "88.6%",
    status: "active",
    volume: "820 Tons/mo",
  },
  {
    id: "hub-3",
    name: "London Processing Center",
    coords: { x: 48, y: 26 },
    rate: "91.1%",
    status: "active",
    volume: "940 Tons/mo",
  },
  {
    id: "hub-4",
    name: "Nairobi Eco Hub",
    coords: { x: 56, y: 58 },
    rate: "74.8%",
    status: "maintenance",
    volume: "350 Tons/mo",
  },
  {
    id: "hub-5",
    name: "Sydney Recycling Depot",
    coords: { x: 86, y: 76 },
    rate: "96.5%",
    status: "active",
    volume: "510 Tons/mo",
  },
];

export function ActivityMap() {
  const [activeHub, setActiveHub] = useState<Hub | null>(null);

  return (
    <Card className="border border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60 backdrop-blur-md rounded-2xl flex flex-col h-full relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div>
          <CardTitle className="text-lg font-bold text-onyx-900 dark:text-white">
            Global Recycling Activity
          </CardTitle>
          <CardDescription className="text-onyx-500 dark:text-onyx-400">
            Active recycling facilities & performance
          </CardDescription>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-lg text-onyx-400 dark:text-onyx-500 hover:bg-onyx-50 dark:hover:bg-onyx-800"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between py-4 space-y-4">
        {/* Simplified Vector Map Container */}
        <div className="relative w-full aspect-[2/1] bg-onyx-50/50 dark:bg-onyx-950/40 rounded-xl border border-onyx-100 dark:border-onyx-800/40 overflow-hidden flex items-center justify-center">
          {/* Decorative Dot Grid representing a digital map */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.12] dark:opacity-[0.06] text-onyx-900 dark:text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
          >
            <defs>
              <pattern
                id="dotGrid"
                width="14"
                height="14"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dotGrid)" />
          </svg>

          {/* Stylized background world continents representation */}
          <svg
            className="absolute inset-0 w-full h-full text-onyx-200/80 dark:text-onyx-800/40"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 50"
            fill="currentColor"
          >
            {/* North America */}
            <path d="M5,10 L25,12 L30,22 L20,32 L15,35 L12,28 L5,22 Z" />
            {/* South America */}
            <path d="M22,33 L26,35 L28,42 L25,48 L22,40 Z" />
            {/* Greenland */}
            <path d="M30,5 L38,6 L35,11 L28,8 Z" />
            {/* Eurasia / Africa */}
            <path d="M42,12 L65,10 L85,15 L88,26 L75,32 L60,35 L58,45 L50,48 L46,38 L42,28 Z" />
            {/* Australia */}
            <path d="M80,38 L88,37 L89,44 L81,43 Z" />
          </svg>

          {/* Interactive Pins */}
          {recyclingHubs.map((hub) => {
            const isActive = activeHub?.id === hub.id;

            return (
              <Tooltip key={hub.id}>
                <TooltipTrigger
                  render={
                    <button
                      onMouseEnter={() => setActiveHub(hub)}
                      onMouseLeave={() => setActiveHub(null)}
                      className="absolute cursor-pointer -translate-x-1/2 -translate-y-1/2 group outline-none"
                      style={{ left: `${hub.coords.x}%`, top: `${hub.coords.y}%` }}
                    >
                      {/* Ring animation */}
                      <span className="absolute inline-flex h-6 w-6 rounded-full bg-lemon-lime-500/30 opacity-75 animate-ping group-hover:scale-125 duration-300" />
                      
                      {/* Inner point */}
                      <div
                        className={`relative flex items-center justify-center h-3 w-3 rounded-full border border-white dark:border-onyx-950 transition-all duration-300 ${
                          hub.status === "maintenance"
                            ? "bg-toffee-brown-500"
                            : hub.status === "critical"
                            ? "bg-rose-500"
                            : "bg-lemon-lime-500"
                        } ${isActive ? "scale-125" : ""}`}
                      />
                    </button>
                  }
                />
                <TooltipContent
                  side="top"
                  className="bg-onyx-900 dark:bg-white text-white dark:text-onyx-950 p-3 rounded-xl border border-onyx-800 dark:border-onyx-200 shadow-xl w-48 text-left z-50 font-sans"
                >
                  <div className="space-y-1">
                    <p className="text-xs font-bold leading-none">{hub.name}</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className={`h-1.5 w-1.5 rounded-full ${
                        hub.status === "maintenance" ? "bg-toffee-brown-500" : "bg-lemon-lime-500"
                      }`} />
                      <span className="text-[10px] text-onyx-400 dark:text-onyx-500 capitalize font-semibold">
                        Status: {hub.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-onyx-800/80 dark:border-onyx-100">
                      <div>
                        <p className="text-[9px] text-onyx-500 dark:text-onyx-400">Recycle Rate</p>
                        <p className="text-xs font-bold text-lemon-lime-500 dark:text-lemon-lime-600">
                          {hub.rate}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] text-onyx-500 dark:text-onyx-400">Volume</p>
                        <p className="text-xs font-bold">{hub.volume}</p>
                      </div>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        {/* Display selected or default active hub info at bottom */}
        <div className="flex items-center justify-between px-3 py-2 bg-onyx-50 dark:bg-onyx-900/40 rounded-xl border border-onyx-100 dark:border-onyx-800/50">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-lemon-lime-500/10 text-lemon-lime-600 dark:text-lemon-lime-400 flex items-center justify-center shrink-0">
              <Globe className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-onyx-900 dark:text-white">
                {activeHub ? activeHub.name : "Hover over map pins"}
              </p>
              <p className="text-[10px] text-onyx-500 dark:text-onyx-400">
                {activeHub
                  ? `Recycle rate: ${activeHub.rate} • Volume: ${activeHub.volume}`
                  : "Explore performance of international sorting hubs"}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
