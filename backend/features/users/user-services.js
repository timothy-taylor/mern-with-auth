const passport = require("passport");

const SUCCESS = (err) => ({
  status: 200,
  message: "Successfully authenticated",
  isLoggedIn: true,
  err,
});

const FAILURE = (err) => ({
  status: 403,
  message: "Authentication unsuccessful",
  isLoggedIn: false,
  err,
});

const options = { session: false };
module.exports.authenticateJWT = passport.authenticate(
  "jwt",
  options,
  (err, payload) => {
    return payload ? SUCCESS(err) : FAILURE(err);
  }
);
