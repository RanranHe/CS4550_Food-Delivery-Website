module.exports = function () {
    var mongoose = require('mongoose');
    var restaurantSchema = require('./restaurant.schema.server');

    var restaurantModel = mongoose.model('restaurants', restaurantSchema);
    var userModel = require('../user/user.model.server');

    restaurantModel.createRestaurant = createRestaurant;
    restaurantModel.findRestaurantById = findRestaurantById;
    restaurantModel.findRestaurantByUserId = findRestaurantByUserId;
    // Helper
    restaurantModel.findRestaurantsByIds = findRestaurantsByIds;

    module.exports = restaurantModel;

    return {
        createRestaurant: createRestaurant,
        findRestaurantById: findRestaurantById,
        findRestaurantByUserId: findRestaurantByUserId,
        //Helper
        findRestaurantsByIds: findRestaurantsByIds
    };

    function createRestaurant(userId, restaurant) {
        restaurant._user = userId;

        console.log("name: " + restaurant.name)
        return restaurantModel
            .create(restaurant)
            .then(function (newRestaurant) {
                var restaurantId = newRestaurant._id;
                userModel.addOrderToRestaurantArray(userId, restaurantId);
            })
    }
    function findRestaurantById(restaurantId) {
        return restaurantModel.findOne({_id: restaurantId});
    }
    // function findRestaurantByUserId(userId) {
    //     return restaurantModel.find({_user: userId});
    // }
    function findRestaurantByUserId(userId) {

        return userModel.findUserById(userId)
            .then(function (user) {
                console.log("model: " + user._id)
                console.log("model: " + user.restaurants)
                return user.restaurants;
            })
    }
    function updateOrder(orderId, order) {
        return orderModel.update(
            {_id: orderId},
            {$set: order});
    }

    // Helper
    function findRestaurantsByIds(restaurantIds){
        return restaurantModel.find(
            {_id: {$in: restaurantIds}}
        )
    }

};
