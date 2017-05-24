var autoprefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    shell = require('gulp-shell'),
    toolSettings = require('frontend-settings');

// Base paths (root)
var libraryPath = '/node_modules/garba-ui/app/lib/components/**/*.scss';

// Runs the kss build command
gulp.task('styleguide', shell.task([
  './node_modules/.bin/kss --config ./kss-config.json'
]));

// Compiles, autoprefixes & minifies the sass files
gulp.task('sass', function () {
  return gulp
    .src(['./assets/scss/*.scss'])
    .pipe(sass(
      {outputStyle: 'compressed'}
    ).on('error', sass.logError))
    .pipe(gulp.dest('./dist/kss-assets/'))

    // TODO: Test autoprefixer
    .pipe(autoprefixer(toolSettings.autoprefixer));
});

// Runs a server at http://localhost:3000/
gulp.task('server', function () {
  connect.server({
    root: './dist',
    port: process.env.PORT || '3000',
    livereload: true
  });
});

// Remove css folder and run sass compiler on file change.
gulp.task('watch', ['clean:sass', 'sass'], function() {
  gulp.watch(input().styles, ['sass']);
});

// Watches files and auto-refreshes when changes are saved
gulp.task('watch', function () {
  gulp.watch('./assets/**/*', ['sass'], function (event) {
    // timeout gives kss a chance to finish compiling first
    setTimeout(function() {
      return gulp
        .src(event.path)
        .pipe(connect.reload());
      }, 400);
  });
  // watches style guide theme files and runs a whole rebuild after saves
});

gulp.task('start-dev', ['styleguide', 'sass', 'server', 'watch']);
