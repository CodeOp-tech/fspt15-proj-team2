import {React} from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const reset = (e) => {
    setSearchTerm("");
  };

  return (
    <div className="navbar navbar-default fixed-top">
      <Link to="/" onClick={reset}>
        <h6 className="nav-title">Podcast App</h6>
      </Link>
      <div className="navbar-container">
        {/* if we prefer google material symbols we can switch it out with the flaticons */}
        <span className="avatar material-symbols-outlined pink">account_circle</span>
        {/* <img src={avatar}></img> */}
        <button className="nav-login-btn btn">Login</button>
        <button className="nav-signup-btn btn">Sign up</button>
      </div>
    </div>
  );
}

export default Navbar;
