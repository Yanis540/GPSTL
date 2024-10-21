'use client'
import { cn } from '@/lib/utils';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import Account from './Account';
import { useAuth } from '@/context/store/use-auth';

import {Navigation, NavigationMobile} from './navigation.navbar';
import { usePathname } from 'next/navigation';
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface NavbarProps {

};

function Navbar({ }: NavbarProps) {
    const { user } = useAuth();
    const pathname = usePathname();
    return (
        <div className={cn("  z-50 top-0  inset-x-0 h-16 bg-background ",pathname!="/"&&"sticky")}>
            <header className={cn('relative flex flex-row items-center justify-between  h-full px-2 sm:px-16 md:px-8  transition-all duration-500 border-b-[1px] dark:border-primary py-2 mx-auto max-w-[1500px]',)}>
                <Link href="/" className="relative h-16 w-16">
                    <Image src="/assets/logo.png" fill className="w-full h-full" alt="logo" />
                </Link>
                <Navigation /> 
                <div className=" flex flex-row gap-x-2 md:gap-x-4  items-center justify-end">
                    <div className="flex flex-row gap-x-2 md:gap-x-4 items-center ">
                        <NavigationMobile /> 
                        {
                            !user && (
                                <Link href="/auth/sign-in">
                                    <Button className='text-background bg-primary hover:bg-background hover:text-primary border-[1px] border-primary'>Login</Button>
                                </Link>
                            )
                        }
                        {
                            !!user && (
                                <Account />
                            )
                        }
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Navbar;