import React, { useState, useEffect } from 'react';
import '../../../../../shared/styles/hideScrollBar.css';
import { CommentList } from './CommentList';
import { CommentInput } from '../../../ui/CommentInput';

export const CommentsBlock = ({ comments: initialComments = [], selectedWorkId }) => {
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
          // Re-fetch comments to update UI
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
      <CommentList comments={comments} />
      <CommentInput
        commentText={commentText}
        setCommentText={setCommentText}
        onSubmit={handleSubmitComment}
      />
    </div>
  );
};