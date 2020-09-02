const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const mongoose = require('mongoose');
const keys = require('../config/keys');
const HttpsProxyAgent = require('https-proxy-agent');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

const gStrategy = new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, 
    async (accessToken, refreshToken, profile, done) => {
        const existingUser  = await User.findOne({ googleId: profile.id });
        if (existingUser) {
            done(null, existingUser);
        } else {
            const user = await new User({ googleId: profile.id }).save();
            done(null, user);
        }
    }
);
if (process.env.NODE_ENV !== 'production') {
    const agent = new HttpsProxyAgent('http://127.0.0.1:9910');
    gStrategy._oauth2.setAgent(agent);
}
passport.use(gStrategy);