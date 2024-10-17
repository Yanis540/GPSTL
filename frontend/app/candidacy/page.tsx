'use client';

import React, { useState } from 'react';
import { CardItem } from '@/app/candidacy/components/card-item';
import { useCandidacies } from "./hooks/use-candidacies";
import { useAuth } from "@/context/store/use-auth";
import { Input } from "@/components/ui/input"; // Import de l'Input ShadCN
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Import de Select ShadCN

function Page() {
    const { user } = useAuth();
    const token = user?.tokens?.access.token;

    if (!token) {
        throw new Error('Token not found');
    }

    const { candidacies, isLoading, error } = useCandidacies(token);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    if (isLoading) {
        return <div className="flex justify-center items-center gap-4 mb-6">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center gap-4 mb-6">Error loading candidacies: {error.message}</div>;
    }

    // Filtrer les candidatures en fonction de la recherche et du statut
    const filteredCandidacies = candidacies?.filter(candidacy => {
        const matchesSearch = candidacy.offer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            candidacy.offer?.description?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = (statusFilter === "ALL" || statusFilter === "") ? true : candidacy.status === statusFilter;

        return matchesSearch && matchesStatus;
    });


    return (
        <div className="flex flex-col gap-4 mt-4">
            {/* Barre de recherche avec le composant Input de ShadCN */}
            <div className="flex justify-center items-center gap-4 mb-6">
                <Input
                    type="text"
                    placeholder="Recherche..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-[250px]" // Limite la largeur de l'input
                />
                <Select onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filtrer par statut"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">Tous les statuts</SelectItem>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="ACCEPTED">Accepted</SelectItem>
                        <SelectItem value="REFUSED">Refused</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {/* Liste des candidatures filtrées */}
            {filteredCandidacies?.length ? (
                filteredCandidacies.map(candidacy => (
                    <CardItem key={candidacy.id} candidacy={candidacy}/>
                ))
            ) : (
                <div className="flex justify-center items-center gap-4 mb-6">Aucune candidature trouvée</div>
            )}
        </div>
    );
}

export default Page;
