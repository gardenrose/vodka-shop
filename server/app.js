const mongoose = require('mongoose');
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');

//const cors = require('cors');
const app = express()

mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true }, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected'));

const Vodka = require('./models/VodkaModel');
const {signJwt, verifyJwt} = require('./authServer');

const vodkaRouter = require('./routes/vodke');
const vrstaRouter = express.Router();
const podvrsta1Router = express.Router();
const podvrsta2Router = express.Router();
const podvrsta3Router = express.Router();
const userRouter = require('./routes/users');
//const userRouter = express.Router();
//const Vodka = require('./models/VodkaModel');
//const User = require('./models/UserModel');

vrstaRouter.route('/vrste')
.get(verifyJwt, (req, res)=>{
    Vodka.find().distinct('vrsta', function(error, vrste) {
        alert(vrste)
        if (error) {
            return res.send(error);
        }
        return res.json(vrste);
    })
});
app.use('/', vrstaRouter);

podvrsta1Router.route('/obicna')
.get(verifyJwt, (req, res)=>{
    Vodka.find({ "vrsta": "obicna" }).distinct('podvrsta', function(error, podvrste) {
        if (error) {
            return res.send(error);
        }
        return res.json(podvrste);
    })
});
app.use('/', podvrsta1Router);
podvrsta2Router.route('/sOkusom')
.get(verifyJwt, (req, res)=>{
    Vodka.find({ "vrsta": "sOkusom" }).distinct('podvrsta', function(error, podvrste) {
        if (error) {
            return res.send(error);
        }
        return res.json(podvrste);
    })
});
app.use('/', podvrsta2Router);
podvrsta3Router.route('/organskaBiljna')
.get(verifyJwt, (req, res)=>{
    Vodka.find({ "vrsta": "organskaBiljna" }).distinct('podvrsta', function(error, podvrste) {
        if (error) {
            return res.send(error);
        }
        return res.json(podvrste);
    })
});
app.use('/', podvrsta3Router);

//app.use(express.json());
app.use('/vodke', vodkaRouter);
app.use('/users', userRouter);




//app.use(cors);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



app.get('/', (req, res) =>{
    res.send("Welcome to my API!!!");
 })


 app.post('/register', (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const user = {username:username};
    const token = require('jsonwebtoken').sign(user, process.env.SECRET)
    res.json({token : token})
 })
    

 app.post('/login', (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const user = {username:username};
    const token = require('jsonwebtoken').sign(user, process.env.SECRET)
    res.json({token : token})
 })


app.listen(4000);

