var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    role: {type: String, enum: ['USER', 'DELIVERYMAN', 'MANAGER']},
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    dateCreated: {type: Date, default: Date.now()},
    income: Number
}, {collection: "RollingFoodDelivery.users"});

module.exports = userSchema;
