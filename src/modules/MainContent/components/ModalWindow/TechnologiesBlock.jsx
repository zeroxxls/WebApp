import React from 'react';

export const TechnologiesBlock = ({ technologies }) => {
  if (!technologies || technologies.length === 0) return null;

  return (
    <div className='mt-4 mb-4'>
      <h5 className="text-white font-semibold mb-2">Technologies</h5>
      <div className='flex flex-wrap gap-2'>
        {technologies.map(tech => (
          <span key={tech} className="px-3 py-1 rounded-full bg-gray-700 text-sm text-indigo-300 border border-indigo-400/30">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};