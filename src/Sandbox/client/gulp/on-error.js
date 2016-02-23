(function() {
'use strict';
  
  var logColors = require('colors/safe');

  module.exports = function(err) {
    var status = (err.name !== undefined) ? '\n' + logColors.grey('status: ') + logColors.bgRed(' ' + err.name + '! ') : '', 
        line = (err.line !== undefined) ? '\n' + logColors.grey('line: ') + err.line : '',
        message = (err.message !== undefined) ? '\n' + logColors.grey.bold('message: ') + err.message : '';
    
    console.log('\n' + status + line + message + '\n');
    
    this.emit('end');
  };

})();