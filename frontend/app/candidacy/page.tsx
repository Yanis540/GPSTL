/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client';

import React from 'react';
import { CardItem } from '@/app/candidacy/components/card-item'
import { useCandidacies } from "./hooks/use-candidacies";

function Page() {

    const { candidacies, isLoading, error } = useCandidacies();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading candidacies: {error.message}</div>;
    }

    return (
        <div className="flex flex-col gap-4">
            {candidacies?.map(candidacy => (
                <CardItem key={candidacy.id} candidacy={candidacy} />
            ))}
        </div>
    );
}

export default Page;
