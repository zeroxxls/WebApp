import React from 'react';
import { ContactItem } from './ContactItem';
import { ContactForm } from './ContactForm';

export const ContactsTab = ({ contacts, setContacts }) => {
  const removeContact = (index) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-gray-300 mb-2 font-medium">Your Contacts</label>
        {contacts.length > 0 ? (
          <div className="space-y-3 mb-4">
            {contacts.map((contact, index) => (
              <ContactItem 
                key={index}
                contact={contact}
                onRemove={() => removeContact(index)}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mb-4">No contacts added yet</p>
        )}
      </div>
      
      <ContactForm 
        contacts={contacts}
        setContacts={setContacts}
      />
    </div>
  );
};