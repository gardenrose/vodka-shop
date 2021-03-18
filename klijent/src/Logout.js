import React from "react";
import { navigate } from "@reach/router";

export const Logout = () =>{
    localStorage.setItem("logged in", false);
    localStorage.removeItem("token");
    return (navigate("/login"));
};
export default Logout;