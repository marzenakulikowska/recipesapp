import {NavLink} from 'react-router-dom';
import React from "react";
const CategoryDiet=()=>{
    return (
        <div className="category-list">
            <h2>Select recipes by diet</h2>
            <div>
                <NavLink className="category-element" to={'/diet/vegetarian'}>
                    <div></div>
                    <h4>Vegetarian</h4>
                </NavLink>
                <NavLink className="category-element" to={'/diet/vegan'}>
                    <h4>Vegan</h4>
                </NavLink>
                <NavLink className="category-element" to={'/diet/gluten-free'}>
                    <h4>Gluten Free</h4>
                </NavLink>
                <NavLink className="category-element" to={'/diet/katogenic'}>
                    <h4>Katogenic</h4>
                </NavLink>
                <NavLink className="category-element" to={'/diet/paleo'}>
                    <h4>Paleo</h4>
                </NavLink>
            </div>
        </div>
    );
}

export default CategoryDiet;