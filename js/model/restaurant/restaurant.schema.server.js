var mongoose = require('mongoose');

var restaurantSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'userModel'},
    name: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'reviewModel'}]
}, {collection: "RollingFoodDelivery.restaurants"});

module.exports = restaurantSchema;
