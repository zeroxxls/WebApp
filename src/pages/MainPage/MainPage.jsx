import React from "react";
import { NewsSlider } from '../../modules/News';
import { FilterSection } from '../../modules/filter';
import { FilterProvider } from "../../modules/filter/context/FilterProvider";
import { Channels } from "../../modules/MainContent";

const MainPage = () => {
    return (
        <FilterProvider >
            <div className="bg-gray-900">
                <NewsSlider/>
                <div className="sticky top-0 z-30 bg-gray-900">
                    <FilterSection/>
                </div>
                <Channels/>
            </div>
        </FilterProvider>
    );
};

export default MainPage;