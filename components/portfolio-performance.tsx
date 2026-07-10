"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowUpRight, Coffee, Cake, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const categoryProductsData = {
  "asset-1": [
    { name: "Brownies Cokelat", profit: "Rp12,4 Jt", str: 89 },
    { name: "Roti Tawar Pandan", profit: "Rp8,2 Jt", str: 92 },
  ],
  "asset-2": [
    { name: "Kopi Susu Aren", profit: "Rp10,5 Jt", str: 95 },
    { name: "Matcha Latte", profit: "Rp4,5 Jt", str: 82 },
  ],
  "asset-3": [
    { name: "Puding Sutra Mangga", profit: "Rp15,2 Jt", str: 88 },
    { name: "Croissant Cokelat", profit: "Rp8,4 Jt", str: 82 },
  ],
};

interface AssetCard {
  id: string;
  name: string;
  type: string;
  value: string;
  growth: string;
  colorClass: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface PortfolioPerformanceProps {
  setActiveTab?: (tab: string) => void;
}

export function PortfolioPerformance({ setActiveTab }: PortfolioPerformanceProps) {
  const [activeAssetIndex, setActiveAssetIndex] = useState(0);

  const assets: AssetCard[] = [
    {
      id: "asset-1",
      name: "Kategori Roti & Kue",
      type: "Sumbangsih Utama",
      value: "Rp32,5 Jt",
      growth: "+14.2%",
      colorClass: "bg-plum-900 text-white",
      icon: Cake,
    },
    {
      id: "asset-2",
      name: "Kategori Kopi & Teh",
      type: "Sumbangsih Stabil",
      value: "Rp18,4 Jt",
      growth: "+8.6%",
      colorClass: "bg-toffee-600 text-white",
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

  const currentAsset = assets[activeAssetIndex];
  const activeProducts = categoryProductsData[currentAsset.id as keyof typeof categoryProductsData];

  // Dynamic color matching the active category border/bullet
  const getCategoryColor = () => {
    if (currentAsset.id === "asset-1") return "#E2738F"; // Plum Pink
    if (currentAsset.id === "asset-2") return "#E5A93C"; // Toffee Gold
    return "#C6F91F"; // Neon Chartreuse
  };

  return (
    <Card className="border border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60 backdrop-blur-md rounded-2xl flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div>
          <CardTitle className="text-base font-bold text-onyx-900 dark:text-white">
            Ikhtisar Keuntungan
          </CardTitle>
          <CardDescription className="text-xs text-onyx-500 dark:text-onyx-400 mt-1">
            Perkembangan margin keuntungan bersih toko
          </CardDescription>
        </div>
        {setActiveTab && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveTab("profit")}
            className="h-8 w-8 rounded-lg text-onyx-400 dark:text-onyx-500 hover:bg-onyx-50 dark:hover:bg-onyx-800 cursor-pointer shrink-0"
          >
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between py-4 space-y-6">
        {/* Dynamic Top Products Section (Replacing the abstract micro chart) */}
        <div className="space-y-3 mt-1.5 h-28 flex flex-col justify-center">
          <span className="text-[11px] font-bold text-onyx-450 dark:text-onyx-500 block">
            Penyumbang Laba Terbesar
          </span>
          <div className="space-y-2">
            {activeProducts.map((prod) => (
              <div
                key={prod.name}
                className="flex items-center justify-between text-xs bg-onyx-50/40 dark:bg-onyx-950/20 p-2 rounded-xl border border-onyx-200/40 dark:border-onyx-800/30 shadow-inner"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="h-2 w-2 rounded-full shadow-sm"
                    style={{ backgroundColor: getCategoryColor() }}
                  />
                  <span className="font-bold text-onyx-800 dark:text-onyx-200">
                    {prod.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-onyx-900 dark:text-white">
                    {prod.profit}
                  </span>
                  <span className="text-[10px] text-onyx-500 dark:text-onyx-400 font-bold bg-onyx-100/50 dark:bg-onyx-800/50 px-2 py-0.5 rounded-md border border-onyx-200/10">
                    STR {prod.str}%
                  </span>
                </div>
              </div>
            ))}
          </div>
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
                      ? "var(--color-plum-900)"
                      : asset.id === "asset-2"
                      ? "var(--color-toffee-600)"
                      : "var(--color-chartreuse-500)",
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
