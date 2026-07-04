"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, HelpCircle } from "lucide-react";

interface WasteItem {
  name: string;
  percentage: number;
  weight: string;
  colorClass: string;
  insight: string;
}

const initialWasteData: WasteItem[] = [
  {
    name: "Product 1 (Bio-Plastics)",
    percentage: 64,
    weight: "2.4 Tons",
    colorClass: "bg-mauve-shadow-500",
    insight: "Optimized packing could reduce scraps by 12% in the next batch.",
  },
  {
    name: "Product 2 (Composite Wood)",
    percentage: 82,
    weight: "4.8 Tons",
    colorClass: "bg-toffee-brown-500",
    insight: "High moisture content during cutting is causing a 15% increase in shaving waste.",
  },
  {
    name: "Product 3 (Silicon Fibers)",
    percentage: 38,
    weight: "1.1 Tons",
    colorClass: "bg-lemon-lime-500",
    insight: "Currently operating at optimal waste efficiency (below 40%).",
  },
];

export function WasteProgress() {
  const [showAiInsight, setShowAiInsight] = useState(true);

  return (
    <Card className="border border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60 backdrop-blur-md rounded-2xl flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div>
          <CardTitle className="text-lg font-bold text-onyx-900 dark:text-white">
            Waste per Product
          </CardTitle>
          <CardDescription className="text-onyx-500 dark:text-onyx-400">
            Material scrap weight and optimization percentage
          </CardDescription>
        </div>
        <div className="flex items-center gap-2 bg-onyx-50 dark:bg-onyx-900/80 px-3 py-1.5 rounded-xl border border-onyx-200/50 dark:border-onyx-800/80">
          <Sparkles className="h-4 w-4 text-chartreuse-600 dark:text-chartreuse-400" />
          <label htmlFor="ai-insight" className="text-xs font-semibold text-onyx-700 dark:text-onyx-300 cursor-pointer">
            AI Insight
          </label>
          {/* We can construct a simple custom toggle/switch or rely on basic input since Shadcn switch might require extra dependency, or let's use a simple HTML checkbox styled elegantly or custom UI */}
          <input
            type="checkbox"
            id="ai-insight"
            checked={showAiInsight}
            onChange={(e) => setShowAiInsight(e.target.checked)}
            className="sr-only peer"
          />
          <div
            onClick={() => setShowAiInsight(!showAiInsight)}
            className="w-8 h-4 bg-onyx-200 rounded-full relative peer peer-focus:ring-2 peer-focus:ring-lemon-lime-500 dark:bg-onyx-800 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-onyx-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-onyx-600 peer-checked:bg-chartreuse-500 cursor-pointer"
          />
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between py-4 space-y-6">
        <div className="space-y-4">
          {initialWasteData.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-onyx-700 dark:text-onyx-300">
                  {item.name}
                </span>
                <span className="font-bold text-onyx-900 dark:text-white">
                  {item.weight} ({item.percentage}%)
                </span>
              </div>
              <div className="w-full bg-onyx-100 dark:bg-onyx-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${item.colorClass} transition-all duration-1000 ease-out`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>

              {/* Collapsible AI Insight for this item */}
              {showAiInsight && (
                <div className="mt-1 ml-2 pl-3 border-l border-chartreuse-500/30 py-1 text-[11px] leading-relaxed text-onyx-500 dark:text-onyx-400 flex items-start gap-1.5 animate-fadeIn">
                  <Sparkles className="h-3.5 w-3.5 text-chartreuse-600 dark:text-chartreuse-400 mt-0.5 shrink-0" />
                  <span>{item.insight}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Global Insight Panel */}
        {showAiInsight && (
          <div className="mt-4 p-4 rounded-xl bg-chartreuse-500/5 dark:bg-chartreuse-500/[0.03] border border-chartreuse-500/20 dark:border-chartreuse-500/10 flex gap-3 animate-fadeIn">
            <div className="h-8 w-8 rounded-lg bg-chartreuse-500/10 flex items-center justify-center shrink-0">
              <Sparkles className="h-4 w-4 text-chartreuse-600 dark:text-chartreuse-400" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-onyx-900 dark:text-white flex items-center gap-1.5">
                Composite Waste Recommendation
              </h4>
              <p className="text-[11px] text-onyx-500 dark:text-onyx-400 leading-relaxed mt-1">
                Product 2 shows a high recycling potential. Converting shaving scrap into eco-briquettes could generate up to <strong>Rp14.8M</strong> in additional monthly revenue.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
