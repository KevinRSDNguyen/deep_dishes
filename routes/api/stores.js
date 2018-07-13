const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Store = require("./../../models/Store");

// @route   POST api/stores/add
// @desc    Add store
// @access  Private
router.post("/add", (req, res) => {
  res.json(req.body);
});

module.exports = router;
