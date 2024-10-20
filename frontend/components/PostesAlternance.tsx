/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useSwipeable } from "react-swipeable";
import { Button } from "@/components/ui/button";
import {jobs} from "@/mockData/posteEntrepriseMock"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    // CarouselNext,
    // CarouselPrevious,
} from "@/components/ui/carousel";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Check, X } from "lucide-react";


export default function PostesAlternance() {
    // console.log('currently working path' + process.cwd());
    const [currentIndex, setCurrentIndex] = useState(0);
    const [, setInteresses] = useState([]);

    const handleSwipe = (direction: string) => {
        if (direction === 'left') {
            console.log('Pas interesse :', jobs[currentIndex].company);
        } else {
            console.log('Instresse :', jobs[currentIndex].company);
            // @ts-expect-error
            setInteresses(prev => [...prev, jobs[currentIndex]]);
        }

        // Move to the next job
        setCurrentIndex((prevIndex) => (prevIndex + 1) % jobs.length);
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => handleSwipe('left'),
        onSwipedRight: () => handleSwipe('right'),
        trackMouse: true
    });

    return (
        <main
            className="flex-2  mx-auto bg-gpstl-white-color items-center justify-center min-h-screen bg-cover bg-center"

        >
            <Carousel className="w-full max-w-md">
                <CarouselContent
                    // className="flex transition-transform duration-100 ease-in-out"
                >
                    {jobs.map((job, index) => (
                        <CarouselItem key={job.id}
                                      className=""
                                      style=
                                          {{
                                              transition: 'opacity 0.7s ease-in-out, visibility 0.7s ease-in-out',
                                              opacity: index === currentIndex ? 1 : 0,
                                              visibility: index === currentIndex ? 'visible' : 'hidden',
                                              position: index === currentIndex ? 'relative' : 'absolute',
                                              top: 0,
                                              left: 0,
                                              width: '100%',
                                              pointerEvents: index === currentIndex ? 'auto' : 'none',
                                            }}>
                            <div className="p-1" {...handlers}>
                                <Card className="w-full">
                                    <CardContent className="p-6 flex flex-col items-center">
                                        <div className="w-32 h-32 relative mb-4">
                                            <Image
                                                src={job.logo}
                                                alt={`${job.company} logo`}
                                                fill
                                                style={{objectFit: 'contain'}}
                                            />
                                        </div>
                                        <h2 className="text-xl font-bold text-center mb-2">{job.company}</h2>
                                        <h3 className="text-lg font-semibold text-center mb-2">{job.position}</h3>
                                        <p className="text-center mb-4">{job.description}</p>
                                        <div className="w-full mb-4">
                                            <h4 className="font-semibold mb-1">Compétences requises :</h4>
                                            <p>{job.skills.join(", ")}</p>
                                        </div>
                                        <div className="w-full mb-4">
                                            <h4 className="font-semibold mb-1">Formation :</h4>
                                            <p>{job.education}</p>
                                        </div>
                                        <div className="w-full mb-4">
                                            <h4 className="font-semibold mb-1">Expérience :</h4>
                                            <p>{job.experience}</p>
                                        </div>
                                        <div className="w-full">
                                            <h4 className="font-semibold mb-1">Localisation :</h4>
                                            <p>{job.location}</p>
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
                    <X className="h-8 w-8 hover:bg-red-500 hover:text-gpstl-white-color text-red-500 border-2 border-gray-300 transition ease-in-out  delay-150 duration-300  rounded-full" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full rounded-full"
                    onClick={() => handleSwipe('right')}
                >
                    <Check className="h-8 w-8  hover:bg-green-500 hover:text-gpstl-white-color text-green-500 transition ease-in-out  delay-150 duration-300 border-2 border-gray-300  rounded-full" 
                            
                    />

                </Button>
            </Carousel>
        </main>
    );
}