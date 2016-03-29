/*
 * run.js
 * ======
 * 
 * The run-method contains any code that needs to run in order to kickstart the application.    
 *
 */

(function () {
  'use strict';

  angular.module('fm').run(['$rootScope', initRun]);

  function initRun($rootScope) {
    $rootScope.store = 0;
  }

})();

//# sourceMappingURL=run.js.map
