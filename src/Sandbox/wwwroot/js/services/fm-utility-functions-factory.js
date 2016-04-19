(function () {
    'use strict';

    angular.module('fm').factory('fmUtilityFunctions', [function () {
      return {
        intToArray: function (number) {
          return new Array(number);
        },
        truncateText: function (maxLengthIn, textIn) {
          var text = textIn.trim() + ' ';
          var maxLength = maxLengthIn;

          //trim the string to the maximum length
          var trimmedText= text.substr(0, maxLength);

          //re-trim if we are in the middle of a word
          trimmedText = trimmedText.substr(0, Math.min(trimmedText.length, trimmedText.lastIndexOf(" ")));
          return trimmedText = (trimmedText.substr(trimmedText.length - 1) === '.') ? trimmedText + '..' : trimmedText + '...';
        }
      }
    }]);

})();

//# sourceMappingURL=fm-utility-functions-factory.js.map
