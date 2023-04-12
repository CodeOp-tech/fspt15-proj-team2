import { useState } from "react";

// lets us know if the user has a token and if they are allowed to view the info
// can be accessed all throughout



export default function useProvideAuth() {
    // this is a boolean; the double exclamation transforms this into a boolean
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    const [currentUser, setCurrentUser] = useState({firstName: "sample", email: "sample@gmail.com", username: "sample"})

    const login = async (user) => {
        try {
            let options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            };

            // in the demo with axios this has user... do I just pass this along with options for this case?
            let results = await fetch("/users/login", user, options);
            let data = await results.json();

            localStorage.setItem("token", data.token);
            setIsLoggedIn(true);
            setCurrentUser(data.user);
        } catch (err) {
            throw err.response.data.message;
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(null);
        setCurrentUser({})
    }


    return {
        isLoggedIn,
        login,
        logout,
        currentUser
    }
}