import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import UserContext from "../UserContext";

export default function Login() {
  const auth = useContext(UserContext);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  function signup() {
    navigate("/signup");
  }

  const handleChange = (e) => {
    // alternative to writing it separately
    let { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  // send the login info to the database; post method so we have a body
  async function login() {
    try {
      // will this syntax be correct?
      let body = user;

      let options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      };

      let results = await fetch("/users/login", options);
      console.log(results)
      let data = await results.json();
      console.log(data);

      // save the token and username in the local storage with the setItem method (can only do one at a time)
      localStorage.setItem("token", data.token);
      console.log(data.message, data.token, data.user);

      // three conditionals
        // if the user logs in and has no favorites, navigate to the landing page
        // if the user was saving favorites and was in a certain page then redirect them to the page they were on at log in
        // if the user has favorites, but was not in a certain page then just redirect to the 
      if (localStorage.getItem("token")) {
        navigate("/account");
      } else {
        navigate("/signup");
      }
    } catch (err) {
      console.log(err);
    }
  }

  

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
    navigate("/account");
  };

  return (
    <>
      <Navbar></Navbar>
      <h2 className="text-center m-4">Log in</h2>
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-column flex-wrap justify-content-between align-items-center">
          <div className="form-floating mt-3 mb-3 col-md-10 col-10 col-lg-5 m-1">
            <input
              type="username"
              className="form-control"
              name="username"
              value={user.username}
              onChange={handleChange}
            />
            <label className="mx-1" htmlFor="username">
              Username
            </label>
          </div>
          <div className="form-floating col-md-10 col-10 col-lg-5 m-1">
            <input
              type="password"
              className="form-control"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
            <label className="mx-1" htmlFor="password">
              Password
            </label>
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center flex-column flex-wrap m-2">
          <div className="m-2 ">
            <button onClick={auth.login} className="login-btn" type="submit">
              Log in
            </button>
          </div>
          <div className="m-2 text-center">
            <h6 className="m-2">
              No account?{" "}
              <a className="link" onClick={signup}>
                Sign up!
              </a>
            </h6>
          </div>
        </div>
      </form>
    </>
  );
}
