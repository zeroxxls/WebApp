import React from "react";
import Input from "../ui/Input";
import SearchBtn from "../ui/SearchBtn";

const SearchInput =()=>{
    return(
        <div className="flex">
            <Input/>
            <SearchBtn/>
        </div>
    )
}

export default SearchInput