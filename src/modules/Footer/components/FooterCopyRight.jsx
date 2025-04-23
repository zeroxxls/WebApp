import React from "react";

export const FooterCopyRight =()=>{
    return(
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Luminio. All rights reserved.
        </p>
      </div>
    )
}