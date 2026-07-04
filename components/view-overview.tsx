"use client";

import React from "react";
import { MetricCard } from "@/components/metric-card";
import { ProductionChart } from "@/components/production-chart";
import { WasteProgress } from "@/components/waste-progress";
import { RecentTransactions } from "@/components/recent-transactions";
import { ActivityMap } from "@/components/activity-map";
import { PortfolioPerformance } from "@/components/portfolio-performance";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, ArrowRight } from "lucide-react";
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
            Berikut adalah laporan keberlanjutan dan stok EcoStock Anda hari ini.
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

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Total Produksi"
          value="98.400 Pcs"
          change="+18.2%"
          isPositive={true}
          sparklineType="line"
          sparklineData={produksiData}
          sparklineColor="var(--color-lemon-400)" // Aligned with official palette
        />
        <MetricCard
          title="Rasio Terjual (STR)"
          value="76.2%"
          change="+3.4%"
          isPositive={true}
          sparklineType="gauge"
          sparklineData={[]}
          sparklineColor="var(--color-chartreuse-500)" // Aligned with official palette
          gaugePercentage={76}
        />
        <MetricCard
          title="Estimasi Profit"
          value="Rp79,3 Jt"
          change="-2.1%"
          isPositive={false}
          sparklineType="bar"
          sparklineData={profitData}
          sparklineColor="var(--color-toffee-600)" // Aligned with official palette
        />
      </div>

      {/* Middle Row (Analytics & Progress) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProductionChart />
        </div>
        <div>
          <WasteProgress />
        </div>
      </div>

      {/* Bottom Row (Portfolio, Table, Map) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PortfolioPerformance />
        <RecentTransactions />
        <ActivityMap />
      </div>

      {/* Mini Interactive CTA Section */}
      <div className="rounded-2xl border border-onyx-200/50 dark:border-onyx-800 bg-white/60 dark:bg-onyx-900/40 backdrop-blur-md p-6 flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:shadow-md">
        <div className="flex gap-4">
          <div className="h-12 w-12 rounded-xl bg-chartreuse-500/10 text-chartreuse-600 dark:text-chartreuse-400 flex items-center justify-center shrink-0">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-onyx-900 dark:text-white">
              Rekomendasi AI Terpadu Siap Diulas
            </h3>
            <p className="text-xs text-onyx-500 dark:text-onyx-400 mt-1 max-w-xl leading-relaxed">
              Analisis efisiensi bahan dan prediksi sisa produk Anda sudah terisi penuh. Tinjau lembar rekomendasi kami untuk mengurangi sisa produksi roti besok pagi.
            </p>
          </div>
        </div>
        <Button
          onClick={() => setActiveTab("forecast")}
          className="shrink-0 bg-onyx-900 dark:bg-white text-white dark:text-onyx-950 hover:bg-onyx-800 dark:hover:bg-onyx-50 font-bold rounded-xl text-xs h-10 px-4 group cursor-pointer shadow-sm"
        >
          Tinjau Rekomendasi
          <ArrowRight className="h-4 w-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
