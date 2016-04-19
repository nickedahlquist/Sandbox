(function () {
  'use strict';

  angular.module('fm').service('fmDOMCache', [function () {
    var body = $('body'),
        html = $('html');

    return {
      body: body,
      html: html
    };
  }]);

})();
