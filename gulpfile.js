var connect = require('gulp-connect');
var del = require('del');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var shell = require('gulp-shell');
var sourcemaps = require('gulp-sourcemaps');
var wrap = require("gulp-wrap");

// Runs the "documentjs" build command
gulp.task('styleguide', shell.task([
  './node_modules/.bin/documentjs'
]));

// This is used when editing template styles.
// It has to completely rebuild the style guide, note that this takes about 5s.
gulp.task('force-styleguide', shell.task([
    './node_modules/.bin/documentjs -f'
  ])
);

// Task that reloads the browser after force-styleguide
gulp.task('reload-styleguide', ['force-styleguide'], function (event) {
  gulp.src('./styleguide/*')
    .pipe(connect.reload());
});

// Compiles, autoprefixes & minifies the sass files
gulp.task('sass', function () {
  return gulp
    .src(['./assets/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('./assets/css/garba-styleguide.css'));
});

// Copies the compiled styles to the style guide folder
gulp.task('copy-styles', ['sass'], function() {
  gulp.src('/assets/css/garba-styleguide.css')
    .pipe(gulp.dest('./styleguide/patterns'));
});

// Wraps each demo with _demo-container.html
// and copies them to the styleguide
// gulp.task('copy-demos', function () {
//   gulp.src([
//       './less/demos/**/*.html',
//       '!./less/demos/_demo-container.html'
//     ])
//     .pipe(wrap({ src: './less/demos/_demo-container.html' }))
//     .pipe(gulp.dest('./styleguide/demos'));
// });

// Copies the fonts folder
// gulp.task('copy-fonts', function() {
//   return gulp.src(['./fonts/**/*'], {
//     base: 'src'
//   }).pipe(gulp.dest('./styleguide/fonts'));
// });

// Runs a server at http://localhost:4200/
gulp.task('start-server', function () {
  connect.server({
    root: './styleguide',
    port: process.env.PORT || '3000',
    livereload: true
  });
});

// Watches files and auto-refreshes when changes are saved
gulp.task('watch', function () {
  gulp.watch(['./scss/**/*'], function (event) {
    // timeout gives documentjs a chance to finish compiling first
    setTimeout(function() {
      return gulp
        .src(event.path)
        .pipe(connect.reload());
      }, 400);
  });
  gulp.watch(['./scss/**/*.scss'], ['styleguide', 'sass']);
  // gulp.watch(['./less/demos/**/*.html'], ['copy-demos']);

  // watches style guide theme files and runs a whole rebuild after saves
  gulp.watch(['./style-guide-theme/**/*'], ['reload-styleguide', 'sass']);
});

gulp.task('build', ['force-styleguide', 'sass', 'start-server', 'watch']);
