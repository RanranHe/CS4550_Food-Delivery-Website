var mongoose = require('mongoose');

var restaurantSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    name: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    url: String,
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'reviews'}]
}, {collection: "RollingFoodDelivery.restaurants"});

module.exports = restaurantSchema;
