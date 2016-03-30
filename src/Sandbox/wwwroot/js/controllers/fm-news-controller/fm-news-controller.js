(function () {
  'use strict';

  // Setup routing.
  angular.module('fm').config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('Nyheter', {
        url: '/Nyheter',
        controller: 'FmNewsCtrl',
        controllerAs: 'fmNews',
        resolve: {
          newsData: function (fmNewsService) {
            return fmNewsService.getNews();
          }
        },
        templateUrl: 'views/fm-news-view.html',
      });

  }]);

  // Register controller.
  angular.module('fm').controller('FmNewsCtrl', ['newsData', FmNewsCtrl]);

  // Define controller-function.
  function FmNewsCtrl(newsData) {

    /* jshint validthis: true */
    var vm = this;

    vm.newsItems = newsData;

  }

})();

//# sourceMappingURL=fm-news-controller.js.map
