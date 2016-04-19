/*
 * run.js
 * ======
 * 
 * The run-method contains any code that needs to run in order to kickstart the application.    
 *
 */

(function () {
  'use strict';

  angular.module('fm').run(['$rootScope', 'fmDOMCache', initRun]);

  function initRun($rootScope, fmDOMCache) {
        
    $rootScope.$on('$stateChangeSuccess', function () {
      
      // reset scrollTop on state change 
      if (fmDOMCache.body[0].scrollTop !== 0) {
        fmDOMCache.body[0].scrollTop = 0;
      }

    });
  }

})();
