import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import avatar from "../Images/avatar.png";
import { useNavigate } from "react-router-dom";

function Navbar() {
<<<<<<< HEAD
    const navigate = useNavigate();

    function login() {
        console.log("log in")
        navigate("/login")
    }

    function register() {
        navigate("/register")
    }

    return (
        <div className="navbar navbar-default navbar-fixed-top">
            <h6 className="nav-title">Podcast App</h6>
            <div>
                {/* if we prefer google material symbols we can switch it out with the flaticons */}
                {/* <span className="material-symbols-outlined">account_circle</span> */}
                <img src={avatar}></img>
                <button className="nav-login-btn btn" onClick={login}>Login</button>
                <button className="nav-signup-btn btn" onClick={register}>Sign up</button>
            </div>
        </div>
)};
=======
  return (
    <div className="navbar navbar-default fixed-top">
      <Link to="/">
        <h6 className="nav-title">Podcast App</h6>
      </Link>
      <div>
        {/* if we prefer google material symbols we can switch it out with the flaticons */}
        {/* <span className="material-symbols-outlined">account_circle</span> */}
        <img src={avatar}></img>
        <button className="nav-login-btn btn">Login</button>
        <button className="nav-signup-btn btn">Sign up</button>
      </div>
    </div>
  );
}
>>>>>>> main

export default Navbar;
