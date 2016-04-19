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
      })
      .state('news.article', {
        url: '/article',
        resolve: {
          $title: function () {
            return 'Artikel';
          }
        },
        templateUrl: 'views/fm-single-newspost-view.html',
      });

  }]);

  // Register controller.
  angular.module('fm').controller('FmNewsCtrl', ['newsData', '$sanitize', 'fmUtilityFunctions', FmNewsCtrl]);

  // Define controller-function.
  function FmNewsCtrl(newsData, $sanitize, fmUtilityFunctions) {

    /* jshint validthis: true */
    var vm = this;
    var utils = fmUtilityFunctions;

    vm.newsItems = newsData;

    for (var key in vm.newsItems) {
      vm.newsItems[key].TextExcerpt = $sanitize(fmUtilityFunctions.truncateText(300, vm.newsItems[key].NewsText.split('<br/>')[0]));
      vm.newsItems[key].SignatureExcerpt = $sanitize(vm.newsItems[key].Signature.split('<br/>')[0]);
      vm.newsItems[key].NewsText = $sanitize(vm.newsItems[key].NewsText);
    }

    console.log(vm.newsItems);

  }

})();

//# sourceMappingURL=fm-news-controller.js.map
