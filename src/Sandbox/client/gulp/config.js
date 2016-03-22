(function() {
'use strict';

  var pkg = require('../../package.json');
  var launch_settings = require('../../Properties/launchSettings.json');
  var proxy = launch_settings.iisSettings.iisExpress.applicationUrl;
  var src_path = 'client/src';
  var dest_path = 'wwwroot';

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
        src: src_path + '/js/**/*.+(js|json)',
        dest: dest_path + '/js'
      },
      img: {
        src: src_path + '/img/**/*.+(png|jpg|jpeg|gif|svg)',
        dest: dest_path + '/img'
      },
      fonts: {
        src: [src_path + '/fonts/**/*.+(ttf|woff|eof|eot|svg)', './bower_components/bootstrap-sass/assets/fonts/**/*'],
        dest: dest_path + '/fonts'
      },
      misc: {
        src: src_path + '/misc/**/*',
        dest: dest_path
      },
      components: {
        css: {
          src: src_path + '/components/**/*.scss',
          dest: src_path + '/scss'
        },
        js: {
          src: src_path + '/components/**/*.js',
          dest: dest_path + '/js'
        },
        html: {
          src: src_path + '/components/**/*.html',
          dest: dest_path + '/views'
        }
        
      },
      root_src: src_path,
      root_dest: dest_path
    },
    info: {
      project: pkg.name,
      version: pkg.version,
      authors: pkg.author.name,
    }
  };

})();