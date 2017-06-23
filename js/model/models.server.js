/**
 * Created by Ranran on 2017/6/17.
 */
module.exports = function (app) {
    var mongoose = require('mongoose');
    var userModel = require("./user/user.model.server.js")(app);
    var orderModel = require("./order/order.model.server")(app);
    var reviewModel = require("./review/review.model.server")(app);
    var restaurantModel = require("./restaurant/restaurant.model.server");

    var models = {
        userModel: userModel,
        orderModel: orderModel,
        reviewModel: reviewModel,
        restaurantModel: restaurantModel
    };
    return models;
};