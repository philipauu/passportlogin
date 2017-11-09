function insta_routes(app, passport) {

    // send to instagram to do the authentication
    app.get('/auth/instagram', passport.authenticate('instagram'));

    // handle the callback after instagram has authenticated the user
    app.get('/auth/instagram/callback',
        passport.authenticate('instagram', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    // CONNECT TO INSTA -------------------------------
    // send to instagram to do the authentication
    app.get('/connect/instagram', passport.authorize('instagram'));

    // handle the callback after instagram has authorized the user
    app.get('/connect/instagram/callback',
        passport.authorize('instagram', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    // UNLINK FB -------------------------------
    app.get('/unlink/instagram', function (req, res) {
        var user = req.user;
        user.instagram.token = undefined;
        user.save(function (err) {
            res.redirect('/profile');
        });
    });
}

module.exports = insta_routes;