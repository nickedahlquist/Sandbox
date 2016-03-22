// Hotfix for ES6 Promises
require('es6-promise').polyfill();

//Non-gulp packages
var browserSync = require('browser-sync');
var del = require('del');
var wiredep = require('wiredep').stream;
var pngquant = require('imagemin-pngquant');

//Gulp packages
var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpSequence = require('gulp-sequence');
var htmlmin = require('gulp-htmlmin');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var imagemin = require('gulp-imagemin');
var newer = require('gulp-newer');
var inject = require('gulp-inject');
var flatten = require('gulp-flatten');
var autoprefixer = require('gulp-autoprefixer');

//Custom modules
var buildInfo = require('./client/gulp/build-info.js');
var onError = require('./client/gulp/on-error.js');
var config = require('./client/gulp/config.js');
var paths = config.paths;

// --------------------------------------------------------------------
// Task: LOG
// --------------------------------------------------------------------

gulp.task('log:development', function () {
  buildInfo.output(config.info, 'development');
});

gulp.task('log:production', function () {
  buildInfo.output(config.info, 'production');
});

// --------------------------------------------------------------------
// Task: CLEAN
// --------------------------------------------------------------------

gulp.task('clean', function () {
  return del([paths.root_dest + '/**', '!' + paths.root_dest, '!' + paths.root_dest + '/web.config']);
});

// --------------------------------------------------------------------
// Task: MISC
// --------------------------------------------------------------------

gulp.task('misc', function () {
  return gulp.src(paths.misc.src)
    .pipe(newer(paths.misc.dest))
    .pipe(gulp.dest(paths.misc.dest))
    .pipe(browserSync.stream());
});

// --------------------------------------------------------------------
// Task: FONTS
// --------------------------------------------------------------------

gulp.task('fonts', function () {
  return gulp.src(paths.fonts.src)
    .pipe(newer(paths.fonts.dest))
    .pipe(gulp.dest(paths.fonts.dest))
    .pipe(browserSync.stream());
});

// --------------------------------------------------------------------
// Task: IMAGES
// --------------------------------------------------------------------

var images_options = {
  imagemin: {
    optimizationLevel: 3,
    interlaced: true,
    progressive: true,
    svgoPlugins: [{ removeViewBox: false }],
    use: [pngquant()]
  }
};

gulp.task('images', function () {
  return gulp.src(paths.img.src)
    .pipe(newer(paths.img.dest))
    .pipe(imagemin(images_options.imagemin))
    .pipe(gulp.dest(paths.img.dest))
    .pipe(browserSync.stream());
});

// --------------------------------------------------------------------
// Task: WIREDEP
// --------------------------------------------------------------------

var wiredep_options = {
  ignorePath: '../..'
};

gulp.task('wiredep:development', function () {
  return gulp.src(paths.html.src)
    .pipe(wiredep(wiredep_options))
    .pipe(gulp.dest(paths.root_src));
});

// --------------------------------------------------------------------
// Task: INJECT-JS
// --------------------------------------------------------------------

gulp.task('inject-js', function () {

  var inject_js_options = {
    inject: {
      read: false,
      relative: true
    },
    transforms: {
      starttag: '<!-- inject:js-modules -->',
      endtag: '<!-- endinject -->',
      transform: function (filepath) {
        var jspath = filepath.replace('/client/src/components', '');
        //var jspath = filepath.split(/[\\/]/).pop();
        return '<script src="/js' + jspath + '"></script>';
      }
    }
  };

  gulp.src(paths.html.src)
    .pipe(inject(gulp.src([paths.components.js.src], inject_js_options.inject), inject_js_options.transforms))
    .pipe(gulp.dest(paths.root_src));
});

// --------------------------------------------------------------------
// Task: INJECT-SASS-COMPONENTS
// --------------------------------------------------------------------

var sass_components_options = {
  inject: {
    read: false,
    relative: true
  },
  transforms: {
    starttag: '/* inject:scss */',
    endtag: '/* endinject */',
    transform: function (filepath) {
      var sass_component_path = filepath.replace('/client/src', '');
      return '@import "..' + sass_component_path + '";';
    }
  }
};

  gulp.task('inject-sass-components', function () {
    return gulp.src('./client/src/scss/style.scss')
      .pipe(inject(gulp.src(paths.components.css.src, sass_components_options.inject), sass_components_options.transforms))
      .pipe(gulp.dest(paths.components.css.dest));
  });

