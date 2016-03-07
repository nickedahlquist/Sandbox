(function () {
    'use strict';

    angular.module('fm').controller('FmContactController', ['$scope', function ($scope) {
      $scope.contact = {
        title: 'Kontakt',
        content: ''
      };
    }]);

})();
