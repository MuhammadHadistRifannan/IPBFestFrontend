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

interface SidebarButtonProps {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
  collapsed: boolean;
  onClick: () => void;
}

function SidebarButton({
  id,
  label,
  icon: Icon,
  isActive,
  collapsed,
  onClick,
}: SidebarButtonProps) {
  const isLogout = id === "logout";
  const [open, setOpen] = React.useState(false);

  const buttonEl = (
    <button
      onClick={(e) => {
        onClick();
        e.currentTarget.blur();
      }}
      className={cn(
        "flex h-12 items-center gap-3 transition-all duration-300 relative group rounded-2xl justify-start pl-[14px]",
        collapsed ? "w-12" : "w-full pr-4 text-sm",
        isActive
          ? "bg-chartreuse-500 text-onyx-950 font-bold"
          : isLogout
          ? "text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20"
          : "text-onyx-600 dark:text-onyx-400 hover:bg-onyx-50 dark:hover:bg-onyx-900/50 hover:text-onyx-900 dark:hover:text-white"
      )}
    >
      <Icon
        className={cn(
          "h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-105",
          isActive
            ? "text-onyx-950"
            : isLogout
            ? "text-rose-500"
            : "text-onyx-400 dark:text-onyx-500"
        )}
      />
      <span
        className={cn(
          "truncate origin-left",
          collapsed
            ? "max-w-0 opacity-0 pointer-events-none transition-none duration-0"
            : "max-w-[150px] opacity-100 transition-[max-width,opacity] duration-300"
        )}
      >
        {label}
      </span>
    </button>
  );

  return (
    <Tooltip open={collapsed ? open : false} onOpenChange={setOpen}>
      <TooltipTrigger render={buttonEl} />
      {collapsed && (
        <TooltipContent
          side="right"
          className="bg-onyx-900 dark:bg-white text-white dark:text-onyx-950 border-none font-medium text-xs"
        >
          {label}
        </TooltipContent>
      )}
    </Tooltip>
  );
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
        "hidden sm:flex flex-col border-r border-onyx-200/50 dark:border-onyx-800 bg-white/80 dark:bg-onyx-950 backdrop-blur-md transition-all duration-300 relative z-30 py-5 h-full pl-4 pr-3",
        collapsed ? "w-20 shadow-none" : "w-64 shadow-2xl"
      )}
    >
      {/* Brand Header */}
      <div className="h-12 flex items-center shrink-0 relative justify-start">
        {/* Unified Logo/Toggle button - preserves DOM node identity for smooth transitions */}
        <button
          onClick={(e) => {
            setCollapsed(!collapsed);
            e.currentTarget.blur();
          }}
          className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-chartreuse-500 text-onyx-950 shadow-md shadow-chartreuse-500/10 font-bold transition-all duration-300 group/logo-btn cursor-pointer hover:bg-chartreuse-600"
        >
          {/* Leaf Icon - morphs only when collapsed */}
          <Leaf
            className={cn(
              "h-5 w-5 absolute transition-all duration-300",
              collapsed
                ? "group-hover/logo-btn:opacity-0 group-hover/logo-btn:scale-75 group-hover/logo-btn:rotate-90"
                : "opacity-100 scale-100 rotate-0"
            )}
          />
          
          {/* Chevron Icon - morphs only when collapsed */}
          <ChevronRight
            className={cn(
              "h-5 w-5 absolute transition-all duration-300",
              collapsed
                ? "opacity-0 scale-75 group-hover/logo-btn:opacity-100 group-hover/logo-btn:scale-100"
                : "opacity-0 scale-75 pointer-events-none"
            )}
          />
        </button>

        {/* Brand Text: Always mounted, transitions smoothly when opening, disappears instantly when closing */}
        <span
          className={cn(
            "font-bold text-lg tracking-tight text-onyx-900 dark:text-white truncate origin-left ml-3",
            collapsed
              ? "max-w-0 opacity-0 pointer-events-none transition-none duration-0"
              : "max-w-[150px] opacity-100 transition-[max-width,opacity] duration-300"
          )}
        >
          EcoStock
        </span>

        {/* Floating close button at the right edge when expanded */}
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            setCollapsed(!collapsed);
            e.currentTarget.blur();
          }}
          className={cn(
            "absolute right-2 top-3 h-6 w-6 rounded-full border border-onyx-200 bg-white dark:bg-onyx-900 dark:border-onyx-800 text-onyx-600 dark:text-onyx-300 shadow-md hover:bg-onyx-50 dark:hover:bg-onyx-900/50 z-40 shrink-0",
            collapsed
              ? "opacity-0 pointer-events-none scale-75 transition-all duration-200"
              : "opacity-100 scale-100 transition-all duration-300 delay-200"
          )}
        >
          <ChevronLeft className="h-3 w-3" />
        </Button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 flex flex-col gap-2.5 overflow-y-auto no-scrollbar pt-6 pb-4">
        {menuItems.map((item) => (
          <SidebarButton
            key={item.id}
            id={item.id}
            label={item.label}
            icon={item.icon}
            isActive={activeTab === item.id}
            collapsed={collapsed}
            onClick={() => setActiveTab(item.id)}
          />
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="pt-4 mt-12 flex flex-col gap-2.5 shrink-0">
        {bottomItems.map((item) => (
          <SidebarButton
            key={item.id}
            id={item.id}
            label={item.label}
            icon={item.icon}
            isActive={activeTab === item.id}
            collapsed={collapsed}
            onClick={() => {
              if (item.id !== "logout") setActiveTab(item.id);
            }}
          />
        ))}
      </div>
    </aside>
  );
}
