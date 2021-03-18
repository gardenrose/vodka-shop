import React from "react";


const Kosarica = () =>{

    const stvari = localStorage.getItem("stvari").replace("[", "").replace("]","").split(",");
    const cijena = localStorage.getItem("ukupniIznos");
    
    return(
        <div className="kosarica">
        {
            <dialog open>
            <h2 align="center">Kosarica</h2>
            <p>&nbsp;</p>
            {stvari.map((proizvod)=><h4>{proizvod}</h4>)}
            <p>&nbsp;</p>
            <h4>Ukupni iznos: ${cijena}</h4>
            </dialog>
        }
        </div>
    );
    
}
export default Kosarica;