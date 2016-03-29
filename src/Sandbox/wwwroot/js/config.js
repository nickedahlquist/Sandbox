/*
 * config.js
 * =========
 * 
 * This file handles the clientside default routing.    
 *
 */

(function () {
  'use strict';

  angular.module('fm').config(['$stateProvider', '$urlMatcherFactoryProvider', '$urlRouterProvider', initConfig]);

  function initConfig($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider) {

    //Enable case insensitive routes (state-names)
    $urlMatcherFactoryProvider.caseInsensitive(true);

    //Set default route
    $urlRouterProvider.otherwise('/Hem');

  }

})();

//# sourceMappingURL=config.js.map
