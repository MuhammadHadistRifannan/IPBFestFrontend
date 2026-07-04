"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Mock data for Production vs Sales
const dataSenMin = [
  { name: "Sen", Produksi: 12000, Sales: 9000 },
  { name: "Sel", Produksi: 19000, Sales: 14000 },
  { name: "Rab", Produksi: 15000, Sales: 11000 },
  { name: "Kam", Produksi: 22000, Sales: 18000 },
  { name: "Jum", Produksi: 28000, Sales: 24000 },
  { name: "Sab", Produksi: 24000, Sales: 20000 },
  { name: "Min", Produksi: 31000, Sales: 29000 },
];

const dataMonthly = [
  { name: "Jan", Produksi: 45000, Sales: 38000 },
  { name: "Feb", Produksi: 52000, Sales: 44000 },
  { name: "Mar", Produksi: 49000, Sales: 41000 },
  { name: "Apr", Produksi: 63000, Sales: 52000 },
  { name: "May", Produksi: 58000, Sales: 55000 },
  { name: "Jun", Produksi: 71000, Sales: 62000 },
  { name: "Jul", Produksi: 68000, Sales: 60000 },
  { name: "Aug", Produksi: 75000, Sales: 69000 },
  { name: "Sep", Produksi: 82000, Sales: 73000 },
  { name: "Oct", Produksi: 79000, Sales: 76000 },
  { name: "Nov", Produksi: 88000, Sales: 81000 },
  { name: "Dec", Produksi: 98000, Sales: 92000 },
];

export function ProductionChart() {
  const [timeframe, setTimeframe] = useState<"Sen-Min" | "Monthly">("Monthly");
  const [chartType, setChartType] = useState<"area" | "line">("area");

  const activeData = timeframe === "Sen-Min" ? dataSenMin : dataMonthly;

  const chartConfig = {
    Produksi: {
      label: "Total Produksi",
      color: "var(--color-mauve-shadow-500)",
    },
    Sales: {
      label: "Total Sales",
      color: "var(--color-lemon-lime-500)",
    },
  };

  return (
    <Card className="border border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60 backdrop-blur-md rounded-2xl flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
        <div>
          <CardTitle className="text-lg font-bold text-onyx-900 dark:text-white">
            Production vs Sales Overview
          </CardTitle>
          <CardDescription className="text-onyx-500 dark:text-onyx-400">
            Comparing total output against actual customer demand
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
              Line
            </Button>
          </div>

          {/* Timeframe Select */}
          <Select
            value={timeframe}
            onValueChange={(value) => value && setTimeframe(value)}
          >
            <SelectTrigger className="w-[110px] h-9 rounded-xl border-onyx-200/60 dark:border-onyx-800 bg-white dark:bg-onyx-950 text-onyx-700 dark:text-onyx-300 text-xs font-semibold focus:ring-lemon-lime-500">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-onyx-950 border-onyx-200 dark:border-onyx-800 rounded-xl text-onyx-800 dark:text-white">
              <SelectItem value="Sen-Min" className="text-xs rounded-lg cursor-pointer">
                Sen-Min
              </SelectItem>
              <SelectItem value="Monthly" className="text-xs rounded-lg cursor-pointer">
                Monthly
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        <ChartContainer config={chartConfig} className="w-full aspect-[21/9]">
          <AreaChart data={activeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorProduksi" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-mauve-shadow-500)" stopOpacity={0.25} />
                <stop offset="95%" stopColor="var(--color-mauve-shadow-500)" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-lemon-lime-500)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="var(--color-lemon-lime-500)" stopOpacity={0.0} />
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
              tickFormatter={(value) => `Rp${value / 1000}k`}
              className="text-onyx-400 dark:text-onyx-500"
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="Produksi"
              stroke="var(--color-mauve-shadow-500)"
              strokeWidth={3}
              fillOpacity={1}
              fill={chartType === "area" ? "url(#colorProduksi)" : "none"}
              activeDot={{ r: 6, strokeWidth: 0, fill: "var(--color-mauve-shadow-500)" }}
            />
            <Area
              type="monotone"
              dataKey="Sales"
              stroke="var(--color-lemon-lime-500)"
              strokeWidth={3}
              fillOpacity={1}
              fill={chartType === "area" ? "url(#colorSales)" : "none"}
              activeDot={{ r: 6, strokeWidth: 0, fill: "var(--color-lemon-lime-500)" }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
