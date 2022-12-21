const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.send('TESTING 123');
})

module.exports = router;