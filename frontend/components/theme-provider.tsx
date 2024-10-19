/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client"

import { useTheme } from "next-themes";
import React from "react";
import { Moon, Sun } from "lucide-react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { Button } from "./ui/button";
 
import { cn } from "@/lib/utils"
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

type ThemeToggleProps= {
  className?:string
  
}
export function ThemeToggle({className}:ThemeToggleProps){
  const { setTheme, theme  } = useTheme();
  return (
      <Button
        variant="ghost"
        size="icon"
        className={cn(className)}
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <MoonSun /> 
      </Button>
  );
}

export function MoonSun({className}:{className?:string}){
  return (
  <div className={cn(className)}>
    <Sun className="h-[1.5rem] w-[1.3rem] dark:hidden" />
    <Moon className="hidden h-5 w-5 dark:block" />
    <span className="sr-only">Toggle theme</span>
  </div>
  )
}