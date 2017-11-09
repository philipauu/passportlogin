function spotify_passport(User, passport, configAuth) {
    var SpotifyStrategy = require('passport-spotify').Strategy;
    var config = {
        // pull in our app id and secret from our auth.js file
        clientID: configAuth.spotifyAuth.clientID,
        clientSecret: configAuth.spotifyAuth.clientSecret,
        callbackURL: configAuth.spotifyAuth.callbackURL,
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    };

    passport.use(new SpotifyStrategy(config, spotify_response));

    // spotify will send back the token and profile
    function spotify_response(req, token, refreshToken, profile, done) {
        console.log(profile);

        // check if the user is already logged in
        if (!req.user) {

            // find the user in the database based on their spotify id
            User.findOne({
                'spotify.id': profile.id
            }, function (err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {

                    // if there is a user id already but no token (user was linked at one point and then removed)
                    if (!user.spotify.token) {
                        set_spotify_token(user, token, profile, done);
                    }
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user, create them
                    var newUser = new User();
                    register_user(newUser, token, profile, done);
                }
            });
        } else {
            // user already exists and is logged in, we have to link accounts
            var user = req.user; // pull the user out of the session
            register_user(user, token, profile, done);
        }
    };
}

module.exports = spotify_passport;

function set_spotify_token(user, token, profile, done) {
    user.spotify.token = token;
    user.spotify.displayName = profile.displayName;
    user.spotify.followers = profile.followers;

    user.save(function (err) {
        if (err)
            throw err;
        return done(null, user);
    });
};

function register_user(user, token, profile, done) {
    user.spotify.id = profile.id;
    user.spotify.token = token;
    user.spotify.displayName = profile.displayName
    user.spotify.followers = profile.followers;

    user.save(function (err) {
        if (err)
            throw err;
        return done(null, user);
    });
};