"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  sparklineType: "line" | "bar" | "gauge";
  sparklineData: { value: number }[];
  sparklineColor: string;
  gaugePercentage?: number;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export function MetricCard({
  title,
  value,
  change,
  isPositive = true,
  sparklineType,
  sparklineData,
  sparklineColor,
  gaugePercentage,
  description,
  icon: Icon,
}: MetricCardProps) {
  return (
    <Card className="border border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60 backdrop-blur-md overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-onyx-200/20 dark:hover:shadow-black/30 hover:-translate-y-0.5">
      <CardContent className="p-6">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1.5 flex-1">
            <span className="text-sm font-semibold text-onyx-500 dark:text-onyx-400 block">
              {title}
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black tracking-tight text-onyx-900 dark:text-white">
                {value}
              </span>
              {change && (
                <span
                  className={cn(
                    "inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full",
                    isPositive
                      ? "text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/20"
                      : "text-rose-700 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/20"
                  )}
                >
                  {isPositive ? (
                    <ArrowUpRight className="h-3 w-3.5 mr-0.5" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3.5 mr-0.5" />
                  )}
                  {change}
                </span>
              )}
            </div>
            {description && (
              <p className="text-xs text-onyx-500 dark:text-onyx-450 font-medium leading-relaxed pt-1">
                {description}
              </p>
            )}
          </div>
          {Icon && (
            <div className="h-10 w-10 rounded-xl bg-onyx-100/50 dark:bg-onyx-800/40 flex items-center justify-center text-onyx-600 dark:text-onyx-350 shrink-0 shadow-inner">
              <Icon className="h-5 w-5" />
            </div>
          )}
        </div>

        {/* Sparkline Visualization */}
        <div className="h-16 mt-6 w-full flex items-end">
          {sparklineType === "line" && (
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <AreaChart data={sparklineData}>
                <defs>
                  <linearGradient id={`gradient-${title.replace(/\s+/g, "")}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={sparklineColor} stopOpacity={0.25} />
                    <stop offset="100%" stopColor={sparklineColor} stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={sparklineColor}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill={`url(#gradient-${title.replace(/\s+/g, "")})`}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}

          {sparklineType === "bar" && (
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <BarChart data={sparklineData}>
                <Bar
                  dataKey="value"
                  fill={sparklineColor}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={8}
                />
              </BarChart>
            </ResponsiveContainer>
          )}

          {sparklineType === "gauge" && gaugePercentage !== undefined && (
            <div className="w-full flex items-center justify-center h-full relative">
              {/* Semi-circular gauge */}
              <div className="relative w-28 h-14 overflow-hidden flex items-end justify-center">
                <div className="absolute top-0 left-0 w-28 h-28 border-12 border-onyx-100 dark:border-onyx-800 rounded-full" />
                <div
                  className="absolute top-0 left-0 w-28 h-28 border-12 border-transparent rounded-full origin-center transition-transform duration-1000 ease-out"
                  style={{
                    borderTopColor: sparklineColor,
                    borderRightColor: sparklineColor,
                    transform: `rotate(${-135 + (gaugePercentage / 100) * 180}deg)`,
                  }}
                />
                <span className="absolute bottom-1 text-sm font-bold text-onyx-800 dark:text-white">
                  {gaugePercentage}%
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
