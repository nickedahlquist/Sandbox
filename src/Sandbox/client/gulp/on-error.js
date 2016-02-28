(function() {
'use strict';

  var gutil  = require('gulp-util');

  module.exports = function (err) {

    var status = (err.name !== undefined) ? '\n' + gutil.colors.red('Status: ' + err.name + '! ') : '',
    line = (err.line !== undefined) ? '\n' + gutil.colors.red('Line: ' + err.line) : '',
    message = (err.message !== undefined) ? '\n' + gutil.colors.red('Message: ' + err.message) : '';
    
    gutil.log('Logging to console... \r\n \r\n' + status + line + message + ' \r\n');

    this.emit('end');
  };

})();