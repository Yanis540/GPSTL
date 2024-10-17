import React from 'react';
import { Button } from "@/components/ui/button";
import { Student } from "../use-profil";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface StudentProfileProps {
  student: Student;
  isEditing: boolean;
  saveUser: (updatedUser: Partial<Student>) => void;
  setIsEditing: (isEditing: boolean) => void;
}

export const StudentProfile: React.FC<StudentProfileProps> = ({ student, isEditing, saveUser, setIsEditing }) => {
  const [updatedStudent, setUpdatedStudent] = React.useState<Student>(student);

  const handleInputChange = (field: keyof Student, value: string) => {
    setUpdatedStudent(prev => ({ ...prev, [field]: value }));
  };

  const handleFieldChange = (field: keyof Student, value: any) => {
    handleInputChange(field, value);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveUser(updatedStudent);
    setIsEditing(false)
  };

  return (
    <>
      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-4">
          <input
            type="text"
            value={updatedStudent.photo}
            placeholder="picture's url"
            className="border p-2 w-full"
            onChange={(e) => handleFieldChange('photo', e.target.value)}
            />
          <input
            type="text"
            value={updatedStudent.firstname}
            placeholder="Prénom"
            className="border p-2 w-full"
            onChange={(e) => handleFieldChange('firstname', e.target.value)}
          />
          <input
            type="text"
            value={updatedStudent.lastname}
            placeholder="Nom"
            className="border p-2 w-full"
            onChange={(e) => handleFieldChange('lastname', e.target.value)}
          />
          {/* <input
            type="date"
            value={updatedStudent.birthdate.split('T')[0]} // Conversion pour le champ date
            placeholder="Date de naissance"
            className="border p-2 w-full"
            onChange={(e) => handleFieldChange('birthdate', e.target.value)}
          /> */}
          <div className="mb-4">
          <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700">
            École
            </label>
          <input
            type="text"
            value={updatedStudent.schoolName}
            placeholder="École"
            className="border p-2 w-full"
            onChange={(e) => handleFieldChange('schoolName', e.target.value)}
          />
            </div>
          <input
            type="text"
            value={updatedStudent.field.value}
            placeholder="Domaine d'études"
            className="border p-2 w-full"
            onChange={(e) => handleFieldChange('field', { ...updatedStudent.field, value: e.target.value })}
          />
          <input
            type="text"
            value={updatedStudent.grade.value}
            placeholder="Niveau"
            className="border p-2 w-full"
            onChange={(e) => handleFieldChange('grade', { ...updatedStudent.grade, value: e.target.value })}
          />
          {/* <textarea
            value={updatedStudent.skills.map(skill => skill.value).join(', ')}
            placeholder="Compétences (séparées par des virgules)"
            className="border p-2 w-full"
            onChange={(e) => handleFieldChange('skills', e.target.value.split(',').map(skill => ({ id: 0, type: 'skill', value: skill.trim() })))}
            /> */}
          <textarea
            value={updatedStudent.description}
            placeholder="Description"
            className="border p-2 w-full h-32 resize-none"
            onChange={(e) => handleFieldChange('description', e.target.value)}
          />
          <div className="flex justify-between">
            <Button type="button" onClick={() => setIsEditing(false)}>Annuler</Button>
            <Button type="submit">Sauvegarder</Button>
          </div>
        </form>
      ) : (
        <div className="flex justify-between w-full p-2">
            <div className="text-left text-black space-y-2 p-4 mr-2">
                <p><u>Compétences</u></p>
                <ul className="list-disc pl-5">
                {student?.skills.map((skill, index) => (
                    <li key={index}>{skill?.value}</li>
                ))}
                </ul>
            </div>
            <div className="flex flex-col text-black space-y-2 flex-grow pt-2.5">
                <p className="flex text-left ml-10 space-y-2 p-2">{student?.description}</p>
            </div>
        </div>
      )}
    </>
  );
};
