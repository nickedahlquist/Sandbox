(function () {
  'use strict';

  angular.module('fm').controller('FmFooterController', ['$scope', '$navlinksService', function ($scope, $navlinksService) {

    $scope.navbarlinks = $navlinksService;

  }]);

})();

//# sourceMappingURL=fm-footer-controller.js.map
