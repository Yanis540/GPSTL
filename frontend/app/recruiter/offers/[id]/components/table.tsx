import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { TableCell, TableRow, TableHeader, TableHead } from '@/components/ui/table';
import { MoreHorizontal } from 'lucide-react';
import React, { useState } from 'react';
import { CheckCircledIcon, CrossCircledIcon, StopwatchIcon } from "@radix-ui/react-icons";
import { mockCandidacies } from '../data/mockCandidacies';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import * as RadioGroup from '@radix-ui/react-radio-group';


import {Chat} from "@/app/recruiter/offers/[id]/components/Chat";
import { useQueryClient } from 'react-query';
import { useParams } from 'next/navigation';
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

export function TabHeader({ selectAll, selectedCandidates, candidacies }:{
    selectAll: (value: boolean) => void;
    selectedCandidates: number[];
    candidacies?: Candidacy[];
}) {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className="w-[50px]">
                    <input
                        type="checkbox"
                        checked={selectedCandidates.length === candidacies?.length}
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

export function TabRow({ selectedCandidates, setSelectedCandidates, candidacies }:{
    selectedCandidates: number[];
    setSelectedCandidates: React.Dispatch<React.SetStateAction<number[]>>;
    candidacies ?: Candidacy[];
}) {
    const toggleCandidateSelection = (id: number) => {
        setSelectedCandidates((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((candidateId) => candidateId !== id)
                : [...prevSelected, id]
        );
    };
    const getCurrentDate = () => new Date().toISOString().split('T')[0];

    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openProfileDialog, setOpenProfileDialog] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<
        "PENDING" | "ACCEPTED" | "REFUSED"
    >("PENDING");
    const [currentCandidacy, setCurrentCandidacy] = useState<Candidacy | null>(
        null
    );
    const [openBulkEditDialog, setOpenBulkEditDialog] = useState(false);

    const handleStatusChange = (newStatus: 'PENDING' | 'ACCEPTED' | 'REFUSED') => {
        setSelectedStatus(newStatus);
    };
    const queryClient = useQueryClient();
    const params = useParams();
    const offerId = params.id as string ;
    const handleSaveEditStatus = () => {
        if (currentCandidacy) {
            const stale_data= queryClient.getQueryData(["candidacies", "offer"])
            queryClient?.setQueryData(["candidacies", "offer"],(prev:any)=> {
                if(!prev&& ! stale_data) 
                    return prev; 

                const candidacies = [...(prev??stale_data).map((c:any)=>c.id!=currentCandidacy.id?c : ({
                    ...c,
                    status :selectedStatus,  
                    dateOfResponse: getCurrentDate(),
                }))] 
                return candidacies; 
            });
        }
        setOpenEditDialog(false);
    };

    const handleBulkSaveStatus = () => {
        const stale_data= queryClient.getQueryData(["candidacies", "offer"])
        queryClient?.setQueryData(["candidacies", "offer"],(prev:any)=> {
            if(!prev && ! stale_data ) 
                return prev
            const candidacies = [...(prev??stale_data).map((c:any)=>!selectedCandidates.includes(c.id)?c: ({
                ...c,
                status :selectedStatus,  
                dateOfResponse: getCurrentDate(),
            }))] 
            return candidacies; 
        });
        setOpenBulkEditDialog(false);
        setSelectedCandidates([]);
    };

    const openEditDialogHandler = (candidacy: Candidacy) => {
        setCurrentCandidacy(candidacy);
        setSelectedStatus(candidacy.status);
        setOpenEditDialog(true);
    };

    const openProfileDialogHandler = (candidacy: Candidacy) => {
        setCurrentCandidacy(candidacy);
        setOpenProfileDialog(true);
    };

    const [openChatDialog, setOpenChatDialog] = useState(false);

    const openChatDialogHandler = (candidacy: Candidacy) => {
        setCurrentCandidacy(candidacy);
        setOpenChatDialog(true);
    };


    return (
        <>
            <Button onClick={() => setOpenBulkEditDialog(true)} disabled={selectedCandidates.length === 0}>
                Change Status for Selected
            </Button>
            {candidacies?.map((candidacy) => {
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
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                alt="Student photo"
                                className="aspect-square rounded-md object-cover"
                                height="48"
                                width="48"
                                src={candidacy.photo??mockCandidacies[1].studentPhoto}
                            />
                        </TableCell>
                        <TableCell className="font-medium">{candidacy.firstName +" "+ candidacy.lastName}</TableCell>
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
                                    <DropdownMenuItem onClick={() => openEditDialogHandler(candidacy)}>
                                        Edit Decision
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => openProfileDialogHandler(candidacy)}>
                                        View Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => openChatDialogHandler(candidacy)}>
                                        Chat
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                );
            })}
             {/* Edit Dialog */}
             <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Candidacy Status</DialogTitle>
                    </DialogHeader>
                    {currentCandidacy && (
                        <div className="mb-4">
                            <p className="text-sm">Edit the status for {currentCandidacy.firstName +" "+currentCandidacy.lastName} :</p>
                            <RadioGroup.Root
                                className="space-y-4 mt-4"
                                value={selectedStatus}
                                onValueChange={handleStatusChange}
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroup.Item
                                        value="PENDING"
                                        id="pending-edit"
                                        className="relative w-4 h-4 rounded-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                                    >
                                        {selectedStatus === 'PENDING' && (
                                            <div className="absolute inset-0 w-2 h-2 m-auto bg-yellow-400 rounded-full" />
                                        )}
                                    </RadioGroup.Item>
                                    <label htmlFor="pending-edit">Pending</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroup.Item
                                        value="ACCEPTED"
                                        id="accepted-edit"
                                        className="relative w-4 h-4 rounded-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
                                    >
                                        {selectedStatus === 'ACCEPTED' && (
                                            <div className="absolute inset-0 w-2 h-2 m-auto bg-green-800 rounded-full" />
                                        )}
                                    </RadioGroup.Item>
                                    <label htmlFor="accepted-edit">Accepted</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroup.Item
                                        value="REFUSED"
                                        id="refused-edit"
                                        className="relative w-4 h-4 rounded-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800"
                                    >
                                        {selectedStatus === 'REFUSED' && (
                                            <div className="absolute inset-0 w-2 h-2 m-auto bg-red-800 rounded-full" />
                                        )}
                                    </RadioGroup.Item>
                                    <label htmlFor="refused-edit">Refused</label>
                                </div>
                            </RadioGroup.Root>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="secondary" onClick={() => setOpenEditDialog(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" onClick={handleSaveEditStatus}>
                            Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Status Dialog */}
            <Dialog open={openBulkEditDialog} onOpenChange={setOpenBulkEditDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Status for Selected Candidates</DialogTitle>
                    </DialogHeader>
                    <div className="mb-4">
                        <p className="text-sm">Select the new status for the selected candidates:</p>
                        <RadioGroup.Root
                            className="space-y-4 mt-4"
                            value={selectedStatus}
                            onValueChange={handleStatusChange}
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroup.Item
                                    value="PENDING"
                                    id="pending-bulk"
                                    className="relative w-4 h-4 rounded-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                                >
                                    {selectedStatus === 'PENDING' && (
                                        <div className="absolute inset-0 w-2 h-2 m-auto bg-yellow-400 rounded-full" />
                                    )}
                                </RadioGroup.Item>
                                <label htmlFor="pending-bulk">Pending</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroup.Item
                                    value="ACCEPTED"
                                    id="accepted-bulk"
                                    className="relative w-4 h-4 rounded-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
                                >
                                    {selectedStatus === 'ACCEPTED' && (
                                        <div className="absolute inset-0 w-2 h-2 m-auto bg-green-800 rounded-full" />
                                    )}
                                </RadioGroup.Item>
                                <label htmlFor="accepted-bulk">Accepted</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroup.Item
                                    value="REFUSED"
                                    id="refused-bulk"
                                    className="relative w-4 h-4 rounded-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800"
                                >
                                    {selectedStatus === 'REFUSED' && (
                                        <div className="absolute inset-0 w-2 h-2 m-auto bg-red-800 rounded-full" />
                                    )}
                                </RadioGroup.Item>
                                <label htmlFor="refused-bulk">Refused</label>
                            </div>
                        </RadioGroup.Root>
                    </div>
                    <DialogFooter>
                        <Button variant="secondary" onClick={() => setOpenBulkEditDialog(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" onClick={handleBulkSaveStatus}>
                            Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Profile Dialog */}
            <Dialog open={openProfileDialog} onOpenChange={setOpenProfileDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{currentCandidacy?.firstName} Professional Profile</DialogTitle>
                    </DialogHeader>
                    {currentCandidacy && (
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    alt={`${currentCandidacy.firstName}'s photo`}
                                    className="w-24 h-24 rounded-full object-cover"
                                    src={currentCandidacy.photo??"https://github.com/shadcn.png"}
                                />
                                <div>
                                    <p className="text-lg font-semibold">{currentCandidacy.firstName +" "+currentCandidacy.lastName}</p>
                                    <p className="text-sm text-muted-foreground">
                                        Age: {mockCandidacies[1].profileDetails.age}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Grade: {mockCandidacies[1].profileDetails.grade}
                                    </p>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold">Contact Information</h3>
                                <p>Email: <a href={`mailto:${mockCandidacies[1].profileDetails.email}`} className="text-blue-500">{mockCandidacies[1].profileDetails.email}</a></p>
                                <p>Phone: <a href={`tel:${mockCandidacies[1].profileDetails.phone}`} className="text-blue-500">{mockCandidacies[1].profileDetails.phone}</a></p>
                                <p>Address: {mockCandidacies[1].profileDetails.address}</p>
                                <p>LinkedIn: <a href={mockCandidacies[1].profileDetails.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500">LinkedIn Profile</a></p>
                            </div>

                            {/* Education */}
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold">Education</h3>
                                <p>{mockCandidacies[1].profileDetails.education}</p>
                            </div>

                            {/* Experience */}
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold">Professional Experience</h3>
                                <p>{mockCandidacies[1].profileDetails.experience}</p>
                            </div>

                            {/* Skills */}
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold">Skills</h3>
                                <ul className="list-disc pl-5">
                                    {mockCandidacies[1].profileDetails.skills.map((skill, index) => (
                                        <li key={index} className="text-sm">{skill}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="secondary" onClick={() => setOpenProfileDialog(false)}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Chat Modal */}
            {openChatDialog && currentCandidacy && (
                <Chat
                    recruiterPhoto="https://github.com/shadcn.png"
                    studentPhoto={mockCandidacies[1].studentPhoto}
                    studentName={currentCandidacy.firstName +" "+ currentCandidacy.lastName}
                    onClose={() => setOpenChatDialog(false)}
                />
            )}
        </>
    );
}
