import React from 'react'
import { FaGithub, FaFacebook, FaInstagram } from 'react-icons/fa';

const iconComponents = {
  github: FaGithub,
  facebook: FaFacebook,
  instagram: FaInstagram
}

export const ProfileContacts = ({contacts}) => {
    if (!contacts || contacts.length === 0) return null;
  return (
    <div className="flex items-center gap-3 ml-2">
      {contacts
        .filter(contact => contact.isPublic && contact.url)
        .map(contact => {
          const Icon = iconComponents[contact.type];
          return (
            <a
              key={contact.type}
              href={contact.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-lg"
              aria-label={contact.name}
              title={contact.name}
            >
              {Icon && <Icon />}
            </a>
          );
        })}
    </div>
  )
}
