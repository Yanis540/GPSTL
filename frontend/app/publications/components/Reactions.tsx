// components/Reactions.tsx
'use client';

import React from 'react';

interface ReactionsProps {
    reactions: {
      likes: number;
      comments: number;
      shares: number;
      sent: number;
    };
  }
  
  const Reactions: React.FC<ReactionsProps> = ({ reactions }) => {
    return (
      <div className="flex space-x-4 text-sm text-gray-600">
        <button className="flex items-center space-x-1 hover:text-blue-500">
          <span role="img" aria-label="like">👍</span>
          <span>{reactions.likes}</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-blue-500">
          <span role="img" aria-label="comment">💬</span>
          <span>{reactions.comments}</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-blue-500">
          <span role="img" aria-label="share">🔄</span>
          <span>{reactions.shares}</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-blue-500">
          <span role="img" aria-label="send">✉️</span>
          <span>{reactions.sent}</span>
        </button>
      </div>
    );
  };

export default Reactions;