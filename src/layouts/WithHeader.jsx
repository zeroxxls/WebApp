import React from "react";
import {Header} from "../modules/Header";
export const WithHeader =({children})=>{
    return(
        <div className="flex min-h-screen flex-col">
        <Header/>
        <div className="flex flex-1 flex-col">{children}</div>
        </div>
    )
}
