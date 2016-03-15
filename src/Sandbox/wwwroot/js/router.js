/*
 * router.js
 * ============
 * 
 * This file handles the clientside routing.    
 *
 */

(function () {
  'use strict';

  angular.module('fm')
    .constant('fmConfig', {
      node: {
        url: 'http://localhost',
        port: '8080',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
      },
      IIS: {
        url: 'js/data/data.json',
      }

    }).
    config(['$stateProvider', '$urlMatcherFactoryProvider', '$urlRouterProvider', function ($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider) {

      //Enable case insensitive routes (state-names)
      $urlMatcherFactoryProvider.caseInsensitive(true);

      //Set default route
      $urlRouterProvider.otherwise('/Hem');

      $stateProvider
        .state('Hem', {
          url: '/Hem',
          controller: 'FmHomeController',
          templateUrl: '../views/fm-home-view.html'
        })
        .state('Nyheter', {
          url: '/Nyheter',
          controller: 'FmNewsController',
          templateUrl: '../views/fm-news-view.html'
        })
        .state('Fonder', {
          url: '/Fonder',
          controller: 'FmFundsController',
          templateUrl: '../views/fm-funds-view.html'
        })
        .state('Kontakt', {
          url: '/Kontakt',
          controller: 'FmContactController',
          templateUrl: '../views/fm-contact-view.html'
        })
        .state('Skapa Konto', {
          url: '/Skapa Konto',
          controller: 'FmRegisterController',
          templateUrl: '../views/fm-register-view.html'
        })

  }]);

})();
//# sourceMappingURL=router.js.map
