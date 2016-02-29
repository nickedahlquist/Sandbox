/// <binding />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

// Hotfix for ES6 Promises
require('es6-promise').polyfill();

var browserSync = require('browser-sync');
var watchify = require('watchify');
var browserify = require('browserify');
var debowerify = require('debowerify');
var del = require('del');
var ngAnnotate = require('browserify-ngannotate');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
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
var autoprefixer = require('gulp-autoprefixer');
var buildInfo = require('./client/gulp/build-info.js');
var onError = require('./client/gulp/on-error.js');
var config = require('./client/gulp/config.js');
var paths = config.paths;

var buildMode = config.mode;
var isProd = (buildMode === 'production') ? true : false;

//Output build info.
buildInfo.output(config.info);

// --------------------------------------------------------------------
// Task: BROWSERIFY
// --------------------------------------------------------------------



// bundling js with browserify and watchify
var bundler = browserify({
  entries: [paths.js.src],
  cache: {},
  packageCache: {},
  fullPaths: isProd
});

if (!isProd) {
  bundler = watchify(bundler);

  bundler.on('update', function () {
    bundle();
    gutil.log('Browserify rebundling...');
  });

  bundler.on('log', gutil.log);
}

bundler.transform(debowerify, {});
bundler.transform(ngAnnotate, {});

function bundle() {
  return bundler.bundle()
    .on('error', onError)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(buildMode === 'development' ? sourcemaps.init() : gutil.noop())
    .pipe(buildMode === 'production' ? babel({
      presets: ['es2015'],
      compact: false
    }) : gutil.noop())
  .pipe(concat('bundle.js'))
  .pipe(buildMode === 'development' ? sourcemaps.write('.') : gutil.noop())
  .pipe(buildMode === 'production' ? streamify(uglify()) : gutil.noop())
  .pipe(gulp.dest(paths.js.dest))
  .pipe(browserSync.stream());
}

+gulp.task('js', bundle);

// --------------------------------------------------------------------
// Task: CLEAN
// --------------------------------------------------------------------

gulp.task('clean', function () {
  return del(paths.del);
});

// --------------------------------------------------------------------
// Task: HTML
// --------------------------------------------------------------------

gulp.task('html', function () {
  return gulp.src(paths.html.src)
      .pipe(isProd ? htmlmin({ collapseWhitespace: true }) : gutil.noop())
      .pipe(gulp.dest(paths.html.dest))
      .pipe(browserSync.stream());
});

// --------------------------------------------------------------------
// Task: SCSS
// --------------------------------------------------------------------

gulp.task('sass', function () {
  return gulp.src(paths.css.src)
    .pipe(!isProd ? sourcemaps.init() : gutil.noop())
      .pipe(sass({
        includePaths: [
        './bower_components/bourbon/app/assets/stylesheets',
        './bower_components/bootstrap-sass/assets/stylesheets',
        './bower_components/animate.css',
        ]
      }))
      .on('error', onError)
      .pipe(autoprefixer({ browsers: ['last 2 versions', 'ie 9'], cascade: false }))
      .pipe(!isProd ? sourcemaps.write('./') : gutil.noop())
      .pipe(isProd ? cssnano({ discardComments: { removeAll: true } }) : gutil.noop())
      .pipe(gulp.dest(paths.css.dest))
      .pipe(browserSync.stream());
});

// --------------------------------------------------------------------
// Task: BROWSER SYNC
// --------------------------------------------------------------------

// browser sync server for live reload
/*gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: paths.baseDir
        }
    });

    gulp.watch(paths.html.src, ['html']);
    gulp.watch(paths.css.src, ['sass']);
});*/

gulp.task('serve', function (done) {
  browserSync({
    proxy: {
      target: config.server.proxy,
      middleware: function (req, res, next) {
        console.log(req.url);
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }, done);

  gulp.watch(paths.html.src, ['html']);
  gulp.watch(paths.css.src, ['sass']);
});

// --------------------------------------------------------------------
// Task: DEFAULT
// --------------------------------------------------------------------

// use gulp-sequence to finish building html, sass and js before first page load
gulp.task('default', gulpSequence(['html', 'sass', 'js'], 'serve'));


