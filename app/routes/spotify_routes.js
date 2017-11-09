function spotify_routes(app, passport) {

    //send to spotify to do the authentication
    app.get('/auth/spotify', passport.authenticate('spotify'));

    // handle the callback after spotify has authenticate the user
    app.get('/auth/spotify/callback',
        passport.authenticate('spotify', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    //CONNECT SPOTIFY --------------------------------

    // send to spotify to do the authorization
    app.get('/connect/spotify', passport.authorize('spotify', {
        scope: ['user-read-email', 'user-read-private']
    }));

    // handle the callback after spotify has authorized the user
    app.get('/connect/spotify/callback',
        passport.authorize('spotify', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    //UNLINK SPOTIFY --------------------------------
    app.get('/unlink/spotify', function (req, res) {
        var user = req.user;
        user.spotify.token = undefined;
        user.save(function (err) {
            res.redirect('/profile');
        });
    });
}

module.exports = spotify_routes;