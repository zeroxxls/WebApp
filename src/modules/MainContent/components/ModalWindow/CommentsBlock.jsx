import React from 'react'

export const CommentsBlock = ({ comments, selectedUser }) => (
  <div className="flex flex-col gap-4 p-4 rounded-2xl border border-gray-700 bg-gray-800 shadow-md mb-8">
    <h3 className="text-lg font-semibold text-white">Comments({comments?.length || 0})</h3>

    <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-2 hide-scrollbar">
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="bg-gray-700 p-3 rounded-lg">
            <p className="text-sm text-gray-300">
              <span className="font-semibold text-white">{selectedUser.name}:</span> {comment.text}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-400 italic">No comments yet.</p>
      )}
    </div>

    <textarea
      placeholder="Write your comment here..."
      className="w-full min-h-[100px] p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
    />
    <button className="self-end px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white font-medium shadow-sm">
      Submit
    </button>
  </div>
)
