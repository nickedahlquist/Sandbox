(function () {
    'use strict';

    angular.module('fm').service('$navlinksService', ['$state', function ($state) {

      var links = [];

      // Sort the navigation links based on the "sortOrder" property of each state.
      var states = _.sortBy($state.get(), 'sortOrder');

      // Filter out all states missing the "sortOrder" property.
      for (var key in states) {
        if (states.hasOwnProperty(key) && states[key].sortOrder) {
          links.push({ name: states[key].resolve.$title(), url: states[key].name });
        }
      }

      this.getNavLinks = function () {
        return links;
      };

    }]);

})();