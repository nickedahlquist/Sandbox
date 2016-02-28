(function() {
'use strict';
  
  var gutil = require('gulp-util');

  module.exports = {
    output : function(info) {
      gutil.log('Logging to console... \r\n \r\n' +
      '\n' + gutil.colors.white('Project: ' + info.project) +
      '\n' + gutil.colors.white('Version: ' + info.version) +
      '\n' + gutil.colors.white('Authors: ' + info.authors) +
      '\n' + gutil.colors.white('Mode: ') + (info.mode === 'development' ? gutil.colors.yellow(' development ') : gutil.colors.green(' production ')) +
      ' \r\n \r\n');
    }
  };

})();