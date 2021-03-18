import React from "react";
import {Link} from "@reach/router";



const Rezultati = ({vodke, vrsta, podvrsta}) =>{

    return(
        <div className="rezultati">
        {
            /*Link to={`/${vrsta}/${podvrsta}/detalji/${id}`}*/
           vodke.map((opcija) =>  <h2>{[opcija.name, " ", <Link to={`/vrstevodke/${vrsta}/${podvrsta}/${opcija.id}`}><button>detalji</button></Link>]}</h2>) 
           
        }
        </div>
    );

    
}
export default Rezultati;