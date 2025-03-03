/* globals require */
'use strict';

/**
 * Module dependencies.
 */
var mean = require('meanio'),
  compression = require('compression'),
  consolidate = require('consolidate'),
  express = require('express'),
  helpers = require('view-helpers'),
  flash = require('connect-flash'),
  modRewrite = require('connect-modrewrite'),
  // seo = require('mean-seo'),
  config = mean.getConfig(),
  bodyParser = require('body-parser'),
  helmet = require('helmet');


module.exports = function(app, db) {

  app.use(bodyParser.json(config.bodyParser.json));
  app.use(bodyParser.urlencoded(config.bodyParser.urlencoded));

  app.use(helmet());

  app.set('showStackError', true);

  // Prettify HTML
  app.locals.pretty = true;

  // cache=memory or swig dies in NODE_ENV=production
  app.locals.cache = 'memory';

  // Should be placed before express.static
  // To ensure that all assets and data are compressed (utilize bandwidth)
  app.use(compression({
    // Levels are specified in a range of 0 to 9, where-as 0 is
    // no compression and 9 is best compression, but slowest
    level: 9
  }));

  // Enable compression on bower_components
  app.use('/bower_components', express.static(config.root + '/bower_components'));

  app.use('/bundle', express.static(config.root + '/bundle'));

  // Adds logging based on logging config in config/env/ entry
  require('./middlewares/logging')(app, config.logging);

  // assign the template engine to .html files
  app.engine('html', consolidate[config.templateEngine]);

  // set .html as the default extension
  app.set('view engine', 'html');


  // Dynamic helpers
  app.use(helpers(config.app.name));

  // Connect flash for flash messages
  app.use(flash());

  app.use(modRewrite([
    
      '!^/api/.*|\\_getModules|\\.html|\\.js|\\.css|\\.swf|\\.jp(e?)g|\\.JP(E?)G|\\.PNG|\\.png|\\.ico|\\.gif|\\.svg|\\.eot|\\.ttf|\\.woff|\\.txt|\\.pdf$ / [L]'

  ]));

  // app.use(seo());
};
