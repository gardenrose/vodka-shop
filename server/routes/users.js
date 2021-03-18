const express = require('express')
const router = express.Router()
const User = require('../models/UserModel')
const {signJwt, verifyJwt} = require('../authServer');

router.route('/login')
.post((req, res)=>{
    User.find({username: req.body.username}, function (users) { 
        try{
            if (req.body.password !== users[0].password) {
                const token = signJwt(users[0]._id);
                return res.json({accessToken: token, user: users[0].username});
            } 
        }catch(err) {
            return res.json({ message: err.message })
        }
    })
});

router.route('/register')
.post((req, res)=>{
    User.find({username: req.body.username}, function (users) {
        if (users.length > 0) {
            return res.json({ message: err.message });
        } else {
          try{
            let user = new User({username: req.body.username, password: req.body.password});
        user.save();

        return res.json(user);
        } catch(err) {
            return res.json({ message: err.message })
        }
      }
    })
});


router.get('/', async (req, res) => {
  try {
    const allUsers = await User.find()
    res.json(allUsers)
  } catch (err) {
    res.json({ message: err.message })
  }
})


router.get('/:id', getUser, (req, res) => {
  res.json(res.user)
})


router.post('/', async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  })
  try {
    const novi = await user.save()
    res.json(novi)
  } catch (err) {
    res.json({ message: err.message })
  }
})


router.patch('/:id', getUser, async (req, res) => {
  if (req.body.username != null) {
    res.user.username = req.body.username
  }
  if (req.body.password != null) {
    res.user.password = req.body.password
  }
  try {
    const update = await res.user.save()
    res.json(update)
  } catch (err) {
    res.json({ message: err.message })
  }
})


router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove()
  } catch (err) {
    res.json({ message: err.message })
  }
})

async function getUser(req, res, next) {
  let user
  try {
    user = await User.findById(req.params.id)
  } catch (err) {
    return res.json({ message: err.message })
  }

  res.user = user
  next()
}

module.exports = router