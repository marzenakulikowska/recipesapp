import React,{useState} from "react";
import {FaSearch} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const Search = ()=>{
    const [inputData, setInputData]=useState("");
    const navigate = useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault();
        navigate('/searched/'+ inputData)
    }
    return (
        <form onSubmit={handleSubmit} className="search-form container" id="search">
            <div>
                <h1>Search recipe</h1>
                <input className="search-input" onChange={(e)=>setInputData(e.target.value)} type="text" value={inputData}/>
                <input type="submit" value="Search" className="search-btn"/>
            </div>
        </form>
    )
}
export default Search;