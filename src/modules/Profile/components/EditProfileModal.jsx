import React, { useState } from 'react';
import axios from 'axios';
import { FaCode } from "react-icons/fa";
import { FaTimes, FaCheck, FaPlus, FaMinus } from 'react-icons/fa';
import { 
  FaReact, FaNodeJs, FaJs, FaPython, FaJava, 
  FaHtml5, FaCss3Alt, FaDatabase, FaGitAlt 
} from 'react-icons/fa';
import { 
  SiTypescript, SiMongodb, SiPostgresql, 
  SiDocker, SiKubernetes, SiGraphql, SiRedis, SiFirebase, SiTailwindcss
} from 'react-icons/si';

const availableTechOptions = [
  { name: 'React', icon: <FaReact className="text-blue-500" /> },
  { name: 'Node.js', icon: <FaNodeJs className="text-green-500" /> },
  { name: 'JavaScript', icon: <FaJs className="text-yellow-500" /> },
  { name: 'TypeScript', icon: <SiTypescript className="text-blue-600" /> },
  { name: 'Python', icon: <FaPython className="text-blue-400" /> },
  { name: 'Java', icon: <FaJava className="text-red-500" /> },
  { name: 'HTML', icon: <FaHtml5 className="text-orange-500" /> },
  { name: 'CSS', icon: <FaCss3Alt className="text-blue-300" /> },
  { name: 'MongoDB', icon: <SiMongodb className="text-green-600" /> },
  { name: 'PostgreSQL', icon: <SiPostgresql className="text-blue-700" /> },
  { name: 'Docker', icon: <SiDocker className="text-blue-400" /> },
  { name: 'Kubernetes', icon: <SiKubernetes className="text-blue-600" /> },
  { name: 'GraphQL', icon: <SiGraphql className="text-pink-600" /> },
  { name: 'Redis', icon: <SiRedis className="text-red-600" /> },
  { name: 'Firebase', icon: <SiFirebase className="text-yellow-500" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-cyan-400" /> },
  { name: 'Git', icon: <FaGitAlt className="text-orange-600" /> },
  { name: 'SQL', icon: <FaDatabase className="text-gray-400" /> },
];

export const EditProfileModal = ({ 
  user, 
  onClose, 
  onUpdate 
}) => {
  const [bio, setBio] = useState(user.bio || '');
  const [selectedTech, setSelectedTech] = useState(user.techStack || []);
  const [contacts, setContacts] = useState(user.contacts || []);
  const [newContact, setNewContact] = useState({ 
    type: 'github', 
    name: '', 
    url: '' 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [customTech, setCustomTech] = useState('');
  const [activeTab, setActiveTab] = useState('bio');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `http://localhost:4444/auth/update-profile/${user._id}`,
        {
          bio,
          techStack: selectedTech,
          contacts
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      onUpdate(response.data.user);
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addContact = () => {
    if (newContact.url && newContact.name) {
      setContacts([...contacts, newContact]);
      setNewContact({ type: 'github', name: '', url: '' });
    }
  };

  const removeContact = (index) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  const toggleTech = (tech) => {
    if (selectedTech.includes(tech)) {
      setSelectedTech(selectedTech.filter(t => t !== tech));
    } else {
      setSelectedTech([...selectedTech, tech]);
    }
  };

  const addCustomTech = () => {
    if (customTech.trim() && !selectedTech.includes(customTech.trim())) {
      setSelectedTech([...selectedTech, customTech.trim()]);
      setCustomTech('');
    }
  };

  const removeTech = (techToRemove) => {
    setSelectedTech(selectedTech.filter(tech => tech !== techToRemove));
  };

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700"
          >
            <FaTimes size={20} />
          </button>
        </div>
        
        {/* Tabs */}
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
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit}>
            {/* Bio Tab */}
            {activeTab === 'bio' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows="5"
                    placeholder="Tell about yourself..."
                  />
                </div>
              </div>
            )}
            
            {/* Technologies Tab */}
            {activeTab === 'tech' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Selected Technologies</label>
                  {selectedTech.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedTech.map((tech) => {
                        const techOption = availableTechOptions.find(t => t.name.toLowerCase() === tech.toLowerCase());
                        return (
                          <div 
                            key={tech} 
                            className="flex items-center bg-indigo-900/40 text-indigo-100 px-3 py-1 rounded-full"
                          >
                            {techOption?.icon || <FaCode className="mr-1" />}
                            <span className="mx-1">{tech}</span>
                            <button 
                              type="button"
                              onClick={() => removeTech(tech)}
                              className="text-gray-300 hover:text-white ml-1"
                            >
                              <FaMinus size={12} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-500 mb-4">No technologies selected yet</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Add Custom Technology</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customTech}
                      onChange={(e) => setCustomTech(e.target.value)}
                      className="flex-1 bg-gray-700 text-white rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter technology name"
                    />
                    <button
                      type="button"
                      onClick={addCustomTech}
                      disabled={!customTech.trim()}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-indigo-700"
                    >
                      Add
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Popular Technologies</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {availableTechOptions.map((tech) => (
                      <button
                        key={tech.name}
                        type="button"
                        onClick={() => toggleTech(tech.name)}
                        className={`flex items-center p-3 rounded-lg border transition-all ${
                          selectedTech.includes(tech.name)
                            ? 'bg-indigo-600/20 border-indigo-500 text-white'
                            : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        <span className="mr-2">{tech.icon}</span>
                        <span className="truncate">{tech.name}</span>
                        {selectedTech.includes(tech.name) && (
                          <span className="ml-auto text-green-400">
                            <FaCheck size={14} />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Contacts Tab */}
            {activeTab === 'contacts' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Your Contacts</label>
                  {contacts.length > 0 ? (
                    <div className="space-y-3 mb-4">
                      {contacts.map((contact, index) => (
                        <div key={index} className="flex items-center bg-gray-700/50 p-3 rounded-lg">
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
                            onClick={() => removeContact(index)}
                            className="text-red-400 hover:text-red-300 p-1 rounded-full hover:bg-gray-700"
                          >
                            <FaTimes size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 mb-4">No contacts added yet</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Add New Contact</label>
                  <div className="space-y-3">
                    <select
                      value={newContact.type}
                      onChange={(e) => setNewContact({...newContact, type: e.target.value})}
                      className="w-full bg-gray-700 text-white rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="github">GitHub</option>
                      <option value="facebook">Facebook</option>
                      <option value="instagram">Instagram</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="twitter">Twitter</option>
                      <option value="website">Website</option>
                      <option value="other">Other</option>
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
              </div>
            )}
            
            {/* Footer buttons */}
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
    </div>
  );
};