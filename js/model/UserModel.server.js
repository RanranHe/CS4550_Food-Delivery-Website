var mongoose = require('mongoose');
var userSchema = require('./User.schema.server.js');

var userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserByCredential = findUserByCredential;

module.exports = userModel;

function createUser(user) {
    var userResult = userModel.collection.insert(user);
    return userResult;
}

function findUserByCredential(username, password) {
    return userModel.findOne({
        username: username,
        password: password
    });
}