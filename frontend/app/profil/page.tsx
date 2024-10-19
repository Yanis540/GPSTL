"use client";

import React, { useEffect, useState } from 'react';
import { useProfil } from './use-profil';
import { StudentProfile } from './components/StudentProfile';
import { RecruiterProfile } from './components/RecruiterProfile';
import { UserProfile } from './components/UserProfile';
import { Student, Recruiter, User } from './use-profil'; // Adjust the path to your types file
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuth } from '@/context/store/use-auth';

const Profile: React.FC = () => {
  const { fullUser, setFullUser, saveUser } = useProfil();
  const {user,set_user} = useAuth();
  const updateUser = (data?:Partial<User>)=>{
    set_user({...user,...data,tokens:user?.tokens}); 
  } 
  const updateFullUser = (data?:Partial<User>)=>{
    setFullUser({...fullUser,...data,tokens:user?.tokens}); 
  }
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 ">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[180px_1fr]">
          <nav
            className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
          >
            <Link href="#" className="font-semibold ">
              General
            </Link>
            <Link href="#" className=" ">Security</Link>
            <Link href="#" className=" ">Integrations</Link>
            <Link href="#" className=" ">Support</Link>
            <Link href="#" className=" ">Organizations</Link>
            <Link href="#" className=" ">Advanced</Link>
          </nav>
        </div>
      </div>
 
    {/* <div className="flex items-center justify-center min-h-screen bg-gray-100"> */}
      <div className="space-y-6 w-full max-w-6xl p-6 rounded-lg shadow-md">
        <div>
          <h3 className="text-lg font-medium ">Profil</h3>
        </div>
        <Separator />
        <div className="items-center w-full">
        <div className="flex  items-center space-x-6 w-full " style={{ padding: '20px' }}>
            {/* Affichage de la photo de l'utilisateur */}
            <div className="w-40 h-48 rounded-md flex items-center justify-center">
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
            <UserProfile 
              user={fullUser as User}
              isEditing={isEditing}
              updateUser={updateFullUser}
              setIsEditing={setIsEditing}
              isUpdating={isUpdating}
              />
            </div>
            {/* Affichage du profil en fonction du type d'utilisateur */}
            {user?.role === 'STUDENT' ? (
              <StudentProfile
                user={fullUser as Student}
                isEditing={isEditing}
                updateUser={updateFullUser}
                setIsEditing={setIsEditing}
                saveUser={saveUser}
              />
            ) : user?.role === 'RECRUITER' ? (
              <RecruiterProfile
                recruiter={fullUser as Recruiter}
                isEditing={isEditing}
                updateUser={updateFullUser}
                setIsEditing={setIsEditing}
                saveUser={saveUser}
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
