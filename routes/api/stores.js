const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Store = require("./../../models/Store");

// @route   GET api/stores/
// @desc    Get all stores
// @access  Public
router.get("/", (req, res) => {
  return Store.find()
    .then(stores => {
      res.json(stores);
    })
    .catch(err => {
      res.json(err);
    });
});

// @route   POST api/stores/add
// @desc    Add store
// @access  Private
router.post("/add", (req, res) => {
  const newStore = new Store(req.body);
  newStore.save().then(store => {
    res.json(store);
  });
});

module.exports = router;
