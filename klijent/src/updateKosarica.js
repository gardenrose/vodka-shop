
import React from "react";

function updateKosarica(name, price){
    //console.log(key + value);
    var ukupniIznos = JSON.parse(localStorage.getItem("ukupniIznos"));
    if (ukupniIznos) {
        ukupniIznos += price;
    } else {
        ukupniIznos = price;
    }
    var stvari = JSON.parse(localStorage.getItem("stvari"));
    if (stvari == null) {
        stvari = [];
        stvari.push(name + " " + price + " " + 1);
    } else {
        var postojiUkosarici = false;
        for (var i = 0; i < stvari.length; i++) {
            if(stvari[i].includes(name)) {
                var kolicina = stvari[i].split(" ")[3]
                var povecanaKolicina = parseInt(kolicina) + 1;
                stvari[i] = name + " " + price + " " +povecanaKolicina;
                postojiUkosarici = true;
                break;
            }
        }

        if (!postojiUkosarici) {
            stvari.push(name + " " + price + " " + 1);
        }
    } 
    
    localStorage.setItem("stvari", JSON.stringify(stvari));
    localStorage.setItem("ukupniIznos", ukupniIznos);

    
}
export default updateKosarica;