// --------------------------------------------------------------------
// Task: JS
// --------------------------------------------------------------------

gulp.task('js:development', function () {
  return gulp.src([paths.js.src, paths.components.js.src])
      .pipe(newer(paths.js.dest)) //test
      .pipe(sourcemaps.init())
      .pipe(sourcemaps.write('.'))
      .on('error', onError)
      //.pipe(flatten({ includeParents: 1 }))
      .pipe(gulp.dest(paths.js.dest))
      .pipe(browserSync.stream());
});

gulp.task('js:production', function () {
  return gulp.src(paths.js.src)
      .pipe(uglify())
      .on('error', onError)
      .pipe(gulp.dest(paths.js.dest));
});

// --------------------------------------------------------------------
// Task: HTML
// --------------------------------------------------------------------

var html_options = {
  htmlmin: {
    collapseWhitespace: true
  }
};

gulp.task('html:development', function () {
  return gulp.src(paths.html.src)
      .pipe(gulp.dest(paths.html.dest))
      .pipe(browserSync.stream());
});

gulp.task('html:production', function () {
  return gulp.src(paths.html.src)
      .pipe(htmlmin(html_options.htmlmin))
      .pipe(gulp.dest(paths.html.dest));
});

// --------------------------------------------------------------------
// Task: TEMPLATES
// --------------------------------------------------------------------

gulp.task('templates', function () {
  return gulp.src(paths.components.html.src)
      .pipe(newer(paths.components.html.dest))
      .pipe(flatten())
      .pipe(gulp.dest(paths.components.html.dest))
      .pipe(browserSync.stream());
});

// --------------------------------------------------------------------
// Task: SCSS
// --------------------------------------------------------------------

var sass_options = {
  includePaths: {
    includePaths: [
    './bower_components/bourbon/app/assets/stylesheets',
    './bower_components/bootstrap-sass/assets/stylesheets',
    './bower_components/animate.css',
    './bower_components/swiper/dist/css/swiper.css'
    ]
  },
  autoprefixer: {
    browsers: ['last 2 versions', 'ie 9'],
    cascade: false
  },
  cssnano: {
    discardComments: {
      removeAll: true
    }
  }
};

gulp.task('sass:development', function () {
  return gulp.src(paths.css.src)
    .pipe(sourcemaps.init())
      .pipe(sass(sass_options.includePaths))
      .on('error', onError)
      .pipe(autoprefixer(sass_options.autoprefixer))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.css.dest))
      .pipe(browserSync.stream());
});

gulp.task('sass:production', function () {
  return gulp.src(paths.css.src)
      .pipe(sass(sass_options.includePaths))
      .on('error', onError)
      .pipe(autoprefixer(sass_options.autoprefixer))
      .pipe(cssnano(sass_options.cssnano))
      .pipe(gulp.dest(paths.css.dest));
});

// --------------------------------------------------------------------
// Task: BROWSER SYNC
// --------------------------------------------------------------------

gulp.task('serve', function (done) {

  var serve_options = {
    ghostMode: {
      clicks: true,
      forms: true,
      scroll: true
    },
    open: true,
    notify: true,
    proxy: {
      target: config.server.proxy,
      middleware: function (req, res, next) {
        console.log(req.url);
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  };

  browserSync(serve_options, done);

  gulp.watch(paths.misc.src, ['misc']);
  gulp.watch(paths.img.src, ['images']);
  gulp.watch(paths.html.src, ['html:development']);
  gulp.watch([paths.js.src, paths.components.js.src], ['js:development']);
  gulp.watch(paths.css.src, ['sass:development']);

  gulp.watch(paths.components.html.src, ['templates']);

  gulp.watch(paths.components.css.src, ['inject-sass-components']);
  gulp.watch([paths.js.src, paths.components.js.src], ['inject-js']);
  
});

// --------------------------------------------------------------------
// Task: DEVELOPMENT
// --------------------------------------------------------------------

gulp.task('DEVELOPMENT', gulpSequence(['log:development', 'misc', 'images', 'fonts', 'wiredep:development', 'inject-js', 'html:development', 'templates', 'inject-sass-components', 'sass:development', 'js:development'], 'serve'));

// --------------------------------------------------------------------
// Task: PRODUCTION
// --------------------------------------------------------------------

gulp.task('PRODUCTION', gulpSequence('log:production', 'clean', 'misc', 'images', 'fonts', 'html:production', 'sass:production', 'js:production'));


