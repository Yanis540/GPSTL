import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal } from 'lucide-react';
import React, { useState } from 'react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import * as RadioGroup from '@radix-ui/react-radio-group';

interface Candidacy {
    id: number;
    studentName: string;
    status: 'PENDING' | 'ACCEPTED' | 'REFUSED';
    dateOfCandidacy: string;
    dateOfResponse: string | null;
    studentPhoto: string;
}

// Données fictives pour les candidatures
const mockCandidacies: Candidacy[] = [
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
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<'PENDING' | 'ACCEPTED' | 'REFUSED'>('PENDING');
    const [currentCandidacy, setCurrentCandidacy] = useState<Candidacy | null>(null);

    const handleStatusChange = (newStatus: 'PENDING' | 'ACCEPTED' | 'REFUSED') => {
        setSelectedStatus(newStatus);
    };

    const handleSaveStatus = () => {
        if (currentCandidacy) {
            currentCandidacy.status = selectedStatus;
            setOpenDialog(false);
        }
    };

    const openEditDialog = (candidacy: Candidacy) => {
        setCurrentCandidacy(candidacy);
        setSelectedStatus(candidacy.status);
        setOpenDialog(true);
    };

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
                                <DropdownMenuItem onClick={() => openEditDialog(candidacy)}>
                                    Edit Decision
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Dialog Component */}
                        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit Decision for {currentCandidacy?.studentName}</DialogTitle>
                                </DialogHeader>
                                <div className="mb-4">
                                    <p className="text-sm">Select the new status for this candidacy:</p>
                                    <RadioGroup.Root
                                        className="space-y-4 mt-4"
                                        value={selectedStatus}
                                        onValueChange={handleStatusChange}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroup.Item
                                                value="PENDING"
                                                id="pending"
                                                className="w-4 h-4 rounded-full border border-gray-400"
                                            >
                                                <div className={`w-full h-full ${selectedStatus === 'PENDING' ? 'bg-yellow-400' : ''}`} />
                                            </RadioGroup.Item>
                                            <label htmlFor="pending">Pending</label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroup.Item
                                                value="ACCEPTED"
                                                id="accepted"
                                                className="w-4 h-4 rounded-full border border-gray-400"
                                            >
                                                <div className={`w-full h-full ${selectedStatus === 'ACCEPTED' ? 'bg-green-800' : ''}`} />
                                            </RadioGroup.Item>
                                            <label htmlFor="accepted">Accepted</label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroup.Item
                                                value="REFUSED"
                                                id="refused"
                                                className="w-4 h-4 rounded-full border border-gray-400"
                                            >
                                                <div className={`w-full h-full ${selectedStatus === 'REFUSED' ? 'bg-red-800' : ''}`} />
                                            </RadioGroup.Item>
                                            <label htmlFor="refused">Refused</label>
                                        </div>
                                    </RadioGroup.Root>

                                </div>
                                <DialogFooter>
                                    <Button variant="secondary" onClick={() => setOpenDialog(false)}>Cancel</Button>
                                    <Button type="submit" onClick={handleSaveStatus}>Save</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
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