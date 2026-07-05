"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles } from "lucide-react";
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
            Pantau tingkat sisa adonan/makanan dan tekan potensi kerugian finansial Anda.
          </p>
        </div>
      </div>

      {/* Top Section: Financial Loss Summaries */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60 backdrop-blur-md rounded-2xl md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-onyx-400 dark:text-onyx-500">
              Total Kerugian Sisa Produk (Hari Ini)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-rose-600 dark:text-rose-400">
              Rp{totalGlobalLoss.toLocaleString("id-ID")}
            </span>
            <p className="text-xs text-onyx-500 dark:text-onyx-400 mt-1 leading-relaxed">
              Dihitung otomatis berdasarkan harga jual produk dikalikan jumlah sisa yang tidak terjual hari ini.
            </p>
          </CardContent>
        </Card>

        {/* Global AI Suggestion Box */}
        <Card className="border border-chartreuse-500/20 dark:border-chartreuse-500/10 bg-chartreuse-500/5 dark:bg-chartreuse-500/2 rounded-2xl md:col-span-2 flex items-center">
          <CardContent className="p-5 flex gap-4">
            <div className="h-10 w-10 rounded-xl bg-chartreuse-500/10 flex items-center justify-center shrink-0 text-chartreuse-600 dark:text-chartreuse-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-onyx-900 dark:text-white">
                Rekomendasi AI Pengurangan Limbah
              </h4>
              <p className="text-xs text-onyx-500 dark:text-onyx-400 leading-relaxed mt-1">
                Kue Brownies Cokelat memiliki sisa tertinggi (82%). Mengolah sisa potongan pinggiran brownies menjadi topping menu mini dessert cup dapat menyelamatkan margin profit hingga <strong>Rp1.400.000</strong> per bulan.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grid: Chart and Rankings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Waste Chart */}
        <Card className="border border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60 backdrop-blur-md rounded-2xl lg:col-span-2 flex flex-col h-full">
          <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
            <div>
              <CardTitle className="text-lg font-bold text-onyx-900 dark:text-white">
                Tren Volume Sisa Produk
              </CardTitle>
              <CardDescription className="text-onyx-500 dark:text-onyx-400">
                Statistik volume produk sisa dalam satuan unit/pcs
              </CardDescription>
            </div>
            <Select
              value={timeframe}
              onValueChange={(value) => value && setTimeframe(value as "Harian" | "Mingguan")}
            >
              <SelectTrigger className="w-30 h-9 rounded-xl border-onyx-200/60 dark:border-onyx-800 bg-white dark:bg-onyx-950 text-onyx-700 dark:text-onyx-300 text-xs font-semibold focus:ring-chartreuse-500">
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
            <ChartContainer config={chartConfig} className="w-full aspect-21/9 min-h-50">
              <BarChart data={activeChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  className="text-onyx-400 dark:text-onyx-500"
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  tickFormatter={(value) => `${value} Pcs`}
                  className="text-onyx-400 dark:text-onyx-500"
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
        <Card className="border border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60 backdrop-blur-md rounded-2xl flex flex-col h-full">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold text-onyx-900 dark:text-white">
              Peringkat Sisa Tertinggi
            </CardTitle>
            <CardDescription className="text-onyx-500 dark:text-onyx-400">
              Daftar produk makanan yang paling sering tersisa
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            {calculatedLosses.map((item, index) => (
              <div key={item.id} className="p-3 rounded-xl bg-onyx-55/50 dark:bg-onyx-950/40 border border-onyx-100 dark:border-onyx-800/40 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className={`h-6 w-6 rounded-lg text-xs font-bold flex items-center justify-center ${
                    index === 0
                      ? "bg-rose-500 text-white"
                      : index === 1
                      ? "bg-toffee-600 text-white"
                      : "bg-onyx-200 dark:bg-onyx-800 text-onyx-600 dark:text-onyx-400"
                  }`}>
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-onyx-900 dark:text-white truncate max-w-30">{item.name}</h4>
                    <span className="text-[10px] text-onyx-400 dark:text-onyx-500">{item.wastePercentage}% Rasio Sisa ({item.wasteQty} Pcs)</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
                    Rp{item.loss.toLocaleString("id-ID")}
                  </span>
                  <span className="text-[9px] text-onyx-400 dark:text-onyx-500 block">Est. Kerugian</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Breakdown table with AI Insight details */}
      <Card className="border border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60 backdrop-blur-md rounded-2xl overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold text-onyx-900 dark:text-white">
            Detail Kerugian & Saran Perbaikan AI
          </CardTitle>
          <CardDescription className="text-onyx-500 dark:text-onyx-400">
            Audit sisa dan saran perbaikan langsung dari algoritme EcoStock.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-onyx-50/50 dark:bg-onyx-950/30 border-b border-onyx-100 dark:border-onyx-800">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-45 text-xs font-bold text-onyx-700 dark:text-onyx-300">Nama Produk</TableHead>
                  <TableHead className="text-xs font-bold text-onyx-700 dark:text-onyx-300 text-center">Harga Jual</TableHead>
                  <TableHead className="text-xs font-bold text-onyx-700 dark:text-onyx-300 text-center">Rasio Sisa</TableHead>
                  <TableHead className="text-xs font-bold text-onyx-700 dark:text-onyx-300 text-center">Qty Sisa</TableHead>
                  <TableHead className="text-xs font-bold text-onyx-700 dark:text-onyx-300 text-right">Est. Kerugian</TableHead>
                  <TableHead className="text-xs font-bold text-onyx-700 dark:text-onyx-300 pl-6">Saran Pengurangan Sisa (AI Insight)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {calculatedLosses.map((item) => (
                  <TableRow key={item.id} className="border-b border-onyx-100/50 dark:border-onyx-800/30 last:border-none hover:bg-onyx-50/30 dark:hover:bg-onyx-800/10 transition-colors duration-200">
                    <TableCell className="font-semibold text-onyx-900 dark:text-white py-4 text-xs">
                      {item.name}
                    </TableCell>
                    <TableCell className="text-center text-onyx-600 dark:text-onyx-300 py-4 text-xs">
                      Rp{item.price.toLocaleString("id-ID")}
                    </TableCell>
                    <TableCell className="text-center font-bold text-onyx-800 dark:text-onyx-200 py-4 text-xs">
                      <span className={item.wastePercentage > 50 ? "text-rose-500" : "text-amber-500"}>
                        {item.wastePercentage}%
                      </span>
                    </TableCell>
                    <TableCell className="text-center text-onyx-600 dark:text-onyx-300 py-4 text-xs">
                      {item.wasteQty} {item.unit}
                    </TableCell>
                    <TableCell className="text-right font-bold text-rose-600 dark:text-rose-400 py-4 text-xs">
                      Rp{item.loss.toLocaleString("id-ID")}
                    </TableCell>
                    <TableCell className="py-4 text-xs text-onyx-600 dark:text-onyx-400 pl-6 flex items-start gap-2 max-w-sm">
                      <Sparkles className="h-3.5 w-3.5 text-chartreuse-600 dark:text-chartreuse-400 mt-0.5 shrink-0" />
                      <span>{item.insight}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
