import React from "react";
import "./Navbar.css";

function Navbar() {
    return (
        <div className="navbar navbar-default navbar-fixed-top">
            <p className="nav-title">Podcast App</p>
            <div>
                <button className="nav-btn">Login</button>
                <button className="nav-btn">Sign up</button>
            </div>
        </div>
)};

export default Navbar;
