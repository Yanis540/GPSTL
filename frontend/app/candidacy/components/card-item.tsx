/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from 'react';
import {
    CheckCircledIcon,
    CrossCircledIcon,
    StopwatchIcon,
    RocketIcon,
    ClockIcon,
    CalendarIcon,
} from "@radix-ui/react-icons";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Container} from "@/app/candidacy/components/container"
import {format} from "date-fns";
import {fr} from "date-fns/locale";

interface CardItemProps {
    candidacy: Candidacy; // Passer la candidature directement
}

interface IconProps {
    className?: string; // Définir les props que nous allons passer
}

// Définir les icônes
const icons: Record<string, {
    icon: React.FC<IconProps>;
    status: string;
    color: string; // Ajouter un champ pour la couleur
}> = {
    PENDING: {
        icon: StopwatchIcon,
        status: "Pending",
        color: "text-orange-500", // Couleur orange pour Pending
    },
    REFUSED: {
        icon: CrossCircledIcon,
        status: "Refused",
        color: "text-red-500", // Couleur rouge pour Refused
    },
    ACCEPTED: {
        icon: CheckCircledIcon,
        status: "Accepted",
        color: "text-green-500", // Couleur verte pour Accepted
    },
};

const formatDate = (isoDate: string) => {
    return format(new Date(isoDate), "dd MMMM yyyy", {locale: fr});
};

export const CardItem: React.FC<CardItemProps> = ({candidacy}) => (
    <Container>
        <Card className="max-w-sm w-full h-60 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
                <div className="space-y-1">
                    <CardTitle>{candidacy.offer?.name}</CardTitle>
                    <CardDescription>
                        {candidacy.offer?.description}
                    </CardDescription>
                </div>
                <div className="flex items-center space-x-1 rounded-md text-secondary-foreground">
                    <span className={`flex items-center ${icons[candidacy.status]?.color}`}>
                        {candidacy.status && (
                            React.createElement(icons[candidacy.status].icon, {
                                className: "mr-1 h-4 w-4"
                            })
                        )}
                        <span>{icons[candidacy.status]?.status}</span>
                    </span>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                        <ClockIcon className="mr-2 h-4 w-4 text-sky-400"/>
                        <span>Rythme : {candidacy.offer?.rhythm}</span>
                    </div>

                    <div className="flex items-center">
                        <RocketIcon className="mr-2 h-4 w-4 text-amber-500"/>
                        <span>Salaire : {candidacy.offer?.salary} €</span>
                    </div>

                    <div className="flex items-center">
                        <CalendarIcon className="mr-2 h-4 w-4 text-gray-500"/>
                        <span>Date de candidature : {formatDate(candidacy.dateOfCandidacy)}</span>
                    </div>
                </div>
            </CardContent>

        </Card>
    </Container>
);