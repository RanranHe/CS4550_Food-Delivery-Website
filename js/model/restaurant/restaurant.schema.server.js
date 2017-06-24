var mongoose = require('mongoose');

var restaurantSchema = mongoose.Schema({
    _user: String,
    name: String,
    address: String,
    food: [{name: String, price: Number}],
    foodType: String,
    city: String,
    state: String,
    phone: String,
    zip: String,
    url: String,
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'reviews'}]
}, {collection: "RollingFoodDelivery.restaurants"});

module.exports = restaurantSchema;
