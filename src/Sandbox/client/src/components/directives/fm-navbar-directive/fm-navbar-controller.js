﻿(function () {
  'use strict';

  angular.module('fm').controller('FmNavbarController', ['$scope', '$navlinksService', function ($scope, $navlinksService) {

    $scope.navbarlinks = $navlinksService.routes;

  }]);

})();
