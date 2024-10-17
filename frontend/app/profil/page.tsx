"use client";

import React, { useState } from 'react';
import { useProfil } from './use-profil';
import { StudentProfile } from './components/StudentProfile';
import { RecruiterProfile } from './components/RecruiterProfile';
import { Student, Recruiter } from './use-profil'; // Adjust the path to your types file
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Profile: React.FC = () => {
  const { user, saveUser } = useProfil();
  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    

// import { CircleUser, Menu, Package2, Search } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Checkbox } from "@/components/ui/checkbox"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// export const description =
//   "A settings page. The settings page has a sidebar navigation and a main content area. The main content area has a form to update the store name and a form to update the plugins directory. The sidebar navigation has links to general, security, integrations, support, organizations, and advanced settings."

// export function Dashboard() {
//   return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 ">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[180px_1fr]">
          <nav
            className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
          >
            <Link href="#" className="font-semibold text-black">
              General
            </Link>
            <Link href="#" className="text-black ">Security</Link>
            <Link href="#" className="text-black ">Integrations</Link>
            <Link href="#" className="text-black ">Support</Link>
            <Link href="#" className="text-black ">Organizations</Link>
            <Link href="#" className="text-black ">Advanced</Link>
          </nav>
        </div>
      </div>
 
    
    
    
    
    
    {/* Profile page */}
    
    {/* <div className="flex items-center justify-center min-h-screen bg-gray-100"> */}
      <div className="space-y-6 w-full max-w-6xl p-6 bg-white rounded-lg shadow-md">
        <div>
          <h3 className="text-lg font-medium text-black">Profil</h3>
        </div>
        <Separator />

        <div className="flex flex-col items-center space-y-6" style={{ padding: '20px' }}>
          {/* Affichage de la photo de l'utilisateur */}
          <div className="w-40 h-48 rounded-md flex items-center justify-center mb-4">
            {user?.photo ? (
              <img 
                src={user?.photo} 
                alt="Photo de l'utilisateur" 
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <span className="text-gray-500">Photo</span>
            )}
          </div>

          {/* Affichage du profil en fonction du type d'utilisateur */}
          {user?.role === 'STUDENT' ? (
            <StudentProfile
              student={user as Student}
              isEditing={isEditing}
              saveUser={saveUser}
              setIsEditing={setIsEditing}
            />
          ) : user?.role === 'RECRUITER' ? (
            <RecruiterProfile
              recruiter={user as Recruiter}
              isEditing={isEditing}
              saveUser={saveUser}
              setIsEditing={setIsEditing}
            />
          ) : (
            <div>Profil utilisateur non supporté</div>
          )}
  
          {!isEditing && (
          <Button className="mt-3 mx-auto block" onClick={() => setIsEditing(true)}>
            Modifier le Profil
          </Button>
          )}

        </div>
      </div>
    </div>
  );
};

export default Profile;
