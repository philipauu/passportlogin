// load up the user model
var User = require('../../app/models/user');

// load the auth variables
var configAuth = require('../auth');

// expose this function to our app using module.exports
module.exports = function (passport) {

    var serialize = require('./serializer');
    serialize(User, passport);

    var local_passport = require('./local_passport');
    local_passport(User, passport);

    var fb_passport = require('./fb_passport');
    fb_passport(User, passport, configAuth);

    var twitter_passport = require('./twitter_passport');
    twitter_passport(User, passport, configAuth);

    var google_passport = require('./google_passport');
    google_passport(User, passport, configAuth);

};