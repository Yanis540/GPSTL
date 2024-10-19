import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { TableCell, TableRow, TableHeader, TableHead } from '@/components/ui/table';
import { MoreHorizontal } from 'lucide-react';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import * as RadioGroup from '@radix-ui/react-radio-group';

export function TabHeader({
                              selectAll,
                              isAllSelected,
                          }: {
    selectAll: (value: boolean) => void;
    isAllSelected: boolean;
}) {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className="w-[50px]">
                    <input
                        type="checkbox"
                        checked={isAllSelected}
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

interface Candidacy {
    id: number;
    studentName: string;
    status: 'PENDING' | 'ACCEPTED' | 'REFUSED';
    dateOfCandidacy: string;
    dateOfResponse: string | null;
    studentPhoto: string;
    profileDetails: ProfileDetails;
}

interface ProfileDetails {
    age: number;
    grade: string;
    email: string;
    phone: string;
    address: string;
    skills: string[];
    experience: string;
    education: string;
    linkedin: string;
    photo: string;
}

// Mock Candidacy Data
const mockCandidacies: Candidacy[] = [
    {
        id: 1,
        studentName: 'Alice Martin',
        status: 'PENDING',
        dateOfCandidacy: '2024-01-15',
        dateOfResponse: null,
        studentPhoto: 'https://randomuser.me/api/portraits/women/1.jpg',
        profileDetails: {
            age: 23,
            grade: 'Master\'s in Computer Science',
            email: 'alice.martin@example.com',
            phone: '+33 6 12 34 56 78',
            address: '123 Rue de Paris, 75001 Paris, France',
            skills: ['Java', 'Spring Boot', 'SQL', 'AWS'],
            experience: '2 years of full-stack development experience at a fintech startup.',
            education: "Master's in Computer Science, Sorbonne University, 2023",
            linkedin: 'https://linkedin.com/in/alicemartin',
            photo: 'https://randomuser.me/api/portraits/women/1.jpg',
        },
    },
    {
        id: 2,
        studentName: 'John Doe',
        status: 'ACCEPTED',
        dateOfCandidacy: '2024-01-10',
        dateOfResponse: '2024-01-20',
        studentPhoto: 'https://randomuser.me/api/portraits/men/2.jpg',
        profileDetails: {
            age: 25,
            grade: 'Bachelor\'s in Software Engineering',
            email: 'john.doe@example.com',
            phone: '+44 7 987 654 321',
            address: '456 Oxford Street, London, UK',
            skills: ['Python', 'Docker', 'Kubernetes', 'Linux'],
            experience: '1 year as a DevOps Engineer at a cloud computing company.',
            education: "Bachelor's in Software Engineering, University of London, 2022",
            linkedin: 'https://linkedin.com/in/johndoe',
            photo: 'https://randomuser.me/api/portraits/men/2.jpg',
        },
    },
];


export function TabRow({
                           selectedCandidates,
                           setSelectedCandidates,
                       }: {
    selectedCandidates: number[];
    setSelectedCandidates: React.Dispatch<React.SetStateAction<number[]>>;
}) {
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openProfileDialog, setOpenProfileDialog] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<'PENDING' | 'ACCEPTED' | 'REFUSED'>('PENDING');
    const [currentCandidacy, setCurrentCandidacy] = useState<Candidacy | null>(null);
    const [openBulkEditDialog, setOpenBulkEditDialog] = useState(false);
    const [candidacies, setCandidacies] = useState<Candidacy[]>(mockCandidacies);

    const handleStatusChange = (newStatus: 'PENDING' | 'ACCEPTED' | 'REFUSED') => {
        setSelectedStatus(newStatus);
    };

    const handleSaveEditStatus = () => {
        if (currentCandidacy) {
            setCandidacies((prevCandidacies) =>
                prevCandidacies.map((candidate) =>
                    candidate.id === currentCandidacy.id
                        ? { ...candidate, status: selectedStatus }
                        : candidate
                )
            );
        }
        setOpenEditDialog(false);
    };

    const handleBulkSaveStatus = () => {
        setCandidacies((prevCandidacies) =>
            prevCandidacies.map((candidate) =>
                selectedCandidates.includes(candidate.id)
                    ? { ...candidate, status: selectedStatus }
                    : candidate
            )
        );
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

    const toggleCandidateSelection = (id: number) => {
        setSelectedCandidates((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((candidateId) => candidateId !== id)
                : [...prevSelected, id]
        );
    };

    return (
        <>
            <Button onClick={() => setOpenBulkEditDialog(true)} disabled={selectedCandidates.length === 0}>
                Change Status for Selected
            </Button>

            {candidacies.map((candidacy) => (
                <TableRow key={candidacy.id}>
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
                                <DropdownMenuItem onClick={() => openEditDialogHandler(candidacy)}>
                                    Edit Decision
                                </DropdownMenuItem>

                                <DropdownMenuItem onClick={() => openProfileDialogHandler(candidacy)}>
                                    View Profile
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
            ))}

            {/* Edit Dialog */}
            <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Candidacy Status</DialogTitle>
                    </DialogHeader>
                    {currentCandidacy && (
                        <div className="mb-4">
                            <p className="text-sm">Edit the status for {currentCandidacy.studentName}:</p>
                            <RadioGroup.Root
                                className="space-y-4 mt-4"
                                value={selectedStatus}
                                onValueChange={handleStatusChange}
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroup.Item
                                        value="PENDING"
                                        id="pending-edit"
                                        className="w-4 h-4 rounded-full border border-gray-400"
                                    >
                                        <div className={`w-full h-full ${selectedStatus === 'PENDING' ? 'bg-yellow-400' : ''}`} />
                                    </RadioGroup.Item>
                                    <label htmlFor="pending-edit">Pending</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroup.Item
                                        value="ACCEPTED"
                                        id="accepted-edit"
                                        className="w-4 h-4 rounded-full border border-gray-400"
                                    >
                                        <div className={`w-full h-full ${selectedStatus === 'ACCEPTED' ? 'bg-green-800' : ''}`} />
                                    </RadioGroup.Item>
                                    <label htmlFor="accepted-edit">Accepted</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroup.Item
                                        value="REFUSED"
                                        id="refused-edit"
                                        className="w-4 h-4 rounded-full border border-gray-400"
                                    >
                                        <div className={`w-full h-full ${selectedStatus === 'REFUSED' ? 'bg-red-800' : ''}`} />
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

            {/* Bulk Edit Status Dialog */}
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
                                    className="w-4 h-4 rounded-full border border-gray-400"
                                >
                                    <div className={`w-full h-full ${selectedStatus === 'PENDING' ? 'bg-yellow-400' : ''}`} />
                                </RadioGroup.Item>
                                <label htmlFor="pending-bulk">Pending</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroup.Item
                                    value="ACCEPTED"
                                    id="accepted-bulk"
                                    className="w-4 h-4 rounded-full border border-gray-400"
                                >
                                    <div className={`w-full h-full ${selectedStatus === 'ACCEPTED' ? 'bg-green-800' : ''}`} />
                                </RadioGroup.Item>
                                <label htmlFor="accepted-bulk">Accepted</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroup.Item
                                    value="REFUSED"
                                    id="refused-bulk"
                                    className="w-4 h-4 rounded-full border border-gray-400"
                                >
                                    <div className={`w-full h-full ${selectedStatus === 'REFUSED' ? 'bg-red-800' : ''}`} />
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
                        <DialogTitle>{currentCandidacy?.studentName} Professional Profile</DialogTitle>
                    </DialogHeader>
                    {currentCandidacy && (
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <img
                                    alt={`${currentCandidacy.studentName}'s photo`}
                                    className="w-24 h-24 rounded-full object-cover"
                                    src={currentCandidacy.profileDetails.photo}
                                />
                                <div>
                                    <p className="text-lg font-semibold">{currentCandidacy.studentName}</p>
                                    <p className="text-sm text-muted-foreground">
                                        Age: {currentCandidacy.profileDetails.age}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Grade: {currentCandidacy.profileDetails.grade}
                                    </p>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold">Contact Information</h3>
                                <p>Email: <a href={`mailto:${currentCandidacy.profileDetails.email}`} className="text-blue-500">{currentCandidacy.profileDetails.email}</a></p>
                                <p>Phone: <a href={`tel:${currentCandidacy.profileDetails.phone}`} className="text-blue-500">{currentCandidacy.profileDetails.phone}</a></p>
                                <p>Address: {currentCandidacy.profileDetails.address}</p>
                                <p>LinkedIn: <a href={currentCandidacy.profileDetails.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500">LinkedIn Profile</a></p>
                            </div>

                            {/* Education */}
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold">Education</h3>
                                <p>{currentCandidacy.profileDetails.education}</p>
                            </div>

                            {/* Experience */}
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold">Professional Experience</h3>
                                <p>{currentCandidacy.profileDetails.experience}</p>
                            </div>

                            {/* Skills */}
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold">Skills</h3>
                                <ul className="list-disc pl-5">
                                    {currentCandidacy.profileDetails.skills.map((skill, index) => (
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
