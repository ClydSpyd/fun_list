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
  const items = await ListItem.find().populate('submittedBy');
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
    console.log(userId);
    const { title, description, link, imgLink, tags } = req.body
    const newItem = new ListItem({ title, description, link, imgLink, tags, submittedBy: userId})
    await newItem.save()
    console.log(newItem);
    console.log('tags');
    console.log(tags);

    res.json({msg:"success!", userId, id: newItem.id, newItem})
    
  } catch (err) {
    
    console.error(err)
    return res.status(500).send({msg:'server error', error: err.message})

  }
}
)

// @route     POST api/item/edit/:id
// @desc      edit list item
// @access    private
router.post('/edit/:id', [authMiddle,[
  check('id', "No item ID received").not().isEmpty(),
  check('title', "No title text received").not().isEmpty(),
  check('description', "No description text received").not().isEmpty(),
]], async(req, res) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()){  
    return res.status(400).json({ errors: errors.array().map(({msg, param}) => ({msg, param})) }) 
  }

  try {
  
    // const userId = req.userId
    // console.log(userId);
    const { title, description, link, imgLink, tags } = req.body
    // const newItem = new ListItem({ title, description, link, imgLink, tags, submittedBy: userId})
    // await newItem.save()

    const { id } = req.params;
    const item = await ListItem.findOne({_id: id});

    if (title) {item.title = title};
    if (description) {item.description = description};
    if (link) {item.link = link};
    if (imgLink) {item.imgLink = imgLink};
    if (tags) {item.tags = tags};

    await item.save();

    res.json({msg:"success!", id, item})
    
  } catch (err) {
    
    console.error(err)
    return res.status(500).send({msg:'server error', error: err.message})

  }
}
)

router.post('/delete', [authMiddle,[
  check('id', "No id received").not().isEmpty(),
]], async(req, res) => {
  console.log('hello')
  try {
    const {id} = req.body
    console.log(id)
    const item = await ListItem.findOneAndDelete({ _id: id });
    console.log(item);
  } catch (error) {
    console.log(error)
  }
  res.send('hello_world__')
})
 
module.exports = router