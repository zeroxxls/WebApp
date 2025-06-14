import React from 'react';
import { FaTimes, FaCheck } from 'react-icons/fa';
import { BioTab } from './BioTab';
import { TechTab } from './TechTab';
import { ContactsTab } from './ContactsTab';

export const EditProfileModalContent = ({
  activeTab,
  setActiveTab,
  formData,
  updateFormData,
  isLoading,
  handleSubmit,
  onClose,
}) => {
  return (
    <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
      <div className="flex justify-between items-center p-6 border-b border-gray-700">
        <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700"
        >
          <FaTimes size={20} />
        </button>
      </div>
      <div className="flex border-b border-gray-700">
        <button
          onClick={() => setActiveTab('bio')}
          className={`px-6 py-3 font-medium ${activeTab === 'bio' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-white'}`}
        >
          Bio
        </button>
        <button
          onClick={() => setActiveTab('tech')}
          className={`px-6 py-3 font-medium ${activeTab === 'tech' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-white'}`}
        >
          Technologies
        </button>
        <button
          onClick={() => setActiveTab('contacts')}
          className={`px-6 py-3 font-medium ${activeTab === 'contacts' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-white'}`}
        >
          Contacts
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <form onSubmit={handleSubmit}>
          {activeTab === 'bio' && (
            <BioTab bio={formData.bio} setBio={(bio) => updateFormData('bio', bio)} />
          )}

          {activeTab === 'tech' && (
            <TechTab
              techStack={formData.techStack}
              setTechStack={(techStack) => updateFormData('techStack', techStack)}
            />
          )}

          {activeTab === 'contacts' && (
            <ContactsTab
              contacts={formData.contacts}
              setContacts={(contacts) => updateFormData('contacts', contacts)}
            />
          )}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-700 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
              {!isLoading && <FaCheck />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};