const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slugs"); //Helps make url more friendly

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Please enter a store name", //Will require it and pass this msg.
    minlength: [4, "Too short, store name must be at least 4 characters."]
  },
  slug: String, // Auto generated whenever someone saves
  description: {
    type: String,
    trim: true
  },
  photo: {
    type: String,
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: "You must supply an author"
  },
  tags: [String],
  created: {
    type: Date,
    default: Date.now
  },
  location: {
    type: {
      type: String,
      default: "Point"
    },
    coordinates: [
      {
        type: Number,
        required: "You must supply coordinates"
      }
    ],
    address: {
      type: String,
      required: "You must supply an address!"
    }
  }
});

//Define our indexes for faster lookup
storeSchema.index({
  name: "text",
  description: "text"
});

storeSchema.index({ location: "2dsphere" });

storeSchema.pre("save", function(next) {
  if (!this.isModified("name")) {
    //so slug is only changed if name was changed b4 save
    next();
    return;
  }
  this.slug = slug(this.name);
  //See if there are stores with same slug
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, "i");
  this.constructor.find({ slug: slugRegEx }).then(storesWithSlug => {
    if (storesWithSlug.length > 0) {
      this.slug = `${this.slug}-${storesWithSlug.length + 1}`;
    }
    next();
  });
});

storeSchema.statics.getTagsList = function() {
  return this.aggregate([
    { $unwind: "$tags" }, //if a restaurant has three tags, it will return the three copies of the restaurant but each with a different tag.
    { $group: { _id: "$tags", count: { $sum: 1 } } },
    { $sort: { count: -1 } } //sort by count descending
  ]);
};

module.exports = mongoose.model("Store", storeSchema);
