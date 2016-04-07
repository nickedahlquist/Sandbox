(function () {
  'use strict';

  angular.module('fm').directive('fmStepProgressbar', [function () {

    return {
      restrict: 'E',
      templateUrl: 'views/fm-step-progressbar-view.html',
      scope: {
        steps: "="
      },
      link: function (scope, element, attrs) {
      }
    }

  }]);

})();