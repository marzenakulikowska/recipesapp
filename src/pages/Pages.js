import Popular from "../components/Popular";
import React from "react";
import {Route, Routes} from "react-router-dom"
import Home from "./Home";
import Cuisine from "./Cuisine";
import Searched from "./Searched";
import RecipeDetails from "./RecipeDetails";
import Diet from "./Diet";

const Pages=()=>{
    return(
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/cuisine/:cuisine" element={<Cuisine/>}/>
                <Route path="/searched/:search" element={<Searched/>}/>
                <Route path="/recipe/:recipeId" element={<RecipeDetails/>}/>
                <Route path="/diet/:diet" element={<Diet/>}/>
            </Routes>
    )
}
export default Pages;