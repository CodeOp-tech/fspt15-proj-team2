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
      navigate("/login")
  }

  function signup() {
      navigate("/signup")
  }

  function account() {
    navigate("/account")
  }

  return (
      <div className="navbar navbar-default navbar-fixed-top">
          <Link to="/" onClick={reset}>
            <h6 className="nav-title">Podcast App</h6>
          </Link>
          <div>
              {/* if we prefer google material symbols we can switch it out with the flaticons */}
              {/* <span className="material-symbols-outlined">account_circle</span> */}
              <img src={avatar} onClick={account}></img>
              <button className="nav-login-btn btn" onClick={login}>Login</button>
              <button className="nav-signup-btn btn" onClick={signup}>Sign up</button>
          </div>
      </div>
)};

export default Navbar;
