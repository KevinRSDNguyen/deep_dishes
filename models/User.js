const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  name: {
    type: String,
    required: "name is required",
    minlength: [4, "Too short, min is 4 characters"],
    maxlength: [32, "Too long, max is 32 characters"]
  },
  email: {
    type: String,
    required: "email is required",
    trim: true,
    unique: true,
    lowercase: true,
    minlength: [4, "Too short, min is 4 characters"],
    maxlength: [128, "Too long, max is 128 characters"]
  },
  password: {
    type: String,
    required: "password is required",
    minlength: [4, "Too short, min is 4 characters"],
    maxlength: [32, "Too long, max is 32 characters"]
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre("save", function(next) {
  var user = this;

  if (user.isModified("password")) {
    //Prevent rehashing if user changes name/email, etc
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = User = mongoose.model("users", UserSchema);
