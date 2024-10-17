/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client'
import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/store/use-auth';
import { UserRole } from '@/types';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Button } from './ui/button';

const studentUrls = [
    {
        href: "/student",
        name: "Offers"
    },
    {
        href: "/candidacy",
        name: "Candidacy"
    },
]
const recruiterUrls = [
    {
        href: "/dashboard",
        name: "Dashboard"
    },
];
interface NavigationProps {
    className ? : string
};
export function Navigation({className}:NavigationProps) {
    const { user } = useAuth();

    const urls = user?.role == UserRole.STUDENT ? studentUrls : recruiterUrls;
    if(!user)
        return null; 
    return (
    <div className={cn("flex-1 hidden md:flex flex-row items-center justify-center gap-x-2 font-semibold",className)}>
        <NavigationMenu>
            <NavigationMenuList>
                {urls.map((url, i:number) => (
                    <NavigationMenuItem key={i}>
                        <Link href={url.href} legacyBehavior passHref >
                            <NavigationMenuLink className={navigationMenuTriggerStyle()} >
                                {url.name}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>

        </NavigationMenu>

    </div>
    );
};
import { GiHamburgerMenu } from "react-icons/gi";
import { cn } from '@/lib/utils';
export function NavigationMobile({}:NavigationProps) {
    const {user} = useAuth();
    const urls = user?.role == UserRole.STUDENT ? studentUrls : recruiterUrls;
    if(!user)
        return null; 
    return (
    <Sheet >
      <SheetTrigger asChild className="flex md:hidden">
        <Button variant="outline" className="p-1 h-9 w-9 border"><GiHamburgerMenu className="text-primary h-6 w-6" /></Button>
      </SheetTrigger>
      <SheetContent className="flex md:hidden">
        <div className="flex md:hidden flex-col items-start gap-y-4 ">
            {urls.map((url,i:number)=>(
            <Link href={url.href} legacyBehavior passHref className="">
                    {url.name}
             </Link>
            ))}
        </div>
      </SheetContent>
    </Sheet>

    );
};
