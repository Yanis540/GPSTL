/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React from 'react';

interface TabHeaderProps {

};

function TabHeader({ }: TabHeaderProps) {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">
                    Total Candidates
                </TableHead>
                <TableHead className="hidden md:table-cell">
                    Created at
                </TableHead>
                <TableHead>
                    <span className="sr-only">Actions</span>
                </TableHead>
            </TableRow>
        </TableHeader>
    );
};
interface TabRowProps {
    offer : RecruiterOfferData
}
function TabRow({ offer }: TabRowProps) {
    const router = useRouter();
    const handleRedirect = ()=>router.push(`/recruiter/offers/${offer.id}`)
    return (
        <TableRow>
            <TableCell className="hidden sm:table-cell">
                <Image
                    alt="Product image"
                    className="aspect-square rounded-md object-fit"
                    height="48"
                    src="https://companieslogo.com/img/orig/CAP.PA-9b4110b0.png?t=1720244491"
                    width="48"
                />
            </TableCell>
            <TableCell className="font-medium">
                Full stack web developper
            </TableCell>
            <TableCell>
                <Badge variant="outline">Active</Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
                25
            </TableCell>
            <TableCell className="hidden md:table-cell">
                2023-07-12 10:42 AM
            </TableCell>
            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                        >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <Link href="/recruiter/offers">
                            <DropdownMenuItem asChild>
                                <span>Recruitment</span>
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Close</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
};

export {
    TabHeader,
    TabRow
};
