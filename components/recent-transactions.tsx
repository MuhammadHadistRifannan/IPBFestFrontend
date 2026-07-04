"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, MoreHorizontal, ShoppingCart, Key, Layers, Server, ShieldCheck } from "lucide-react";

interface Transaction {
  id: string;
  activity: string;
  category: string;
  date: string;
  price: string;
  status: "completed" | "pending" | "failed";
  icon: React.ComponentType<{ className?: string }>;
}

const transactions: Transaction[] = [
  {
    id: "tx-1",
    activity: "Mobile App Procurement",
    category: "Software",
    date: "Wed, 12 Jun 2026",
    price: "Rp12,890,500",
    status: "completed",
    icon: ShoppingCart,
  },
  {
    id: "tx-2",
    activity: "ERP Software License",
    category: "Subscription",
    date: "Tue, 11 Jun 2026",
    price: "Rp1,480,000",
    status: "completed",
    icon: Key,
  },
  {
    id: "tx-3",
    activity: "Grocery Purchase (Cafeteria)",
    category: "Operations",
    date: "Sun, 09 Jun 2026",
    price: "Rp36,250,000",
    status: "completed",
    icon: Layers,
  },
  {
    id: "tx-4",
    activity: "Cloud Server Hosting Renewal",
    category: "Infrastructure",
    date: "Sat, 08 Jun 2026",
    price: "Rp6,900,000",
    status: "pending",
    icon: Server,
  },
  {
    id: "tx-5",
    activity: "ISO Compliance Auditing",
    category: "Security",
    date: "Thu, 06 Jun 2026",
    price: "Rp18,500,000",
    status: "completed",
    icon: ShieldCheck,
  },
];

export function RecentTransactions() {
  return (
    <Card className="border border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60 backdrop-blur-md rounded-2xl flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div>
          <CardTitle className="text-lg font-bold text-onyx-900 dark:text-white">
            Recent Transactions
          </CardTitle>
          <CardDescription className="text-onyx-500 dark:text-onyx-400">
            Recent operations expenditures
          </CardDescription>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-lg text-onyx-400 dark:text-onyx-500 hover:bg-onyx-50 dark:hover:bg-onyx-800"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between py-4 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-onyx-100 dark:border-onyx-800 pb-2">
                <th className="text-[10px] font-bold uppercase tracking-wider text-onyx-400 dark:text-onyx-500 pb-2">
                  Activity
                </th>
                <th className="text-[10px] font-bold uppercase tracking-wider text-onyx-400 dark:text-onyx-500 pb-2 hidden sm:table-cell">
                  Date
                </th>
                <th className="text-[10px] font-bold uppercase tracking-wider text-onyx-400 dark:text-onyx-500 pb-2 text-right">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => {
                const Icon = tx.icon;
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
                        <p className="text-xs font-semibold text-onyx-900 dark:text-white truncate max-w-[140px] sm:max-w-[200px]">
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
