import React from 'react';

export const ArticleForm = ({ formData, handleChange, children }) => (
  <form className="space-y-6">
    <div>
      <label className="block text-sm font-medium mb-2 text-gray-300">Заголовок*</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
        placeholder="Яркий заголовок, который привлечет внимание"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-2 text-gray-300">Краткое описание*</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
        rows={3}
        placeholder="Краткое описание, которое будет отображаться в превью"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-2 text-gray-300">Содержание статьи*</label>
      <textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white min-h-[200px]"
        placeholder="Подробно раскройте тему статьи..."
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-2 text-gray-300">Теги</label>
      <input
        type="text"
        name="tags"
        value={formData.tags}
        onChange={handleChange}
        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
        placeholder="3d, концепт-арт, персонажи (через запятую)"
      />
    </div>

    {children}
  </form>
);