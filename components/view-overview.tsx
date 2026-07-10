"use client";

import React from "react";
import { MetricCard } from "@/components/metric-card";
import { ProductionChart } from "@/components/production-chart";
import { WasteProgress } from "@/components/waste-progress";
import { RecentTransactions } from "@/components/recent-transactions";
import { ActivityMap } from "@/components/activity-map";
import { PortfolioPerformance } from "@/components/portfolio-performance";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, ArrowRight, Sparkles, Cake, TrendingUp, Coins } from "lucide-react";
import { produksiData, profitData } from "@/lib/mock-data";

interface ViewOverviewProps {
  setActiveTab: (tab: string) => void;
}

export function ViewOverview({ setActiveTab }: ViewOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Welcome Banner / Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-onyx-900 dark:text-white">
            Selamat Pagi, Pratama Putra!
          </h1>
          <p className="text-sm text-onyx-500 dark:text-onyx-400 mt-1">
            Berikut ringkasan kondisi bisnis dan efisiensi produksi Anda hari ini.
          </p>
        </div>
        
        {/* Quick Actions */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-onyx-900 border border-onyx-200/60 dark:border-onyx-800 text-xs font-semibold text-onyx-700 dark:text-onyx-300">
            <Calendar className="h-3.5 w-3.5 text-onyx-400" />
            <span>Sab, 04 Juli 2026</span>
          </div>
        </div>
      </div>

      {/* Small Notification-style AI Insight Banner (60-80px) */}
      <div className="rounded-xl border border-chartreuse-500/20 bg-chartreuse-500/5 dark:bg-chartreuse-500/2 px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-chartreuse-600 dark:text-chartreuse-400 shrink-0" />
          <p className="text-xs text-onyx-800 dark:text-onyx-200">
            <span className="font-bold">EcoAI Insight Hari Ini:</span> Produksi Kue Brownies Cokelat diperkirakan surplus tinggi. Harap kurangi produksi.
          </p>
        </div>
        <button 
          onClick={() => setActiveTab("forecast")}
          className="text-xs font-bold text-chartreuse-700 dark:text-chartreuse-400 hover:underline shrink-0"
        >
          Lihat Detail
        </button>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Total Produksi"
          value="98.400 Pcs"
          change="+18.2%"
          isPositive={true}
          sparklineType="line"
          sparklineData={produksiData}
          sparklineColor="var(--color-lemon-400)"
          description="Produksi meningkat 18% minggu ini untuk menyambut libur akhir pekan."
        />
        <MetricCard
          title="Rasio Menu Terjual"
          value="76.2%"
          change="+3.4%"
          isPositive={true}
          sparklineType="gauge"
          sparklineData={[]}
          sparklineColor="var(--color-chartreuse-500)"
          gaugePercentage={76}
          description="Hebat! Lebih dari 7 dari 10 menu buatan Anda habis terjual."
        />
        <MetricCard
          title="Estimasi Keuntungan"
          value="Rp79,3 Jt"
          change="-2.1%"
          isPositive={false}
          sparklineType="bar"
          sparklineData={profitData}
          sparklineColor="var(--color-toffee-600)"
          description="Profit stabil didorong oleh efisiensi bahan dan minimnya sisa produk."
        />
      </div>

      {/* Middle Row (Analytics & Progress) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProductionChart />
        </div>
        <div>
          <WasteProgress setActiveTab={setActiveTab} />
        </div>
      </div>

      {/* Bottom Row (Portfolio, Table, Map) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PortfolioPerformance setActiveTab={setActiveTab} />
        <RecentTransactions setActiveTab={setActiveTab} />
        <ActivityMap />
      </div>


    </div>
  );
}
