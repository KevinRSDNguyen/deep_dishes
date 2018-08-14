const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const { normalizeErrors, confirmOwner } = require("./../utils/helpers");
const { auth } = require("./../middleware/index");

const Store = require("./../models/Store");
const Review = require("./../models/Review");

// @route   GET api/stores/
// @desc    Get all stores
// @access  Public
router.get("/", (req, res) => {
  return Store.find()
    .then(stores => {
      res.json(stores);
    })
    .catch(err => res.status(422).json({ errors: normalizeErrors(err) }));
});

// @route   POST api/stores/add
// @desc    Add store
// @access  Private
router.post("/add", auth, (req, res) => {
  req.body.author = req.user._id;
  const newStore = new Store(req.body);
  newStore
    .save()
    .then(store => {
      res.json(store);
    })
    .catch(err => res.status(422).json({ errors: normalizeErrors(err) }));
});

// @route   GET api/stores/:id/
// @desc    Get a store by id
// @access  Public
router.get("/id/:id", (req, res) => {
  Store.findOne({ _id: req.params.id })
    .populate("author", "_id name email")
    .exec()
    .then(store => {
      res.json(store);
    })
    .catch(err => res.status(422).json({ errors: normalizeErrors(err) }));
});

// @route   GET api/stores/slug/:slug
// @desc    Get a store by slug
// @access  Public
router.get("/slug/:slug", (req, res) => {
  Store.findOne({ slug: req.params.slug })
    .populate("author", "_id name email")
    .populate("reviews")
    .exec()
    .then(store => {
      res.json(store);
    })
    .catch(err => res.status(422).json({ errors: normalizeErrors(err) }));
});

// @route   POST api/stores/id/:id/edit
// @desc    Edit store
// @access  Private
router.post("/id/:id/edit", auth, (req, res) => {
  Store.findOne({ _id: req.params.id })
    .then(store => {
      if (!confirmOwner(store, req.user)) {
        return res.status(400).json({
          errors: [{ detail: "You must have created this store to edit it!" }]
        });
      }
      return Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true
      })
        .exec()
        .then(store => {
          res.json(store);
        });
    })
    .catch(err => res.status(422).json({ errors: normalizeErrors(err) }));
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
    .catch(err => res.status(422).json({ errors: normalizeErrors(err) }));
});

// @route   GET api/stores/tags/:tag
// @desc    Get the stores with a specific tag
// @access  Public
router.get("/tags/:tag", (req, res) => {
  Store.find({ tags: req.params.tag })
    .then(stores => {
      res.json(stores);
    })
    .catch(err => res.status(422).json({ errors: normalizeErrors(err) }));
});

// @route   GET api/stores/search?q=cofee
// @desc    Get the stores with search term in name OR description
// @access  Public
router.get("/search", (req, res) => {
  Store.find(
    {
      $text: {
        $search: req.query.q
      }
    },
    {
      //Here we are adding a new field called score
      //Docs with more instances of coffee get higher score
      score: { $meta: "textScore" }
    }
  )
    .sort({
      score: { $meta: "textScore" }
    })
    .limit(100)
    .exec()
    .then(stores => {
      res.json(stores);
    })
    .catch(err => res.status(422).json({ errors: normalizeErrors(err) }));
});

// @route   GET api/stores/near?lat=43&lng=-179
// @desc    Get stores near
// @access  Public
router.get("/near", (req, res) => {
  const coordinates = [req.query.lng, req.query.lat].map(parseFloat);
  const q = {
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates
        },
        $maxDistance: 10000 // 10km
      }
    }
  };
  Store.find(q)
    .select("slug name description location") //Only fields we want
    .limit(100)
    .then(stores => {
      res.json(stores);
    })
    .catch(err => res.status(422).json({ errors: normalizeErrors(err) }));
});

// @route   POST api/stores/:id/heart
// @desc    Heart or Unheart a store
// @access  Private
router.post("/:id/heart", auth, (req, res) => {
  const hearts = req.user.hearts.map(obj => {
    return obj.toString();
  });
  const operator = hearts.includes(req.params.id) ? "$pull" : "$addToSet";
  User.findByIdAndUpdate(
    req.user._id,
    { [operator]: { hearts: req.params.id } }, //use [] for js vars in mongo query
    { new: true } //return updated user
  )
    .then(user => {
      res.json({ success: true });
    })
    .catch(err => res.status(422).json({ errors: normalizeErrors(err) }));
});

// @route   POST api/stores/hearts
// @desc    Return stores that User has hearted
// @access  Private
router.get("/hearts", auth, (req, res) => {
  Store.find({
    _id: { $in: req.user.hearts }
  })
    .then(stores => {
      res.json(stores);
    })
    .catch(err => res.status(422).json({ errors: normalizeErrors(err) }));
});

// @route   POST api/stores/add_review/id
// @desc    Add review to a store
router.post("/add_review/:id", auth, (req, res) => {
  req.body.author = req.user._id;
  req.body.store = req.params.id;
  const newReview = new Review(req.body);
  newReview
    .save()
    .then(() => {
      res.json({ success: true });
    })
    .catch(err => res.status(422).json({ errors: normalizeErrors(err) }));
});

// @route   GET api/stores/top
// @desc    Add review to a store
router.get("/top", (req, res) => {
  Store.getTopStores()
    .then(stores => {
      res.json(stores);
    })
    .catch(err => res.status(422).json({ errors: normalizeErrors(err) }));
});

module.exports = router;