"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Calendar, ArrowUpRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { initialSalesData, SalesItem } from "@/lib/mock-data";

// Sales chart mock data
const dailySalesData = [
  { name: "Sen", Penjualan: 900000 },
  { name: "Sel", Penjualan: 1400000 },
  { name: "Rab", Penjualan: 1100000 },
  { name: "Kam", Penjualan: 1800000 },
  { name: "Jum", Penjualan: 2400000 },
  { name: "Sab", Penjualan: 3800000 },
  { name: "Min", Penjualan: 3500000 },
];

const weeklySalesData = [
  { name: "Minggu 1", Penjualan: 11200005 },
  { name: "Minggu 2", Penjualan: 12500000 },
  { name: "Minggu 3", Penjualan: 11800000 },
  { name: "Minggu 4", Penjualan: 14500000 },
];

export function ViewSales() {
  const [salesList] = useState<SalesItem[]>(initialSalesData);
  const [timeframe, setTimeframe] = useState<"Harian" | "Mingguan">("Harian");

  const activeChartData = timeframe === "Harian" ? dailySalesData : weeklySalesData;

  const chartConfig = {
    Penjualan: {
      label: "Omzet Penjualan (Rp)",
      color: "var(--color-chartreuse-500)", // Aligned with official palette
    },
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-onyx-900 dark:text-white flex items-center gap-2">
            Analisis Penjualan
          </h1>
          <p className="text-sm text-onyx-500 dark:text-onyx-400 mt-1">
            Temukan menu terlaris Anda dan hari-hari dengan puncak transaksi tertinggi.
          </p>
        </div>
      </div>

      {/* Top Cards: Peak day & summary stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Peak Day Highlight */}
        <Card className="border border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60 backdrop-blur-md rounded-2xl md:col-span-1 shadow-sm flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-onyx-500 dark:text-onyx-400 flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-chartreuse-600 dark:text-chartreuse-450" />
              Hari Penjualan Tertinggi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-black text-onyx-900 dark:text-white block">
              Sabtu & Minggu
            </span>
            <p className="text-xs text-emerald-600 dark:text-emerald-450 mt-1.5 font-bold flex items-center gap-1">
              <ArrowUpRight className="h-3.5 w-3.5" /> +35% Volume Penjualan vs Hari Biasa
            </p>
            <p className="text-xs text-onyx-500 dark:text-onyx-400 mt-2 leading-relaxed font-medium">
              Pelanggan cenderung membeli roti keluarga untuk akhir pekan. Sarankan menaikkan porsi produksi di hari Jumat malam.
            </p>
          </CardContent>
        </Card>

        {/* Global AI Sales Insight */}
        <Card className="border border-chartreuse-500/20 dark:border-chartreuse-500/10 bg-chartreuse-500/5 dark:bg-chartreuse-500/2 rounded-2xl md:col-span-2 shadow-sm flex flex-col">
          <CardHeader className="pb-2 flex flex-row items-center gap-3 space-y-0">
            <div className="h-8 w-8 rounded-lg bg-chartreuse-500/10 flex items-center justify-center shrink-0 text-chartreuse-600 dark:text-chartreuse-450 shadow-inner">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            <CardTitle className="text-sm font-bold text-onyx-900 dark:text-white">
              Analisis Pola Penjualan AI
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-5">
            <p className="text-sm text-onyx-700 dark:text-onyx-200 leading-relaxed font-medium">
              Pola menunjukkan kenaikan drastis Donat Kentang Gula (120 Pcs terjual) setiap hari Jumat dan Sabtu. Penambahan varian topping cokelat di hari tersebut diprediksi dapat mendorong peningkatan omzet sebesar 15% tanpa risiko sisa berlebih.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid: Charts & Rankings */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Sales Chart */}
        <Card className="border border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60 backdrop-blur-md rounded-2xl lg:col-span-3 flex flex-col h-full shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
            <div>
              <CardTitle className="text-lg font-bold text-onyx-900 dark:text-white">
                Tren Pendapatan Penjualan
              </CardTitle>
              <CardDescription className="text-onyx-500 dark:text-onyx-400 text-xs">
                Statistik omzet nominal harian atau mingguan dari WhatsApp rekap
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
                  Senin - Minggu
                </SelectItem>
                <SelectItem value="Mingguan" className="text-xs rounded-lg cursor-pointer">
                  4 Minggu Terakhir
                </SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="flex-1 pb-4">
            <ChartContainer config={chartConfig} className="w-full h-[360px] min-h-0">
              <AreaChart data={activeChartData} margin={{ top: 10, right: 55, left: 20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-chartreuse-500)" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="var(--color-chartreuse-500)" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
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
                  tickFormatter={(value) => `Rp${value / 1000000} Jt`}
                  width={65}
                  className="text-onyx-400 dark:text-onyx-500 text-xs font-medium"
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="Penjualan"
                  stroke="var(--color-chartreuse-500)"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorSales)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Best Sellers Ranking */}
        <Card className="border border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60 backdrop-blur-md rounded-2xl lg:col-span-2 flex flex-col h-full shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold text-onyx-900 dark:text-white">
              Peringkat Produk Terlaris
            </CardTitle>
            <CardDescription className="text-onyx-500 dark:text-onyx-400 text-xs">
              Produk makanan dengan volume penjualan tertinggi
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            {salesList.map((item, index) => {
              // Performance tags & trend metadata for visual interest
              const getPerformanceMeta = (idx: number) => {
                if (idx === 0) {
                  return {
                    badge: "Hot Seller",
                    trend: "+14.2%",
                    isUp: true,
                    badgeClass: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/10",
                  };
                }
                if (idx === 1) {
                  return {
                    badge: "Tren Naik",
                    trend: "+8.6%",
                    isUp: true,
                    badgeClass: "bg-chartreuse-500/10 text-chartreuse-600 dark:text-chartreuse-450 border border-chartreuse-500/10",
                  };
                }
                if (idx === 2) {
                  return {
                    badge: "Konsisten",
                    trend: "-1.2%",
                    isUp: false,
                    badgeClass: "bg-blue-500/10 text-blue-600 dark:text-blue-455 border border-blue-500/10",
                  };
                }
                return {
                  badge: "Stabil",
                  trend: "+0.5%",
                  isUp: true,
                  badgeClass: "bg-onyx-100 dark:bg-onyx-800 text-onyx-600 dark:text-onyx-400 border border-onyx-200/10",
                };
              };

              const perf = getPerformanceMeta(index);

              return (
                <div 
                  key={item.id} 
                  className="p-3.5 rounded-xl bg-onyx-50/50 dark:bg-onyx-950/40 border border-onyx-200/60 dark:border-onyx-800/40 flex items-center justify-between gap-3 shadow-sm hover:translate-y-[-1px] transition-transform"
                >
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "h-6 w-6 rounded-sm text-xs font-bold flex items-center justify-center shrink-0",
                      index === 0
                        ? "bg-chartreuse-500 text-onyx-950"
                        : index === 1
                        ? "bg-lemon-400 text-onyx-950"
                        : "bg-onyx-200 dark:bg-onyx-800 text-onyx-600 dark:text-onyx-400"
                    )}>
                      {index + 1}
                    </span>
                    <img 
                      src="/brownies.webp" 
                      className="h-10 w-10 rounded-sm object-cover border border-onyx-200/40 dark:border-onyx-800/40 shrink-0" 
                      alt={item.name} 
                    />
                    <div>
                      <h4 className="text-xs font-bold text-onyx-900 dark:text-white truncate max-w-[100px]">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[10px] text-onyx-500 dark:text-onyx-400 font-semibold">
                          {item.soldQty} Unit
                        </span>
                        <span className={cn("text-[9px] font-bold px-1.5 py-0.2 rounded-md", perf.badgeClass)}>
                          {perf.badge}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-onyx-900 dark:text-white">
                      Rp{item.revenue.toLocaleString("id-ID")}
                    </span>
                    <div className="flex items-center justify-end gap-1 mt-0.5">
                      <span className={cn(
                        "text-[9px] font-bold",
                        perf.isUp ? "text-emerald-600 dark:text-emerald-450" : "text-rose-600 dark:text-rose-455"
                      )}>
                        {perf.trend}
                      </span>
                      <span className="text-[8px] text-onyx-400 dark:text-onyx-500 font-semibold">
                        vs pekan lalu
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
