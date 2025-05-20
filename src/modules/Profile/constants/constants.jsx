import { 
  FaReact, FaNodeJs, FaJs, FaPython, FaJava, 
  FaHtml5, FaCss3Alt, FaDatabase, FaGitAlt, FaCode 
} from 'react-icons/fa';
import { 
  SiTypescript, SiMongodb, SiPostgresql, 
  SiDocker, SiKubernetes, SiGraphql, SiRedis, SiFirebase, SiTailwindcss
} from 'react-icons/si';

export const availableTechOptions = [
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

export const contactTypes = [
  { value: 'github', label: 'GitHub' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'twitter', label: 'Twitter' },
  { value: 'website', label: 'Website' },
  { value: 'other', label: 'Other' },
];