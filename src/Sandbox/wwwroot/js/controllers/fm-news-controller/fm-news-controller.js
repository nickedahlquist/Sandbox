(function () {
  'use strict';

  // Setup routing.
  angular.module('fm').config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('news', {
        url: '/news',
        controller: 'FmNewsCtrl',
        controllerAs: 'fmNews',
        resolve: {
          $title: function () {
            return 'Nyheter';
          },
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

    console.log(vm.newsItems);

  }

})();

//# sourceMappingURL=fm-news-controller.js.map
