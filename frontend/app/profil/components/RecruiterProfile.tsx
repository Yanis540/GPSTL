import React from 'react';
import { Button } from "@/components/ui/button";
import { Recruiter } from "../use-profil";

interface RecruiterProfileProps {
    recruiter: Recruiter;
    isEditing: boolean;
    saveUser: (updatedUser: Partial<Recruiter>) => void;
    setIsEditing: (isEditing: boolean) => void;
  }
  
export  const RecruiterProfile: React.FC<RecruiterProfileProps> = ({ recruiter, isEditing, saveUser, setIsEditing }) => {
    return (
      <>
        {isEditing ? (
          <form onSubmit={(e) => { e.preventDefault(); saveUser(recruiter); }} className="space-y-4">
            <input 
              type="text" 
              defaultValue={recruiter.firstname} 
              placeholder="Nom" 
              className="border p-2 w-full" 
              onChange={(e) => saveUser({ ...recruiter, firstname: e.target.value })} 
            />
            <textarea 
              defaultValue={recruiter.description} 
              placeholder="Description" 
              className="border p-2 w-full h-32 resize-none" 
              onChange={(e) => saveUser({ ...recruiter, description: e.target.value })} 
            />
            <div className="flex justify-between">
              <Button type="button" onClick={() => setIsEditing(false)}>Annuler</Button>
              <Button type="submit">Sauvegarder</Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 text-center w-full text-xl text-black">
            <h5 className="font-semibold text-black">{recruiter?.firstname}</h5>
            <p>Contactez-moi : {recruiter?.email}</p>
            <p className="break-words">{recruiter?.description}</p>
            <p>{new Date(recruiter?.birthdate).toLocaleDateString('fr-FR')}</p>
            <p>{recruiter?.role} (Entreprise ID : {recruiter?.companyId})</p>
          </div>
        )}
      </>
    );
  };
  