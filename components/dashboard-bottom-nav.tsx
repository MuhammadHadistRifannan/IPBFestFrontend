"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  TrendingUp,
  Trash2,
  DollarSign,
  Package,
  Settings,
  HelpCircle,
  LogOut,
  MoreHorizontal,
  Leaf,
  Sparkles,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function DashboardBottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const mainItems = [
    { id: "overview", label: "Ringkasan", icon: LayoutDashboard },
    { id: "forecast", label: "Prediksi AI", icon: Sparkles },
    { id: "waste", label: "Sisa Produk", icon: Trash2 },
    { id: "sales", label: "Penjualan", icon: DollarSign },
  ];

  const moreItems = [
    { id: "product", label: "Kelola Produk", icon: Package },
    { id: "profit", label: "Keuntungan", icon: TrendingUp },
    { id: "settings", label: "Pengaturan", icon: Settings },
    { id: "help", label: "Bantuan", icon: HelpCircle },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setSheetOpen(false);
  };

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/80 dark:bg-onyx-950/80 backdrop-blur-md border-t border-onyx-200/50 dark:border-onyx-800 flex items-center justify-around px-2 z-40">
      {mainItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => handleTabClick(item.id)}
            className={cn(
              "flex flex-col items-center justify-center rounded-xl transition-all duration-300 ease-out cursor-pointer",
              "w-12 h-12 min-w-11 min-h-11", // Tap target compliance
              isActive
                ? "bg-chartreuse-500 text-onyx-950 font-bold"
                : "text-onyx-600 dark:text-onyx-400 hover:text-onyx-900 dark:hover:text-white"
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="text-[9px] mt-0.5 font-medium truncate max-w-14">
              {item.label}
            </span>
          </button>
        );
      })}

      {/* More Button and Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger
          render={
            <button
              className={cn(
                "flex flex-col items-center justify-center rounded-xl transition-all duration-300 ease-out cursor-pointer",
                "w-12 h-12 min-w-11 min-h-11", // Tap target compliance
                ["product", "profit", "settings", "help"].includes(activeTab)
                  ? "bg-chartreuse-500 text-onyx-950 font-bold"
                  : "text-onyx-600 dark:text-onyx-400 hover:text-onyx-900 dark:hover:text-white"
              )}
            >
              <MoreHorizontal className="h-5 w-5" />
              <span className="text-[9px] mt-0.5 font-medium">Lainnya</span>
            </button>
          }
        />
        <SheetContent
          side="bottom"
          className="rounded-t-2xl border-t border-onyx-200/50 dark:border-onyx-800 bg-white dark:bg-onyx-950 text-onyx-900 dark:text-white p-4 pb-8 space-y-4"
        >
          <SheetHeader className="p-0 flex flex-row items-center gap-2 border-b border-onyx-100 dark:border-onyx-800 pb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-chartreuse-500 text-onyx-950 font-bold">
              <Leaf className="h-4 w-4" />
            </div>
            <SheetTitle className="text-sm font-bold text-onyx-900 dark:text-white">
              Menu Tambahan
            </SheetTitle>
          </SheetHeader>

          <div className="grid grid-cols-2 gap-3">
            {moreItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-3 rounded-xl text-xs transition-all duration-200 cursor-pointer w-full text-left",
                    isActive
                      ? "bg-chartreuse-500 text-onyx-950 font-bold"
                      : "bg-onyx-50 dark:bg-onyx-900 text-onyx-700 dark:text-onyx-300 hover:bg-onyx-100 dark:hover:bg-onyx-800"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="border-t border-onyx-100 dark:border-onyx-800 pt-3">
            <button
              onClick={() => {
                setSheetOpen(false);
                alert("Keluar dari sistem...");
              }}
              className="flex items-center gap-2 px-3 py-3 rounded-xl text-xs transition-all duration-200 cursor-pointer w-full text-left text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/20 hover:bg-rose-100 dark:hover:bg-rose-900/30"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              <span>Keluar</span>
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
