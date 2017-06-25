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
    userModel.findFreeDeliveryMan = findFreeDeliveryMan;
    userModel.findAllUsers = findAllUsers;
    //////////Helper Function ////////////////
    userModel.addOrderToOrderArray = addOrderToOrderArray;
    userModel.addOrderToRestaurantArray = addOrderToRestaurantArray;

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
        searchUsers: searchUsers,
        findFreeDeliveryMan: findFreeDeliveryMan,
        findAllUsers: findAllUsers,
        /////////Helper///////////////
        addOrderToOrderArray: addOrderToOrderArray,
        addOrderToRestaurantArray: addOrderToRestaurantArray
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

    function searchUsers(searchText) {
        return userModel.find({username: {$regex:searchText + ""}});
    }

    function findFreeDeliveryMan() {
        return userModel.find({status: 'FREE'})
    }

    function findAllUsers() {
        return userModel.find();
    }

    //////////////////Helper Functions////////////////////
    function addOrderToOrderArray(userId, orderId) {
        return userModel
            .findUserById(userId)
            .then(function (user) {
                user.orders.push(orderId);
                return user.save();
            })
    }

    function addOrderToRestaurantArray(userId, restaurantId) {
        return userModel.findUserById(userId)
            .then(function (user) {
                user.restaurants.push(restaurantId);
                return user.save();
            })
    }


};