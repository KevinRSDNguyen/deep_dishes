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
      res.status(400).json(err);
    });
});

// @route   POST api/stores/add
// @desc    Add store
// @access  Private
router.post("/add", (req, res) => {
  const newStore = new Store(req.body);
  newStore
    .save()
    .then(store => {
      console.log("sucess");
      res.json(store);
    })
    .catch(err => {
      console.log("err", err);
      res.status(400).json(err);
    });
});

// @route   GET api/stores/:id/
// @desc    Get a store by id
// @access  Public
router.get("/id/:id", (req, res) => {
  Store.findOne({ _id: req.params.id })
    .then(store => {
      res.json(store);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// @route   GET api/stores/slug/:slug
// @desc    Get a store by slug
// @access  Public
router.get("/slug/:slug", (req, res) => {
  Store.findOne({ slug: req.params.slug })
    .then(store => {
      res.json(store);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// @route   POST api/stores/:id/edit
// @desc    Edit store
// @access  Private
router.post("/id/:id/edit", (req, res) => {
  Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true
  })
    .exec()
    .then(store => {
      res.json(store);
    })
    .catch(err => {
      res.status(400).json(err);
    });
  //Confirm they are the owner of the store
  //Edit!
});

// @route   GET api/stores/tags
// @desc    Get a count of all stores with tags
// @access  Public
router.get("/tags", (req, res) => {
  Store.getTagsList()
    .then(tags => {
      res.json(tags);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

// @route   GET api/stores/tags/:tag
// @desc    Get the stores with a specific tag
// @access  Public
router.get("/tags/:tag", (req, res) => {
  Store.find({ tags: req.params.tag })
    .then(stores => {
      res.json(stores);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
