"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TrendingUp, AlertTriangle, Sparkles, RefreshCw, Layers } from "lucide-react";
import { initialForecastData, ForecastItem } from "@/lib/mock-data";

export function ViewForecast() {
  const [forecastData, setForecastData] = useState<ForecastItem[]>(initialForecastData);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-onyx-900 dark:text-white flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-chartreuse-600 dark:text-chartreuse-400" />
            Prediksi & Rekomendasi AI
          </h1>
          <p className="text-sm text-onyx-500 dark:text-onyx-400 mt-1">
            Optimalkan produksi harian Anda berdasarkan analisis permintaan otomatis dan kecerdasan buatan.
          </p>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="self-start md:self-auto bg-onyx-900 dark:bg-white text-white dark:text-onyx-950 hover:bg-onyx-800 dark:hover:bg-onyx-50 font-bold rounded-xl text-xs h-10 px-4 flex items-center gap-2"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
          <span>{isRefreshing ? "Memperbarui..." : "Perbarui Prediksi"}</span>
        </Button>
      </div>

      {/* Grid: Produksi Hari Ini Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {forecastData
          .filter(f => !f.isNew)
          .map((item) => (
            <Card key={item.id} className="border border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60 backdrop-blur-md rounded-xl">
              <CardContent className="p-4 flex flex-col justify-between h-24">
                <span className="text-[10px] font-semibold uppercase text-onyx-400 dark:text-onyx-500 truncate block">
                  {item.name}
                </span>
                <div className="mt-2">
                  <span className="text-xl font-bold text-onyx-900 dark:text-white block">
                    {item.todayProduction} Pcs
                  </span>
                  <span className="text-[9px] text-onyx-400 dark:text-onyx-500 block">
                    Produksi Aktual Hari Ini
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Main Table: AI Recommendations */}
      <Card className="border border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60 backdrop-blur-md rounded-2xl overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold text-onyx-900 dark:text-white">
            Tabel Rekomendasi Produksi Besok
          </CardTitle>
          <CardDescription className="text-onyx-500 dark:text-onyx-400">
            Hasil prediksi produksi optimal untuk tanggal 05 Juli 2026 berdasarkan data log histori.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-onyx-50/50 dark:bg-onyx-950/30 border-b border-onyx-100 dark:border-onyx-800">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[180px] text-xs font-bold text-onyx-700 dark:text-onyx-300">Nama Produk</TableHead>
                  <TableHead className="text-xs font-bold text-onyx-700 dark:text-onyx-300">Kategori</TableHead>
                  <TableHead className="text-xs font-bold text-onyx-700 dark:text-onyx-300 text-center">Produksi Hari Ini</TableHead>
                  <TableHead className="text-xs font-bold text-onyx-700 dark:text-onyx-300 text-center">Rekomendasi Besok</TableHead>
                  <TableHead className="text-xs font-bold text-onyx-700 dark:text-onyx-300">AI Insight & Alasan Prediksi</TableHead>
                  <TableHead className="text-xs font-bold text-onyx-700 dark:text-onyx-300 text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {forecastData.map((item) => {
                  const isDeviation = item.warning;
                  const isNewProduct = item.isNew;

                  return (
                    <TableRow
                      key={item.id}
                      className={`border-b border-onyx-100/50 dark:border-onyx-800/30 last:border-none transition-colors duration-200 ${
                        isDeviation
                          ? "bg-rose-500/[0.03] dark:bg-rose-500/[0.01] hover:bg-rose-500/[0.05]"
                          : "hover:bg-onyx-50/30 dark:hover:bg-onyx-800/10"
                      }`}
                    >
                      <TableCell className="font-semibold text-onyx-900 dark:text-white py-4 text-xs">
                        {item.name}
                      </TableCell>
                      <TableCell className="text-onyx-500 dark:text-onyx-400 py-4 text-xs">
                        {item.category}
                      </TableCell>
                      <TableCell className="text-center font-medium text-onyx-800 dark:text-onyx-200 py-4 text-xs">
                        {item.todayProduction > 0 ? `${item.todayProduction} Pcs` : "-"}
                      </TableCell>
                      <TableCell className="text-center py-4 text-xs font-bold">
                        {isNewProduct ? (
                          <span className="text-onyx-400 dark:text-onyx-500">-</span>
                        ) : (
                          <span className={cn(
                            "px-2.5 py-1 rounded-lg",
                            isDeviation 
                              ? "bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-400"
                              : "bg-chartreuse-500/10 text-chartreuse-700 dark:text-chartreuse-400"
                          )}>
                            {item.recommendedProduction} Pcs
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="py-4 text-xs text-onyx-600 dark:text-onyx-400 max-w-sm leading-relaxed">
                        {isNewProduct ? (
                          <div className="flex items-center gap-2 text-toffee-600 dark:text-toffee-400 font-medium">
                            <span className="h-1.5 w-1.5 rounded-full bg-toffee-600 animate-pulse shrink-0" />
                            <span>{item.reason}</span>
                          </div>
                        ) : (
                          <span>{item.reason}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right py-4 text-xs font-bold">
                        {isDeviation && (
                          <Badge className="bg-rose-500 hover:bg-rose-600 text-white border-none text-[10px] py-0.5 px-2 rounded-full inline-flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            <span>Penyimpangan Tinggi</span>
                          </Badge>
                        )}
                        {isNewProduct && (
                          <Badge className="bg-toffee-600 hover:bg-toffee-700 text-white border-none text-[10px] py-0.5 px-2 rounded-full">
                            Siklus Belajar
                          </Badge>
                        )}
                        {!isDeviation && !isNewProduct && (
                          <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-none text-[10px] py-0.5 px-2 rounded-full">
                            Stabil
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Deviation Warning Alert */}
      <Alert className="border border-rose-500/30 dark:border-rose-500/20 bg-rose-500/5 dark:bg-rose-500/[0.02] rounded-xl flex items-start gap-3 p-4">
        <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
        <div>
          <AlertTitle className="text-xs font-bold text-rose-800 dark:text-rose-400">
            Perhatian: Penyesuaian Produksi Brownies Cokelat
          </AlertTitle>
          <AlertDescription className="text-xs text-rose-700 dark:text-rose-400/80 leading-relaxed mt-1">
            Rekomendasi AI menyarankan pengurangan produksi sebesar 33% untuk Kue Brownies Cokelat. Hal ini dikarenakan persentase sisa produk yang tercatat kemarin sangat tinggi (82%). Mengikuti rekomendasi ini dapat meminimalisir potensi kerugian bahan baku.
          </AlertDescription>
        </div>
      </Alert>
    </div>
  );
}
