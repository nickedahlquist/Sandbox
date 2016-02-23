(function() {
'use strict';
  
  var logColors = require('colors/safe');
  var pkg       = require('../../package.json');

  module.exports = {
    output : function(mode) {
      console.log('\n' + logColors.grey('Project: ') +  pkg.name + 
      '\n' + logColors.grey('Version: ') + pkg.version + 
      '\n' + logColors.grey.bold('Authors: ') + pkg.author.name + 
      '\n' + logColors.grey.bold('Mode: ') + (mode === 'development' ? logColors.bgMagenta(' development ') : logColors.bgGreen(' production ')) + 
      '\n');
    }
  };

})();