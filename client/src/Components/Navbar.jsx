import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import avatar from "../Images/avatar.png";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const reset = (e) => {
    setSearchTerm("");
  };

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
          <Link to="/" onClick={reset}>
            <h6 className="nav-title">Podcast App</h6>
          </Link>
          <div>
              {/* if we prefer google material symbols we can switch it out with the flaticons */}
              {/* <span className="material-symbols-outlined">account_circle</span> */}
              <img src={avatar}></img>
              <button className="nav-login-btn btn" onClick={login}>Login</button>
              <button className="nav-signup-btn btn" onClick={register}>Sign up</button>
          </div>
      </div>
)};

export default Navbar;
