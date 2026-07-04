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
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "forecast", label: "AI Forecast", icon: TrendingUp },
    { id: "waste", label: "Waste", icon: Trash2 },
    { id: "sales", label: "Sales", icon: DollarSign },
    { id: "product", label: "Product", icon: Package },
    { id: "profit", label: "Profit", icon: PiggyBank },
  ];

  const bottomItems = [
    { id: "settings", label: "Settings", icon: Settings },
    { id: "help", label: "Help", icon: HelpCircle },
    { id: "logout", label: "Log out", icon: LogOut },
  ];

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-onyx-200/50 dark:border-onyx-800 bg-white/80 dark:bg-onyx-950 backdrop-blur-md transition-all duration-300 relative z-30",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-onyx-200/50 dark:border-onyx-800">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lemon-lime-500 text-onyx-950 shadow-lg shadow-lemon-lime-500/20 font-bold transition-transform hover:scale-105 duration-300">
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
      <nav className="flex-1 py-6 px-3 space-y-1">
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
                        "flex h-12 w-full items-center justify-center rounded-xl transition-all duration-200 relative group cursor-pointer",
                        isActive
                          ? "bg-lemon-lime-500/10 text-lemon-lime-600 dark:text-lemon-lime-400 font-medium"
                          : "text-onyx-500 dark:text-onyx-400 hover:bg-onyx-50 dark:hover:bg-onyx-900/50 hover:text-onyx-900 dark:hover:text-white"
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      {isActive && (
                        <span className="absolute left-0 top-3 h-6 w-1 rounded-r-md bg-lemon-lime-500" />
                      )}
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
                "flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 cursor-pointer relative group",
                isActive
                  ? "bg-lemon-lime-500/10 text-lemon-lime-700 dark:text-lemon-lime-400 font-semibold"
                  : "text-onyx-600 dark:text-onyx-400 hover:bg-onyx-50 dark:hover:bg-onyx-900/50 hover:text-onyx-900 dark:hover:text-white"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-105",
                  isActive
                    ? "text-lemon-lime-600 dark:text-lemon-lime-400"
                    : "text-onyx-400 dark:text-onyx-500"
                )}
              />
              <span className="truncate">{item.label}</span>
              {isActive && (
                <span className="absolute left-0 top-3.5 h-5 w-1 rounded-r-md bg-lemon-lime-500" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="py-6 px-3 border-t border-onyx-200/50 dark:border-onyx-800 space-y-1">
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
                        "flex h-12 w-full items-center justify-center rounded-xl transition-all duration-200 relative cursor-pointer",
                        isActive
                          ? "bg-lemon-lime-500/10 text-lemon-lime-600 dark:text-lemon-lime-400 font-medium"
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
                "flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 cursor-pointer relative group",
                isActive
                  ? "bg-lemon-lime-500/10 text-lemon-lime-700 dark:text-lemon-lime-400 font-semibold"
                  : item.id === "logout"
                  ? "text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                  : "text-onyx-600 dark:text-onyx-400 hover:bg-onyx-50 dark:hover:bg-onyx-900/50 hover:text-onyx-900 dark:hover:text-white"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-105",
                  isActive
                    ? "text-lemon-lime-600 dark:text-lemon-lime-400"
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
