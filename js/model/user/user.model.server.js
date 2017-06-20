/**
 * Created by Ranran on 2017/6/8.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var userSchema = require('./user.schema.server');

    var userModel = mongoose.model('users', userSchema);

    userModel.createUser = createUser;
    userModel.findUserById = findUserById;
    userModel.findUserByUsername = findUserByUsername;
    userModel.findUserByCredentials = findUserByCredentials;
    userModel.deleteUser = deleteUser;
    userModel.updateUser = updateUser;
    userModel.findUserByFacebookId = findUserByFacebookId;
    userModel.findUserByGoogleId = findUserByGoogleId;
    //////////Helper Function ////////////////
    userModel.addOrderToArray = addOrderToArray;

    module.exports = userModel;

    return {
        createUser: createUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByFacebookId: findUserByFacebookId,
        findUserByGoogleId: findUserByGoogleId,
        /////////Helper///////////////
        addOrderToArray: addOrderToArray
    };


    function createUser(user) {
        return userModel.collection.insert(user);
    }

    function findUserByCredentials(username, password) {
        return userModel.findOne({username: username, password: password});
    }

    function findUserByUsername(username) {
        return userModel.findOne({username: username});
    }

    function findUserById(userId) {
        return userModel.findById(userId);
    }

    function updateUser(id, newUser) {
        return userModel.update(
            {_id: id},
            {$set: newUser}
        );
    }

    function deleteUser(userId) {
        return userModel.remove({_id: userId})
    }

    function findUserByFacebookId(facebookId) {
        return userModel.findOne({'facebook.id': facebookId});
    }

    function findUserByGoogleId(googleId) {
        return userModel.findOne({'google.id': googleId});
    }

    //////////////////Helper Functions////////////////////
    function addOrderToArray(userId, orderId) {
        return userModel
            .findUserById(userId)
            .then(function (user) {
                user.orders.push(orderId);
                return user.save();
            })
    }
};