import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CategoryDiet from "../components/CategoryDiet";

const Diet = () => {
    const [diet, setDiet] = useState([]);
    let params = useParams();

    const getDiet = async (dietName) => {
        const localStorageCheck = localStorage.getItem(params.diet);
        if (localStorageCheck && localStorageCheck !== "undefined") {
            setDiet(JSON.parse(localStorageCheck));
        } else {
            try {
                const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&diet=${dietName}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const recipes = await response.json();
                if (recipes.results.length === 0) {
                    setDiet(null); //Set null if API response has no data
                } else {
                    localStorage.setItem(params.diet, JSON.stringify(recipes.results));
                    setDiet(recipes.results);
                }
            } catch (error) {
                console.error("Error fetching data: " + error);
                setDiet(null); // Set null if error
            }
        }
    };

    useEffect(() => {
        getDiet(params.diet);
    }, [params.diet]);

    return (
        <>
            <CategoryDiet />
            <div className="container recipes-grid">
                {diet ? (
                    diet.map((recipe) => {
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
                    <p className="info-msg">No recipes found for this diet.</p>
                )}
            </div>
        </>
    );
};

export default Diet;
