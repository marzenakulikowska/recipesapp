import Popular from "../components/Popular";
import React from "react";
import CategoryCuisine from "../components/CategoryCuisine";
import MainView from "../components/MainView";
import Search from "../components/Search";
import CategoryDiet from "../components/CategoryDiet";
const Home=()=>{
    return(
        <div>
            <MainView/>
            <Search/>
            <Popular/>
            <CategoryCuisine/>
            <CategoryDiet/>
        </div>
    )
}
export default Home