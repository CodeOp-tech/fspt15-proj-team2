import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  function signup() {
    navigate("/signup");
  }

  function login() {
    navigate("/login");
  }

  const handleChange = (e) => {
    // alternative to writing it separately
    let { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  // send the login info to the database; post method so we have a body
  // previously I had an error because I had an arrow function so it didn't call it correctly in the handleSubmit
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
      let data = await results.json();
      // this reflects the data from the backend users.js line 91 in the console (message, token, and username)
      console.log(data);

      // save the token and username in the local storage with the setItem method (can only do one at a time)
      localStorage.setItem("token", data.token);
      console.log(data.message, data.token, data.username);

      //
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
    console.log("log in successful");
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
            <button className="login-btn" type="submit">
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
