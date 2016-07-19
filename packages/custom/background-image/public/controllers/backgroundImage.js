(function() {
    'use strict';

    /* jshint -W098 */

    function BackgroundImageController($scope, Global, BackgroundImage, $stateParams) {
        $scope.global = Global;
        $scope.package = {
            name: 'background-image'
        };
        $scope.imageToDate = {};
        $scope.imageToDate.date = new Date();
        $scope.imagesByMonth = {};
        function getImagesForMonth(month) {
            BackgroundImage.getImagesForMonth(month).then(function(response) {
                $scope.res = response;
                angular.forEach($scope.res, function(value, key) {
                     var date = new Date(value.forDate);
                     var date_format = date.getFullYear() + '-'+ date.getDay() + '-' + date.getMonth();
                     $scope.imagesByMonth[date_format] = value.src;
                });
            }, function(error) {
                $scope.res = error;
                console.log('err', $scope.res);
            });
        };
        getImagesForMonth($scope.imageToDate.date.getMonth());
         $scope.saveImage = function(file) {
            $scope.imageToDate.src = file.src;
            BackgroundImage.saveImage($scope.imageToDate).then(function(response) {
                $scope.res = response;
                getImagesForMonth($scope.imageToDate.date.getMonth());
                console.log('res', $scope.res);
                $scope.resStatus = 'info';
            }, function(error) {
                $scope.res = error;
                console.log('err', $scope.res);
                $scope.resStatus = 'danger';
            });
        };
        $scope.dateChanged = function() {
            var date = new Date($scope.imageToDate.date);
            $scope.currentDate = date.getFullYear() + '-'+ date.getDay() + '-' + date.getMonth();
        }
        $scope.dateChanged();

    }

    angular
        .module('mean.background-image')
        .controller('BackgroundImageController', BackgroundImageController);

    BackgroundImageController.$inject = ['$scope', 'Global', 'BackgroundImage', '$stateParams'];

})();
