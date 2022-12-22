const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator")
const authMiddle = require("../middleware/authMiddle")
const ListItem = require("../models/listItemModel")

// @route     GET api/item
// @desc      test route
// @@access   public
router.get('/', (req, res) => {
     return res.send('ITEM');
})

// @route     GET api/item/get_all
// @desc      return all items
// @@access   public
router.get('/get_all', async (req, res) => {
    const items = await ListItem.find();
    return res.json(items)
})

// @route     POST api/item/create
// @desc      create a new list item
// @access    private
router.post('/create', [authMiddle,[
  check('title', "No title text received").not().isEmpty(),
  check('description', "No description text received").not().isEmpty(),
]], async(req, res) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()){  
    return res.status(400).json({ errors: errors.array().map(({msg, param}) => ({msg, param})) }) 
  }

  try {
  
    const userId = req.userId
    const { title, description, link, imgLink } = req.query
    const newItem = new ListItem({ title, description, link, imgLink, submittedBy: userId})
    await newItem.save()

    res.json({msg:"success!", userId, id: newItem.id})
    
  } catch (err) {
    
    console.error(err)
    return res.status(500).send({msg:'server error', error: err.message})

  }
}
)
 
module.exports = router