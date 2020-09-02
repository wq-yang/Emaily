const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const { appendFile } = require('fs');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express(); 

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build')); // if we do not have a route handler set up, look into the client/build
    
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')); // express will serve up the index.html file if it doesnt recognize the route
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);