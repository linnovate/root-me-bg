  'use strict';

  angular.module('mean.background-image')
    .factory('_', ['$window',
      function($window) {
        // place lodash include before angular
        return $window._;
      }
    ]);