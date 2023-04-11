import {React} from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
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
          <div className="m-1 mr-2 user-control">
              {/* if we prefer google material symbols we can switch it out with the flaticons */}
              <span className="material-symbols-outlined">account_circle</span>
              <a className="nav-login p-2" onClick={login}>Login</a>
              <a className="nav-signup px-2" onClick={signup}>Sign up</a>
          </div>
      </div>
)};

export default Navbar;
