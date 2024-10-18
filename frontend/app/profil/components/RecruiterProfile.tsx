import React from 'react';
import { Button } from "@/components/ui/button";
import { Recruiter } from "../use-profil";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

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
          <form onSubmit={(e) => { e.preventDefault(); saveUser(recruiter); setIsEditing(false);}} className="space-y-4">
            <Input
              type="text"
              value={recruiter.photo}
              placeholder="picture's url"
              className="border p-2 w-full "
              onChange={(e) => saveUser({ ...recruiter, photo: e.target.value })}
            />           
            <Textarea 
              defaultValue={recruiter.description} 
              placeholder="Description" 
              className="border p-2 w-full h-32 resize-none " 
              onChange={(e) => saveUser({ ...recruiter, description: e.target.value })} 
            />
            <div className="flex justify-between">
              <Button type="button" onClick={() => setIsEditing(false)}>Annuler</Button>
              <Button type="submit">Sauvegarder</Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 text-center w-full text-xl">
            {/* <h5 className="font-semibold ">{recruiter?.firstname}</h5> */}
            {/* <p>Contactez-moi : {recruiter?.email}</p> */}
            <p className="break-words text-left ml-5">{recruiter?.description}</p>
            {/* <p>{new Date(recruiter?.birthdate).toLocaleDateString('fr-FR')}</p> */}
            {/* <p>{recruiter?.role} (Entreprise ID : {recruiter?.companyId})</p> */}
          </div>
        )}
      </>
    );
  };
  