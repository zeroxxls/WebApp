import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { contactTypes } from '../../constants/constants';

export const ContactForm = ({ contacts, setContacts }) => {
  const [newContact, setNewContact] = useState({ 
    type: 'github', 
    name: '', 
    url: '' 
  });

  const addContact = () => {
    if (newContact.url && newContact.name) {
      setContacts([...contacts, newContact]);
      setNewContact({ type: 'github', name: '', url: '' });
    }
  };

  return (
    <div>
      <label className="block text-gray-300 mb-2 font-medium">Add New Contact</label>
      <div className="space-y-3">
        <select
          value={newContact.type}
          onChange={(e) => setNewContact({...newContact, type: e.target.value})}
          className="w-full bg-gray-700 text-white rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          {contactTypes.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
        
        <input
          type="text"
          value={newContact.name}
          onChange={(e) => setNewContact({...newContact, name: e.target.value})}
          placeholder="Contact name (e.g. GitHub Profile)"
          className="w-full bg-gray-700 text-white rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        
        <input
          type="url"
          value={newContact.url}
          onChange={(e) => setNewContact({...newContact, url: e.target.value})}
          placeholder="URL (e.g. https://github.com/username)"
          className="w-full bg-gray-700 text-white rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        
        <button
          type="button"
          onClick={addContact}
          disabled={!newContact.url || !newContact.name}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg disabled:opacity-50 hover:bg-indigo-700 flex items-center justify-center gap-2"
        >
          <FaPlus />
          Add Contact
        </button>
      </div>
    </div>
  );
};