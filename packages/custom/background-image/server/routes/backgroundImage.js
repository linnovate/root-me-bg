(function() {
    'use strict';

    /* jshint -W098 */
    // The Package is past automatically as first parameter
    module.exports = function(BackgroundImage, app, auth, database, circles) {

        var requiresAdmin = circles.controller.hasCircle('admin');
        var requiresLogin = circles.controller.hasCircle('authenticated');
        var images = require('../controllers/images')();
        app.use(function(req, res, next) {
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
          next();
        });
         app.post('/api/backgroundImage/example/imagesForMonth', function(req, res, next) {
            next();
            // res.send('Anyone can access this');

        }, images.byMonth);

        app.post('/api/backgroundImage/example/image', function(req, res, next) {
            next();
            // res.send('Anyone can access this');

        }, images.create);

        app.get('/api/images', function(req, res, next) {
          next();
        }, images.getImage);

        app.get('/api/backgroundImage/example/render', function(req, res) {
            BackgroundImage.render('index', {
                package: 'background-image'
            }, function(err, html) {
                //Rendering a view from the Package server/views
                res.send(html);
            });
        });
    };
})();
