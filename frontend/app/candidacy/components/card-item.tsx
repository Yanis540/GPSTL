/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from 'react';
import {
    CheckCircledIcon,
    CrossCircledIcon,
    StopwatchIcon,
} from "@radix-ui/react-icons";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Container } from "@/app/candidacy/components/container"
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
    return format(new Date(isoDate), "dd MMMM yyyy", { locale: fr });
};

export const CardItem: React.FC<CardItemProps> = ({ candidacy }) => (
    <Container>
        <Card className="max-w-sm w-full h-60"> {/* Fixed width and height */}
            <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
                <div className="space-y-1">
                    <CardTitle>{candidacy.offer?.name}</CardTitle>
                    <CardDescription>{candidacy.offer?.description}</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                        {candidacy.status && (
                            React.createElement(icons[candidacy.status].icon, {
                                className: `mr-1 h-3 w-3 fill-current ${icons[candidacy.status].color}` // Utiliser la couleur définie
                            })
                        )}
                        {icons[candidacy.status].status}
                    </div>
                    <div className="flex items-center">
                         <span style={{fontSize: '14px', marginRight: '8px'}}>€</span>
                        {candidacy.offer?.salary}
                    </div>
                    <div>{formatDate(candidacy.dateOfCandidacy)}</div>
                </div>
            </CardContent>
        </Card>
    </Container>
);