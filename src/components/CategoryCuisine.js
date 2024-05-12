import {FaPizzaSlice, FaHamburger} from "react-icons/fa";
import {GiNoodles, GiChopsticks} from "react-icons/gi";
import {NavLink} from 'react-router-dom';
import React from "react";
const CategoryCuisine=()=>{
    return (
        <div className="container category-list">
            <h2>Select recipes by cuisine</h2>
            <div>
                <NavLink className="category-element" to={'/cuisine/italian'}>
                    <FaPizzaSlice/>
                    <h4>Italian</h4>
                </NavLink>
                <NavLink className="category-element" to={'/cuisine/American'}>
                    <FaHamburger/>
                    <h4>American</h4>
                </NavLink>
                <NavLink className="category-element" to={'/cuisine/Thai'}>
                    <GiNoodles/>
                    <h4>Thai</h4>
                </NavLink>
                <NavLink className="category-element" to={'/cuisine/Japanese'}>
                    <GiChopsticks/>
                    <h4>Japanese</h4>
                </NavLink>
            </div>
        </div>
    );
}

export default CategoryCuisine;