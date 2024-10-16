'use client'
import React from 'react';
// import Link from "next/link"

import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import {
    Card,CardFooter, 
    CardContent,
    // CardDescription, 
    // CardHeader,
    // CardTitle,
  } from "@/components/ui/card"
// import { useSignIn } from '../hooks/use-sign-in';
// import Page from '../auth/sign-in/page';



// interface PageProps {
    
// };

// pages/profile.tsx

// import { Card, CardContent, CardFooter } from "@shadcn/ui/card";
// import { Typography } from "@shadcn/ui/typography";
// import { Button } from "@shadcn/ui/button";
// import Image from "next/image";


import {  Body2, H5 } from "@/components/ui/typography";
// import Image from "next/image";

interface User {
    id: number;
    photo: Uint8Array;
    firstname: string;
    lastname: string;
    email: string;
    birthdate: Date;
    role: string;
}

// const Page = ({ user }: { user: User }) => {
const Page = () => {
    // Créer un utilisateur en dur
    const user: User = {
        id: 1,
        photo: new Uint8Array(), // Vous pouvez ajouter des données binaires réelles ici
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        birthdate: new Date('1990-01-01'),
        role: 'Student'
    };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-full max-w-lg p-5 shadow-lg bg-white">
        {/* Photo de profil */}
        <div className="flex justify-center" style={{ color: 'black' }}>
          {/* <Image
            src={`data:image/jpeg;base64,${user.photo}`} // Photo sous forme de base64
            alt="Profile photo"
            width={150}
            height={150}
            className="rounded-full shadow-md"
          /> */}
          {" USER PHOTO "}
        </div>

        {/* Informations sur l'utilisateur */}
        <CardContent className="mt-5 space-y-4" style={{ color: 'black' }}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <H5 className="font-semibold">
                {user.firstname } {user.lastname}
              </H5>
              <Body2  className="text-gray-500">
                ID: {user.id}
              </Body2>
            </div>
            <div>
              <Body2>
                Email: {user.email}
              </Body2>
              <Body2 >
                Date de naissance: {new Date(user.birthdate).toLocaleDateString('fr-FR') }
              </Body2>
              <Body2>
                Rôle: {user.role }
              </Body2>
            </div>
          </div>
        </CardContent>

        {/* Bouton d'édition */}
        <CardFooter className="flex justify-end">
          <Button variant="outline" className="mt-3">
            Modifier le profil
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
