import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register(){
    const navigate = useNavigate();

    const [userRegistration, setUserRegistration] = useState({
        username: "",
        password: "",
        studentLastName: "",
        studentID: 0
    })

    // we need to put this on every input so it catches the change in information onChange={() => handleChange(e)}
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserRegistration((userRegistration) => ({...userRegistration, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setUserRegistration({ ...userRegistration,
            username: event.target.value,
            password: event.target.value,
            studentLastName: event.target.value,
            studentID: event.target.value
        })
        register();
        // we know that it grabs the necessary information from our table, we just have to save this to our database
        console.log(userRegistration)
        navigate("/")
    }

    async function register() {
        try {
            let body = userRegistration;
                 
            let options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }

            // the fetch needs to match the API route in the backend
            let results = await fetch("/users/register", options);
            let data = await results.json();
            // this shows us the token in the console (reflects the data from the backend users.js line 91)
            console.log(data);

            // how do I check that this works and the user can be taken to the login page to log in?


        } catch(err) {
            console.log({message: err.message})
        }
    }
    

    return(
        <>
            <h2 className="text-center m-4"> Registration Form</h2>
            <h6 className="text-center m-4">The student ID was sent via email</h6>
            <form onSubmit={handleSubmit}>
                {/* the information from this page must match a child in the database for the user to create an account */}
                {/* this way we already know which ID the account is attached to and which child's progress will be viewable */}
                <div className="row justify-content-center">
                    <div className="form-floating mb-3 col-md-10 col-10">
                        <input 
                            type="number" 
                            className="form-control mr-3" name="email"
                            value = {userRegistration.email}
                            onChange={(event) => handleChange(event)}  
                        />
                        <label className="mx-1" for="studentID">E-mail</label>
                    </div>
                    <div className="form-floating mb-3 col-md-10 col-10">
                        <input 
                            // type="text" text is default so this is unnecessary
                            className="form-control mr-3" name="firstName"
                            value = {userRegistration.firstName}
                            onChange={(event) => handleChange(event)}  
                        />
                        <label className="mx-1" for="studentLastName">First Name</label>
                    </div>
                    <div className="form-floating mb-3 col-md-10 col-10">
                        <input 
                            type="username" 
                            className="form-control mr-3" 
                            name="username"
                            value = {userRegistration.username}
                            onChange={(event) => handleChange(event)}  
                        />
                        <label className="mx-1" for="username">Username</label>
                    </div>
                    <div className="form-floating col-md-10 col-10">
                        <input 
                            type="password" 
                            className="form-control" 
                            name="password"
                            value = {userRegistration.password}
                            onChange={(event) => handleChange(event)} />
                        <label className="mx-1" for="password">Password</label>
                    </div>

                    
                </div>
                <div className="text-center m-3">
                    <button type="submit" className="register-btn m-2">Register</button>
                </div>  
            </form>

        </>
    ) 
}
