import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal } from 'lucide-react';
import React from 'react';
import Link from 'next/link';

// Données fictives pour les candidatures
const mockCandidacies = [
    {
        id: 1,
        studentName: 'Alice Martin',
        status: 'PENDING',
        dateOfCandidacy: '2024-01-15 09:00',
        dateOfResponse: null,
        studentPhoto: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
        id: 2,
        studentName: 'John Doe',
        status: 'ACCEPTED',
        dateOfCandidacy: '2024-01-10 14:30',
        dateOfResponse: '2024-01-20 10:00',
        studentPhoto: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
        id: 3,
        studentName: 'Emma Dupont',
        status: 'REFUSED',
        dateOfCandidacy: '2024-01-12 16:00',
        dateOfResponse: '2024-01-18 12:00',
        studentPhoto: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
];

export function TabHeader() {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Date of Candidacy</TableHead>
                <TableHead className="hidden md:table-cell">Date of Response</TableHead>
                <TableHead>
                    <span className="sr-only">Actions</span>
                </TableHead>
            </TableRow>
        </TableHeader>
    );
}

export function TabRow() {
    return (
        <>
            {mockCandidacies.map((candidacy) => (
                <TableRow key={candidacy.id}>
                    <TableCell className="hidden sm:table-cell">
                        <img
                            alt="Student photo"
                            className="aspect-square rounded-md object-fit"
                            height="48"
                            width="48"
                            src={candidacy.studentPhoto}
                        />
                    </TableCell>
                    <TableCell className="font-medium">{candidacy.studentName}</TableCell>
                    <TableCell>
                        <Badge variant={getBadgeVariant(candidacy.status)}>{candidacy.status}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{candidacy.dateOfCandidacy}</TableCell>
                    <TableCell className="hidden md:table-cell">{candidacy.dateOfResponse || 'N/A'}</TableCell>
                    <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <Link href="/recruiter/offers">
                                    <DropdownMenuItem asChild>
                                        <span>View Profile</span>
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem>Edit Decision</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
}

function getBadgeVariant(status: string) {
    switch (status) {
        case 'PENDING':
            return 'outline';
        case 'ACCEPTED':
            return 'default';
        case 'REFUSED':
            return 'destructive';
        default:
            return 'outline';
    }
}