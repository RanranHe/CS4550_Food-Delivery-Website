module.exports = function () {
    var mongoose = require('mongoose');
    var restaurantSchema = require('./restaurant.schema.server');

    var restaurantModel = mongoose.model('restaurants', restaurantSchema);
    var userModel = require('../user/user.model.server');

    restaurantModel.createRestaurant = createRestaurant;
    restaurantModel.findRestaurantById = findRestaurantById;
    restaurantModel.findRestaurantByUserId = findRestaurantByUserId;
    restaurantModel.deleteRestaurantById = deleteRestaurant;
    restaurantModel.updateRestaurantById = updateRestaurant;
    restaurantModel.insertFood = insertFood;
    // Helper
    restaurantModel.findRestaurantsByIds = findRestaurantsByIds;

    module.exports = restaurantModel;

    return {
        createRestaurant: createRestaurant,
        findRestaurantById: findRestaurantById,
        findRestaurantByUserId: findRestaurantByUserId,
        //Helper
        findRestaurantsByIds: findRestaurantsByIds,
        deleteRestaurantById: deleteRestaurant,
        updateRestaurantById: updateRestaurant,
        insertFood: insertFood
    };

    function createRestaurant(userId, restaurant) {
        restaurant._user = userId;
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
        return restaurantModel.find({_user: userId});
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

    function deleteRestaurant(restaurantId) {
        return restaurantModel.remove({_id: restaurantId});
    }

    function updateRestaurant(restaurantId, restaurant) {
        return restaurantModel.update({_id: restaurantId}, {$set: restaurant})
    }

    function insertFood(restaurantId, newFood) {
        return restaurantModel.update({_id: restaurantId}, {$push: {food: newFood}});
    }

};
