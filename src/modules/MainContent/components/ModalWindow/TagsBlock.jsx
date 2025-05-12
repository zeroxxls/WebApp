import React from 'react'

export const TagsBlock = ({ tags }) => {
  if (!tags || tags.length === 0) return null;

  return (
    <div className='mt-4 mb-4'>
      <div className='flex flex-wrap gap-2'>
        {tags.map(tag => (
          <span key={tag} className="px-3 py-1 rounded-full bg-gray-700 text-sm text-indigo-300 border border-indigo-400/30">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
