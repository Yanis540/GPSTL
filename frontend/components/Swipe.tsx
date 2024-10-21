/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useSwipeable } from "react-swipeable";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Check, X } from "lucide-react";
import {useIgnoredOffer} from "@/app/student/hooks/use-ignored-offer";
import {useAddCandidacy} from "@/app/student/hooks/use-add-candidacy";
import {useAuth} from "@/context/store/use-auth";

interface OfferProps {
    offers: Offer[]; // Passer la candidature directement
}

export const Swipe: React.FC<OfferProps> = ({offers}) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentOffers, setCurrentOffers] = useState(offers);

    const { user } = useAuth();
    const token = user?.tokens?.access.token;

    // @ts-ignore
    const { ignoredOffer } = useIgnoredOffer(token);
    // @ts-ignore
    const { addCandidacy } = useAddCandidacy(token);

    const handleSwipe = (direction: string) => {
        const currentOffer = currentOffers[currentIndex];

        if (direction === 'left') {
            ignoredOffer(currentOffer.id);
        } else if (direction === 'right') {
            addCandidacy(currentOffer.id);
        }
        const updatedOffers = currentOffers.filter(offer => offer.id !== currentOffer.id);
        setCurrentOffers(updatedOffers);

        if (updatedOffers.length > 0) {
            const updateCurrentIndex = (currentIndex + 1) % updatedOffers.length;
            setCurrentIndex(updateCurrentIndex);
        } else {
            setCurrentIndex(0);
        }
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => handleSwipe('left'),
        onSwipedRight: () => handleSwipe('right'),
        trackMouse: true
    });

    return (
        <main className="flex-2 mx-auto bg-gpstl-white-color items-center justify-center min-h-screen bg-cover bg-center">
            {currentOffers.length > 0 ? (
                <Carousel className="max-w-md h-[600px] w-[600px]"> {/* Ajouter une hauteur fixe ici */}
                    <CarouselContent>
                        {currentOffers.map((offer, index) => (
                            <CarouselItem
                                key={offer.id}
                                className=""
                                style={{
                                    transition: 'opacity 0.7s ease-in-out, visibility 0.7s ease-in-out',
                                    opacity: index === currentIndex ? 1 : 0,
                                    visibility: index === currentIndex ? 'visible' : 'hidden',
                                    position: index === currentIndex ? 'relative' : 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    pointerEvents: index === currentIndex ? 'auto' : 'none',
                                    height: '100%'
                                }}
                            >
                                <div className="p-1 h-full" {...handlers}>
                                    <Card className="w-full h-full flex flex-col justify-between">
                                        <CardContent className="p-6 flex flex-col items-center">
                                            <div className="w-32 h-32 relative mb-4">
                                                <Image
                                                    src={!offer.recruiter.photo ? "" : offer.recruiter.photo}
                                                    alt={`TechCorp.png logo`}
                                                    fill
                                                    style={{ objectFit: 'contain' }}
                                                />
                                            </div>
                                            <h3 className="text-lg font-semibold text-center mb-2">{offer.name}</h3>
                                            <p className="text-center mb-4">{offer.description}</p>
                                            <div className="w-full mb-4">
                                                <h4 className="font-semibold mb-1">Compétences requises :</h4>
                                                <p>C++, React, Node.js</p>
                                            </div>
                                            <div className="w-full mb-4">
                                                <h4 className="font-semibold mb-1">Formation :</h4>
                                                <p>Bac+5 in Computer Science</p>
                                            </div>
                                            <div className="w-full">
                                                <h4 className="font-semibold mb-1">Localisation :</h4>
                                                <p>Paris, France</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full rounded-full"
                        onClick={() => handleSwipe('left')}
                    >
                        <X className="h-8 w-8 hover:bg-red-500 hover:text-gpstl-white-color text-red-500 border-2 border-gray-300 transition ease-in-out delay-150 duration-300 rounded-full" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full rounded-full"
                        onClick={() => handleSwipe('right')}
                    >
                        <Check className="h-8 w-8 hover:bg-green-500 hover:text-gpstl-white-color text-green-500 transition ease-in-out delay-150 duration-300 border-2 border-gray-300 rounded-full" />
                    </Button>
                </Carousel>
            ) : (
                <div className="text-center text-xl font-bold">
                    Aucune offre disponible pour le moment
                </div>
            )}
        </main>
    );

}