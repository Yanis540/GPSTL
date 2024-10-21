'use client';

import {useAuth} from "@/context/store/use-auth";
import React from "react";
import {Swipe} from "@/components/Swipe";
import {useAllOffers} from "@/app/student/hooks/use-all-offers";

function Page() {
    const { user } = useAuth();
    const token = user?.tokens?.access.token;

    const { offers, isLoading, error } = useAllOffers(token);

    if (isLoading) {
        return <div className="flex justify-center items-center gap-4 mb-6">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center gap-4 mb-6">Error loading offers: {error.message}</div>;
    }

    return (
        <div className="flex flex-col gap-4 mt-4">
            <Swipe offers={offers}/>
        </div>
    );
}

export default Page;