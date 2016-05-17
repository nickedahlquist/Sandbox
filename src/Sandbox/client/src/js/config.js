/*
 * config.js
 * =========
 * 
 * This file handles the clientside default routing.    
 *
 */

(function () {
  'use strict';

  angular.module('fm').config(['$stateProvider', '$urlMatcherFactoryProvider', '$urlRouterProvider', '$httpProvider', initConfig]);

  function initConfig($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider, $httpProvider) {

    // Enable case insensitive routes (state-names).
    $urlMatcherFactoryProvider.caseInsensitive(true);

    // Set default route.
    $urlRouterProvider.otherwise('/home');

    // Intercept http-requests and append authentication header.
    $httpProvider.interceptors.push('fmAuthInterceptorService');

  }

})();
