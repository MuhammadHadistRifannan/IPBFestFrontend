"use client";

import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, TrendingDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { initialWasteData, WasteItem } from "@/lib/mock-data";

// Weekly waste trend data
const weeklyWasteData = [
  { name: "Sen", Sisa: 12 },
  { name: "Sel", Sisa: 8 },
  { name: "Rab", Sisa: 15 },
  { name: "Kam", Sisa: 10 },
  { name: "Jum", Sisa: 22 },
  { name: "Sab", Sisa: 28 },
  { name: "Min", Sisa: 18 },
];

const monthlyWasteData = [
  { name: "Minggu 1", Sisa: 85 },
  { name: "Minggu 2", Sisa: 92 },
  { name: "Minggu 3", Sisa: 74 },
  { name: "Minggu 4", Sisa: 110 },
];

export function ViewWaste() {
  const [wasteList] = useState<WasteItem[]>(initialWasteData);
  const [timeframe, setTimeframe] = useState<"Harian" | "Mingguan">("Harian");

  const activeChartData = timeframe === "Harian" ? weeklyWasteData : monthlyWasteData;

  // Calculate total loss automatically (price * waste quantity)
  const calculatedLosses = useMemo(() => {
    return wasteList.map((item) => {
      const loss = item.price * item.wasteQty;
      return {
        ...item,
        loss,
      };
    });
  }, [wasteList]);

  // Total global loss sum
  const totalGlobalLoss = useMemo(() => {
    return calculatedLosses.reduce((acc, curr) => acc + curr.loss, 0);
  }, [calculatedLosses]);

  const chartConfig = {
    Sisa: {
      label: "Jumlah Sisa (Pcs)",
      color: "var(--color-toffee-600)", // Aligned with official palette
    },
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-onyx-900 dark:text-white flex items-center gap-2">
            Analisis Sisa Produk
          </h1>
          <p className="text-sm text-onyx-500 dark:text-onyx-400 mt-1">
            Identifikasi produk penyumbang sisa makanan terbesar dan estimasi nominal kerugian finansialnya.
          </p>
        </div>
      </div>

      {/* Top Section: Financial Loss Summaries */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60 backdrop-blur-md rounded-2xl md:col-span-1 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-onyx-500 dark:text-onyx-400 flex items-center gap-1.5">
              <TrendingDown className="h-4 w-4 text-rose-500 shrink-0" />
              Total Kerugian Sisa Produk (Hari Ini)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-black text-rose-600 dark:text-rose-455">
              Rp{totalGlobalLoss.toLocaleString("id-ID")}
            </span>
            <p className="text-xs text-onyx-500 dark:text-onyx-400 mt-2.5 leading-relaxed font-medium">
              Dihitung otomatis berdasarkan harga jual produk dikalikan jumlah sisa yang tidak terjual hari ini.
            </p>
          </CardContent>
        </Card>

        {/* Global AI Suggestion Box */}
        <Card className="border border-chartreuse-500/20 dark:border-chartreuse-500/10 bg-chartreuse-500/5 dark:bg-chartreuse-500/2 rounded-2xl md:col-span-2 shadow-sm flex flex-col">
          <CardHeader className="pb-2 flex flex-row items-center gap-3 space-y-0">
            <div className="h-8 w-8 rounded-lg bg-chartreuse-500/10 flex items-center justify-center shrink-0 text-chartreuse-600 dark:text-chartreuse-450 shadow-inner">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            <CardTitle className="text-sm font-bold text-onyx-900 dark:text-white">
              Rekomendasi AI Pengurangan Limbah
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-5">
            <p className="text-sm text-onyx-700 dark:text-onyx-200 leading-relaxed font-medium">
              Kue Brownies Cokelat memiliki sisa tertinggi (82%). Mengolah sisa potongan pinggiran brownies menjadi topping menu mini dessert cup dapat menyelamatkan margin profit hingga <strong>Rp1.400.000</strong> per bulan.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Grid: Chart and Rankings */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Waste Chart */}
        <Card className="border border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60 backdrop-blur-md rounded-2xl lg:col-span-3 flex flex-col h-full shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
            <div>
              <CardTitle className="text-lg font-bold text-onyx-900 dark:text-white">
                Tren Volume Sisa Produk
              </CardTitle>
              <CardDescription className="text-onyx-500 dark:text-onyx-400 text-xs">
                Statistik volume produk sisa dalam satuan unit/pcs
              </CardDescription>
            </div>
            <Select
              value={timeframe}
              onValueChange={(value) => value && setTimeframe(value as "Harian" | "Mingguan")}
            >
              <SelectTrigger className="w-32 h-9 rounded-xl border-onyx-200/60 dark:border-onyx-800 bg-white dark:bg-onyx-950 text-onyx-700 dark:text-onyx-300 text-xs font-bold focus:ring-chartreuse-500 cursor-pointer">
                <SelectValue placeholder="Rentang Waktu" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-onyx-950 border-onyx-200 dark:border-onyx-800 rounded-xl text-onyx-800 dark:text-white">
                <SelectItem value="Harian" className="text-xs rounded-lg cursor-pointer">
                  7 Hari Terakhir
                </SelectItem>
                <SelectItem value="Mingguan" className="text-xs rounded-lg cursor-pointer">
                  4 Minggu Terakhir
                </SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="flex-1 pb-4">
            <ChartContainer config={chartConfig} className="w-full h-[200px] min-h-0">
              <BarChart data={activeChartData} margin={{ top: 10, right: 45, left: 15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  className="text-onyx-400 dark:text-onyx-500 text-xs font-medium"
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  tickFormatter={(value) => `${value} Pcs`}
                  width={55}
                  className="text-onyx-400 dark:text-onyx-500 text-xs font-medium"
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="Sisa"
                  fill="var(--color-toffee-600)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={28}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Waste Rankings */}
        <Card className="border border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60 backdrop-blur-md rounded-2xl lg:col-span-2 flex flex-col h-full shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold text-onyx-900 dark:text-white">
              Peringkat Sisa Tertinggi
            </CardTitle>
            <CardDescription className="text-onyx-500 dark:text-onyx-400 text-xs">
              Daftar produk makanan yang paling sering tersisa
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            {calculatedLosses.map((item, index) => (
              <div key={item.id} className="p-3.5 rounded-xl bg-onyx-50/50 dark:bg-onyx-950/40 border border-onyx-200/60 dark:border-onyx-800/40 flex items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className={`h-6 w-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                    index === 0
                      ? "bg-rose-500 text-white"
                      : index === 1
                      ? "bg-toffee-600 text-white"
                      : "bg-onyx-200 dark:bg-onyx-800 text-onyx-600 dark:text-onyx-400"
                  }`}>
                    {index + 1}
                  </span>
                  <img 
                    src="/brownies.webp" 
                    className="h-10 w-10 rounded-lg object-cover border border-onyx-200/40 dark:border-onyx-800/40 shrink-0" 
                    alt={item.name} 
                  />
                  <div>
                    <h4 className="text-xs font-bold text-onyx-900 dark:text-white truncate max-w-[90px]">{item.name}</h4>
                    <span className="text-xs text-onyx-450 dark:text-onyx-500 block mt-0.5">{item.wastePercentage}% Sisa ({item.wasteQty} Pcs)</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
                    Rp{item.loss.toLocaleString("id-ID")}
                  </span>
                  <span className="text-xs text-onyx-450 dark:text-onyx-500 block mt-0.5">Est. Kerugian</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Cards Grid with AI Insight details */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-onyx-900 dark:text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-chartreuse-600 dark:text-chartreuse-400" />
            Detail Kerugian & Saran Perbaikan AI
          </h3>
          <p className="text-xs text-onyx-500 dark:text-onyx-400 mt-1">
            Audit sisa makanan dan saran taktis dari AI untuk masing-masing menu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculatedLosses.map((item) => (
            <Card 
              key={item.id} 
              className={cn(
                "border backdrop-blur-md rounded-2xl p-5 flex flex-col justify-between shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5",
                item.wastePercentage > 50
                  ? "border-rose-500/20 bg-rose-500/2 dark:bg-rose-950/5"
                  : "border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60"
              )}
            >
              <div className="space-y-4">
                {/* Header: Image + Name + Price */}
                <div className="flex items-center gap-3.5">
                  <img 
                    src="/brownies.webp" 
                    className="h-12 w-12 rounded-xl object-cover shadow-sm border border-onyx-200/40 dark:border-onyx-800/40 shrink-0" 
                    alt={item.name} 
                  />
                  <div>
                    <h4 className="font-bold text-base text-onyx-900 dark:text-white leading-tight">
                      {item.name}
                    </h4>
                    <span className="text-xs text-onyx-500 dark:text-onyx-400 block mt-1">
                      Harga Jual: Rp{item.price.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-onyx-200/30 dark:border-onyx-800/50 text-center">
                  <div>
                    <span className="text-[10px] font-semibold text-onyx-400 dark:text-onyx-500 block">
                      Jumlah Sisa
                    </span>
                    <span className="text-sm font-bold text-onyx-800 dark:text-onyx-200 block mt-0.5">
                      {item.wasteQty} {item.unit}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-onyx-400 dark:text-onyx-500 block">
                      Rasio Sisa
                    </span>
                    <span className={cn(
                      "text-sm font-extrabold block mt-0.5",
                      item.wastePercentage > 50 ? "text-rose-500" : "text-amber-500"
                    )}>
                      {item.wastePercentage}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-onyx-400 dark:text-onyx-500 block">
                      Est. Kerugian
                    </span>
                    <span className="text-sm font-black text-rose-600 dark:text-rose-455 block mt-0.5">
                      Rp{item.loss.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                {/* AI Advice Box */}
                <div className="p-3.5 rounded-xl bg-chartreuse-500/10 dark:bg-chartreuse-500/5 border border-chartreuse-500/20 dark:border-chartreuse-500/10 flex items-start gap-2">
                  <Sparkles className="h-4 w-4 text-chartreuse-600 dark:text-chartreuse-450 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold text-chartreuse-700 dark:text-chartreuse-400 block mb-0.5">
                      Saran Perbaikan AI
                    </span>
                    <p className="text-xs text-onyx-700 dark:text-onyx-200 leading-relaxed font-medium">
                      {item.insight}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
