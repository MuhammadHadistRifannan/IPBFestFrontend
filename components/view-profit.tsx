"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowUpRight, ArrowDownRight, Cake, Coffee, ShoppingBag } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Monthly Profit Trend data
const monthlyProfitData = [
  { name: "Jan", Omzet: 45, Keuntungan: 30.6 },
  { name: "Feb", Omzet: 52, Keuntungan: 35.4 },
  { name: "Mar", Omzet: 49, Keuntungan: 33.3 },
  { name: "Apr", Omzet: 63, Keuntungan: 42.8 },
  { name: "Mei", Omzet: 58, Keuntungan: 39.4 },
  { name: "Jun", Omzet: 71, Keuntungan: 48.3 },
  { name: "Jul", Omzet: 79.3, Keuntungan: 54.1 },
];

interface CategoryProfit {
  id: string;
  name: string;
  type: string;
  profit: string;
  margin: string;
  growth: string;
  icon: React.ComponentType<{ className?: string }>;
}

const categories: CategoryProfit[] = [
  { id: "bread", name: "Roti & Kering", type: "bread", profit: "Rp28,4 Jt", margin: "64%", growth: "+8.3%", icon: Cake },
  { id: "coffee", name: "Kopi & Teh", type: "coffee", profit: "Rp18,2 Jt", margin: "82%", growth: "+15.4%", icon: Coffee },
  { id: "packaged", name: "Makanan Ringan", type: "packaged", profit: "Rp7,5 Jt", margin: "45%", growth: "-2.1%", icon: ShoppingBag },
];

export function ViewProfit() {
  const chartConfig = {
    Omzet: {
      label: "Omzet (Jt Rp)",
      color: "var(--color-toffee-600)",
    },
    Keuntungan: {
      label: "Keuntungan Bersih (Jt Rp)",
      color: "var(--color-chartreuse-500)",
    },
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-onyx-900 dark:text-white flex items-center gap-2">
            Laporan Keuntungan
          </h1>
          <p className="text-sm text-onyx-500 dark:text-onyx-400 mt-1">
            Pantau rincian margin, omzet kotor, dan profit bersih toko makanan Anda.
          </p>
        </div>
      </div>

      {/* Top Cards: Margin summaries */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Omzet Card */}
        <Card className="border border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-toffee-500/10 text-toffee-650 dark:text-toffee-400 shrink-0">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <div>
              <span className="text-sm font-semibold text-onyx-500 dark:text-onyx-400">
                Omzet Kotor Bulan Ini
              </span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-2xl font-black text-onyx-900 dark:text-white">Rp79,3 Jt</span>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-450 bg-emerald-500/10 px-1.5 py-0.5 rounded-md">
                  +12.4%
                </span>
              </div>
              <span className="text-xs text-onyx-450 dark:text-onyx-500 block mt-0.5 font-medium">
                Total penjualan kotor
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Margin Card */}
        <Card className="border border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-chartreuse-500/10 text-chartreuse-600 dark:text-chartreuse-450 shrink-0">
              <ArrowUpRight className="h-6 w-6" />
            </div>
            <div>
              <span className="text-sm font-semibold text-onyx-500 dark:text-onyx-400">
                Rata-rata Margin Keuntungan
              </span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-2xl font-black text-onyx-900 dark:text-white">68.2%</span>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-450 bg-emerald-500/10 px-1.5 py-0.5 rounded-md">
                  +1.8%
                </span>
              </div>
              <span className="text-xs text-onyx-450 dark:text-onyx-500 block mt-0.5 font-medium">
                Rasio profit bersih terhadap omzet
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Profit Card */}
        <Card className="border border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-650 dark:text-emerald-400 shrink-0">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <span className="text-sm font-semibold text-onyx-500 dark:text-onyx-400">
                Keuntungan Bersih
              </span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-2xl font-black text-chartreuse-650 dark:text-chartreuse-400">Rp54,1 Jt</span>
                <span className="text-xs font-semibold text-rose-600 dark:text-rose-450 bg-rose-500/10 px-1.5 py-0.5 rounded-md">
                  -2.1%
                </span>
              </div>
              <span className="text-xs text-onyx-450 dark:text-onyx-500 block mt-0.5 font-medium">
                Setelah dikurangi biaya bahan & waste
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grid: Charts & Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Profit Trend Chart */}
        <Card className="border border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60 backdrop-blur-md rounded-2xl lg:col-span-3 flex flex-col h-full shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
            <div>
              <CardTitle className="text-lg font-bold text-onyx-900 dark:text-white">
                Tren Profit Bulanan
              </CardTitle>
              <CardDescription className="text-onyx-500 dark:text-onyx-400 text-xs">
                Perbandingan pertumbuhan omzet kotor dengan keuntungan bersih bulanan
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex-1 pb-4">
            <ChartContainer config={chartConfig} className="w-full h-[280px] min-h-0">
              <LineChart data={monthlyProfitData} margin={{ top: 10, right: 55, left: 20, bottom: 0 }}>
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
                  tickFormatter={(value) => `Rp${value} Jt`}
                  width={65}
                  className="text-onyx-400 dark:text-onyx-500 text-xs font-medium"
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="Omzet"
                  name="Omzet"
                  stroke="var(--color-toffee-600)"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="Keuntungan"
                  name="Keuntungan Bersih"
                  stroke="var(--color-chartreuse-500)"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Stacked Categories Profit Performance */}
        <Card className="border border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60 backdrop-blur-md rounded-2xl lg:col-span-2 flex flex-col h-full shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold text-onyx-900 dark:text-white">
              Kinerja per Kategori
            </CardTitle>
            <CardDescription className="text-onyx-500 dark:text-onyx-400 text-xs">
              Breakdown profit bersih & persentase margin per kategori makanan
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  className="p-3.5 rounded-xl bg-onyx-50/50 dark:bg-onyx-950/40 border border-onyx-200/60 dark:border-onyx-800/40 flex items-center justify-between gap-3 shadow-sm hover:translate-y-[-1px] transition-transform"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-onyx-100 dark:bg-onyx-800 flex items-center justify-center shrink-0 text-onyx-600 dark:text-onyx-300">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-onyx-900 dark:text-white">{cat.name}</h4>
                      <span className="text-xs text-onyx-450 dark:text-onyx-500 block mt-0.5">Margin: {cat.margin}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-onyx-900 dark:text-white">{cat.profit}</span>
                    <span className="text-xs text-emerald-600 dark:text-emerald-450 block font-bold mt-0.5">{cat.growth}</span>
                  </div>
                </div>
              );
            })}

            {/* AI Insight banner */}
            <div className="mt-4 p-3.5 rounded-xl bg-chartreuse-500/10 dark:bg-chartreuse-500/5 border border-chartreuse-500/20 dark:border-chartreuse-500/10 flex gap-2">
              <Sparkles className="h-4.5 w-4.5 text-chartreuse-600 dark:text-chartreuse-450 shrink-0 mt-0.5" />
              <p className="text-xs text-onyx-700 dark:text-onyx-200 leading-relaxed font-medium">
                Kopi &amp; Teh menghasilkan margin tertinggi (82%). Promosikan paket bundel &quot;Roti + Kopi&quot; di jam sarapan untuk melipatgandakan profit kategori Roti.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
