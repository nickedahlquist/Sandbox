(function() {
'use strict';
  
  var gutil = require('gulp-util');

  module.exports = {
    output : function(info, mode) {
      gutil.log('Logging to console... \r\n \r\n' +
      '\n' + gutil.colors.white('Project: ' + info.project) +
      '\n' + gutil.colors.white('Version: ' + info.version) +
      '\n' + gutil.colors.white('Authors: ' + info.authors) +
      '\n' + gutil.colors.white('Mode: ') + (mode === 'production' ? gutil.colors.green(' production ') : gutil.colors.yellow(' development ')) +
      ' \r\n \r\n');
    }
  };

})();