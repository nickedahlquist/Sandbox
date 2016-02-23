(function() {
'use strict';

  var mode = ((process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production') ? 'development' : 'production';
  var src_path = './client/src';
  var dest_path = './wwwroot';
  
  module.exports = {
    server: {
        proxy: 'http://localhost:53419/index.html'
    },
    paths: {
      html: {
        src: src_path + '/index.html',
        dest: dest_path
      },
      css: {
        src: src_path + '/scss/**/*.scss',
        dest: dest_path + '/css'
        ,
      },
      js: {
        src: src_path + '/js/main',
        dest: dest_path + '/js'
      },
      baseDir: dest_path
    },
    mode: mode
  };

})();