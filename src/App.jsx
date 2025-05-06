import {Routes, Route,} from "react-router-dom"
import React from "react"
import MainPage from "./pages/MainPage/MainPage"
import { FirstPage } from "./pages/FirstPage/FirstPage"
import { WithHeader } from "./layouts/WithHeader"
import { LoginPage } from "./pages/LoginPage/LoginPage"
import { RegisterPage } from "./pages/RegisterPage/RegisterPage"
import { AuthPage } from "./pages/AuthPage/AuthPage"
import { SettingsPage } from "./pages/SettingsPage/SettingsPage"
import { ArticlePage } from "./pages/ArticlePage/ArticlePage"


export const App =()=>{
    return(
        <div>
            <Routes>
                <Route path="/" element={<FirstPage/>}/>
                <Route path="/LoginPage" element={<LoginPage/>}/>
                <Route path="/RegisterPage" element={<RegisterPage/>}/> 
                <Route path="/AuthPage" element={<AuthPage/>}/>
                <Route path="/SettingsPage" element={<SettingsPage/>}/>
                <Route path="article/:id" element={<ArticlePage/>}/>
                <Route path="/MainPage" element={
                    <WithHeader>
                            <MainPage/>
                    </WithHeader>
                    }/>
            </Routes>
        </div>
    )
}
