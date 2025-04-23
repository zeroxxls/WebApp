import React from "react";
import {Header} from "../modules/Header";
export const WithHeader =({children})=>{
    return(
        <>
        <Header/>
        {children}
        </>
    )
}