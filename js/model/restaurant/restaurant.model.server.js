module.exports = function () {
    var mongoose = require('mongoose');
    var restaurantSchema = require('./restaurant.schema.server');

    var restaurantModel = mongoose.model('orders', restaurantSchema);
    var userModel = require('../user/user.model.server');

    restaurantModel.createRestaurant = createRestaurant;

    orderModel.updateOrder = updateOrder;
    orderModel.findOrdersByUserId = findOrdersByUserId;
    orderModel.findOrderById = findOrderById;

    module.exports = orderModel;

    return {
        createRestaurant: createRestaurant,

        updateOrder: updateOrder,
        findOrdersByUserId: findOrdersByUserId,
        findOrderById: findOrderById
    };

    function createRestaurant(userId, restaurant) {
        restaurant._user = userId;
        return restaurantModel
            .collection.insert(restaurant)
            .then(function (restaurant) {
                var userId = restaurant._user;
                var restaurantId = restaurant._id;
                userModel.addOrderToRestaurantArray(userId, restaurantId);
            })
    }

    function updateOrder(orderId, order) {
        return orderModel.update(
            {_id: orderId},
            {$set: order});
    }

    function findOrdersByUserId(userId) {
        return orderModel.find({_user: userId});
    }

    function findOrderById(orderId) {
        return orderModel.findOne({_id: orderId});
    }
};
