const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @route     GET api/auth
// @desc      authenticate user & get token (login)
// @access    public
router.post(
  "/login",
  [
    check("userName", "Please enter username").not().isEmpty(),
    check("password", "Please enter password").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        errors: errors.array().map(({ msg, param }) => ({ msg, param })),
      });
    }

    const { userName, password } = req.body;
    console.log(userName);

    try {
      let userObj = await User.findOne({ userName });
      //   let userObj = await User.findOne({userName}).lean();

      if (!userObj) {
        console.log("Invalid Credentials: !userObj");
        return res.json({
          errors: [
            {
              msg: "Invalid credentials",
            },
          ],
        });
      }

      const isMatch = await bcrypt.compare(password, userObj.password);

      if (!isMatch) {
        console.log("Invalid Credentials: !isMatch");
        return res.json({
          errors: [
            {
              msg: "Invalid credentials",
            },
          ],
        });
      }

      const token = jwt.sign({ ...userObj }, process.env.JWT_SECRET);

      return res
        .cookie("auth_token", token, { sameSite: "none", secure: true })
        .json({
          avatar: userObj.avatar,
          id: userObj.id,
          userName: userObj.userName,
        });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "server error", err });
    }
  }
);

module.exports = router;
