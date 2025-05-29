import React from "react";
import { Link } from "react-router-dom";

export const FooterSections =()=>{
  const Links = [
    {name: 'Explore' , path:'/'},
    {name: 'News' , path:'/NewsPage'},
    {name: 'Registration', path: '/RegisterPage' },
  ]
    return(
        <div>
        <h3 className="text-blue-500 font-bold mb-4 text-lg">Sections</h3>
        <ul className="space-y-2">
          {Links.map((item) => (
            <li key={item.name}>
              <Link 
                to={item.path}
                className="text-gray-400 hover:text-blue-300 transition-colors"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
}