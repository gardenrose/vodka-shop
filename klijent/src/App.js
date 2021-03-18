import React from "react";
import {render} from "react-dom";
import Trazilica from "./Trazilica";
import {Router} from "@reach/router";
import Detalji from "./Detalji";
import Kosarica from "./Kosarica";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";

const App = () =>{
  return(
    <div>
    <Router>
    <Trazilica path ="/"/>
    <Detalji path ="/vrstevodke/:vrsta/:podvrsta/:id"/>
    <Kosarica path ="/kosarica"/>
    <Login path="/login" />
    <Register path="/register" />
    <Logout path="/logout" />
    </Router>
    </div>
    
      
  );
}

render(<App/>, document.getElementById("root"));

export default App;
