import React from 'react';
import { FaTimes } from 'react-icons/fa';

export const ContactItem = ({ contact, onRemove }) => {
  return (
    <div className="flex items-center bg-gray-700/50 p-3 rounded-lg">
      <div className="flex-1">
        <div className="text-white font-medium">{contact.name}</div>
        <a 
          href={contact.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-400 text-sm hover:underline"
        >
          {contact.url}
        </a>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="text-red-400 hover:text-red-300 p-1 rounded-full hover:bg-gray-700"
      >
        <FaTimes size={16} />
      </button>
    </div>
  );
};