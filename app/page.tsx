"use client";

import React, { useState, useEffect } from "react";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardBottomNav } from "@/components/dashboard-bottom-nav";
import { ViewOverview } from "@/components/view-overview";
import { ViewForecast } from "@/components/view-forecast";
import { ViewWaste } from "@/components/view-waste";
import { ViewSales } from "@/components/view-sales";
import { ViewProduct } from "@/components/view-product";
import { ViewProfit } from "@/components/view-profit";

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

  const renderActiveContent = () => {
    switch (activeTab) {
      case "overview":
        return <ViewOverview setActiveTab={setActiveTab} />;
      case "forecast":
        return <ViewForecast />;
      case "waste":
        return <ViewWaste />;
      case "sales":
        return <ViewSales />;
      case "product":
        return <ViewProduct />;
      case "profit":
        return <ViewProfit />;
      case "settings":
        return (
          <div className="p-6 bg-white dark:bg-onyx-900 rounded-2xl border border-onyx-200/50 dark:border-onyx-800 text-center space-y-2">
            <h2 className="text-lg font-bold text-onyx-900 dark:text-white">Pengaturan</h2>
            <p className="text-xs text-onyx-500">Konfigurasi profile, integrasi WhatsApp, dan parameter AI.</p>
          </div>
        );
      case "help":
        return (
          <div className="p-6 bg-white dark:bg-onyx-900 rounded-2xl border border-onyx-200/50 dark:border-onyx-800 text-center space-y-2">
            <h2 className="text-lg font-bold text-onyx-900 dark:text-white">Bantuan</h2>
            <p className="text-xs text-onyx-500">Panduan penggunaan EcoStock AI dan kontak support.</p>
          </div>
        );
      default:
        return <ViewOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-onyx-50 dark:bg-onyx-950 font-sans transition-colors duration-300">
      {/* Sidebar for Desktop */}
      <DashboardSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      {/* Main Body */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Header */}
        <DashboardHeader theme={theme} toggleTheme={toggleTheme} />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 pb-24 sm:pb-6 space-y-6">
          {renderActiveContent()}
        </main>

        {/* Bottom Navigation for Mobile */}
        <DashboardBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}
