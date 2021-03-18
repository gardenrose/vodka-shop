const express = require('express');
const router = express.Router();
const Vodka = require('../models/VodkaModel');

router.route('/vodke')
.get((req, res)=>{
    const query = {};
    if(req.query.vrsta){
        query.vrsta = req.query.vrsta;
    }
    if(req.query.podvrsta){
        query.podvrsta = req.query.podvrsta;
    }
    Vodka.find(query,(err, vodke)=>{
        if(err){
            return res.send(err);
        }else{
            return res.json(vodke);
        }
    });
});

router.route('/vodke/:id')
.get((req, res)=>{    
    Vodka.findById(req.params.id, (err, vodka)=>{
        if(err){
            return res.send(err);
        }else{
            return res.json(vodka);
        }
    });
});

router.get('/', async (req, res) => {
  try {
    const vodke = await Vodka.find();
    res.json(vodke);
  } catch(error) {
    res.send(error);
  }
})


router.get('/:id', getVodka, (req, res) => {
  res.json(res.vodka);
})


router.post('/', async (req, res) => {
  const vodka = new Vodka({
    ime: req.body.ime,
    vrsta: req.body.vrsta,
    podvrsta: req.body.podvrsta,
    cijena: req.body.cijena,
    images: req.body.images
  })
  try {
    const novaVodka = await vodka.save()
    res.json(novaVodka)
  } catch (err0) {
    res.json({ message: err0.message })
  }
})


router.patch('/:id', getVodka, async (req, res) => {
  if (req.body.ime != null) {
    res.vodka.ime = req.body.ime
  }
  if (req.body.vrsta != null) {
    res.vodka.vrsta = req.body.vrsta
  }
  if (req.body.podvrsta != null) {
    res.vodka.podvrsta = req.body.podvrsta
  }
  if (req.body.cijena != null) {
    res.vodka.cijena = req.body.cijena
  }
  try {
    const update = await res.vodka.save()
    res.json(update)
  } catch (err) {
    res.json({ message: err.message })
  }
})


router.delete('/:id', getVodka, async (req, res) => {
  try {
    await res.vodka.remove()
  } catch (err) {
    res.json({ message: err.message })
  }
})

async function getVodka(req, res, next) {
  var vodka
  try {
    vodka = await Vodka.findById(req.params.id)
  } catch (err) {
    return res.json({ message: err.message })
  }

  res.vodka = vodka
  next()
}

module.exports = router