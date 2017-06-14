module.exports = function(app) {
    var mongoose = require('mongoose');
    mongoose.Promise = require('q').Promise;

    // Used temporarily for accessing MLab MongoDB.
    var username = "admin";
    var password = "admin";
    var connectionString = 'mongodb://'+ username + ':' + password + '@ds019756.mlab.com:19756/heroku_flv5vpkg';

    if(process.env.MLAB_USERNAME) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }
    mongoose.connect(connectionString);


    require('./services/UserService.service.server.js')(app);
};