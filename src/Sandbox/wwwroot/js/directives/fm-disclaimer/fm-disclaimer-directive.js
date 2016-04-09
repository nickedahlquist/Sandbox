(function () {
  'use strict';

  angular.module('fm').directive('fmDisclaimer', [function () {

    return {
      restrict: 'E',
      templateUrl: 'views/fm-disclaimer-view.html',
      scope: {
        disclaimer: '='
      },
      link: function (scope, element, attrs) {

        scope.disclaimer.title = (scope.disclaimer.title) ? scope.disclaimer.title : 'Viktig information';
        //scope.title = (attrs.title) ? attrs.title : 'Viktig information';

        var disclaimer = element.find('.fm-disclaimer');

        disclaimer.on('click', toggleOpen);
        
        function toggleOpen () {
          if (disclaimer.hasClass('open')) {
            disclaimer.removeClass('open');
          } else {
            disclaimer.addClass('open');
          }
        }
      }
    }

  }]);

})();
//# sourceMappingURL=fm-disclaimer-directive.js.map
