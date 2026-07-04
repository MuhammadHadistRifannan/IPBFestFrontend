"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, Layers, Award, Leaf } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const performanceData = [
  { name: "Week 1", value: 42000 },
  { name: "Week 2", value: 45000 },
  { name: "Week 3", value: 43500 },
  { name: "Week 4", value: 48000 },
  { name: "Week 5", value: 50200 },
  { name: "Week 6", value: 52422 },
];

interface AssetCard {
  id: string;
  name: string;
  type: string;
  value: string;
  growth: string;
  colorClass: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function PortfolioPerformance() {
  const [activeAssetIndex, setActiveAssetIndex] = useState(0);

  const assets: AssetCard[] = [
    {
      id: "asset-1",
      name: "Carbon Credits ETF",
      type: "Eco Equity",
      value: "Rp320.5M",
      growth: "+14.2%",
      colorClass: "bg-mauve-shadow-500 text-white",
      icon: Leaf,
    },
    {
      id: "asset-2",
      name: "Solar Farms Bond",
      type: "Green Fixed Income",
      value: "Rp184.2M",
      growth: "+8.6%",
      colorClass: "bg-toffee-brown-500 text-white",
      icon: Award,
    },
    {
      id: "asset-3",
      name: "Wind Power Index",
      type: "Clean Tech",
      value: "Rp284.9M",
      growth: "+22.4%",
      colorClass: "bg-lemon-lime-500 text-onyx-950",
      icon: Layers,
    },
  ];

  // Rotate asset focus on click
  const handleCardClick = (index: number) => {
    setActiveAssetIndex(index);
  };

  return (
    <Card className="border border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60 backdrop-blur-md rounded-2xl flex flex-col h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-onyx-900 dark:text-white">
          Portfolio Performance
        </CardTitle>
        <CardDescription className="text-onyx-500 dark:text-onyx-400">
          Green asset evaluation and performance logs
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between py-4 space-y-6">
        {/* Core Stats Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-onyx-50 dark:bg-onyx-950/40 p-3 rounded-xl border border-onyx-100 dark:border-onyx-800/40">
            <span className="text-[10px] font-bold text-onyx-400 dark:text-onyx-500 uppercase tracking-wider block">
              Recycled yield (Specs)
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-lg font-bold text-onyx-900 dark:text-white">43.50%</span>
              <span className="text-[10px] font-bold text-emerald-500 flex items-center">
                <ArrowUpRight className="h-3 w-3" /> +2.45%
              </span>
            </div>
          </div>
          <div className="bg-onyx-50 dark:bg-onyx-950/40 p-3 rounded-xl border border-onyx-100 dark:border-onyx-800/40">
            <span className="text-[10px] font-bold text-onyx-400 dark:text-onyx-500 uppercase tracking-wider block">
              Portfolio Balance
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-lg font-bold text-onyx-900 dark:text-white">Rp789.6M</span>
              <span className="text-[10px] font-bold text-rose-500 flex items-center">
                <ArrowDownRight className="h-3 w-3" /> -4.78%
              </span>
            </div>
          </div>
        </div>

        {/* Micro Line Chart */}
        <div className="h-28 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <XAxis dataKey="name" hide />
              <YAxis domain={["dataMin - 2000", "dataMax + 2000"]} hide />
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--color-mauve-shadow-500)"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 0, fill: "var(--color-mauve-shadow-500)" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stacked Cards Interactive Section */}
        <div className="relative h-28 mt-2 flex items-center justify-center">
          {assets.map((asset, index) => {
            // Determine relative positions for visual stacking effect
            const offsetIndex = (index - activeAssetIndex + assets.length) % assets.length;
            const zIndex = 30 - offsetIndex;
            const translateY = offsetIndex * 12;
            const scale = 1 - offsetIndex * 0.05;
            const opacity = 1 - offsetIndex * 0.25;

            const Icon = asset.icon;

            return (
              <div
                key={asset.id}
                onClick={() => handleCardClick(index)}
                className={`absolute w-11/12 h-20 rounded-xl p-3 flex justify-between items-center shadow-lg cursor-pointer transition-all duration-300 origin-bottom select-none border border-black/10 dark:border-white/10`}
                style={{
                  transform: `translateY(${translateY}px) scale(${scale})`,
                  zIndex,
                  opacity,
                  backgroundColor:
                    asset.id === "asset-1"
                      ? "var(--color-mauve-shadow-600)"
                      : asset.id === "asset-2"
                      ? "var(--color-toffee-brown-600)"
                      : "var(--color-lemon-lime-500)",
                  color: asset.id === "asset-3" ? "var(--color-onyx-950)" : "white",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                    asset.id === "asset-3" ? "bg-onyx-950/10" : "bg-white/10"
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold truncate max-w-[150px]">{asset.name}</h5>
                    <span className={`text-[9px] font-semibold opacity-75`}>
                      {asset.type}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold">{asset.value}</p>
                  <span className="text-[9px] font-semibold">{asset.growth}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
