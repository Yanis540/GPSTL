/* eslint-disable @next/next/no-img-element */
// components/Publication.tsx
'use client';

import React from 'react';
import { PublicationInterface } from '@/mockData/publications';
import Reactions from './Reactions';
interface PublicationProps {
  publication: PublicationInterface;
  onClick: () => void;
}

const Publication: React.FC<PublicationProps> = ({ publication, onClick }) => {
  return (
    <div 
      className="bg-background shadow rounded-lg p-4 mb-4 flex flex-col space-y-2 border-[1px]  "
     
    >
      <div className="flex items-center space-x-2 cursor-pointer" onClick={onClick}>
        <img 
          src={publication.image} // Remplace par la vraie source de l'avatar
          alt={publication.author}
          className="w-10 h-10 rounded-full "
        />
        <div>
          <h3 className="font-bold text-primary">{publication.author}</h3>
          <span className="text-gray-500 text-sm">{publication.timeAgo}</span>
        </div>
      </div>
      <div className="flex">
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-foreground">{publication.title}</h4>
          <p className="text-gray-700 dark:text-gray-500">{publication.description}</p>
        </div>
        {publication && (
          <img 
            src={publication.image} // Remplace par la vraie source de l'image
            alt={publication.title}
            className="w-20 h-20 object-cover rounded ml-4"
          />
        )}
      </div>
      <Reactions reactions={publication.reactions} />
      {/* <div className="mt-4">
        <h4 className="font-semibold text-gray-800">Commentaires</h4>
        <div className="space-y-2">
          {publication.comments.slice(0, 2).map((comment, index) => (
            <Comment key={index} comments={comment} />
          ))}
          <button className="text-blue-500 hover:text-blue-600 text-sm mt-2">
            Voir tous les commentaires
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Publication;