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
          var modal         = $('#fm-fund-modal'),
              searchField   = modal.find('#fm-fund-modal-seach'),
              inputGroup    = modal.find('.fm-modal-inputgroup').hide(),
              modalButton   = modal.find('.fm-fund-modal-close-button').hide();

          // Eventhandlers
          modal.on('webkitTransitionEnd transitionend', fadeInCloseButton);
          modalButton.on('webkitAnimationEnd oanimationend msAnimationEnd animationend', fadeInInputGroup);
          inputGroup.on('webkitAnimationEnd oanimationend msAnimationEnd animationend', setInputFocus);

          function fadeInCloseButton() {
            if (modal.hasClass('modal-open')) {
              modalButton.show().addClass('flipInY fadeInDown');
            }
            else {
              resetModal();
            }
          }

          function fadeInInputGroup() {
            inputGroup.show().addClass('fadeIn');
          }

          function setInputFocus() {
            searchField.focus();
          }

          function resetModal() {
            modalButton.removeClass('flipInY fadeInDown').hide();
            inputGroup.removeClass('fadeIn').hide();
            searchField.val('');
            scope.search.title = '';
          }

          scope.openModal = function () {
            modal.addClass('modal-open');
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