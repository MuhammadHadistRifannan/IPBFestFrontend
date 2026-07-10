"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Package, TrendingUp, ChevronRight } from "lucide-react";
import { initialForecastData, ForecastItem } from "@/lib/mock-data";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

// Helper for dynamic sparkline data on click
const getHistoricalTrend = (id: string) => {
  switch (id) {
    case "f-2": // Brownies (warning - dropping trend)
      return [{ value: 45 }, { value: 40 }, { value: 38 }, { value: 30 }, { value: 22 }, { value: 12 }, { value: 8 }];
    case "f-3": // Donuts (surging trend)
      return [{ value: 80 }, { value: 95 }, { value: 100 }, { value: 115 }, { value: 110 }, { value: 120 }, { value: 140 }];
    case "f-1": // Roti Tawar (stable slightly dropping)
      return [{ value: 52 }, { value: 50 }, { value: 55 }, { value: 48 }, { value: 50 }, { value: 50 }, { value: 45 }];
    case "f-5": // Roti Manis Keju (rising)
      return [{ value: 25 }, { value: 28 }, { value: 27 }, { value: 30 }, { value: 32 }, { value: 30 }, { value: 35 }];
    default:
      return [{ value: 5 }, { value: 8 }, { value: 5 }, { value: 7 }, { value: 9 }, { value: 8 }, { value: 5 }];
  }
};

