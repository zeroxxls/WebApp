import React from "react";

export const FooterSections =()=>{
    return(
        <div>
        <h3 className="text-blue-500 font-bold mb-4 text-lg">Sections</h3>
        <ul className="space-y-2">
          {['Explore', 'News', 'Shop', 'Registration'].map((item) => (
            <li key={item}>
              <a 
                href="#" 
                className="text-gray-400 hover:text-blue-300 transition-colors"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
}