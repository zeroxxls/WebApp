import React from 'react';

export const TechnologiesBlock = ({ technologies }) => {
  if (!technologies || technologies.length === 0) return null;

  return (
    <div className='mt-4 mb-4'>
      <h5 className="text-white font-semibold mb-2">Technologies</h5>
      <div className='flex flex-wrap gap-2'>
        {technologies.map(tech => (
          <span key={tech.name} className="px-3 py-1 rounded-full bg-gray-700 text-sm text-indigo-300 border border-indigo-400/30 flex items-center gap-1">
            {tech.icon && <span className="text-indigo-300">{React.cloneElement(tech.icon, { size: 16 })}</span>} {/* Отображаем иконку */}
            {tech.name}
          </span>
        ))}
      </div>
    </div>
  );
};