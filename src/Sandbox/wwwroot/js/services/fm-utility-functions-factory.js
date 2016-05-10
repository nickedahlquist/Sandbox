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
        },
        formatDate: function (date) {
          var d = new Date(date),
              month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();

          if (month.length < 2) month = '0' + month;
          if (day.length < 2) day = '0' + day;

          return [year, month, day].join('-');
        },
        blendColor: function (color, percent) {

          var R = parseInt(color.substring(1, 3), 16);
          var G = parseInt(color.substring(3, 5), 16);
          var B = parseInt(color.substring(5, 7), 16);

          R = parseInt(R * (100 + percent) / 100);
          G = parseInt(G * (100 + percent) / 100);
          B = parseInt(B * (100 + percent) / 100);

          R = (R < 255) ? R : 255;
          G = (G < 255) ? G : 255;
          B = (B < 255) ? B : 255;

          var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
          var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
          var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

          return "#" + RR + GG + BB;
        }
      }
    }]);

})();

//# sourceMappingURL=fm-utility-functions-factory.js.map
