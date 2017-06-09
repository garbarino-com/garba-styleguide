var autoprefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    debug = require('gulp-debug'),
    del = require('del'),
    gulp = require('gulp'),
    jsonImporter = require('node-sass-json-importer'),
    sass = require('gulp-sass'),
    sassConfig = require('./sass-config.json'),
    shell = require('gulp-shell'),
    toolSettings = require('frontend-settings');

// Base paths (root)
var assetsPath = './assets/'
var libraryPath = './node_modules/garba-ui/';
var outputPath = './dist/kss-assets/';

// Specify folder names
var folder = {
  styles : 'css/',
  fonts: 'fonts/',
  images: 'images/',
  scripts: 'javascript/'
}

// File cleaning tasks
gulp.task('clean:sass', function () {
  return del(outputPath + folder.styles + '*.*');
});

gulp.task('clean:fonts', function () {
  return del(outputPath + folder.fonts + '*.*');
});

gulp.task('clean:images', function () {
  return del(outputPath + folder.images + '*.*');
});

gulp.task('clean:scripts', function () {
  return del(outputPath + folder.scripts + '*.*');
});

// Runs the kss build command
gulp.task('styleguide', shell.task([
  './node_modules/.bin/kss --config ./kss-config.json'
]));

// Copy files tasks
// Assets files such as images and icon-fonts need to be copied to the theme assets
// folder in order to be available for the browser.

// Copy Fonts
gulp.task('copy:fonts', function () {
  return gulp.src([
      libraryPath + 'dist/' + folder.fonts + '*', // New icon font path
      libraryPath + 'dist/' + 'lib/_v1.3.2/fonts/*' // Old icon font path
    ])
    .pipe(debug([
      libraryPath + 'dist/' + folder.fonts + '*', // New icon font path
      libraryPath + 'dist/' + 'lib/_v1.3.2/fonts/*' // Old icon font path
    ]))
    .pipe(debug({title: 'copy-from:'}))
    .pipe(gulp.dest(outputPath + folder.fonts))
    .pipe(debug({title: 'copy-to:'}));
});

// Copy Scripts
gulp.task('copy:scripts', function () {
  return gulp
    .src([
      // Copy library script to assets folder
      (libraryPath + 'dist/' + folder.scripts + '*.js'),

      // Copy requirejs to assets folder
      ('./node_modules/requirejs/*.js')
    ])
    .pipe(debug(libraryPath + 'dist/' + folder.scripts))
    .pipe(debug({title: 'copy-from:'}))
    .pipe(gulp.dest(outputPath + folder.scripts))
    .pipe(debug({title: 'copy-to:'}));
});

// Copy Images
gulp.task('copy:images', function () {
  return gulp.src((libraryPath + 'dist/' + folder.images + '*'))
    .pipe(debug(libraryPath + 'dist/' + folder.images))
    .pipe(debug({title: 'copy-from:'}))
    .pipe(gulp.dest(outputPath + folder.images))
    .pipe(debug({title: 'copy-to:'}));
});

// Compiles, autoprefixes & minifies the sass files
gulp.task('sass', function () {
  return gulp
    .src([assetsPath + '/scss/*.scss'])
    .pipe(sass({
      importer: jsonImporter,
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest(outputPath + folder.styles))

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

// Watches files and auto-refreshes when changes are saved
gulp.task('watch', ['clean:sass', 'clean:fonts', 'clean:images', 'copy:fonts',
  'copy:images', 'copy:scripts', 'sass'], function () {
  gulp.watch([
      assetsPath + 'app/' + '**/*',
      libraryPath + 'app/' + '**/*'
    ], ['sass'], function (event) {
    // timeout gives kss a chance to finish compiling first
    setTimeout(function() {
      return gulp
        .src(event.path)
        .pipe(connect.reload());
      }, 400);
  });
  // watches style guide theme files and runs a whole rebuild after saves
});

gulp.task('start-dev', ['styleguide', 'clean:sass', 'clean:fonts', 'clean:images',
  'copy:fonts', 'copy:images', 'copy:scripts', 'sass', 'server', 'watch']);
