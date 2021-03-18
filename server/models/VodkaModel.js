const mongoose = require('mongoose');



const vodkaModel = new mongoose.Schema({
    ime:{type:String, required:true},
    vrsta:{type:String, required:true},
    podvrsta:{type:String, required:true},
    cijena:{type:String, required: true},
    images: [{type: String, default:''}]
    
});

module.exports = mongoose.model('Vodka', vodkaModel);