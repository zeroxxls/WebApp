import { FaPaintBrush,FaCameraRetro, FaCube, FaRocket, FaSkull, FaCode } from 'react-icons/fa';
import { SiUnity, SiBlender , SiAdobephotoshop,SiHoudini  ,SiDavinciresolve , SiAdobeillustrator , SiUnrealengine, } from 'react-icons/si';
import { TbCubeSend } from 'react-icons/tb';
import { GiRolledCloth } from "react-icons/gi";
import { GiMuscularTorso } from "react-icons/gi";

export const availableTechOptions = [
  { name: 'Blender', icon: <SiBlender className="text-orange-400 text-xl" /> },
  { name: 'Photoshop', icon: <SiAdobephotoshop className="text-blue-400 text-xl" /> },
  { name: 'Illustrator', icon: <SiAdobeillustrator className="text-yellow-500 text-xl" /> },
  { name: 'Unity', icon: <SiUnity className="text-blue-600 text-xl" /> },
  { name: 'Unreal Engine', icon: <SiUnrealengine className="text-black text-xl" /> },
  { name: 'Substance Painter', icon: <FaPaintBrush className="text-lime-500 text-xl" /> },
  { name: 'Maya', icon: <TbCubeSend className="text-teal-500 text-xl" /> },
  { name: 'Cinema 4D', icon: <FaCube className="text-red-500 text-xl" /> },
  { name: 'Marmoset Toolbag', icon: <FaRocket className="text-gray-400 text-xl" /> },
  { name: 'Krita', icon: <FaPaintBrush className="text-purple-500 text-xl" /> },
  { name: 'Armor Paint', icon: <FaSkull className="text-yellow-700 text-xl" /> },
  { name: 'PureRef', icon: <FaCode className="text-indigo-500 text-xl" /> },
  { name: 'Photography', icon: <FaCameraRetro className="text-green-600 text-xl" /> },
  { name: 'Marvelous Designer', icon: <GiRolledCloth className="text-cyan-500 text-xl" /> },
  { name: 'ZBrush', icon: <GiMuscularTorso className="text-pink-600 text-xl" /> },
  { name: 'Houdini', icon: <SiHoudini className="text-orange-300 text-xl" /> },
  { name: 'DaVinci Resolve', icon: <SiDavinciresolve className="text-blue-300 text-xl" /> },
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