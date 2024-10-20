// components/Comments.tsx
import React from 'react';
import Comment from './Comment';
import { Comment as CommentType } from '@/mockData/publications';

interface CommentsProps {
  comments: CommentType[];
}

const Comments: React.FC<CommentsProps> = ({ comments }) => {
  return (
    <div className="space-y-4 ">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;