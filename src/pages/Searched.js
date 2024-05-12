import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const Searched = () => {
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    let params = useParams();

    const getSearched = async (searchInputValue) => {
        const localStorageCheck = localStorage.getItem(params.search);
        if (localStorageCheck && localStorageCheck !== "undefined") {
            setSearchedRecipes(JSON.parse(localStorageCheck));
        } else {
            try {
                const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${searchInputValue}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const recipes = await response.json();
                if (recipes.results.length === 0) {
                    setSearchedRecipes(null);  // Set to null when no recipes are found
                } else {
                    localStorage.setItem(params.search, JSON.stringify(recipes.results));
                    setSearchedRecipes(recipes.results);
                }
            } catch (error) {
                console.error("Error fetching data: " + error);
                setSearchedRecipes(null);
            }
        }
    };

    useEffect(() => {
        getSearched(params.search);
    }, [params.search]);

    return (
        <div className="container">
            <h1 className="searched-title">Searched recipes: "{params.search}"</h1>
            <div className="cuisine-grid">
                {searchedRecipes ? (
                    searchedRecipes.map((recipe) => (
                        <div className="cuisine-recipe" key={recipe.id}>
                            <Link to={'/recipe/' + recipe.id}>
                                <img src={recipe.image} alt={recipe.title || "Recipe image"} />
                                <h4>{recipe.title}</h4>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="info-msg">No recipes found. Please try another search term.</p>
                )}
            </div>
        </div>
    );
};

export default Searched;
