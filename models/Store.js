const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slugs"); //Helps make url more friendly

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Please enter a store name" //Will require it and pass this msg.
  },
  slug: String, // Auto generated whenever someone saves
  description: {
    type: String,
    trim: true
  },
  tags: [String]
});

storeSchema.pre("save", function(next) {
  if (!this.isModified("name")) {
    //so slug is only changed if name was changed b4 save
    next();
    return;
  }
  this.slug = slug(this.name);
  next();
  //TODO make more resilient so slugs must be unique
});

module.exports = mongoose.model("Store", storeSchema);
