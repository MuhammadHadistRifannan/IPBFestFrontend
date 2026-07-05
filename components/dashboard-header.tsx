"use client";

import React from "react";
import { Search, Bell, Sun, Moon, Sparkles, Download, Share2, FileText, CheckCircle2, Monitor } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

export function DashboardHeader() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const currentTheme = mounted ? theme : "system";
  // Notification Mock Data
  const notifications = [
    { id: 1, type: "system", text: "WhatsApp Rekap berhasil diimpor", time: "5 mnt lalu", unread: true },
    { id: 2, type: "ai", text: "Rekomendasi Roti Tawar diperbarui", time: "1 jam lalu", unread: true },
    { id: 3, type: "system", text: "Stok Donat Kentang kritis", time: "3 jam lalu", unread: false },
  ];

  return (
    <header className="h-16 border-b border-onyx-200/50 dark:border-onyx-800 bg-white/80 dark:bg-onyx-950 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-20">
      {/* Search Bar */}
      <div className="flex items-center w-full max-w-sm relative">
        <Search className="absolute left-3 h-4 w-4 text-onyx-400 dark:text-onyx-500" />
        <Input
          type="search"
          placeholder="Cari analisis atau produk..."
          className="pl-10 h-10 w-full rounded-xl bg-onyx-50/50 dark:bg-onyx-900/50 border-onyx-200/60 dark:border-onyx-800 focus-visible:ring-chartreuse-500 text-sm focus-visible:bg-white dark:focus-visible:bg-onyx-900 transition-all duration-200"
        />
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-3">
        {/* Subtle AI Insight Badge */}
        <div className="hidden md:flex items-center gap-1.5 text-[11px] font-semibold text-chartreuse-600 dark:text-chartreuse-400 mr-2 bg-chartreuse-500/5 px-2.5 py-1 rounded-lg border border-chartreuse-500/10">
          <Sparkles className="h-3.5 w-3.5" />
          <span>AI Active</span>
        </div>

        {/* Primary Export Action Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                size="sm"
                className="h-9 rounded-xl bg-chartreuse-500 text-onyx-950 text-xs font-bold hover:bg-chartreuse-600 shadow-md shadow-chartreuse-500/10 cursor-pointer flex items-center gap-1.5"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export</span>
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-48 rounded-xl border-onyx-200 dark:border-onyx-800 bg-white dark:bg-onyx-950 text-onyx-900 dark:text-white">
            <DropdownMenuLabel className="text-xs text-onyx-500 dark:text-onyx-400">Pilih Aksi</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-onyx-100 dark:bg-onyx-800" />
            <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-onyx-50 dark:hover:bg-onyx-900 flex items-center gap-2">
              <FileText className="h-4 w-4 text-onyx-500" />
              <span>Export PDF Report</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-onyx-50 dark:hover:bg-onyx-900 flex items-center gap-2">
              <Share2 className="h-4 w-4 text-onyx-500" />
              <span>Bagikan Link Laporan</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Combined Notification + Messages Icon Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-xl text-onyx-500 dark:text-onyx-400 hover:bg-onyx-50 dark:hover:bg-onyx-900/60 relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-mauve-shadow-500" />
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-80 rounded-xl border-onyx-200 dark:border-onyx-800 bg-white dark:bg-onyx-950 text-onyx-900 dark:text-white p-2">
            <div className="flex items-center justify-between px-2 py-1.5 border-b border-onyx-100 dark:border-onyx-850">
              <span className="text-xs font-bold text-onyx-900 dark:text-white">Notifikasi & Pesan</span>
              <span className="text-[10px] text-chartreuse-600 dark:text-chartreuse-400 font-semibold cursor-pointer hover:underline">Tandai dibaca</span>
            </div>
            <div className="space-y-1 mt-1 max-h-60 overflow-y-auto">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-2 rounded-lg flex gap-2.5 items-start transition-colors cursor-pointer text-xs ${
                    n.unread
                      ? "bg-chartreuse-500/5 dark:bg-chartreuse-500/2"
                      : "hover:bg-onyx-50 dark:hover:bg-onyx-900"
                  }`}
                >
                  <div className="mt-0.5">
                    {n.type === "ai" ? (
                      <Sparkles className="h-4 w-4 text-chartreuse-600 dark:text-chartreuse-400" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 text-toffee-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-onyx-800 dark:text-onyx-200 truncate ${n.unread ? "font-semibold text-onyx-900 dark:text-white" : ""}`}>
                      {n.text}
                    </p>
                    <span className="text-[10px] text-onyx-400 dark:text-onyx-500">{n.time}</span>
                  </div>
                  {n.unread && <span className="h-1.5 w-1.5 rounded-full bg-chartreuse-500 mt-1.5 shrink-0" />}
                </div>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="h-6 w-px bg-onyx-200 dark:bg-onyx-800 mx-1" />

        {/* User Profile Dropdown containing Theme Toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" className="relative h-9 w-9 rounded-xl p-0 overflow-hidden border border-onyx-200 dark:border-onyx-800">
                <Avatar className="h-9 w-9 rounded-xl">
                  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop" alt="User profile" />
                  <AvatarFallback className="bg-onyx-100 dark:bg-onyx-800 text-onyx-700 dark:text-onyx-300 font-semibold text-sm">
                    PP
                  </AvatarFallback>
                </Avatar>
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-56 rounded-xl border-onyx-200 dark:border-onyx-800 bg-white dark:bg-onyx-950 text-onyx-900 dark:text-white">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold leading-none">Pratama Putra</p>
                <p className="text-xs leading-none text-onyx-500 dark:text-onyx-400">pratama.putra@ecostock.ai</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-onyx-100 dark:bg-onyx-800" />
            
            {/* Embedded Theme Toggle */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="rounded-lg cursor-pointer hover:bg-onyx-50 dark:hover:bg-onyx-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {currentTheme === "light" ? (
                    <Sun className="h-4 w-4 text-amber-500" />
                  ) : currentTheme === "dark" ? (
                    <Moon className="h-4 w-4 text-lemon-400" />
                  ) : (
                    <Monitor className="h-4 w-4 text-onyx-500 dark:text-onyx-400" />
                  )}
                  <span>Tema Tampilan</span>
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent alignOffset={-4} className="w-40 rounded-xl border-onyx-200 dark:border-onyx-800 bg-white dark:bg-onyx-950 text-onyx-900 dark:text-white p-1 shadow-md">
                <DropdownMenuRadioGroup value={currentTheme} onValueChange={(val) => setTheme(val)}>
                  <DropdownMenuRadioItem value="light" className="rounded-lg cursor-pointer hover:bg-onyx-50 dark:hover:bg-onyx-900 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sun className="h-3.5 w-3.5" />
                      <span>Terang</span>
                    </div>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark" className="rounded-lg cursor-pointer hover:bg-onyx-50 dark:hover:bg-onyx-900 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Moon className="h-3.5 w-3.5" />
                      <span>Gelap</span>
                    </div>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system" className="rounded-lg cursor-pointer hover:bg-onyx-50 dark:hover:bg-onyx-900 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Monitor className="h-3.5 w-3.5" />
                      <span>Sistem</span>
                    </div>
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            <DropdownMenuSeparator className="bg-onyx-100 dark:bg-onyx-800" />
            <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-onyx-50 dark:hover:bg-onyx-900">
              Pengaturan Profil
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-onyx-50 dark:hover:bg-onyx-900">
              Pengaturan Sistem
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-onyx-100 dark:bg-onyx-800" />
            <DropdownMenuItem className="rounded-lg cursor-pointer text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20">
              Keluar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
