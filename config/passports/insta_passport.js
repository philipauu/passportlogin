function insta_passport(User, passport, configAuth) {
    var InstagramStrategy = require('passport-instagram').Strategy;

    passport.use(new InstagramStrategy({

            // pull in our app id and secret from our auth.js file
            clientID: configAuth.instagramAuth.clientID,
            clientSecret: configAuth.instagramAuth.clientSecret,
            callbackURL: configAuth.instagramAuth.callbackURL,
            passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        },

        // instagram will send back the token and profile
        function (req, token, refreshToken, profile, done) {
            console.log(profile);
            // asynchronous
            process.nextTick(function () {

                // check if the user is already logged in
                if (!req.user) {

                    // find the user in the database based on their instagram id
                    User.findOne({
                        'instagram.id': profile.id
                    }, function (err, user) {

                        // if there is an error, stop everything and return that
                        // ie an error connecting to the database
                        if (err)
                            return done(err);

                        // if the user is found, then log them in
                        if (user) {

                            // if there is a user id already but no token (user was linked at one point and then removed)
                            if (!user.instagram.token) {
                                user.instagram.token = token;
                                user.instagram.name = profile.name.givenName + ' ' + profile.name.familyName;
                                user.instagram.email = profile.emails[0].value;

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

                            newUser.instagram.id = profile.id;
                            newUser.instagram.token = token;
                            newUser.instagram.name = profile.name.givenName + ' ' + profile.name.familyName;
                            newUser.instagram.email = profile.emails[0].value;

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

                    user.instagram.id = profile.id;
                    user.instagram.token = token;
                    user.instagram.name = profile.name.givenName + ' ' + profile.name.familyName;
                    user.instagram.email = profile.emails[0].value;

                    user.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, user);
                    });

                }
            });

        }));

}

module.exports = insta_passport;