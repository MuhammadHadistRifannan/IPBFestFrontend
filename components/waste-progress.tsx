"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, MoreHorizontal, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { initialWasteData } from "@/lib/mock-data";

interface WasteProgressProps {
  setActiveTab?: (tab: string) => void;
}

export function WasteProgress({ setActiveTab }: WasteProgressProps) {
  const [showAiInsight, setShowAiInsight] = useState(true);

  // Map colors to official tokens
  const getColorClass = (percentage: number) => {
    if (percentage > 80) return "bg-toffee-600"; // Organic warning / waste
    if (percentage > 50) return "bg-lemon-400"; // Highlight secondary
    return "bg-chartreuse-500"; // Positive low waste accent
  };

  return (
    <Card className="border border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60 backdrop-blur-md rounded-2xl flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div>
          <CardTitle className="text-base font-bold text-onyx-900 dark:text-white">
            Sisa Bahan & Makanan
          </CardTitle>
          <CardDescription className="text-xs text-onyx-500 dark:text-onyx-400 mt-1">
            Berat sisa produk adonan dan persentase optimalisasi
          </CardDescription>
        </div>
        <div className="flex items-center gap-1">
          {setActiveTab && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveTab("waste")}
              className="h-8 w-8 rounded-lg text-onyx-400 dark:text-onyx-500 hover:bg-onyx-50 dark:hover:bg-onyx-800 cursor-pointer shrink-0"
            >
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg text-onyx-400 dark:text-onyx-500 hover:bg-onyx-50 dark:hover:bg-onyx-800"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              }
            />
            <DropdownMenuContent align="end" className="w-56 rounded-xl border-onyx-200 dark:border-onyx-800 bg-white dark:bg-onyx-950 text-onyx-900 dark:text-white">
              <DropdownMenuLabel className="text-xs text-onyx-500 dark:text-onyx-400">Analisis Opsi</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-onyx-100 dark:bg-onyx-800" />
              <DropdownMenuCheckboxItem
                checked={showAiInsight}
                onCheckedChange={setShowAiInsight}
                className="rounded-lg cursor-pointer"
              >
                Tampilkan Rekomendasi AI
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between py-4 space-y-6">
        <div className="space-y-4">
          {initialWasteData.map((item) => (
            <div key={item.id} className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-onyx-700 dark:text-onyx-300">
                  {item.name}
                </span>
                <span className="font-bold text-onyx-900 dark:text-white">
                  {item.wasteQty} {item.unit} ({item.wastePercentage}%)
                </span>
              </div>
              <div className="w-full bg-onyx-100 dark:bg-onyx-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${getColorClass(item.wastePercentage)} transition-all duration-1000 ease-out`}
                  style={{ width: `${item.wastePercentage}%` }}
                />
              </div>

              {/* Collapsible AI Insight for this item */}
              {showAiInsight && (
                <div className="mt-1 ml-2 pl-3 border-l border-chartreuse-500/30 py-1 text-xs leading-relaxed text-onyx-600 dark:text-onyx-200 flex items-start gap-1.5 animate-fadeIn">
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
                Rekomendasi Optimalisasi Sisa Produk
              </h4>
              <p className="text-xs text-onyx-600 dark:text-onyx-200 leading-relaxed mt-1">
                Kue Brownies Cokelat menunjukkan sisa yang tinggi. Mengolah sisa potongan kulit luar menjadi paket brownies hemat mini dapat menghasilkan omzet tambahan hingga <strong>Rp1,4 Jt</strong> per bulan.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
