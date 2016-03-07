/*
 * router.js
 * ============
 * 
 * This file handles the clientside routing.    
 *
 */

(function () {
  'use strict';

  angular.module('fm').config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/Hem', {
        title: 'Hem',
        controller: 'FmHomeController',
        templateUrl: '../views/fm-home-view.html'
      })
      .when('/Nyheter', {
        title: 'Nyheter',
        controller: 'FmNewsController',
        templateUrl: '../views/fm-news-view.html'
      })
      .when('/Kontakt', {
        title: 'Kontakt',
        controller: 'FmContactController',
        templateUrl: '../views/fm-contact-view.html'
      })
      .otherwise({
        redirectTo: '/Hem'
      });
  }]);

})();