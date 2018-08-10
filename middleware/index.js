const User = require("./../models/User");

let auth = (req, res, next) => {
  let token = req.cookies.w_auth;
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.status(400).json({
        errors: [{ detail: "Not authorized" }]
      });

    req.token = token;
    req.user = user;
    next();
  });
};

let confirmedPasswords = (req, res, next) => {
  if (req.body.password !== req.body.passwordConfirm) {
    return res.status(400).json({
      errors: [{ detail: "Passwords do not match!" }]
    });
  }
  next();
};

module.exports = { auth, confirmedPasswords };
