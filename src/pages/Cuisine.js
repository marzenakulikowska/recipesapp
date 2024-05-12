import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CategoryCuisine from "../components/CategoryCuisine";

const Cuisine = () => {
    const [cuisine, setCuisine] = useState([]);
    let params = useParams();

    const getCuisine = async (cuisineName) => {
        const localStorageCheck = localStorage.getItem(params.cuisine);
        if (localStorageCheck && localStorageCheck !== "undefined") {
            setCuisine(JSON.parse(localStorageCheck));
        } else {
            try {
                const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${cuisineName}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const recipes = await response.json();
                if (recipes.results.length === 0) {  // Check if API response has data
                    setCuisine(null);
                } else {
                    localStorage.setItem(params.cuisine, JSON.stringify(recipes.results));
                    setCuisine(recipes.results);
                }
            } catch (error) {
                console.error("Error fetching data: " + error);
                setCuisine(null);
            }
        }
    };

    useEffect(() => {
        getCuisine(params.cuisine);
    }, [params.cuisine]);

    return (
        <>
            <CategoryCuisine />
            <div className="container recipes-grid">
                {cuisine ? (
                    cuisine.map((recipe) => {
                        return (
                            <div className="recipes-grid-recipe" key={recipe.id}>
                                <Link to={'/recipe/' + recipe.id}>
                                    <img src={recipe.image} alt={recipe.title} />
                                    <h4>{recipe.title}</h4>
                                </Link>
                            </div>
                        );
                    })
                ) : (
                    <p className="info-msg">No recipes found for this cuisine. Please try another one.</p>
                )}
            </div>
        </>
    );
};

export default Cuisine;
