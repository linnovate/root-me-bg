'use strict';

import 'angular/angular-csp.css';
import 'angular-ui-select/select.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'angular-material/angular-material.min.css';

import jQuery from 'jquery';
import 'angular';
import 'angular-ui-select/select';
import 'angular-mocks';
import 'angular-cookies';
import 'angular-resource';
import 'angular-sanitize';
import 'angular-ui-router';
import 'angular-jwt';
// import 'angular-bootstrap/ui-bootstrap-tpls';
import 'angular-material/angular-material.min.js';
import 'angular-aria/angular-aria.min.js';
import 'angular-animate/angular-animate.min.js';


window.$ = jQuery;

angular.element(document).ready(function () {
    //Fixing facebook bug with redirect
    if (window.location.hash === '#_=_') window.location.hash = '#!';

    //Then init the app
    angular.bootstrap(document, ['mean']);

});

function processModules(modules) {
    var packageModules = ['ngCookies', 'ngResource', 'ui.router', 'ui.select', 'ngSanitize', 'ngMaterial'], m, mn;
    for (var index in modules) {
        m = modules[index];
        mn = 'mean.' + m.name;
        angular.module(mn, m.angularDependencies || []);
        packageModules.push(mn);
    }

    var req = require.context('./packages', true, /\/public\/(?!tests|assets|views)(.*)\.js$/);
    req.keys().map(req);
    console.log('***************', req.keys());
    req = require.context('./node_modules', true, /\/meanio-(admin|system|users|circles|articles)\/public\/(?!tests|assets|views)(.*)\.js$/);
    req.keys().map(req);
    // req = require.context('./packages', true, /\/public\/(?!tests|assets|views)(.*)\.js$/);
    // req.keys().map(req);

    angular.module('mean', packageModules);
}

jQuery.ajax('/_getModules', {
    dataType: 'json',
    async: false,
    success: processModules
});
