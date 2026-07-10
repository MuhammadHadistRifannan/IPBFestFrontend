"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Coffee, Cake, ShoppingBag, ArrowUpRight } from "lucide-react";
import { transactions } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

interface RecentTransactionsProps {
  setActiveTab?: (tab: string) => void;
}

export function RecentTransactions({ setActiveTab }: RecentTransactionsProps) {
  const getIconForActivity = (activity: string) => {
    const act = activity.toLowerCase();
    if (act.includes("roti")) return ShoppingBag;
    if (act.includes("kue") || act.includes("lapis") || act.includes("brownies")) return Cake;
    return Coffee;
  };

  return (
    <Card className="border border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60 backdrop-blur-md rounded-2xl flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div>
          <CardTitle className="text-base font-bold text-onyx-900 dark:text-white">
            Rekap Penjualan Terkini
          </CardTitle>
          <CardDescription className="text-xs text-onyx-500 dark:text-onyx-400 mt-1">
            Catatan transaksi penjualan harian dari WhatsApp Bot
          </CardDescription>
        </div>
        {setActiveTab && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveTab("sales")}
            className="h-8 w-8 rounded-lg text-onyx-400 dark:text-onyx-500 hover:bg-onyx-50 dark:hover:bg-onyx-800 cursor-pointer shrink-0"
          >
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between py-4 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-onyx-100 dark:border-onyx-800 pb-2">
                <th className="text-xs font-bold text-onyx-500 dark:text-onyx-400 pb-2.5">
                  Produk & Detail
                </th>
                <th className="text-xs font-bold text-onyx-500 dark:text-onyx-400 pb-2.5 hidden sm:table-cell">
                  Waktu Rekap
                </th>
                <th className="text-xs font-bold text-onyx-500 dark:text-onyx-400 pb-2.5 text-right">
                  Total Penjualan
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => {
                const Icon = getIconForActivity(tx.activity);
                return (
                  <tr
                    key={tx.id}
                    className="border-b border-onyx-100/50 dark:border-onyx-800/30 last:border-none group hover:bg-onyx-50/30 dark:hover:bg-onyx-800/10 transition-colors duration-200"
                  >
                    <td className="py-3 flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-onyx-100 dark:bg-onyx-800 text-onyx-600 dark:text-onyx-300 flex items-center justify-center shrink-0">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-onyx-900 dark:text-white truncate max-w-35 sm:max-w-50">
                          {tx.activity}
                        </p>
                        <span className="text-[10px] text-onyx-400 dark:text-onyx-500">
                          {tx.category}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 text-xs text-onyx-500 dark:text-onyx-400 hidden sm:table-cell">
                      {tx.date}
                    </td>
                    <td className="py-3 text-xs font-bold text-right text-onyx-900 dark:text-white">
                      {tx.price}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
