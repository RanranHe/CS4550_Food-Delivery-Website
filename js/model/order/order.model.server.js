module.exports = function () {
    var mongoose = require('mongoose');
    var orderSchema = require('./order.schema.server');

    var orderModel = mongoose.model('orders', orderSchema);
    var userModel = require('../user/user.model.server');

    orderModel.createOrder = createOrder;
    orderModel.updateOrder = updateOrder;
    orderModel.findOrdersByUserId = findOrdersByUserId;
    orderModel.findOrdersByDeliveryManId = findOrdersByDeliveryManId;
    orderModel.findOrderById = findOrderById;

    module.exports = orderModel;

    return {
        createOrder: createOrder,
        updateOrder: updateOrder,
        findOrdersByUserId: findOrdersByUserId,
        findOrdersByDeliveryManId: findOrdersByDeliveryManId,
        findOrderById: findOrderById
    };

    function createOrder(userId, order) {
        order._user = userId;
        return orderModel
            .collection.insert(order)
            .then(function (order) {
                var userId = order._user;
                var orderId = order._id;
                userModel.addOrderToOrderArray(userId, orderId);
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

    function findOrdersByDeliveryManId(deliveryManId) {
        return orderModel.find({_deliveryMan: deliveryManId});
    }

    function findOrderById(orderId) {
        return orderModel.findOne({_id: orderId});
    }
};
