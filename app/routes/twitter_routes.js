function twitter_routes(app, passport) {

    //send to twitter to do the authentication
    app.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticate the user
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    //CONNECT TWITTER --------------------------------

    // send to twitter to do the authorization
    app.get('/connect/twitter', passport.authorize('twitter', {
        scope: 'email'
    }));

    // handle the callback after twitter has authorized the user
    app.get('/connect/twitter/callback',
        passport.authorize('twitter', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    //UNLINK TWITTER --------------------------------
    app.get('/unlink/twitter', function (req, res) {
        var user = req.user;
        user.twitter.token = undefined;
        user.save(function (err) {
            res.redirect('/profile');
        });
    });
}

module.exports = twitter_routes;