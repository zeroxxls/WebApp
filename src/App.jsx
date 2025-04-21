import {Routes, Route,} from "react-router-dom"
import React from "react"
import MainPage from "./pages/MainPage/MainPage"
import { FirstPage } from "./pages/FirstPage/FirstPage"
import { WithHeader } from "./components/WithHeader"
import { LoginPage } from "./pages/LoginPage/LoginPage"
import { RegisterPage } from "./pages/RegisterPage/RegisterPage"


export const App =()=>{
    return(
        <div>
            <Routes>
                <Route path="/" element={<FirstPage/>}/>
                <Route path="/LoginPage" element={<LoginPage/>}/>
                <Route path="/RegisterPage" element={<RegisterPage/>}/> 
                <Route path="/MainPage" element={
                    <WithHeader>
                            <MainPage/>
                    </WithHeader>
                    }/>
            </Routes>
        </div>
    )
}
