import {
  FaReact, FaNodeJs, FaJs, FaPython, FaJava,
  FaHtml5, FaCss3Alt, FaDatabase, FaGitAlt, FaCode
} from 'react-icons/fa';
import {
  SiTypescript, SiMongodb, SiPostgresql,
  SiDocker, SiKubernetes, SiGraphql, SiRedis, SiFirebase, SiTailwindcss, SiBlender
} from 'react-icons/si';
import { TbPhotoShop } from 'react-icons/tb';
import { BiUnity } from 'react-icons/bi';
import { MdOutline3DRotation } from 'react-icons/md';

export const AVAILABLE_PRICES = [
  { id: 'free', label: 'Free', value: 0 },
  { id: '1-10', label: '$1 - $10', value: 1 },
  { id: '11-50', label: '$11 - $50', value: 11 },
  { id: '51-100', label: '$51 - $100', value: 51 },
  { id: '100+', label: '$100+', value: 100 },
];

export const AVAILABLE_TECHNOLOGIES = [
  { id: 'blender', label: 'Blender', icon: <SiBlender className="text-orange-400 text-xl" /> },
  { id: 'photoshop', label: 'Photoshop', icon: <TbPhotoShop className="text-blue-400 text-xl" /> },
  { id: 'unity', label: 'Unity', icon: <BiUnity className="text-blue-600 text-xl" /> },
  { id: 'unreal-engine', label: 'Unreal Engine', icon: <MdOutline3DRotation className="text-black text-xl" /> },
  { id: 'zbrush', label: 'ZBrush', icon: <MdOutline3DRotation className="text-pink-600 text-xl" /> }, // Нет специфичной иконки, используем общую
  { id: 'substance-painter', label: 'Substance Painter', icon: <FaCode className="text-lime-500 text-xl" /> }, // Нет специфичной иконки
  // Добавьте иконки для остальных технологий, если найдете подходящие
];