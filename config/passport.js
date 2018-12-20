const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");
const config = require("../config/database");

module.exports = passport => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findUserById(jwt_payload._id)
            .then(user => {
                if(!user[0]) {
                    return done(null, false);
                }
                return done(null, user[0]);
            })
            .catch(err => {
                return done(err, false);
            });
    }))
}