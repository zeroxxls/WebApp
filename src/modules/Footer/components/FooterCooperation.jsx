import React from "react";
import { EnvelopeIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

export const FooterCooperation =()=>{
    return(
        <div>
          <h3 className="text-blue-500 font-bold mb-4 text-lg">Cooperation</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="flex items-center">
              <EnvelopeIcon className="w-4 h-4 mr-2" />
              art@luminio.com
            </li>
            <li className="flex items-center">
              <GlobeAltIcon className="w-4 h-4 mr-2" />
              Social:
              <div className="flex ml-3 space-x-2">
                {['Discord', 'E-Mail', 'Phone', 'GitHub'].map((social) => (
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
    )
}