import React from "react";
import "./Navbar.css";
import avatar from "../Images/avatar.png";

function Navbar() {
    return (
        <div className="navbar navbar-default navbar-fixed-top">
            <h6 className="nav-title">Podcast App</h6>
            <div>
                {/* if we prefer google material symbols we can switch it out with the flaticons */}
                {/* <span className="material-symbols-outlined">account_circle</span> */}
                <img src={avatar}></img>
                <button className="nav-login-btn btn">Login</button>
                <button className="nav-signup-btn btn">Sign up</button>
            </div>
        </div>
)};

export default Navbar;