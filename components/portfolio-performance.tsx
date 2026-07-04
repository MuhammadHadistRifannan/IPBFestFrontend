"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Coffee, Cake, ShoppingBag } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const performanceData = [
  { name: "Minggu 1", value: 2200000 },
  { name: "Minggu 2", value: 2500000 },
  { name: "Minggu 3", value: 2350000 },
  { name: "Minggu 4", value: 2800000 },
  { name: "Minggu 5", value: 3020000 },
  { name: "Minggu 6", value: 3242200 },
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
      name: "Kategori Roti & Kue",
      type: "Sumbangsih Utama",
      value: "Rp32,5 Jt",
      growth: "+14.2%",
      colorClass: "bg-plum-900 text-white", // Updated from bg-mauve-shadow-500
      icon: Cake,
    },
    {
      id: "asset-2",
      name: "Kategori Kopi & Teh",
      type: "Sumbangsih Stabil",
      value: "Rp18,4 Jt",
      growth: "+8.6%",
      colorClass: "bg-toffee-600 text-white", // Updated from bg-toffee-brown-500
      icon: Coffee,
    },
    {
      id: "asset-3",
      name: "Kategori Dessert & Camilan",
      type: "Pertumbuhan Cepat",
      value: "Rp28,4 Jt",
      growth: "+22.4%",
      colorClass: "bg-chartreuse-500 text-onyx-950",
      icon: ShoppingBag,
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
          Ikhtisar Keuntungan
        </CardTitle>
        <CardDescription className="text-onyx-500 dark:text-onyx-400">
          Perkembangan margin keuntungan bersih toko
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between py-4 space-y-6">
        {/* Core Stats Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-onyx-50 dark:bg-onyx-950/40 p-3 rounded-xl border border-onyx-100 dark:border-onyx-800/40">
            <span className="text-[10px] font-bold text-onyx-400 dark:text-onyx-500 uppercase tracking-wider block">
              Rasio Terjual (STR)
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-lg font-bold text-onyx-900 dark:text-white">76.20%</span>
              <span className="text-[10px] font-bold text-emerald-500 flex items-center">
                <ArrowUpRight className="h-3 w-3" /> +3.45%
              </span>
            </div>
          </div>
          <div className="bg-onyx-50 dark:bg-onyx-950/40 p-3 rounded-xl border border-onyx-100 dark:border-onyx-800/40">
            <span className="text-[10px] font-bold text-onyx-400 dark:text-onyx-500 uppercase tracking-wider block">
              Keuntungan Bersih
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-lg font-bold text-onyx-900 dark:text-white">Rp79,3 Jt</span>
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
              <YAxis domain={["dataMin - 100000", "dataMax + 100000"]} hide />
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--color-plum-900)" // Aligned with official palette
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 0, fill: "var(--color-plum-900)" }}
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
                      ? "var(--color-plum-900)" // Aligned with official palette
                      : asset.id === "asset-2"
                      ? "var(--color-toffee-600)" // Aligned with official palette
                      : "var(--color-chartreuse-500)", // Aligned with official palette
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
