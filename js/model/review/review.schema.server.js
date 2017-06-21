var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    restaurant: String,
    rate: {type: String, enum:['BAD', 'POOR','AVERAGE', 'GOOD', 'EXCELLENT']},
    text: String,
    url: String,
    size: String,
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "RollingFoodDelivery.reviews"});

module.exports = reviewSchema;
