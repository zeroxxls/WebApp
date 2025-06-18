import React from 'react';

export const ArticleForm = ({ formData, handleChange, children }) => (
  <form className="space-y-6">
    <div>
      <label className="block text-sm font-medium mb-2 text-gray-300">Title*</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
        placeholder="Attention-grabbing title"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-2 text-gray-300">Description*</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
        rows={3}
        placeholder="Brief preview description"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-2 text-gray-300">Content*</label>
      <textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white min-h-[200px]"
        placeholder="Detailed article content..."
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-2 text-gray-300">Tags</label>
      <input
        type="text"
        name="tags"
        value={formData.tags}
        onChange={handleChange}
        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
        placeholder="3d, concept-art, characters (comma separated)"
      />
    </div>

    {children}
  </form>
);