var mongoose = require('mongoose');

var restaurantSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    name: String,
    address: String,
    food: [{name: String, price: Number}],
    foodType: String,
    city: String,
    state: String,
    phone: String,
    zip: String,
    url: String
}, {collection: "RollingFoodDelivery.restaurants"});

module.exports = restaurantSchema;
