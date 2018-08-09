const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const keys = require("./../../config/keys");
const passport = require("passport");
const { normalizeErrors } = require("../../utils/helpers");

// Load Input Validation
// const validateRegisterInput = require("../../validation/register");
// const validateLoginInput = require("../../validation/login");

//Load User Model
const User = require("../../models/User");

// @route   GET api/users/test
// @desc    Tests user route
// @access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "Users works" });
});

// @route   GET api/users/register
// @desc    Register User
// @access  Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      return newUser.save();
    })
    .then(user => {
      res.json(user);
    })
    .catch(err => res.status(422).json({ errors: normalizeErrors(err) }));
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT token
// @access  Public
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      //Check for User
      if (!user) {
        return res.status(422).json({
          errors: [{ detail: "Incorrect Email or Password" }]
        });
      }

      //Check password
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch)
          return res.status(400).json({
            errors: [{ detail: "Incorrect Email or Password" }]
          });

        const { id, name, avatar } = user;
        const payload = { id, name, avatar };
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      });
    })
    .catch(err => res.status(422).json({ errors: normalizeErrors(err) }));
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id, name, email } = req.user;
    res.json({ id, name, email });
  }
);
//The PP midware above will send unauthorized if not authenticated.

module.exports = router;
