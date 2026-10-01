import React from "react";
import { EnvelopeIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

export const FooterCooperation = () => {
  const CooperationLinks = [
    {name: 'Discord', path: 'https://discord.gg/YEPG8UWF'},
    {name: 'GitHub', path: 'https://github.com/zeroxxls?tab=overview&from=2025-05-01&to=2025-05-07'},
  ];

  return (
    <div>
      <h3 className="text-blue-500 font-bold mb-4 text-lg">Cooperation</h3>
      <ul className="space-y-2 text-gray-400 text-sm">
        <li className="flex flex-wrap items-center gap-y-2">
          <EnvelopeIcon className="w-4 h-4 mr-2" />
          art@luminio.com
        </li>
        <li className="flex items-center">
          <GlobeAltIcon className="w-4 h-4 mr-2" />
          Social:
          <div className="flex flex-wrap ml-3 gap-x-2 gap-y-1">
            {CooperationLinks.map((item) => (
              <a
                key={item.name}  
                href={item.path}
                className="hover:text-blue-300 transition-colors"
              >
                {item.name}
              </a>
            ))}
            {['EMail', 'Phone'].map((social) => (
              <a
                key={social} 
                href="#"
                className="hover:text-blue-300 transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </li>
      </ul>
    </div>
  );
};
