import React from "react";
import Modal from "./Modal";
import {navigate} from "@reach/router";
import updateKosarica from "./updateKosarica";

class Detalji extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        this.props = {vrsta:props.vrsta, podvrsta:props.podvrsta, id:props.id};
    }

    componentDidMount(){
        document.body.style.backgroundColor = "#566573";
        //fetch(`http://demo9197135.mockable.io/vrstevodke/${this.props.vrsta}/${this.props.podvrsta}`)
        fetch(`http://localhost:4000/vodke?vrsta=${this.props.vrsta}&podvrsta=${this.props.podvrsta}`)
        .then((response)=>response.json())
        .then(({vodke})=>{
            for (var i=0; i <vodke.length;i++) {
                if (vodke[i].id == this.props.id) {
                    this.setState({
                        name:vodke[i].name,
                        id:vodke[i].id,
                        img1:vodke[i].images[0],
                        img2:vodke[i].images[1],
                        price:vodke[i].price
                    });break;
                    
                }
            }
            //alert("Rusija " + vodke[i].id + " " + this.props.id + " " +vodke[i].name + " " + this.state.name + " " + this.state.price);
        //}).catch((err)=>(alert("Nisi iz rusije ne mozes pit' vodku \n" + this.props.vrsta + this.props.podvrsta +  " " + this.props.id + " " + this.props.name)));
        }).catch( (err) => console.log(err));
    }


    changeModalState = () => this.setState({showModal:!this.state.showModal});
    kosarica = () => navigate("/kosarica");

    render(){

        const {name, id, img1, img2, price} = this.state;
        return(
            
            <div className="detalji">
                           
                <img src={img1} align="left"></img>
                <img src={img2} align="right"></img>
                <h2 align="center">{name} {this.props.podvrsta} vodka</h2>
                <hr></hr>
                <p>&nbsp;</p> 
                <h3 align="center">vrsta: {this.props.vrsta}</h3>
                <h3 align="center">podvrsta: {this.props.podvrsta}</h3>
                <h3 align="center">proizvodjac: {name}</h3>
                <h3 align="center">cijena: ${price}</h3>
                
                {
                this.state.showModal ? (
                    <Modal>
                        <div>
                            <dialog open>
                            <h3>Uspjesno dodano u kosaricu !</h3>
                            <h3>Zelite li vidjeti trenutno stanje kosarice ?</h3>
                            <div className="buttons" align="center">
                                <button onClick={this.changeModalState}>Ne</button>
                                <button onClick={this.kosarica}>Da</button>
                            </div>
                            </dialog>
                        </div>
                    </Modal>
                ):null
            }
                <p>&nbsp;</p> 
                <p>&nbsp;</p> 
                <p>&nbsp;</p> 
                <p>&nbsp;</p> 
                <p>&nbsp;</p> 
                <button align="center" onClick ={() => {updateKosarica(this.state.name + " "+ this.props.podvrsta, price); this.changeModalState()}}>Dodaj u kosaricu</button>
                </div>    
                
        );
    }
}
export default Detalji;