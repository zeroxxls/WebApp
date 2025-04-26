import React from "react";
import { NewsSlider } from '../../modules/News';
import {FilterSection} from '../../modules/filter'

const MainPage =()=>{
    return(
        <div>
            <NewsSlider/>
             <FilterSection/>
        </div>
    )
}

export default MainPage