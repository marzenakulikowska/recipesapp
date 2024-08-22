import React from "react";
import {Link} from "react-router-dom";
const MainView = ()=>{
    return (
        <div className="main-view">
            <div className="container">
                <div className="main-view-content">
                    <h1 className="main-view-title">Easy recipes <br/> <span>for any occasion</span></h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus congue ex at tempor semper. Suspendisse commodo congue quam, sed faucibus nisl gravida id.Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <div className="btns">
                        <div className="btn btn-popular">
                            <Link to="#popular">Most popular recipes</Link>
                        </div>
                        <div className="btn">
                            <Link to="#search">Search recipes</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MainView;