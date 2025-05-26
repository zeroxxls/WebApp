import { FaPaintBrush,FaCameraRetro, FaCube, FaRocket, FaSkull, FaCode } from 'react-icons/fa';
import { SiUnity, SiBlender , SiAdobephotoshop , SiAdobeillustrator , SiUnrealengine, } from 'react-icons/si';
import { TbCubeSend } from 'react-icons/tb';
import { GiRolledCloth } from "react-icons/gi";

export const AVAILABLE_PRICES = [
  { id: 'free', label: 'Free', value: 0 },
  { id: '10', label: '$10', value: 10 },
  { id: '20', label: '$20', value: 20 },
  { id: '50', label: '$50', value: 50 },
  { id: '100+', label: '$100', value: 100 },
];

export const AVAILABLE_TECHNOLOGIES = [
  { id: 'blender', label: 'Blender', icon: <SiBlender className="text-orange-400 text-xl" /> },
  { id: 'photoshop', label: 'Photoshop', icon: <SiAdobephotoshop  className="text-blue-400 text-xl" /> },
  { id: 'illustrator', label: 'Illustrator', icon: <SiAdobeillustrator className="text-yellow-500 text-xl" /> },
  { id: 'unity', label: 'Unity', icon: <SiUnity className="text-blue-600 text-xl" /> },
  { id: 'unreal-engine', label: 'Unreal Engine', icon: <SiUnrealengine className="text-black text-xl" /> },
  { id: 'substance-painter', label: 'Substance Painter', icon: <FaPaintBrush className="text-lime-500 text-xl" /> },
  { id: 'maya', label: 'Maya', icon: <TbCubeSend className="text-teal-500 text-xl" /> },
  { id: 'cinema4d', label: 'Cinema 4D', icon: <FaCube className="text-red-500 text-xl" /> },
  { id: 'marmoset-toolbag', label: 'Marmoset Toolbag', icon: <FaRocket className="text-gray-400 text-xl" /> },
  { id: 'krita', label: 'Krita', icon: <FaPaintBrush className="text-purple-500 text-xl" /> },
  { id: 'armor-paint', label: 'Armor Paint', icon: <FaSkull className="text-yellow-700 text-xl" /> },
  { id: 'pure-ref', label: 'PureRef', icon: <FaCode className="text-indigo-500 text-xl" /> },
  { id: 'photography', label: 'Photography', icon: <FaCameraRetro className="text-green-600 text-xl" /> },
  { id: 'marvelous-designer', label: 'Marvelous Designer', icon: <GiRolledCloth className="text-cyan-500 text-xl" /> },
];