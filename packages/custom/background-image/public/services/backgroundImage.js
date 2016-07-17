(function() {
    'use strict';

    function BackgroundImage($http, $q, _) {
        return {
            name: 'background-image',
            getImagesForMonth: function(month) {
                var deferred = $q.defer();
                $http.post('/api/backgroundImage/example/imagesForMonth', {month: month}).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
                return deferred.promise;

            },
            saveImage: function(file) {
                var deferred = $q.defer();
                $http.post('/api/backgroundImage/example/image', file).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
                return deferred.promise;

            }
        };
    }

    angular
        .module('mean.background-image')
        .factory('BackgroundImage', BackgroundImage);

    BackgroundImage.$inject = ['$http', '$q'];

})();
