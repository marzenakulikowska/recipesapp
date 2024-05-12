import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";

const Popular = () => {
    const [popular, setPopular] = useState([]);

    useEffect(() => {
        getPopular();
    }, []);

    const getPopular = async () => {
        const localStorageCheck = localStorage.getItem("popular");
        if (localStorageCheck && localStorageCheck !== "undefined") {
            setPopular(JSON.parse(localStorageCheck));
        } else {
            const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`)
            const data = await response.json();
            if (data.recipes) {
                localStorage.setItem("popular", JSON.stringify(data.recipes));
                setPopular(data.recipes);
            } else {
                setPopular([]);
            }
        }
    }

    return (
        <section className="container" id="popular">
            <h1 className="popular-section-title">Most popular recipes</h1>
            {popular && popular.length > 0 ? (
                <Splide options={{
                    perPage: 3,
                    arrows: false,
                    pagination: true,
                    drag: "free",
                    gap: "1.5rem"
                }}>
                    {popular.map((recipe) => (
                        <SplideSlide key={recipe.id}>
                            <div className="recipe">
                                <Link to={'/recipe/' + recipe.id} className="recipe-link">
                                    <img className="recipe-img" src={recipe.image} alt={recipe.title} />
                                    <h2 className="recipe-title">{recipe.title}</h2>
                                </Link>
                                <p>Ready in: {recipe.readyInMinutes} minutes</p>
                                <p>Servings: {recipe.servings}</p>
                                <div className="recipe-btn">
                                    <Link to={'/recipe/' + recipe.id}>Read more</Link>
                                </div>
                            </div>
                        </SplideSlide>
                    ))}
                </Splide>
            ) : (
                <p className="info-msg">No popular recipes available at the moment.</p>
            )}
        </section>
    )
}

export default Popular;
