(function() {
    'use strict';

    function Upload($stateProvider) {
        $stateProvider.state('Mean upload help page', {
            url: '/meanupload/help',
            templateUrl: 'upload/views/index.html'
        });
    }

    angular
        .module('mean.upload')
        .config(Upload);

    Upload.$inject = ['$stateProvider'];

})();
