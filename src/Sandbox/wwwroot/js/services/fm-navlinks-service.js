(function () {
    'use strict';

    angular.module('fm').service('$navlinksService', ['$state', function ($state) {

      this.links = [];

      var states = $state.get();
      
      function filterOut(val) {
        var excludedValues = ['Skapa Konto'];

        return (excludedValues.indexOf(val) === -1) ? true : false;
      }

      for (var key in states) {
        if (states.hasOwnProperty(key) && states[key].name && filterOut(states[key].name)) {
          this.links.push({ name: states[key].name, url: states[key].name });
        }
      }

    }]);

})();
//# sourceMappingURL=fm-navlinks-service.js.map
