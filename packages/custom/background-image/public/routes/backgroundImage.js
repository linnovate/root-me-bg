(function() {
    'use strict';

    function BackgroundImage($stateProvider) {
        $stateProvider.state('backgroundImage example page', {
            url: '/backgroundImage/example',
            templateUrl: 'background-image/views/index.html'
        }).state('backgroundImage circles example', {
            url: '/backgroundImage/example/:circle',
            templateUrl: 'background-image/views/example.html'
        });
    }

    angular
        .module('mean.background-image')
        .config(BackgroundImage);

    BackgroundImage.$inject = ['$stateProvider'];

})();
