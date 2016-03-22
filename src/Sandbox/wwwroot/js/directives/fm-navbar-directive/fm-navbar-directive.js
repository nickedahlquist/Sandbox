(function() {
    'use strict';

    angular.module('fm').directive('fmNavbar', ['$rootScope', '$navlinksService', 'fmAuthtokenFactory', 'fmDataService', function ($rootScope, $navlinksService, fmAuthtokenFactory, fmDataService) {

      return {
        restrict: 'E',
        templateUrl: 'views/fm-navbar-view.html',
        link: function (scope, elem, attrs) {

          scope.navbarlinks = $navlinksService.links;

          scope.isAuthenticated = function () {
            return fmAuthtokenFactory.isAuthenticated();
          }

          scope.logOut = function () {
            fmAuthtokenFactory.removeToken();
          }

          // Modal
          var modal       = $('#fm-fund-modal'),
              searchField = modal.find('#fm-fund-modal-seach');

          scope.openModal = function () {
            modal.addClass('modal-open');
            searchField.focus();
          };

          scope.closeModal = function () {
            modal.removeClass('modal-open');
          };

          scope.searchItems = [];

          fmDataService.then(function (data) {
            scope.funds = data.funds;
            scope.newsitems = data.newsitems;
            

            for (var key in scope.funds) {
              if (scope.funds.hasOwnProperty(key)) {
                var fundItem = { title: scope.funds[key].manager, type: 'fund'};
                scope.searchItems.push(fundItem);
              }
            }

            for (var key in scope.newsitems) {
              if (scope.newsitems.hasOwnProperty(key)) {
                var newsItem = { title: scope.newsitems[key].headline, type: 'news' };
                scope.searchItems.push(newsItem);
              }
            }

            console.log(scope.searchItems);

          });

          


        }
      }

    }]);

})();
//# sourceMappingURL=fm-navbar-directive.js.map
