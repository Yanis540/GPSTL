'use client';
import React, { ReactNode } from 'react';
import { SidebarMobile } from './sidebar';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusCircle, File, ListFilter } from 'lucide-react';

interface DashboardHeaderProps {
    children: ReactNode;
}

export function DashboardHeader({ children }: DashboardHeaderProps) {
    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <SidebarMobile />
            {children}
            <div className="relative ml-auto flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                />
            </div>
        </header>
    );
}

interface TabCatgoriesHeaderProps {
    newOffer: () => void;
}

export function TabCatgoriesHeader({ newOffer }: TabCatgoriesHeaderProps) {
    return (
        <div className="flex items-center">
            <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending" >Pending</TabsTrigger>
                <TabsTrigger value="accepted">Accepted</TabsTrigger>
                <TabsTrigger value="refused">Refused</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 gap-1">
                            <ListFilter className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Filter
              </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem checked>All</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>Pending</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>Accepted</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>Refused</DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" variant="outline" className="h-8 gap-1">
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Export
          </span>
                </Button>
                <Button size="sm" className="h-8 gap-1" onClick={newOffer}>
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add a Candidacy
          </span>
                </Button>
            </div>
        </div>
    );
}