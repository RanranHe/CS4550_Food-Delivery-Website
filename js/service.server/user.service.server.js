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

    //=====================================================================

    app.get("/api/project/search/", searchUsers);
    app.post('/api/project/register', register);
    app.post('/api/project/user', createUser);
    app.get('/api/project/user/', findUserByUsername);

    app.post("/api/project/login", passport.authenticate('local'), login);
    app.get('/api/project/checkLoggedIn', checkLoggedIn);

    app.put('/api/project/user/:userId', updateUser);
    app.delete('/api/project/user/:userId', deleteUser);
    app.post("/api/project/logout", logout);

    // Facebook Login
    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/#!/profile',
            failureRedirect: '/#!/login'
        }));

    // Google Login
    app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/#!/profile',
            failureRedirect: '/#!/'
        }));
    //////////////// Register ////////////////
    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel
            .createUser(user)
            .then(function (user) {
                req.login(user.ops[0], function (status) {
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
        if (req.isAuthenticated()) {
            res.json(req.user);
        } else {
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
    ////////////////////////////////////////
    function updateUser(req, res) {
        var id = req.body.id;
        var newUser = req.body.newUser;
        userModel
            .updateUser(id, newUser)
            .then(function (user) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.status(404).send("Unable to update User")
                });
    }

    function deleteUser(req, res) {
        var id = req.params.userId;
        userModel
            .deleteUser(id)
            .then(function (status) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.status(404).send("Unable to remove user");
                });
    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    /////////////////// Facebook Login ///////////////////
    var FacebookStrategy = require('passport-facebook').Strategy;
    var facebookConfig = {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ['displayName', 'emails', 'name']
    };
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    function facebookStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByFacebookId(profile.id)
            .then(function (user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split('@');
                        var newFacebookUser = {
                            username: emailParts[0],
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName,
                            email: email,
                            facebook: {
                                id: profile.id,
                                token: token
                            }
                        };
                        return userModel
                            .createUser(newFacebookUser)
                            .then(function (response) {
                                return done(null, newFacebookUser);
                            });
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                })
            .then(function (user) {
                    return done(null, user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                });
    }

    /////////////////// Google Login ///////////////////
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var googleConfig = {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        profileFields: ['name', 'emails']
    };
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split('@');
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel
                            .createUser(newGoogleUser)
                            .then(function (response) {
                                return done(null, newGoogleUser);
                            });
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function searchUsers(req, res) {
        var searchText = req.query['searchText'];
        console.log("searchText: " + searchText)
        userModel
            .searchUsers(searchText)
            .then(function (users) {
                console.log("client: " +users)
                res.json(users);
            }, function (err) {
                res.send(null);
            });
    }
};