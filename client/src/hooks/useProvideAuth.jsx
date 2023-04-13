import { useState } from "react";
import { useNavigate } from "react-router-dom";

// lets us know if the user has a token and if they are allowed to view the info
// can be accessed all throughout

export default function useProvideAuth() {
  // this is a boolean; the double exclamation transforms this into a boolean
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [currentUser, setCurrentUser] = useState({
    firstName: "User",
    email: "user@gmail.com",
    username: "user",
  });
  const navigate = useNavigate();

  // our login has a check in the backend; if the user tries to login with a username that doesn't exist then they will be taken to the signup page
  const login = async (user) => {
    try {
      let options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      };

      let results = await fetch("/users/login", options);

      //if user was found on server
      if (results.ok) {
        let data = await results.json();
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        setCurrentUser(data.user);
        navigate("/account");
      } else {
        navigate("/signup");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setIsLoggedIn(null);
    setCurrentUser({});
    navigate("/");
  };

  return {
    isLoggedIn,
    login,
    logout,
    currentUser,
  };
}
