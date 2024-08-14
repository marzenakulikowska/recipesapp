import React,{useState, useEffect} from "react";
import {useParams} from "react-router-dom"
const RecipeDetails = ()=>{
    let params = useParams();
    const [recipeDetails, setRecipeDetails]=useState({});
    const [recipeTaste, setRecipeTaste]=useState();
    const [recipeNutrition, setRecipeNutrition] = useState({ html: "" });
    const [recipeEquipment, setRecipeEquipment] = useState({ html: "" });
    const [recipePrice, setRecipePrice] = useState({ html: "" });
    const [recipeCard, setRecipeCard]=useState({});
    const [activeTab, setActiveTab]=useState('instructions');
    const fetchedRecipeDetails = async ()=> {
        const localStorageCheck = localStorage.getItem(params.recipeId);
        if (localStorageCheck && localStorageCheck !== "undefined") {
            setRecipeDetails(JSON.parse(localStorageCheck));
        } else {
            try {
                const response = await fetch(`https://api.spoonacular.com/recipes/${params.recipeId}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const detailData = await response.json();
                localStorage.setItem(params.recipeId, JSON.stringify(detailData))
                setRecipeDetails(detailData);
                } catch (error) {
                    console.error("Error fetching data: " + error);
                }
            }
    }
    const fetchedNutrition = async ()=> {
        const localStorageCheck = localStorage.getItem(params.recipeId+"/nutrition");
        if (localStorageCheck && localStorageCheck !== "undefined") {
            setRecipeNutrition({html:localStorageCheck});
        } else {
            try {
                const response = await fetch(`https://api.spoonacular.com/recipes/${params.recipeId}/nutritionWidget/?apiKey=${process.env.REACT_APP_API_KEY}&defaultCss=true`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'text/html;charset=utf-8'
                    }
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const nutritionData = await response.text();
                localStorage.setItem(params.recipeId+"/nutrition", nutritionData)
                setRecipeNutrition({html:nutritionData});
            } catch (error) {
                console.error("Error fetching data: " + error);
            }
        }
    }
        const fetchedTaste = async ()=> {
        const localStorageCheck = localStorage.getItem(params.recipeId+"/taste");
        if (localStorageCheck && localStorageCheck !== "undefined") {
            setRecipeTaste({html:localStorageCheck});
        } else {
            try {
                const response = await fetch(`https://api.spoonacular.com/recipes/${params.recipeId}/tasteWidget/?apiKey=${process.env.REACT_APP_API_KEY}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const taste = await response.text();
                localStorage.setItem(params.recipeId+"/equipment", taste)
                setRecipeTaste({html:taste});
            } catch (error) {
                console.error("Error fetching data: " + error);
            }
        }
    }
    const fetchedEquipment = async ()=> {
        const localStorageCheck = localStorage.getItem(params.recipeId+"/equipment");
        if (localStorageCheck && localStorageCheck !== "undefined") {
            setRecipeEquipment({html:localStorageCheck});
        } else {
            try {
                const response = await fetch(`https://api.spoonacular.com/recipes/${params.recipeId}/equipmentWidget/?apiKey=${process.env.REACT_APP_API_KEY}&defaultCss=true`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'text/html'
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const equipment = await response.text();
                localStorage.setItem(params.recipeId+"/equipment", equipment)
                setRecipeEquipment({html:equipment});
            } catch (error) {
                console.error("Error fetching data: " + error);
            }
        }
    }
        const fetchedPriceBreakdown = async ()=> {
        const localStorageCheck = localStorage.getItem(params.recipeId+"/price");
        if (localStorageCheck && localStorageCheck !== "undefined") {
            setRecipePrice({html:localStorageCheck});
        } else {
            try {
                const response = await fetch(`https://api.spoonacular.com/recipes/${params.recipeId}/priceBreakdownWidget/?apiKey=${process.env.REACT_APP_API_KEY}&mode=2`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const priceData = await response.text();
                localStorage.setItem(params.recipeId+"/price", priceData)
                setRecipePrice({html:priceData});
            } catch (error) {
                console.error("Error fetching data: " + error);
            }
        }
    }
    const fetchedRecipeCard = async ()=> {
        const localStorageCheck = localStorage.getItem(params.recipeId+"/recipeCard");
        if (localStorageCheck && localStorageCheck !== "undefined") {
            setRecipeCard(JSON.parse(localStorageCheck));
        } else {
            try {
                const response = await fetch(`https://api.spoonacular.com/recipes/${params.recipeId}/card/?apiKey=${process.env.REACT_APP_API_KEY}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const recipeCardData = await response.json();
                localStorage.setItem(params.recipeId+"/recipeCard", JSON.stringify(recipeCardData));
                setRecipeCard(recipeCardData);
            } catch (error) {
                console.error("Error fetching data: " + error);
            }
        }
    }
    useEffect(()=>{
        fetchedRecipeDetails();
        // fetchedNutrition();
    },[params.recipeId])
    useEffect(() => {
        if (activeTab === "nutrition") {
            fetchedNutrition();
        }
        if (activeTab === "equipment") {
            fetchedEquipment();
        }
        if (activeTab === "price") {
            fetchedPriceBreakdown();
        }
        if (activeTab === "recipeCard") {
            fetchedRecipeCard();
        }
        if (activeTab === "taste") {
            fetchedTaste();
        }
    }, [activeTab]);
    return (
        <div className="container">
                {recipeDetails ? (
                        <>
                            <div>
                                <h2 className="recipe-details-title">{recipeDetails.title}</h2>
                            </div>
                            <div className="recipe_details_container">
                                <div>
                                    <img className="recipe-details-img" src={recipeDetails.image} alt={recipeDetails.id}/>
                                </div>
                                <div className="recipe-details-side-info">
                                    <h3>Recipe details:</h3>
                                    <p>Servings: {recipeDetails.servings}</p>
                                    <p>Ready in: {recipeDetails.readyInMinutes} minutes</p>
                                    {recipeDetails.cuisines && Array.isArray(recipeDetails.cuisines) && (
                                        <ul>Cuisines: {recipeDetails.cuisines.map((cuisine, idx) => {
                                            return <li key={idx}>{cuisine}</li>;
                                        })}</ul>
                                    )}
                                    {recipeDetails.diets && Array.isArray(recipeDetails.diets) && (
                                        <ul>Diets: {recipeDetails.diets.map((diet, idx) => {
                                            return <li key={idx}>{diet}</li>;
                                        })}</ul>
                                    )}
                                </div>
                            </div>
                            <div className="recipe-details-bottom-info">
                                <div className="recipe-details-buttons">
                                    <div className={activeTab === 'instructions' ? 'active btn' : 'btn'} onClick={()=> setActiveTab('instructions')}>Instructions</div>
                                    <div className={activeTab === 'ingredients' ? 'active btn' : 'btn'} onClick={()=> setActiveTab('ingredients')}>Ingredients</div>
                                    <div className={activeTab === 'nutrition' ? 'active btn' : 'btn'} onClick={()=> setActiveTab('nutrition')}>Nutrition</div>
                                    <div className={activeTab === 'taste' ? 'active btn' : 'btn'} onClick={()=> setActiveTab('taste')}>Taste widget</div>
                                    <div className={activeTab === 'equipment' ? 'active btn' : 'btn'} onClick={()=> setActiveTab('equipment')}>Equipment</div>
                                    <div className={activeTab === 'price' ? 'active btn' : 'btn'} onClick={()=> setActiveTab('price')}>Price</div>
                                    {
                                        recipeDetails.extendedIngredients!== undefined && (recipeDetails.extendedIngredients.length <=14 ) && (
                                            <div className={activeTab === 'recipeCard' ? 'active btn' : 'btn'} onClick={()=> setActiveTab('recipeCard')}>Show recipe card</div>
                                        )
                                }
                                </div>
                                {activeTab==='instructions' && (
                                    <div>
                                        <h4  className="recipe-instructions">Instructions:</h4>
                                        <p dangerouslySetInnerHTML={{__html: recipeDetails.instructions}}></p>
                                        <h4 className="recipe-summary">Summary:</h4>
                                        <p className="recipe-details-instructions" dangerouslySetInnerHTML={{__html: recipeDetails.summary}}></p>
                                    </div>
                                )}
                                {activeTab==='ingredients' && (
                                    <ul>
                                        {recipeDetails.extendedIngredients.map((ingredient, idx)=>{
                                            return <li key={idx}>{ingredient.original}</li>
                                        })}
                                    </ul>
                                )}
                                {activeTab==='nutrition' && (
                                    <div dangerouslySetInnerHTML={{__html: recipeNutrition.html}}></div>
                                )}
                                {/*{activeTab==='taste' && (*/}
                                {/*    <div dangerouslySetInnerHTML={{__html: recipeTaste.html}}></div>*/}
                                {/*)}*/}
                                {activeTab==='equipment' && (
                                    <div dangerouslySetInnerHTML={{__html: recipeEquipment.html}}></div>
                                )}
                                {activeTab==='price' && (
                                    <div dangerouslySetInnerHTML={{__html: recipePrice.html}}></div>
                                )}
                                {activeTab==='recipeCard' && recipeCard.url!==undefined &&(
                                    <img src={recipeCard.url} alt={recipeDetails.title}/>
                                )}
                            </div>
                        </>
                    ) :(
                        <p>Fetching data...</p>
                    )
                }
            {

            }
        </div>
    )
}
export default RecipeDetails;