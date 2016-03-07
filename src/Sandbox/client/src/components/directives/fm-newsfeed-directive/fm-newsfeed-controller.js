(function () {
    'use strict';

    angular.module('fm').controller('FmNewsfeedController', ['$scope', '$fmDataService', function ($scope, $fmDataService) {

      var promise = $fmDataService.getData();

      promise.then(function (data) {
        $scope.news = data;
      });

    }]);

})();
