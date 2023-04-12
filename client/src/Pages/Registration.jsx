import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

export default function Registration() {
  const navigate = useNavigate();

  function login() {
    navigate("/login");
  }

  const [userRegistration, setUserRegistration] = useState({
    firstName: "",
    email: "",
    username: "",
    password: "",
  });

  // we need to put this on every input so it catches the change in information onChange={() => handleChange(e)}
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserRegistration((userRegistration) => ({
      ...userRegistration,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUserRegistration({
      ...userRegistration,
      firstName: event.target.value,
      email: event.target.value,
      username: event.target.value,
      password: event.target.value,
    });
    signup();
    // we know that it grabs the necessary information from our table, we just have to save this to our database
    console.log(userRegistration);
    // add a conditional that makes it so that it only brings us to the login page if the user account is successfully create
    login();
  };

  async function signup() {
    try {
      let body = userRegistration;

      let options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      };

      // the fetch needs to match the API route in the backend
      let results = await fetch("/users/signup", options);
      console.log(results);
      await results.json();
    } catch (err) {
      console.log({ message: err.message });
    }
  }

  

  return (
    <>
      <Navbar></Navbar>
      <h2 className="text-center m-4">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="row justify-content-center">
          <div className="row form-floating mb-3 col-md-10 col-10 col-lg-5 m-1">
            <input
              // type="text" text is default so this is unnecessary
              className="form-control mr-3"
              name="firstName"
              value={userRegistration.firstName}
              onChange={(event) => handleChange(event)}
            />
            <label className="mx-2" htmlFor="firstName">
              First Name
            </label>
          </div>
          <div className="row form-floating mb-3 col-md-10 col-10 col-lg-5 m-1">
            <input
              type="email"
              className="form-control mr-3"
              name="email"
              value={userRegistration.email}
              onChange={(event) => handleChange(event)}
            />
            <label className="mx-2" htmlFor="email">
              E-mail
            </label>
          </div>

          <div className="row form-floating mb-3 col-md-10 col-10 col-lg-5 m-1">
            <input
              className="form-control"
              name="username"
              value={userRegistration.username}
              onChange={(event) => handleChange(event)}
            />
            <label className="mx-2" htmlFor="username">
              Username
            </label>
          </div>
          <div className="row form-floating col-md-10 col-10 col-lg-5 m-1">
            <input
              type="password"
              className="form-control"
              name="password"
              value={userRegistration.password}
              onChange={(event) => handleChange(event)}
            />
            <label className="mx-2" htmlFor="password">
              Password
            </label>
          </div>
        </div>
        <div className="text-center m-3">
          <button type="submit" className="register-btn m-2">
            Sign up
          </button>
        </div>
      </form>
    </>
  );
}
