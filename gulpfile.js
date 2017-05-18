var connect = require('gulp-connect')
  del = require('del'),
  documentjs = require('documentjs'),
  gulp = require('gulp'),
  runSequence = require('run-sequence'),
  sass = require('gulp-sass'),
  shell = require('gulp-shell'),
  sourcemaps = require('gulp-sourcemaps');

// var toolConfig = require('./documentjs.json')

// Styles compilation
gulp.task('sass', function() {
  gulp.src('/assets/scss/*.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('/assets/css/garba-styleguide.css'))

    // TODO: Test sourcemaps
    .pipe(sourcemaps.write('./'))
});

// Runs the "documentjs" build command
gulp.task('build-styleguide', shell.task([
  './node_modules/.bin/documentjs'
]));

// Start server
gulp.task('connect', function() {
  connect.server({
    root: './styleguide',
    livereload: true,
    port: 3000
  });
});
