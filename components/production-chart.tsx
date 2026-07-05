"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Mock data for Production vs Sales (Penjualan)
const dataSenMin = [
  { name: "Sen", Produksi: 12000, Penjualan: 9000 },
  { name: "Sel", Produksi: 19000, Penjualan: 14000 },
  { name: "Rab", Produksi: 15000, Penjualan: 11000 },
  { name: "Kam", Produksi: 22000, Penjualan: 18000 },
  { name: "Jum", Produksi: 28000, Penjualan: 24000 },
  { name: "Sab", Produksi: 24000, Penjualan: 20000 },
  { name: "Min", Produksi: 31000, Penjualan: 29000 },
];

const dataMonthly = [
  { name: "Jan", Produksi: 45000, Penjualan: 38000 },
  { name: "Feb", Produksi: 52000, Penjualan: 44000 },
  { name: "Mar", Produksi: 49000, Penjualan: 41000 },
  { name: "Apr", Produksi: 63000, Penjualan: 52000 },
  { name: "Mei", Produksi: 58000, Penjualan: 55000 },
  { name: "Jun", Produksi: 71000, Penjualan: 62000 },
  { name: "Jul", Produksi: 68000, Penjualan: 60000 },
  { name: "Agu", Produksi: 75000, Penjualan: 69000 },
  { name: "Sep", Produksi: 82000, Penjualan: 73000 },
  { name: "Okt", Produksi: 79000, Penjualan: 76000 },
  { name: "Nov", Produksi: 88000, Penjualan: 81000 },
  { name: "Des", Produksi: 98000, Penjualan: 92000 },
];

export function ProductionChart() {
  const [timeframe, setTimeframe] = useState<"Sen-Min" | "Bulanan">("Bulanan");
  const [chartType, setChartType] = useState<"area" | "line">("area");

  const activeData = timeframe === "Sen-Min" ? dataSenMin : dataMonthly;

  const chartConfig = {
    Produksi: {
      label: "Total Produksi",
      color: "var(--color-mauve-shadow-500)",
    },
    Penjualan: {
      label: "Total Penjualan",
      color: "var(--color-chartreuse-500)",
    },
  };

  return (
    <Card className="border border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60 backdrop-blur-md rounded-2xl flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
        <div>
          <CardTitle className="text-lg font-bold text-onyx-900 dark:text-white">
            Ikhtisar Produksi vs Penjualan
          </CardTitle>
          <CardDescription className="text-onyx-500 dark:text-onyx-400">
            Perbandingan jumlah produksi makanan dengan penjualan aktual harian (dalam Pcs)
          </CardDescription>
        </div>
        <div className="flex items-center gap-3">
          {/* Chart Type Toggle */}
          <div className="flex bg-onyx-100 dark:bg-onyx-800 p-1 rounded-xl">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setChartType("area")}
              className={`px-3 py-1.5 text-xs rounded-lg h-7 font-semibold transition-all ${
                chartType === "area"
                  ? "bg-white dark:bg-onyx-950 text-onyx-900 dark:text-white shadow-sm"
                  : "text-onyx-500 dark:text-onyx-400 hover:text-onyx-700 dark:hover:text-white"
              }`}
            >
              Area
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setChartType("line")}
              className={`px-3 py-1.5 text-xs rounded-lg h-7 font-semibold transition-all ${
                chartType === "line"
                  ? "bg-white dark:bg-onyx-950 text-onyx-900 dark:text-white shadow-sm"
                  : "text-onyx-500 dark:text-onyx-400 hover:text-onyx-700 dark:hover:text-white"
              }`}
            >
              Garis
            </Button>
          </div>

          {/* Timeframe Select */}
          <Select
            value={timeframe}
            onValueChange={(value) => value && setTimeframe(value as "Sen-Min" | "Bulanan")}
          >
            <SelectTrigger className="w-30 h-9 rounded-xl border-onyx-200/60 dark:border-onyx-800 bg-white dark:bg-onyx-950 text-onyx-700 dark:text-onyx-300 text-xs font-semibold focus:ring-chartreuse-500">
              <SelectValue placeholder="Rentang Waktu" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-onyx-950 border-onyx-200 dark:border-onyx-800 rounded-xl text-onyx-800 dark:text-white">
              <SelectItem value="Sen-Min" className="text-xs rounded-lg cursor-pointer">
                Sen-Min
              </SelectItem>
              <SelectItem value="Bulanan" className="text-xs rounded-lg cursor-pointer">
                Bulanan
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Options Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-xl text-onyx-400 dark:text-onyx-500 hover:bg-onyx-50 dark:hover:bg-onyx-800"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              }
            />
            <DropdownMenuContent align="end" className="w-48 rounded-xl border-onyx-200 dark:border-onyx-800 bg-white dark:bg-onyx-950 text-onyx-900 dark:text-white">
              <DropdownMenuLabel className="text-xs text-onyx-500 dark:text-onyx-400">Opsi Grafik</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-onyx-100 dark:bg-onyx-800" />
              <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-onyx-50 dark:hover:bg-onyx-900">
                Ekspor ke CSV
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-onyx-50 dark:hover:bg-onyx-900">
                Unduh Gambar (PNG)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        <ChartContainer config={chartConfig} className="w-full aspect-21/9">
          <AreaChart data={activeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorProduksi" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-mauve-shadow-500)" stopOpacity={0.25} />
                <stop offset="95%" stopColor="var(--color-mauve-shadow-500)" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorPenjualan" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-chartreuse-500)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="var(--color-chartreuse-500)" stopOpacity={0.0} />
              </linearGradient>
            </defs>
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
              tickFormatter={(value) => `${value / 1000}k`}
              className="text-onyx-400 dark:text-onyx-500"
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="Produksi"
              name="Total Produksi"
              stroke="var(--color-mauve-shadow-500)"
              strokeWidth={3}
              fillOpacity={1}
              fill={chartType === "area" ? "url(#colorProduksi)" : "none"}
              activeDot={{ r: 6, strokeWidth: 0, fill: "var(--color-mauve-shadow-500)" }}
            />
            <Area
              type="monotone"
              dataKey="Penjualan"
              name="Total Penjualan"
              stroke="var(--color-chartreuse-500)"
              strokeWidth={3}
              fillOpacity={1}
              fill={chartType === "area" ? "url(#colorPenjualan)" : "none"}
              activeDot={{ r: 6, strokeWidth: 0, fill: "var(--color-chartreuse-500)" }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
