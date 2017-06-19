module.exports = function (app, models) {
    var userModel = models.userModel;

    app.post('/api/user', createUser);
    app.get('/api/project/user/', findUserByUsername);

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
};