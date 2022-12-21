const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator")
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// @route     GET api/users
// @desc      test route
// @@access   public
router.get('/', (req, res) => {
    res.send('USER');
})

// @route     GET api/users/get_all
// @desc      return all users
// @@access   public
router.get('/get_all', async (req, res) => {
    const users = await User.find();
    return res.json(users)
})


// @route     POST api/users
// @desc      register user
// @@access   public
router.post('/create', [
  check('userName', 'Tell us your name, stranger').not().isEmpty(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6})
], async (req, res) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array().map(({msg, param}) => ({msg, param})) })

  
  try {
      
    const { userName, password } = req.query
    let user = await User.findOne({ userName })
    if(user){
      return res.status(400).json({
        errors:[{ msg: 'Username taken' }]
      })
    }

    user = new User({userName, password}) 
    const salt = await bcrypt.genSalt(10) 
    user.password = await bcrypt.hash(password, salt) 
    await user.save() 

    const jwtPayload = { id: user.id }

    jwt.sign(
      jwtPayload,
      process.env.JWT_SECRET,
      { expiresIn:36000 }, // 10 hours
      // { expiresIn:3600 }, // 1 hour
      (err, token) => {
        if(err) throw err;
        res.json({ token, user })
      }
    )
  } catch (err) {

    console.error(err.message)
    return res.status(500).json({msg:'server error', error: err.message})
    
  }
})

module.exports = router