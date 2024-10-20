/* eslint-disable @next/next/no-img-element */
// components/Comment.tsx
import React from 'react';
import { Comment as CommentType } from '@/mockData/publications';

interface CommentProps {
  comment: CommentType;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="flex flex-row items-start  p-4">
      <img 
        src={comment.avatarUrl} 
        // alt={comment.author} 
        alt='avatar'
        className="w-10 h-10 rounded-full"
      />
      <div className="flex-1 px-3">
        <div className="bg-background  rounded-lg">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-foreground">{comment.author}</h4>
            <span className="text-sm text-gray-700 md:text-gray-500">{comment.time}</span>
          </div>
          <div className="flex flex-row justify-between gap-x-4 w-full">
            <p className="text-gray-700 md:text-gray-500 mt-1">{comment.content}</p>
          </div>
        </div>
        <div className="flex space-x-4 text-sm mt-2 text-gray-500">
          <button className="hover:text-blue-600">Like ({comment.likes})</button>
          <button className="hover:text-blue-600">Répondre ({comment.replies})</button>
        </div>
      </div>
    </div>
  );
};

export default Comment;