/* eslint-disable @next/next/no-img-element */
// components/Comment.tsx
import React from 'react';
import { Comment as CommentType } from '@/mockData/publications';

interface CommentProps {
  comment: CommentType;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="flex space-x-3 p-4">
      <img 
        src={comment.avatarUrl} 
        // alt={comment.author} 
        alt='avatar'
        className="w-20 h-20 rounded-full"
      />
      <div className="flex-1">
        <div className="bg-background p-3 rounded-lg">
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
          <button className="hover:text-blue-600">Respond ({comment.replies})</button>
        </div>
      </div>
    </div>
  );
};

export default Comment;