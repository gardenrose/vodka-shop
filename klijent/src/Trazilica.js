import React, {useState, useEffect} from "react";
import Rezultati from "./Rezultati";
import {navigate} from "@reach/router";

const Trazilica = () => {
    
    const [vrsteVodke, setVrste] = useState([]);
    const [vrsta, setVrsta] = useState("obicna");
    const [podvrste, setPodvrste] = useState([]);
    const [podvrsta, setPodvrsta] = useState("alc50");
    const [vodke, setVodke] = useState([]);
    var loggedin = localStorage.getItem('logged in');
    

    useEffect(()=>{
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};
        fetch("http://localhost:4000/vrste", options)
        .then((response)=>response.json())
        .then((vrsteVodke)=>setVrste(vrsteVodke));
    },
    
    []);

    useEffect(()=>{
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};
        fetch(`http://localhost:4000/${vrsta}`, options)
        .then((response)=>response.json())
        .then((podvrste)=>setPodvrste(podvrste));
    },
    
    []);

    function postaviVrstuIPodvrste(v) {
        setVrsta(v);
        fetch(`http://localhost:4000/${v}`)
        .then((response)=>response.json())
        .then(({podvrste})=>setPodvrste(podvrste));
        
    }

    function postaviPodvrstu(v) {
        fetch(`http://localhost:4000/${v}`)
        .then((response)=>response.json())
        .then(({podvrste})=>setPodvrsta(podvrste[0]));
    }

    function dohvatiVodke(){
        fetch(`http://localhost:4000/vodke?vrsta=${vrsta}&podvrsta=${podvrsta}`)
        .then((response)=> response.json())
        .then((vodke)=>(setVodke(vodke)));
    }

    
    return(
        
        <div>
        {(loggedin) ?<button id="in" onClick={() => navigate("/logout")}>Odjava</button>
        :<button id="out" onClick={() => navigate("/login")}>Prijava</button>}
        <button id="reg" onClick={() => navigate("/register")}>Registracija</button> 
        <div className="trazilica">
           <img src="https://i.pinimg.com/originals/b0/c4/93/b0c4935e2516978f0e096dcfeaebacdd.png" width="600" height="639" align="left"></img>
           
           <h1>Vodka</h1>
           <select id="selectVrsta"  onChange = {(e) => {postaviVrstuIPodvrste(e.target.value); postaviPodvrstu(e.target.value)}}>
               {vrsteVodke.map((opcija)=>{return <option value={opcija}>{opcija}</option>})}
           </select>
            
            <select id = "selectPodvrsta" onChange = {(e) => setPodvrsta(e.target.value)}>
            {podvrste.map((opcija)=>{return <option value={opcija}>{opcija}</option>})}
            </select>
            <button onClick = {dohvatiVodke}>Odaberi</button>
            
            {<Rezultati vodke = {vodke} vrsta = {vrsta} podvrsta = {podvrsta}/>}
            {/*vodke.map((opcija) => <h2>{opcija.name}</h2>)*/}
            </div>
        </div>
    );

}

export default Trazilica;