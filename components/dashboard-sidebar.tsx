"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  TrendingUp,
  Trash2,
  DollarSign,
  Package,
  PiggyBank,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Leaf,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export function DashboardSidebar({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
}: SidebarProps) {
  const menuItems = [
    { id: "overview", label: "Ringkasan", icon: LayoutDashboard },
    { id: "forecast", label: "Prediksi AI", icon: TrendingUp },
    { id: "waste", label: "Sisa Produk", icon: Trash2 },
    { id: "sales", label: "Penjualan", icon: DollarSign },
    { id: "product", label: "Kelola Produk", icon: Package },
    { id: "profit", label: "Keuntungan", icon: PiggyBank },
  ];

  const bottomItems = [
    { id: "settings", label: "Pengaturan", icon: Settings },
    { id: "help", label: "Bantuan", icon: HelpCircle },
    { id: "logout", label: "Keluar", icon: LogOut },
  ];

  return (
    <aside
      className={cn(
        "hidden sm:flex flex-col border-r border-onyx-200/50 dark:border-onyx-800 bg-white/80 dark:bg-onyx-950 backdrop-blur-md transition-all duration-300 relative z-30",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-onyx-200/50 dark:border-onyx-800">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-chartreuse-500 text-onyx-950 shadow-lg shadow-chartreuse-500/20 font-bold transition-transform hover:scale-105 duration-300">
            <Leaf className="h-5 w-5" />
          </div>
          {!collapsed && (
            <span className="font-bold text-lg tracking-tight text-onyx-900 dark:text-white transition-opacity duration-300">
              EcoStock
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-7 h-6 w-6 rounded-full border border-onyx-200 bg-white dark:bg-onyx-900 dark:border-onyx-800 text-onyx-600 dark:text-onyx-300 shadow-md hover:bg-onyx-50 dark:hover:bg-onyx-800 z-40 shrink-0"
        >
          {collapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </Button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 py-6 px-3 flex flex-col gap-2.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          if (collapsed) {
            return (
              <Tooltip key={item.id}>
                <TooltipTrigger
                  render={
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={cn(
                        "flex h-12 w-full items-center justify-center rounded-xl transition-all duration-300 ease-out relative group cursor-pointer",
                        isActive
                          ? "bg-chartreuse-500 text-onyx-950 font-bold"
                          : "text-onyx-500 dark:text-onyx-400 hover:bg-onyx-50 dark:hover:bg-onyx-900/50 hover:text-onyx-900 dark:hover:text-white"
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                    </button>
                  }
                />
                <TooltipContent side="right" className="bg-onyx-900 dark:bg-white text-white dark:text-onyx-950 border-none font-medium">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex w-full items-center gap-3 px-4 py-3.5 rounded-xl text-sm transition-all duration-300 ease-out cursor-pointer relative group",
                isActive
                  ? "bg-chartreuse-500 text-onyx-950 font-bold"
                  : "text-onyx-600 dark:text-onyx-400 hover:bg-onyx-50 dark:hover:bg-onyx-900/50 hover:text-onyx-900 dark:hover:text-white"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-105",
                  isActive
                    ? "text-onyx-950"
                    : "text-onyx-400 dark:text-onyx-500"
                )}
              />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="py-6 px-3 border-t border-plum-900/30 dark:border-plum-900/30 flex flex-col gap-2.5">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          if (collapsed) {
            return (
              <Tooltip key={item.id}>
                <TooltipTrigger
                  render={
                    <button
                      onClick={() => {
                        if (item.id !== "logout") setActiveTab(item.id);
                      }}
                      className={cn(
                        "flex h-12 w-full items-center justify-center rounded-xl transition-all duration-300 ease-out relative cursor-pointer",
                        isActive
                          ? "bg-chartreuse-500 text-onyx-950 font-bold"
                          : item.id === "logout"
                          ? "text-rose-500 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                          : "text-onyx-500 dark:text-onyx-400 hover:bg-onyx-50 dark:hover:bg-onyx-900/50 hover:text-onyx-900 dark:hover:text-white"
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                    </button>
                  }
                />
                <TooltipContent side="right" className="bg-onyx-900 dark:bg-white text-white dark:text-onyx-950 border-none font-medium">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id !== "logout") setActiveTab(item.id);
              }}
              className={cn(
                "flex w-full items-center gap-3 px-4 py-3.5 rounded-xl text-sm transition-all duration-300 ease-out cursor-pointer relative group",
                isActive
                  ? "bg-chartreuse-500 text-onyx-950 font-bold"
                  : item.id === "logout"
                  ? "text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                  : "text-onyx-600 dark:text-onyx-400 hover:bg-onyx-50 dark:hover:bg-onyx-900/50 hover:text-onyx-900 dark:hover:text-white"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-105",
                  isActive
                    ? "text-onyx-950"
                    : item.id === "logout"
                    ? "text-rose-500"
                    : "text-onyx-400 dark:text-onyx-500"
                )}
              />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
