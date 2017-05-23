var gulp = require('gulp');
var shell = require('gulp-shell');
var sass = require('gulp-sass');
var connect = require('gulp-connect');

// Base paths (root)
var libraryPath = '/node_modules/garba-ui/app/lib/components/**/*.scss';

// Runs the kss build command
gulp.task('styleguide', shell.task([
  './node_modules/.bin/kss --source ./node_modules/garba-ui/app/lib/'
]));

// Compiles, autoprefixes & minifies the sass files
gulp.task('sass', function () {
  return gulp
    .src(['./assets/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('./assets/css/garba-styleguide.css'));
});

// Runs a server at http://localhost:4200/
gulp.task('server', function () {
  connect.server({
    root: './styleguide',
    port: process.env.PORT || '3000',
    livereload: true
  });
});

// Watches files and auto-refreshes when changes are saved
gulp.task('watch', function () {
  gulp.watch(['./components/**/*'], function (event) {
    // timeout gives documentjs a chance to finish compiling first
    setTimeout(function() {
      return gulp
        .src(event.path)
        .pipe(connect.reload());
      }, 400);
  });
  // watches style guide theme files and runs a whole rebuild after saves
});

gulp.task('start-dev', ['styleguide', 'sass', 'server', 'watch']);
