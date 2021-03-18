import React, { useState } from "react";
import { navigate } from "@reach/router";

export const Login = () =>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function logiranje(usr, pass) {
        
        if (usr == "" || pass == "") { // || localStorage.getItem(usr) != pass) {
            alert("Login error");
        } else {
        setUsername(usr);
        setPassword(pass);
        navigate('/');
        localStorage.setItem('logged in', true);
        fetch("http://localhost:4000/login", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {"Content-type": "application/json;charset=UTF-8"}
        })
        .then((resp)=>resp.json())
        .then((data)=>{
            if (data.accessToken) {
                
                localStorage.setItem("token", data.accessToken);
                
            } else {
                console.log("Authentication error");
            }
        })
        .catch((err)=>console.log(err));
        }
        
    }

    return(
    <div>
        <label htmlFor="username">User name</label>
        <input type="text" id="usrnm"></input>

        <label htmlFor="password">Password</label>
        <input type="password" id="psswrd"></input>

        <button onClick={() => logiranje(document.getElementById("usrnm").value, document.getElementById("psswrd").value)}>Login</button>
    </div>
    )
};
export default Login;