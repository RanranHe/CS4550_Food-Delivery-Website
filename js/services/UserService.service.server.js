module.exports = function (app) {
    var userModel = require('../model/UserModel.server');

    app.post('/api/project/user', createUser);
    app.get('/api/project/user', findUserByCredential);

    function createUser(req, res) {
        var user = req.body;
        userModel.createUser(user).then(
            function (user) {
                res.json(user);
            }
        );
    }

    function findUserByCredential(req, res) {
        var username = req.query["username"];
        var password = req.query["password"];
        userModel.findUserByCredential(username, password).then(
            function (user) {
                res.json(user);
            },
            function (err) {
                res.send("0");
            }
        );
    }
};