(function() {
'use strict';

  var pkg = require('../../package.json');
  var launch_settings = require('../../Properties/launchSettings.json');
  var proxy = launch_settings.iisSettings.iisExpress.applicationUrl + 'index.html';
  var mode = ((process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production') ? 'development' : 'production';
  var src_path = './client/src';
  var dest_path = './wwwroot';

  module.exports = {
    server: {
        proxy: proxy
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
      baseDir: dest_path,
      del: [dest_path + '/**', '!' + dest_path, '!' + dest_path + '/web.config']
    },
    info: {
      project: pkg.name,
      version: pkg.version,
      authors: pkg.author.name,
      mode: mode
    },
    mode: mode
  };

})();