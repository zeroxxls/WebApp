import { FaCode, FaBook, FaPencilAlt, FaLightbulb, FaNewspaper } from 'react-icons/fa';

export const ARTICLE_TAGS = [
  { id: 'web-development', label: 'Web Development', icon: <FaCode className="w-4 h-4 mr-1" /> },
  { id: 'tutorials', label: 'Tutorials', icon: <FaBook className="w-4 h-4 mr-1" /> },
  { id: 'programming', label: 'Programming', icon: <FaPencilAlt className="w-4 h-4 mr-1" /> },
  { id: 'ai-ml', label: 'AI/ML', icon: <FaLightbulb className="w-4 h-4 mr-1" /> },
  { id: 'tech-news', label: 'Tech News', icon: <FaNewspaper className="w-4 h-4 mr-1" /> },
  { id: 'devops', label: 'DevOps' },
  { id: 'cybersecurity', label: 'Cybersecurity' },
  { id: 'data-science', label: 'Data Science' },
  { id: 'ux-ui', label: 'UX/UI' },
  { id: 'blockchain', label: 'Blockchain' },
  // Добавьте свои теги
];