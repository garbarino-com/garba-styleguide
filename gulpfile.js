var del = require('del'),
    gulp = require('gulp'),
    runSequence = require('run-sequence'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');

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
