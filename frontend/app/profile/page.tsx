"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useProfile } from './use-profile'; // Importez le hook

export default function SettingsProfilePage() {
  const { user, saveUser } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    // Sauvegarde des données dans le service
    saveUser({ username: user?.username, school: user?.school, bio: user?.bio });
    setIsEditing(false);
  };

  if (!user) {
    return <div>Chargement...</div>; // Gérer l'état de chargement
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="space-y-6 w-full max-w-6xl p-6 bg-white rounded-lg shadow-md">
        <div>
          <h3 className="text-lg font-medium text-black">Profile</h3>
        </div>
        <Separator />

        <div className="flex flex-col items-center space-y-6" style={{ padding: '20px' }}>
          {/* Placeholder for user photo */}
          <div className="w-32 h-40 border-2 border-black rounded-md flex items-center justify-center mb-4">
            <span className="text-gray-500">Photo</span>
          </div>

          {/* User information */}
          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4">
              <input 
                type="text" 
                defaultValue={user.username} 
                placeholder="Nom" 
                className="border p-2 w-full" 
                onChange={(e) => saveUser({ ...user, username: e.target.value })} 
              />
              <input 
                type="text" 
                defaultValue={user.school} 
                placeholder="École" 
                className="border p-2 w-full" 
                onChange={(e) => saveUser({ ...user, school: e.target.value })} 
              />
              <textarea 
                defaultValue={user.bio} 
                placeholder="Description" 
                className="border p-2 w-full h-32 resize-none" 
                onChange={(e) => saveUser({ ...user, bio: e.target.value })} 
              />
              <div className="flex justify-between">
                <Button type="button" onClick={() => setIsEditing(false)}>Annuler</Button>
                <Button type="submit">Sauvegarder</Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4 text-center w-full text-xl">
              <div>
                <h5 className="font-semibold text-black">{user.username}</h5>
              </div>
              <div>
                <p>Contactez-moi : {user.email}</p>
              </div>
              <div>
                <p className="break-words" style={{ maxWidth: '90%', marginLeft: '50px'}}>
                  {user.bio}
                </p>
              </div>
              <div>
                <p>{new Date(user.birthdate).toLocaleDateString('fr-FR')}</p>
              </div>
              <div>
                <p>{user.role} à {user.school}</p>
              </div>
              <Button className="mt-3 mx-auto block" onClick={handleEditClick}>
                Modifier le Profil
              </Button>
            </div>
          )}
        </div>

        {/* <Button className="mt-3 mx-auto block" onClick={handleEditClick}>
          Modifier le Profil
        </Button> */}
      </div>
    </div>
  );
}
