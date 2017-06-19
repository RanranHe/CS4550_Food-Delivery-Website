module.exports = function (app, models) {
    var userModel = models.userModel;

    // Register
    var bcrypt = require("bcrypt-nodejs");

    // Login
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    app.post('/api/project/register', register);
    app.post('/api/project/user', createUser);
    app.get('/api/project/user/', findUserByUsername);

    app.post("/api/project/login", passport.authenticate('local'), login);
    app.get('/api/project/checkLoggedIn', checkLoggedIn);

    //////////////// Register ////////////////
    function register(req, res) {
        var user = req.body;
        console.log("register: " + user.username + "  " + user.password)
        user.password = bcrypt.hashSync(user.password);
        userModel
            .createUser(user)
            .then(function (user) {
                req.login(user, function (status) {
                    res.json(user);
                });
            });
    }

    function findUserByUsername(req, res) {
        var username = req.query['username'];
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                // res.status(400).send(err);
                res.send(null);
            });
    }

    function createUser(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(function (user) {
                res.json(user);
            });
    }

    /////////////// Login ///////////////
    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if (user && bcrypt.compareSync(password, user.password)) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            }, function (error) {
                done(error, false);
            })
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function checkLoggedIn(req, res) {
        console.log(req.user);
        if (req.isAuthenticated()) {
            console.log("if")
            res.json(req.user);
        } else {
            console.log("else")
            res.send('0');
        }
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }
};