export function ViewForecast() {
  const [forecastData] = useState<ForecastItem[]>(initialForecastData);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ForecastItem | null>(
    initialForecastData.find(item => item.warning) || initialForecastData[0] || null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const totalPages = Math.ceil(forecastData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = forecastData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Calculations for 3 Global KPIs
  const totalRecommended = forecastData.reduce((acc, item) => {
    const qty = typeof item.recommendedProduction === "number" ? item.recommendedProduction : 0;
    return acc + qty;
  }, 0);
  
  const totalWarnings = forecastData.filter(item => item.warning).length;

  return (
    <div className="space-y-6 animate-fadeIn pb-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-onyx-900 dark:text-white flex items-center gap-2">
            Prediksi & Rekomendasi AI
          </h1>
          <p className="text-sm text-onyx-500 dark:text-onyx-400 mt-1">
            Rekomendasi taktis jumlah produksi besok untuk menekan sisa makanan dan memaksimalkan laba.
          </p>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="self-start md:self-auto bg-onyx-900 dark:bg-white text-white dark:text-onyx-950 hover:bg-onyx-800 dark:hover:bg-onyx-50 font-bold rounded-xl text-xs h-10 px-4 flex items-center gap-2 cursor-pointer transition-all"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
          <span>{isRefreshing ? "Memperbarui..." : "Perbarui Prediksi"}</span>
        </Button>
      </div>

      {/* Grid: 3 Global KPI Cards (Clean, Fixed Size, High-Contrast) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card className="border border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60 backdrop-blur-md rounded-2xl shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-chartreuse-500/10 text-chartreuse-600 dark:text-chartreuse-450 shrink-0">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <span className="text-sm font-semibold text-onyx-500 dark:text-onyx-400">
                Total Produksi Optimal Besok
              </span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-2xl font-black text-onyx-900 dark:text-white">
                  {totalRecommended} Pcs
                </span>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-450 bg-emerald-500/10 px-1.5 py-0.5 rounded-md">
                  Optimal
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60 backdrop-blur-md rounded-2xl shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-lemon-400/10 text-lemon-600 dark:text-lemon-400 shrink-0">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <span className="text-sm font-semibold text-onyx-500 dark:text-onyx-400">
                Target Penyelamatan Limbah
              </span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-2xl font-black text-onyx-900 dark:text-white">
                  84%
                </span>
                <span className="text-xs font-semibold text-onyx-500 dark:text-onyx-400">
                  Efisiensi Rata-rata
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={cn(
          "border rounded-2xl shadow-sm transition-all duration-300",
          totalWarnings > 0
            ? "border-rose-500/30 bg-rose-500/5 dark:bg-rose-950/10 shadow-[0_0_15px_rgba(239,68,68,0.05)]"
            : "border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60"
        )}>
          <CardContent className="p-5 flex items-center gap-4">
            <div className={cn(
              "p-3 rounded-xl shrink-0",
              totalWarnings > 0 
                ? "bg-rose-500/10 text-rose-500" 
                : "bg-emerald-500/10 text-emerald-500"
            )}>
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <span className="text-sm font-semibold text-onyx-500 dark:text-onyx-400">
                Koreksi Kritis AI
              </span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className={cn(
                  "text-2xl font-black",
                  totalWarnings > 0 ? "text-rose-500" : "text-onyx-900 dark:text-white"
                )}>
                  {totalWarnings} Produk
                </span>
                {totalWarnings > 0 ? (
                  <span className="text-xs font-bold text-rose-800 dark:text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded-md">
                    Butuh Koreksi
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-450 bg-emerald-500/10 px-1.5 py-0.5 rounded-md">
                    Semua Aman
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Split Layout: Table (Left) + Gorgeous Decision Card (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Section: Table */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="border border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold text-onyx-900 dark:text-white">
                Tabel Rekomendasi Produksi Besok
              </CardTitle>
              <CardDescription className="text-onyx-500 dark:text-onyx-400 text-xs">
                Klik produk untuk melihat detail rasionalisasi & visualisasi AI di panel sebelah kanan.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-onyx-50/50 dark:bg-onyx-950/30 border-b border-onyx-100 dark:border-onyx-800">
                    <TableRow className="hover:bg-transparent border-l-4 border-transparent">
                      <TableHead className="text-xs font-bold text-onyx-700 dark:text-onyx-300 py-5 px-6">Nama Produk</TableHead>
                      <TableHead className="text-xs font-bold text-onyx-700 dark:text-onyx-300 text-center py-5 px-6">Produksi Hari Ini</TableHead>
                      <TableHead className="text-xs font-bold text-onyx-700 dark:text-onyx-300 text-center py-5 px-6">Rekomendasi Besok</TableHead>
                      <TableHead className="text-xs font-bold text-onyx-700 dark:text-onyx-300 text-right pr-8 py-5 px-6">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.map((item) => {
                      const isDeviation = item.warning;
                      const isNewProduct = item.isNew;
                      const isSelected = selectedItem?.id === item.id;

                      return (
                        <TableRow
                          key={item.id}
                          onClick={() => setSelectedItem(item)}
                          className={cn(
                            "border-b border-onyx-100/50 dark:border-onyx-800/30 last:border-none transition-all duration-200 cursor-pointer border-l-4 border-transparent",
                            isSelected
                              ? "bg-chartreuse-500/10 dark:bg-chartreuse-500/5 hover:bg-chartreuse-500/15 border-l-chartreuse-500"
                              : isDeviation
                              ? "bg-rose-500/3 dark:bg-rose-500/1 hover:bg-rose-500/5"
                              : "hover:bg-onyx-50/30 dark:hover:bg-onyx-800/10"
                          )}
                        >
                          <TableCell className="py-6 px-6 text-xs font-bold text-onyx-900 dark:text-white">
                            <div className="flex items-center gap-3.5">
                              <img 
                                src="/brownies.webp" 
                                className="h-11 w-11 rounded-xl object-cover shrink-0 shadow-sm border border-onyx-200/40 dark:border-onyx-800/40" 
                                alt={item.name} 
                              />
                              <div>
                                <span className="block font-bold text-sm text-onyx-900 dark:text-white">{item.name}</span>
                                <span className="block text-xs text-onyx-400 dark:text-onyx-500 font-medium font-sans mt-1">{item.category}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-center font-medium text-onyx-800 dark:text-onyx-200 py-6 px-6 text-sm">
                            {item.todayProduction > 0 ? `${item.todayProduction} Pcs` : "-"}
                          </TableCell>
                          <TableCell className="text-center py-6 px-6 text-sm font-black">
                            {isNewProduct ? (
                              <span className="text-onyx-400 dark:text-onyx-500 font-medium">-</span>
                            ) : (
                              <span className={cn(
                                "px-3 py-1 rounded-lg text-xs font-extrabold",
                                isDeviation 
                                  ? "bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-400"
                                  : "bg-chartreuse-500/10 text-chartreuse-700 dark:text-chartreuse-400"
                              )}>
                                {item.recommendedProduction} Pcs
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="text-right py-6 px-6 text-xs font-bold pr-8">
                            <div className="flex items-center justify-end gap-2.5">
                              {isDeviation && (
                                <Badge className="bg-rose-500 hover:bg-rose-600 text-white border-none text-xs py-1 px-3 rounded-full">
                                  <span>Butuh Koreksi</span>
                                </Badge>
                              )}
                              {isNewProduct && (
                                <Badge className="bg-toffee-600 hover:bg-toffee-700 text-white border-none text-xs py-1 px-3 rounded-full">
                                  Siklus Belajar
                                </Badge>
                              )}
                              {!isDeviation && !isNewProduct && (
                                <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-none text-xs py-1 px-3 rounded-full">
                                  Stabil
                                </Badge>
                              )}
                              <ChevronRight className="h-4 w-4 text-onyx-300 dark:text-onyx-600 shrink-0" />
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
              {/* Pagination Controls */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-onyx-200/30 dark:border-onyx-800/40">
                <span className="text-xs text-onyx-500 dark:text-onyx-400">
                  Menampilkan {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, forecastData.length)} dari {forecastData.length} produk
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="h-8 px-3 rounded-lg text-xs font-semibold border border-onyx-200/50 dark:border-onyx-800 hover:bg-onyx-50 dark:hover:bg-onyx-950 text-onyx-700 dark:text-onyx-300 disabled:opacity-50 cursor-pointer"
                  >
                    Sebelumnya
                  </Button>
                  <span className="text-xs font-bold text-onyx-800 dark:text-onyx-200 px-1">
                    {currentPage} / {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="h-8 px-3 rounded-lg text-xs font-semibold border border-onyx-200/50 dark:border-onyx-800 hover:bg-onyx-50 dark:hover:bg-onyx-950 text-onyx-700 dark:text-onyx-300 disabled:opacity-50 cursor-pointer"
                  >
                    Berikutnya
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Section: Gorgeous Detail Card Styled like Mockup */}
        <div className="lg:col-span-5">
          {selectedItem ? (
            <Card className={cn(
              "border backdrop-blur-md rounded-2xl p-6 transition-all duration-500 relative overflow-hidden shadow-lg",
              selectedItem.warning
                ? "border-rose-500/30 bg-rose-500/5 dark:bg-rose-950/10 shadow-[0_0_25px_rgba(239,68,68,0.08)]"
                : "border-chartreuse-500/20 bg-chartreuse-500/3 dark:bg-chartreuse-500/1 shadow-[0_0_25px_rgba(198,249,31,0.04)]"
            )}>
              {/* Radial Highlight Effect in Background */}
              <div className={cn(
                "absolute -top-24 -right-24 h-48 w-48 rounded-full blur-3xl opacity-15",
                selectedItem.warning ? "bg-rose-500" : "bg-chartreuse-500"
              )} />

              <div className="space-y-5">
                {/* Header: Food Image & Name */}
                <div className="flex items-center gap-3.5">
                  <img 
                    src="/brownies.webp" 
                    className="h-16 w-16 rounded-xl object-cover shadow-md border border-onyx-200 dark:border-onyx-800 shrink-0" 
                    alt={selectedItem.name} 
                  />
                  <div>
                    <span className="text-xs font-semibold text-onyx-500 dark:text-onyx-400">
                      Rasionalisasi Prediksi AI
                    </span>
                    <h3 className="text-lg font-bold text-onyx-900 dark:text-white leading-tight mt-0.5">
                      {selectedItem.name}
                    </h3>
                  </div>
                </div>

                {/* Grid: Recommended vs Actual */}
                <div className="grid grid-cols-2 gap-4 py-3 border-t border-b border-onyx-200/30 dark:border-onyx-800">
                  <div>
                    <span className="text-xs font-semibold text-onyx-500 dark:text-onyx-400">
                      Rekomendasi Besok
                    </span>
                    <p className={cn(
                      "text-2xl font-black mt-1",
                      selectedItem.warning ? "text-rose-500" : "text-chartreuse-500"
                    )}>
                      {selectedItem.recommendedProduction} {selectedItem.recommendedProduction === "-" ? "" : "Pcs"}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-onyx-500 dark:text-onyx-400">
                      Produksi Hari Ini
                    </span>
                    <p className="text-2xl font-extrabold text-onyx-700 dark:text-onyx-300 mt-1">
                      {selectedItem.todayProduction > 0 ? `${selectedItem.todayProduction} Pcs` : "-"}
                    </p>
                  </div>
                </div>

                {/* SVG Progress Gauge representing Efficiency/Waste Reduced */}
                <div className="flex items-center gap-5 p-4 rounded-xl bg-onyx-50/50 dark:bg-onyx-950/40 border border-onyx-200/30 dark:border-onyx-850">
                  <div className="relative h-16 w-16 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        className="stroke-onyx-200 dark:stroke-onyx-800"
                        strokeWidth="5"
                        fill="transparent"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        className={selectedItem.warning ? "stroke-rose-500" : "stroke-chartreuse-500"}
                        strokeWidth="5"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 28}
                        strokeDashoffset={2 * Math.PI * 28 * (1 - (selectedItem.warning ? 0.82 : 0.92))}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute text-sm font-extrabold text-onyx-900 dark:text-white">
                      {selectedItem.warning ? "82%" : "92%"}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-onyx-500 dark:text-onyx-400 block">
                      {selectedItem.warning ? "Penyelamatan Limbah" : "Akurasi Permintaan"}
                    </span>
                    <p className="text-xs font-bold text-onyx-800 dark:text-onyx-200 mt-1 leading-snug">
                      {selectedItem.warning 
                        ? "Potensi sisa makanan ditekan hingga 82%" 
                        : "Akurasi pola tren permintaan sangat tinggi"}
                    </p>
                  </div>
                </div>

                {/* Explanatory AI Insights Text Block */}
                <div className="p-4 rounded-xl bg-onyx-100/50 dark:bg-onyx-950/80 border border-onyx-200/50 dark:border-onyx-900">
                  <span className="text-xs font-semibold text-onyx-500 dark:text-onyx-400 block mb-1">
                    Alasan Analisis AI
                  </span>
                  <p className="text-xs text-onyx-700 dark:text-onyx-200 leading-relaxed font-medium">
                    {selectedItem.reason}
                  </p>
                </div>

                {/* Mini Recharts Sparkline */}
                <div>
                  <span className="text-xs font-semibold text-onyx-500 dark:text-onyx-400 block mb-2">
                    Tren Permintaan (7 Hari Terakhir)
                  </span>
                  <div className="h-16 w-full mt-1">
                    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                      <AreaChart data={getHistoricalTrend(selectedItem.id)}>
                        <defs>
                          <linearGradient id={`detail-grad-${selectedItem.id}`} x1="0" y1="0" x2="0" y2="1">
                            <stop 
                              offset="0%" 
                              stopColor={selectedItem.warning ? "#ef4444" : "#c6f91f"} 
                              stopOpacity={0.25} 
                            />
                            <stop 
                              offset="100%" 
                              stopColor={selectedItem.warning ? "#ef4444" : "#c6f91f"} 
                              stopOpacity={0.0} 
                            />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke={selectedItem.warning ? "#ef4444" : "#c6f91f"}
                          strokeWidth={2}
                          fillOpacity={1}
                          fill={`url(#detail-grad-${selectedItem.id})`}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-between items-center text-xs text-onyx-500 dark:text-onyx-400 mt-3 font-semibold">
                    <span>
                      Keandalan AI: 
                      <span className="text-emerald-600 dark:text-emerald-450 font-extrabold text-sm ml-1.5">
                        Tinggi
                      </span>
                    </span>
                    <span>H-7 s/d Hari Ini</span>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="border border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60 backdrop-blur-md rounded-2xl p-6 text-center text-onyx-400">
              Pilih produk di tabel untuk melihat analisis AI
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
