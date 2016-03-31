(function() {
    'use strict';

    angular.module('fm').directive('fmNavbar', ['$location', '$rootScope', '$navlinksService', 'fmAuthtokenFactory', 'fmDataService', function ($location, $rootScope, $navlinksService, fmAuthtokenFactory, fmDataService) {

      return {
        restrict: 'E',
        templateUrl: 'views/fm-navbar-view.html',
        link: function (scope, elem, attrs) {

          var w = $(window),
              navbar = $('.fm-navbar');

          $rootScope.navbarIsFixed = navbar.hasClass('navbar-fixed');


          function headerBgScroll() {
            var scroll = w.scrollTop(),
                scrollTriggerDistance = 30;

            if (scroll >= scrollTriggerDistance) {
              //navbar.addClass('navbar-slide-up');
              //navbar.css({ 'padding': '4rem 0' });
            }
            else {
              //navbar.removeClass('navbar-slide-up');
              //navbar.css({ 'padding': '0' });
            }
          }

          w.on('scroll', headerBgScroll);

          scope.navbarlinks = $navlinksService.getNavLinks();

          scope.isAuthenticated = function () {
            return fmAuthtokenFactory.isAuthenticated();
          }

          scope.logOut = function () {
            fmAuthtokenFactory.removeToken();
          }

          // Menu modal
          var menuModal = $('#fm-fund-menu-modal'),
              menuModalButton = menuModal.find('.fm-fund-modal-close-button').hide(),
              menuModalLinks = menuModal.find('.fm-fund-menu-modal-links');

          // Eventhandlers
          menuModal.on('webkitTransitionEnd transitionend', fadeInMenuModalButton);
          menuModalLinks.on('click', navModalLinkClick);


          function fadeInMenuModalButton() {
            if (menuModal.hasClass('modal-open')) {
              menuModalButton.show().addClass('flipInY');
              menuModalLinks.addClass('links-open');
            }
            else {
              resetMenuModal();
            }
          }

          function resetMenuModal() {        
            menuModalButton.removeClass('flipInY').hide();
            menuModalLinks.removeClass('links-open');
          }


          function navModalLinkClick(event) {
            event.preventDefault();
            scope.closeMenuModal();
          }


          scope.openMenuModal = function () {
            menuModal.addClass('modal-open');
          };

          scope.closeMenuModal = function () {
            menuModalLinks.removeClass('links-open');
            menuModal.removeClass('modal-open');    
          };


          // Search modal
          var searchModal = $('#fm-fund-search-modal'),
              searchField = searchModal.find('#fm-fund-modal-seach'),
              inputGroup = searchModal.find('.fm-modal-inputgroup').hide(),
              searchModalButton = searchModal.find('.fm-fund-modal-close-button').hide();

          // Eventhandlers
          window.addEventListener('keydown', function (event) {

            if (event.altKey && event.keyCode == 83 && !searchModal.hasClass('modal-open')) {
              scope.openSearchModal();
            }

            if (event.keyCode == 27 && searchModal.hasClass('modal-open')) {
              scope.closeSearchModal();
            }
           
          });

          searchModal.on('webkitTransitionEnd transitionend', fadeInModalControls);
          inputGroup.on('webkitAnimationEnd oanimationend msAnimationEnd animationend', setInputFocus);

          function fadeInModalControls() {
            if (searchModal.hasClass('modal-open')) {
              searchModalButton.show().addClass('flipInY');
              inputGroup.show().addClass('fadeIn');
            }
            else {
              resetSearchModal();
            }
          }

          function setInputFocus() {
            searchField.focus();
          }

          function resetSearchModal() {
            searchModalButton.removeClass('flipInY fadeInDown').hide();
            inputGroup.removeClass('fadeIn').hide();
            searchField.val('');

            if (scope.search.title) {
              scope.search.title = '';
            }
      
          }

          scope.openSearchModal = function () {
            searchModal.addClass('modal-open');
            
            if (menuModal.hasClass('modal-open')) {
              scope.closeMenuModal();
            }
          };

          scope.closeSearchModal = function () {
            searchModal.removeClass('modal-open');
          };

          scope.searchItems = [];

          fmDataService.then(function (data) {
            scope.funds = data.funds;
            scope.newsitems = data.newsitems;
            

            for (var key in scope.funds) {
              if (scope.funds.hasOwnProperty(key)) {
                var fundItem = { title: scope.funds[key].name, type: 'fund'};
                scope.searchItems.push(fundItem);
              }
            }

            for (var key in scope.newsitems) {
              if (scope.newsitems.hasOwnProperty(key)) {
                var newsItem = { title: scope.newsitems[key].headline, type: 'news' };
                scope.searchItems.push(newsItem);
              }
            }
          });

        }
      }

    }]);

})();
//# sourceMappingURL=fm-navbar-directive.js.map
