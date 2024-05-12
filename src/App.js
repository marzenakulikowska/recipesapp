import React from "react";
import Header from "./components/Header"
import Pages from "./pages/Pages";
import CategoryCuisine from "./components/CategoryCuisine";
import {BrowserRouter} from "react-router-dom";
import Search from "./components/Search"
import CategoryDiet from "./components/CategoryDiet";
import Footer from "./components/Footer";
const App=()=>{
  return (
    <div className="App">
        <BrowserRouter>
            <Header/>
            <Pages/>
            <Footer/>
        </BrowserRouter>
    </div>
  );
}

export default App;
