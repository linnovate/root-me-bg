(function() {
    'use strict';

    /* jshint -W098 */

    function BackgroundImageController($scope, Global, BackgroundImage, $stateParams) {
        $scope.global = Global;
        $scope.package = {
            name: 'background-image'
        };
        $scope.imageToDate = {};

        $scope.checkCircle = function() {
            BackgroundImage.checkCircle($stateParams.circle).then(function(response) {
                $scope.res = response;
                $scope.resStatus = 'info';
            }, function(error) {
                $scope.res = error;
                $scope.resStatus = 'danger';
            });
        };
         $scope.saveImage = function(file) {
            $scope.imageToDate.src = file.src;
            console.log('dt', $scope.imageToDate);
            BackgroundImage.saveImage($scope.imageToDate).then(function(response) {
                $scope.res = response;
                console.log('res', $scope.res);
                $scope.resStatus = 'info';
            }, function(error) {
                $scope.res = error;
                console.log('err', $scope.res);
                $scope.resStatus = 'danger';
            });
        };

    }

    angular
        .module('mean.background-image')
        .controller('BackgroundImageController', BackgroundImageController);

    BackgroundImageController.$inject = ['$scope', 'Global', 'BackgroundImage', '$stateParams'];

})();
