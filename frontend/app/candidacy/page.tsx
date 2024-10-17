/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client';

import React from 'react';
import { CardItem } from '@/app/candidacy/components/card-item'
import { useCandidacies } from "./hooks/use-candidacies";
import {useAuth} from "@/context/store/use-auth";

function Page() {

    const { user } = useAuth();
    const token = user?.tokens?.access.token;

    if (!token) {
        throw new Error('Token not found');
    }

    const { candidacies, isLoading, error } = useCandidacies(token);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading candidacies: {error.message}</div>;
    }

    return (
        <div className="flex flex-col gap-4 mt-4">
            {candidacies?.map(candidacy => (
                <CardItem key={candidacy.id} candidacy={candidacy} />
            ))}
        </div>
    );
}

export default Page;
