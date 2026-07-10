"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MessageSquare, Laptop, CheckCircle2 } from "lucide-react";
import { channelData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function ActivityMap() {
  return (
    <Card className="border border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60 backdrop-blur-md rounded-2xl flex flex-col h-full relative overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-bold text-onyx-900 dark:text-white">
          Aktivitas Channel Masuk
        </CardTitle>
        <CardDescription className="text-xs text-onyx-500 dark:text-onyx-400 mt-1">
          Ringkasan integrasi data WhatsApp vs Web Dashboard
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between py-4 space-y-6">
        {/* Comparative Progress bars */}
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs font-bold text-onyx-500 dark:text-onyx-400">
            <span>Pembagian Data Masuk</span>
            <span>Rasio</span>
          </div>

          {channelData.map((ch) => {
            const Icon = ch.type === "whatsapp" ? MessageSquare : Laptop;
            return (
              <div key={ch.id} className="p-3.5 rounded-xl bg-onyx-50/50 dark:bg-onyx-900/40 border border-onyx-100 dark:border-onyx-800/40 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "h-7 w-7 rounded-lg flex items-center justify-center",
                      ch.type === "whatsapp"
                        ? "bg-chartreuse-500/10 text-chartreuse-600 dark:text-chartreuse-450"
                        : "bg-toffee-600/10 text-toffee-600"
                    )}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-onyx-900 dark:text-white">{ch.name}</h4>
                      <p className="text-[10px] text-onyx-400 dark:text-onyx-500">Terakhir aktif: {ch.lastSync}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-onyx-900 dark:text-white">{ch.usagePercentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-onyx-100 dark:bg-onyx-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-1000",
                      ch.type === "whatsapp" ? "bg-chartreuse-500" : "bg-toffee-600"
                    )}
                    style={{ width: `${ch.usagePercentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Sync Status Info Block */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-onyx-500 dark:text-onyx-400 block">
            Aktivitas Terakhir Sistem
          </span>
          <div className="space-y-2.5">
            {channelData.map((ch) => (
              <div key={ch.id} className="flex gap-2.5 items-start text-xs">
                <div className="mt-0.5">
                  <CheckCircle2 className="h-4 w-4 text-chartreuse-600 dark:text-chartreuse-400 shrink-0" />
                </div>
                <div className="min-w-0">
                  <p className="text-onyx-800 dark:text-onyx-200 text-[11px] leading-relaxed">
                    <strong>{ch.type === "whatsapp" ? "WhatsApp Bot" : "AI Core"}:</strong> {ch.log}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
