const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user_schema');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'coretabs-competition';

module.exports = (passport) => {
  passport.use(
    new jwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload._id, (err, user) => {
        if (user) {
          console.log('user is: ', user);
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch(e => { return e })
    })
  )
};
