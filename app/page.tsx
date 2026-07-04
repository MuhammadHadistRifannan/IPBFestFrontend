"use client";

import React, { useState, useEffect } from "react";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { MetricCard } from "@/components/metric-card";
import { ProductionChart } from "@/components/production-chart";
import { WasteProgress } from "@/components/waste-progress";
import { RecentTransactions } from "@/components/recent-transactions";
import { ActivityMap } from "@/components/activity-map";
import { PortfolioPerformance } from "@/components/portfolio-performance";
import { Button } from "@/components/ui/button";
import { Download, Share2, Calendar, FileText, ArrowRight } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Sync theme with DOM
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Sparkline Mock Data
  const produksiData = [
    { value: 45000 },
    { value: 52000 },
    { value: 49000 },
    { value: 63000 },
    { value: 58000 },
    { value: 71000 },
    { value: 98400 },
  ];

  const investmentData = [
    { value: 120 },
    { value: 190 },
    { value: 150 },
    { value: 220 },
    { value: 280 },
    { value: 240 },
    { value: 310 },
    { value: 290 },
    { value: 340 },
    { value: 420 },
  ];

  return (
    <div className="flex min-h-screen bg-onyx-50 dark:bg-onyx-950 font-sans transition-colors duration-300">
      {/* Sidebar */}
      <DashboardSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      {/* Main Body */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <DashboardHeader theme={theme} toggleTheme={toggleTheme} />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Welcome Banner / Header Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-onyx-900 dark:text-white flex items-center gap-2">
                <span>Selamat Pagi, Sajibur!</span>
                <span className="animate-bounce inline-block text-xl">👋</span>
              </h1>
              <p className="text-sm text-onyx-500 dark:text-onyx-400 mt-1">
                Here is your EcoStock sustainability report for today.
              </p>
            </div>
            
            {/* Quick Actions */}
            <div className="flex items-center gap-3 self-start md:self-auto">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-onyx-900 border border-onyx-200/60 dark:border-onyx-800 text-xs font-semibold text-onyx-700 dark:text-onyx-300">
                <Calendar className="h-3.5 w-3.5 text-onyx-400" />
                <span>Sab, 04 July 2026</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-9 rounded-xl border-onyx-200/60 dark:border-onyx-800 text-xs font-semibold bg-white dark:bg-onyx-900 text-onyx-700 dark:text-onyx-300 hover:bg-onyx-50 dark:hover:bg-onyx-800"
              >
                <Share2 className="h-3.5 w-3.5 mr-1.5" />
                Share
              </Button>
              <Button
                size="sm"
                className="h-9 rounded-xl bg-lemon-lime-500 text-onyx-950 text-xs font-bold hover:bg-lemon-lime-600 shadow-md shadow-lemon-lime-500/10 cursor-pointer"
              >
                <Download className="h-3.5 w-3.5 mr-1.5" />
                Export PDF
              </Button>
            </div>
          </div>

          {/* Metric Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              title="Total Produksi"
              value="Rp98.4M"
              change="+18.2%"
              isPositive={true}
              sparklineType="line"
              sparklineData={produksiData}
              sparklineColor="var(--color-mauve-shadow-500)"
            />
            <MetricCard
              title="Recycling Rate"
              value="76.2%"
              change="+3.4%"
              isPositive={true}
              sparklineType="gauge"
              sparklineData={[]}
              sparklineColor="var(--color-lemon-lime-500)"
              gaugePercentage={76}
            />
            <MetricCard
              title="Investment Value"
              value="Rp967.5M"
              change="-2.1%"
              isPositive={false}
              sparklineType="bar"
              sparklineData={investmentData}
              sparklineColor="var(--color-toffee-brown-500)"
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
                  EcoStock Sustainability Audit Ready
                </h3>
                <p className="text-xs text-onyx-500 dark:text-onyx-400 mt-1 max-w-xl leading-relaxed">
                  Your AI sustainability forecast is fully populated. Review recommendation sheets to claim carbon offsets for the current quarter before the deadline on July 15.
                </p>
              </div>
            </div>
            <Button className="shrink-0 bg-onyx-900 dark:bg-white text-white dark:text-onyx-950 hover:bg-onyx-800 dark:hover:bg-onyx-50 font-bold rounded-xl text-xs h-10 px-4 group cursor-pointer shadow-sm">
              Review Audits
              <ArrowRight className="h-4 w-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

        </main>
      </div>
    </div>
  );
}
