import React from 'react';
import { FaGithub, FaFacebook, FaInstagram, FaGlobe } from 'react-icons/fa';

const iconComponents = {
  github: FaGithub,
  facebook: FaFacebook,
  instagram: FaInstagram,
  website: FaGlobe,
  other: FaGlobe
};

export const ProfileContacts = ({ contacts }) => {
  if (!contacts || contacts.length === 0) return null;
  
  return (
    <div className="flex items-center gap-4 mb-6 flex-wrap">
      {contacts
        .filter(contact => contact.url)
        .map((contact, index) => {
          const Icon = iconComponents[contact.type] || iconComponents.other;
          return (
            <a
              key={index}
              href={contact.url.startsWith('http') ? contact.url : `https://${contact.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              {Icon && <Icon className="text-lg" />}
              <span>{contact.name || contact.type}</span>
            </a>
          );
        })}
    </div>
  );
};
