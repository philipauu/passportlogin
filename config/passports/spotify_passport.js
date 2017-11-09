function spotify_passport(User, passport, configAuth) {
    var SpotifyStrategy = require('passport-spotify').Strategy;

    passport.use(new SpotifyStrategy({

            // pull in our app id and secret from our auth.js file
            clientID: configAuth.spotifyAuth.clientID,
            clientSecret: configAuth.spotifyAuth.clientSecret,
            callbackURL: configAuth.spotifyAuth.callbackURL,
            passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        },

        // spotify will send back the token and profile
        function (req, token, refreshToken, profile, done) {

            // asynchronous
            process.nextTick(function () {

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
                                user.spotify.token = token;
                                user.spotify.name = profile.name.givenName + ' ' + profile.name.familyName;
                                user.spotify.email = profile.emails[0].value;

                                user.save(function (err) {
                                    if (err)
                                        throw err;
                                    return done(null, user);
                                });
                            }

                            return done(null, user); // user found, return that user
                        } else {
                            // if there is no user, create them
                            var newUser = new User();

                            newUser.spotify.id = profile.id;
                            newUser.spotify.token = token;
                            newUser.spotify.name = profile.name.givenName + ' ' + profile.name.familyName;
                            newUser.spotify.email = profile.emails[0].value;

                            newUser.save(function (err) {
                                if (err)
                                    throw err;
                                return done(null, newUser);
                            });
                        }
                    });

                } else {
                    // user already exists and is logged in, we have to link accounts
                    var user = req.user; // pull the user out of the session

                    user.spotify.id = profile.id;
                    user.spotify.token = token;
                    user.spotify.name = profile.name.givenName + ' ' + profile.name.familyName;
                    user.spotify.email = profile.emails[0].value;

                    user.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, user);
                    });

                }
            });

        }));

}

module.exports = spotify_passport;