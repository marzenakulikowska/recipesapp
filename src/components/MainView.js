import React from "react";
const MainView = ()=>{
    return (
        <div className="main-view">
            <div className="container">
                <div className="main-view-content">
                    <h1 className="main-view-title">Easy recipes <br/> <span>for any occasion</span></h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus congue ex at tempor semper. Suspendisse commodo congue quam, sed faucibus nisl gravida id.Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <div className="btns">
                        <div className="btn btn-popular">
                            <a href="#popular">Most popular recipes</a>
                        </div>
                        <div className="btn">
                            <a href="#search">Search recipes</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MainView;