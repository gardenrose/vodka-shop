import React, { useState } from "react";
import {navigate} from "@reach/router";

export const Register = () =>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    
    
    function registracija(usr, pass) {
    
        
        if (usr == "" || pass == "") {
            alert("Registration error");
        } else {
            console.log(usr + " " + pass)
            setUsername(usr);
            setPassword(pass);
            navigate('/login'); 
            console.log(username + " " + password)
            fetch("http://localhost:4000/register", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {"Content-type": "application/json;charset=UTF-8"}
        })
        .then((resp)=>resp.json())
        .then(()=>{
                console.log("User Registered!");
        })
        .catch((err)=>console.log(err));
        }
        
    }

    return(
    <div>
        <div>
        <label htmlFor="username">User name</label>
        <input type="text" id="usrnm"></input>

        <label htmlFor="password">Password</label>
        <input type="password" id="psswrd"></input>

        <button onClick={() => registracija(document.getElementById("usrnm").value, document.getElementById("psswrd").value)}>Registracija</button>
    </div>
    </div>
    )
};
export default Register;