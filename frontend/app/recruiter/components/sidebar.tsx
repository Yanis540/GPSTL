/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from 'react';
import {
    Home,
    LineChart,
    Package2,
    PanelLeft,
    Settings,
    Users2,
    Calendar
  } from "lucide-react"
  
  import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    
  } from "@/components/ui/tooltip"
import Link from 'next/link';

  
  import { Button } from "@/components/ui/button"
  import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from '@/lib/utils';

interface SidebarProps {

};
const sideBarItems = [
  {
    href: "#",
    label: "Acme Inc",
    icon: <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />,
    srOnly: true,
    customClass: "group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base",
  },
  {
    href: "/recruiter",
    label: "Dashboard",
    icon: <Home className="h-5 w-5" />,
    tooltip: "Dashboard",
    active: true,
  },
  {
    href: "#",
    label: "Colleagues",
    icon: <Users2 className="h-5 w-5" />,
    tooltip: "Colleagues",
  },
  {
    href: "/recruiter/calendar",
    label: "Calendar",
    icon: <Calendar className="h-5 w-5" />,
    tooltip: "Calendar",
  },
  {
    href: "/recruiter/analytics",
    label: "Analytics",
    icon: <LineChart className="h-5 w-5" />,
    tooltip: "Analytics",
  },
  {
    href: "#",
    label: "Settings",
    icon: <Settings className="h-5 w-5" />,
    tooltip: "Settings",
  },
];export function Sidebar({}: SidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex h-[calc(100vh-4rem)] mt-[4rem]">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        {sideBarItems.slice(0, sideBarItems.length-1).map((item, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                className={cn(
                  `flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`,
                  item.active ? "bg-accent text-accent-foreground" : "text-muted-foreground", 
                  item.customClass
                )
                  
                }
              >
                {item.icon}
                {item.srOnly && <span className="sr-only">{item.label}</span>}
              </Link>
            </TooltipTrigger>
            {item.tooltip && <TooltipContent side="right">{item.tooltip}</TooltipContent>}
          </Tooltip>
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={sideBarItems[sideBarItems.length-1].href}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              {sideBarItems[sideBarItems.length-1].icon}
              <span className="sr-only">{sideBarItems[sideBarItems.length-1].label}</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">{sideBarItems[sideBarItems.length-1].tooltip}</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}
export function SidebarMobile({}: SidebarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          {sideBarItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(`flex items-center gap-4 px-2.5 `,
                item.active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.icon}
              {item.srOnly ? <span className="sr-only">{item.label}</span> : item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
