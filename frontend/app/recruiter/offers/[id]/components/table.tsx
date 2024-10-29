import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { TableCell, TableRow, TableHeader, TableHead } from '@/components/ui/table';
import { MoreHorizontal } from 'lucide-react';
import React from 'react';
import { CheckCircledIcon, CrossCircledIcon, StopwatchIcon } from "@radix-ui/react-icons";

function getStatusDetails(status: string) {
    switch (status) {
        case "PENDING":
            return { icon: StopwatchIcon, color: "text-yellow-500", label: "Pending" };
        case "ACCEPTED":
            return { icon: CheckCircledIcon, color: "text-green-500", label: "Accepted" };
        case "REFUSED":
            return { icon: CrossCircledIcon, color: "text-red-500", label: "Refused" };
        default:
            return { icon: StopwatchIcon, color: "text-gray-500", label: "Unknown" };
    }
}

export function TabHeader({ selectAll, selectedCandidates, candidacies }) {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className="w-[50px]">
                    <input
                        type="checkbox"
                        checked={selectedCandidates.length === candidacies.length}
                        onChange={(e) => selectAll(e.target.checked)}
                        className="cursor-pointer"
                    />
                </TableHead>
                <TableHead className="hidden w-[100px] sm:table-cell">Image</TableHead>
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

export function TabRow({ selectedCandidates, setSelectedCandidates, candidacies }) {
    const toggleCandidateSelection = (id: number) => {
        setSelectedCandidates((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((candidateId) => candidateId !== id)
                : [...prevSelected, id]
        );
    };

    return (
        <>
            {candidacies.map((candidacy) => {
                const { icon: StatusIcon, color, label } = getStatusDetails(candidacy.status);
                return (
                    <TableRow key={candidacy.id} className="hover:bg-green-950 transition duration-150">
                        <TableCell className="w-[50px]">
                            <input
                                type="checkbox"
                                checked={selectedCandidates.includes(candidacy.id)}
                                onChange={() => toggleCandidateSelection(candidacy.id)}
                                className="cursor-pointer"
                            />
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                            <img
                                alt="Student photo"
                                className="aspect-square rounded-md object-cover"
                                height="48"
                                width="48"
                                src={candidacy.studentPhoto}
                            />
                        </TableCell>
                        <TableCell className="font-medium">{candidacy.studentName}</TableCell>
                        <TableCell>
                            <span className={`flex items-center space-x-1 ${color}`}>
                                <StatusIcon className="w-4 h-4" />
                                <span>{label}</span>
                            </span>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{candidacy.dateOfCandidacy}</TableCell>
                        <TableCell className="hidden md:table-cell">{candidacy.dateOfResponse || "N/A"}</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem>Edit Decision</DropdownMenuItem>
                                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                                    <DropdownMenuItem>Chat</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                );
            })}
        </>
    );
}
