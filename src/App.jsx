import {Routes, Route,} from "react-router-dom"
import React from "react"
import MainPage from "./pages/MainPage/MainPage"
import { FirstPage } from "./pages/FirstPage/FirstPage"
import { WithHeader } from "./components/WithHeader"

export const App =()=>{
    return(
        <div>
            <Routes>
                <Route path="/FirstPage" element={<FirstPage/>}/>
                <Route path="/MainPage" element={
                    <WithHeader>
                            <MainPage/>
                    </WithHeader>
                    }/>
            </Routes>
        </div>
    )
}
