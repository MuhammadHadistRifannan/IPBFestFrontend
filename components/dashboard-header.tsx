"use client";

import React from "react";
import { Search, Bell, Mail, HelpCircle, Sun, Moon, Sparkles } from "lucide-react";
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
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export function DashboardHeader({ theme, toggleTheme }: HeaderProps) {
  return (
    <header className="h-16 border-b border-onyx-200/50 dark:border-onyx-800 bg-white/80 dark:bg-onyx-950 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-20">
      {/* Search Bar */}
      <div className="flex items-center w-full max-w-md relative">
        <Search className="absolute left-3 h-4 w-4 text-onyx-400 dark:text-onyx-500" />
        <Input
          type="search"
          placeholder="Search components, analytics, or insight..."
          className="pl-10 h-10 w-full rounded-xl bg-onyx-50/50 dark:bg-onyx-900/50 border-onyx-200/60 dark:border-onyx-800 focus-visible:ring-lemon-lime-500 text-sm focus-visible:bg-white dark:focus-visible:bg-onyx-900 transition-all duration-200"
        />
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-2">
        {/* AI Insight Badge */}
        <div className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-chartreuse-500/10 border border-chartreuse-500/20 text-chartreuse-600 dark:text-chartreuse-400 text-xs font-semibold mr-2 animate-pulse">
          <Sparkles className="h-3 w-3" />
          <span>AI Insight Active</span>
        </div>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-10 w-10 rounded-xl text-onyx-500 dark:text-onyx-400 hover:bg-onyx-50 dark:hover:bg-onyx-900/60"
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5 text-lemon-lime-400" />
          )}
        </Button>

        {/* Help icon */}
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-xl text-onyx-500 dark:text-onyx-400 hover:bg-onyx-50 dark:hover:bg-onyx-900/60"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>

        {/* Mail icon */}
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-xl text-onyx-500 dark:text-onyx-400 hover:bg-onyx-50 dark:hover:bg-onyx-900/60 relative"
        >
          <Mail className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-mauve-shadow-500" />
        </Button>

        {/* Notification Bell */}
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-xl text-onyx-500 dark:text-onyx-400 hover:bg-onyx-50 dark:hover:bg-onyx-900/60 relative"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-lemon-lime-500" />
        </Button>

        <div className="h-8 w-px bg-onyx-200 dark:bg-onyx-800 mx-2" />

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" className="relative h-10 w-10 rounded-xl p-0 overflow-hidden border border-onyx-200 dark:border-onyx-800">
                <Avatar className="h-10 w-10 rounded-xl">
                  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop" alt="User profile" />
                  <AvatarFallback className="bg-onyx-100 dark:bg-onyx-800 text-onyx-700 dark:text-onyx-300 font-semibold text-sm">
                    SR
                  </AvatarFallback>
                </Avatar>
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-56 rounded-xl border-onyx-200 dark:border-onyx-800 bg-white dark:bg-onyx-950 text-onyx-900 dark:text-white">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold leading-none">Sajibur Rahman</p>
                <p className="text-xs leading-none text-onyx-500 dark:text-onyx-400">sajibur@ecostock.ai</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-onyx-100 dark:bg-onyx-800" />
            <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-onyx-50 dark:hover:bg-onyx-900">
              Profile Setup
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-onyx-50 dark:hover:bg-onyx-900">
              System Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-onyx-50 dark:hover:bg-onyx-900">
              Billing & Plan
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-onyx-100 dark:bg-onyx-800" />
            <DropdownMenuItem className="rounded-lg cursor-pointer text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
