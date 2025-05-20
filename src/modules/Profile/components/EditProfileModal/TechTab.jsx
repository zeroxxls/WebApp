import React from 'react';
import { TechBadge } from './TechBadge';
import { TechSelector } from './TechSelector';
import { CustomTechInput } from './CustomTechInput';

export const TechTab = ({ techStack, setTechStack }) => {
  const removeTech = (techToRemove) => {
    setTechStack(techStack.filter(tech => tech !== techToRemove));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-gray-300 mb-2 font-medium">Selected Technologies</label>
        {techStack.length > 0 ? (
          <div className="flex flex-wrap gap-2 mb-4">
            {techStack.map((tech) => (
              <TechBadge 
                key={tech} 
                tech={tech} 
                onRemove={() => removeTech(tech)} 
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mb-4">No technologies selected yet</p>
        )}
      </div>
      
      <CustomTechInput 
        techStack={techStack} 
        setTechStack={setTechStack} 
      />
      
      <TechSelector 
        techStack={techStack} 
        setTechStack={setTechStack} 
      />
    </div>
  );
};