import React from "react";
import { NewsSlider } from '../../modules/News';
import { FilterSection } from '../../modules/filter';
import { FilterProvider } from "../../modules/filter/context/FilterProvider";
import { Channels } from "../../modules/MainContent";

const MainPage = () => {
    return (
        <FilterProvider>
            <div>
                <NewsSlider/>
                <div className="sticky top-0 z-10 bg-[#1c1c25]">
                    <FilterSection/>
                </div>
                <Channels/>
            </div>
        </FilterProvider>
    );
};

export default MainPage;