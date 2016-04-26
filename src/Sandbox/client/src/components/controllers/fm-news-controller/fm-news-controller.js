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
  angular.module('fm').controller('FmNewsCtrl', ['newsData', '$sanitize', 'fmUtilityFunctions', '$timeout', FmNewsCtrl]);

  // Define controller-function.
  function FmNewsCtrl(newsData, $sanitize, fmUtilityFunctions, $timeout) {

    /* jshint validthis: true */
    var vm = this;
    var utils = fmUtilityFunctions;

    vm.newsItems = newsData;
    vm.latestNews = _.sortBy(newsData.slice(0, 3), 'PublishDate');

    console.log(vm.newsItems);

    for (var key in vm.newsItems) {
      vm.newsItems[key].TextExcerpt = $sanitize(fmUtilityFunctions.truncateText(150, vm.newsItems[key].NewsText.split('<br/>')[0]));
      vm.newsItems[key].SignatureExcerpt = $sanitize(vm.newsItems[key].Signature.split('<br/>')[0]);
      vm.newsItems[key].NewsText = $sanitize(vm.newsItems[key].NewsText);
    }

    
    // Simulate lazy loading
    var tempArr = _.groupBy(vm.newsItems, function (element, index) {
      return Math.floor(index/6);
    });

    tempArr = _.toArray(tempArr);

    vm.newsItems = tempArr[0];
    var arrIndex = 1;
    vm.fetching = false;

    vm.readMore = function () {
      vm.fetching = true;

      $timeout(function () {
        if (arrIndex < tempArr.length) {
          vm.newsItems = vm.newsItems.concat(tempArr[arrIndex]);
          arrIndex++;
        }
        vm.fetching = false;
      }, 1500);
    };
  }

})();
