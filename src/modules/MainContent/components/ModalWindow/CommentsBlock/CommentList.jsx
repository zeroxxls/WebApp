import React from 'react';
import { Comment } from './Comment';

export const CommentList = ({ comments }) => (
  <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-2 hide-scrollbar">
    {comments && comments.length > 0 ? (
      comments.map((comment) => (
        <Comment key={comment._id || Math.random()} comment={comment} />
      ))
    ) : (
      <p className="text-gray-400 italic">No comments yet.</p>
    )}
  </div>
);