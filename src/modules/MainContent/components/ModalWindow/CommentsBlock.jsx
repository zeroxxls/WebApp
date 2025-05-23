import React, { useState, useEffect } from 'react';
import '../../../../shared/styles/hideScrollBar.css';

export const CommentsBlock = ({ comments: initialComments = [], selectedUser, selectedWorkId }) => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(initialComments);

  useEffect(() => {
    const fetchComments = async () => {
      if (selectedWorkId) {
        try {
          const response = await fetch(`/works/${selectedWorkId}/comments`);
          if (response.ok) {
            const data = await response.json();
            setComments(data.comments || []);
          } else {
            console.error('Failed to fetch comments:', response.status);
          }
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      }
    };

    fetchComments();
  }, [selectedWorkId]);

  const handleSubmitComment = async () => {
    if (commentText.trim() && selectedWorkId) {
      try {
        const response = await fetch(`/works/${selectedWorkId}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ text: commentText }),
        });

        if (response.ok) {
          const newComment = await response.json();
          setComments(prevComments => [...prevComments, newComment]);
          setCommentText('');
          // Возможно, стоит запросить все комментарии заново, чтобы обновить UI
          const commentsResponse = await fetch(`/works/${selectedWorkId}/comments`);
          if (commentsResponse.ok) {
            const commentsData = await commentsResponse.json();
            setComments(commentsData.comments || []);
          }
        } else {
          console.error('Failed to post comment:', response.status);
        }
      } catch (error) {
        console.error('Error posting comment:', error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 rounded-2xl border border-gray-700 bg-gray-800 shadow-md mb-8">
      <h3 className="text-lg font-semibold text-white">Comments({comments?.length || 0})</h3>

      <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-2 hide-scrollbar">
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id || Math.random()} className="bg-gray-700 p-3 rounded-lg flex items-start gap-2">
              {comment.author?._id ? (
                <img
                  src={`http://localhost:4444/avatars/${comment.author._id}/avatar?${Date.now()}`}
                  alt={comment.author?.fullName || comment.author?.name || 'User'}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-600"></div>
              )}
              <div className="flex flex-col">
                <p className="text-sm text-gray-300">
                  <span className="font-semibold text-white">{comment.author?.fullName || selectedUser?.fullName || 'User'}:</span> {comment.text}
                </p>
                {/* Здесь может быть дополнительная информация */}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 italic">No comments yet.</p>
        )}
      </div>

      <textarea
        placeholder="Write your comment here..."
        className="w-full min-h-[100px] p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button
        onClick={handleSubmitComment}
        className="self-end px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white font-medium shadow-sm"
      >
        Submit
      </button>
    </div>
  );
};