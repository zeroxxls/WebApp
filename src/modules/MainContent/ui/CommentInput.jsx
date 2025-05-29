import React from 'react';

export const CommentInput = ({ commentText, setCommentText, onSubmit }) => (
  <>
    <textarea
      placeholder="Write your comment here..."
      className="w-full min-h-[100px] p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      value={commentText}
      onChange={(e) => setCommentText(e.target.value)}
    />
    <button
      onClick={onSubmit}
      className="self-end px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white font-medium shadow-sm"
    >
      Submit
    </button>
  </>
);