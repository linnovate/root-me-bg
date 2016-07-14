'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var BackgroundImage = new Module('background-image');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
BackgroundImage.register(function(app, auth, database, circles) {

  //We enable routing. By default the Package Object is passed to the routes
  BackgroundImage.routes(app, auth, database, circles);

  //We are adding a link to the main menu for all authenticated users
  BackgroundImage.menus.add({
    title: 'backgroundImage example page',
    link: 'backgroundImage example page',
    roles: ['authenticated'],
    menu: 'main'
  });
 

  // BackgroundImage.angularDependencies['mean.upload'];
  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    BackgroundImage.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    BackgroundImage.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    BackgroundImage.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return BackgroundImage;
});
