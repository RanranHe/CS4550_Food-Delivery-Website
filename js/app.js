module.exports = function(app) {
    var mongoose = require('mongoose');
    mongoose.Promise = require('q').Promise;

    var username = "admin";
    var password = "admin";

    mongoose.connect('mongodb://127.0.0.1/RollingFood');

    // var connectionString = 'mongodb://'+ username + ':' + password + '@ds019756.mlab.com:19756/heroku_flv5vpkg';
    //
    // if(process.env.MLAB_USERNAME) {
    //     connectionString = process.env.MLAB_USERNAME + ":" +
    //         process.env.MLAB_PASSWORD + "@" +
    //         process.env.MLAB_HOST + ':' +
    //         process.env.MLAB_PORT + '/' +
    //         process.env.MLAB_APP_NAME;
    // }
    // mongoose.connect(connectionString);

    var models = require("./model/models.server")();
    require("./service.server/user.service.server")(app, models);
    require("./service.server/order.service.server")(app, models);
    require("./service.server/review.service.server")(app, models);
    require("./service.server/restaurant.service.server")(app, models);
    require("./service.server/yelp.service.server")(app);
};