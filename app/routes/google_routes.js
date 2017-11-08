 function google_routes(app, passport) {

     // send to google to do the authentication
     app.get('/auth/google', passport.authenticate('google', {
         scope: ['profile', 'email']
     }));

     // the callback after google has authenticated the user
     app.get('/auth/google/callback',
         passport.authenticate('google', {
             successRedirect: '/profile',
             failureRedirect: '/'
         }));

     //CONNECT GOOGLE ---------------------------------

     // send to google to do the authentication
     app.get('/connect/google', passport.authorize('google', {
         scope: ['profile', 'email']
     }));

     // the callback after google has authorized the user
     app.get('/connect/google/callback',
         passport.authorize('google', {
             successRedirect: '/profile',
             failureRedirect: '/'
         }));

     //UNLINK GOOGLE ---------------------------------
     app.get('/unlink/google', function (req, res) {
         var user = req.user;
         user.google.token = undefined;
         user.save(function (err) {
             res.redirect('/profile');
         });
     });
 }

 module.exports = google_routes;