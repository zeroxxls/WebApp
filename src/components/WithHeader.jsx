import React from "react";
import Header from "./Header/Header";
export const WithHeader =({children})=>{
    return(
        <>
        <Header/>
        {children}
        </>
    )
}