var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
var secret = "mysecret";
if(process.env.SESSION_SECRET) {
    secret = process.env.SESSION_SECRET
}
app.use(session({ secret: secret }));

// configure a public directory to host static content
app.use(express.static(__dirname));

app.use(passport.initialize());
app.use(passport.session());

require("./js/app.js")(app);


var port = process.env.PORT || 3002;

app.listen(port);