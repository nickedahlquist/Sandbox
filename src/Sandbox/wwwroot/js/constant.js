/*
 * constant.js
 * ===========
 * 
 * This file contains application-wide constants.    
 *
 */

(function () {
  'use strict';

  var constants = {
    node: {
      url: 'http://localhost',
      port: '8080',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
    },
    IIS: {
      url: 'js/data/data.json',
    }
  };

  angular.module('fm').constant('fmConfig', constants);

})();

//# sourceMappingURL=constant.js.map
