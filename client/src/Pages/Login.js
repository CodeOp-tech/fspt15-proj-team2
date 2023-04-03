import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setAuth }){
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    function createNewUser() {
        navigate("/register")
    }

    const handleChange = (e) => {
        // alternative to writing it separately
        let { name, value } = e.target;
        setUser((user) => ({...user, [name]: value}))
    }

    // send the login info to the database; post method so we have a body
    // previously I had an error because I had an arrow function so it didn't call it correctly in the handleSubmit
    async function login() {
        try {
            // will this syntax be correct?
            let body = user;
                 
            let options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }
            let results = await fetch("/users/login", options);
            let data = await results.json();
            // this reflects the data from the backend users.js line 91 in the console (message, token, and username)
            console.log(data);

            // save the token and username in the local storage with the setItem method (can only do one at a time)
            //? what format does this have to be if we set multiple items
            localStorage.setItem("token", data.token)
            localStorage.setItem("username", data.username)
            console.log(data.message, data.token, data.username)

            setAuth(true);
            if (localStorage.getItem("username") === "admin") {
                setIsAdminLoggedIn(true)
                navigate("/admin")
            } else {
                navigate("/parent")
            }


        } catch(err) {
            console.log(err)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        login();
        console.log("log in successful")
        // can we create a conditional here that if the user is admin then it takes us to the private routes and then if it is a parent then it will go to where it needs to be?
        // navigate("/")
        
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <div className="row justify-content-center">
                    <div className="form-floating mt-3 mb-3 col-md-10 col-10">
                        <input 
                            type="username" 
                            className="form-control mr-3" name="username"
                            value = {user.username}
                            onChange={handleChange}
                        />
                        <label className="mx-1" for="username">Username</label>
                    </div>
                    <div className="form-floating col-md-10 col-10">
                        <input 
                            type="password" 
                            className="form-control" 
                            name="password"
                            value = {user.password}
                            onChange={handleChange}
                        />
                        <label className="mx-1" for="password">Password</label>
                    </div>
                    
                    
                </div>
                <div className="text-center m-3">
                    <button className="login-btn" type="submit">Log in</button>
                </div>  
                <div className="text-center m-3">
                    <h6>No account?</h6>
                    <button className="register-btn m-2" onClick={createNewUser}>Register</button>
                </div>
            </form>
            
            
        </>
    ) 
}