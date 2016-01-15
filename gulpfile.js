var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var copy = require('gulp-copy');
var fs = require('fs');

gulp.task('copy', function () {
  return gulp.src(['./src/**/*.html', './src/**/*.css'])
    .pipe(copy('./built', { prefix: 1}));
});

gulp.task('build', ['copy'], function () {

  return browserify({debug: true})
    .transform(babelify)
    .require("./src/index.js", { entry: true })
    .bundle()
    .on('error', function (err) { console.log('Error: ' + err.message); })
    .pipe(fs.createWriteStream('./built/bundle.js'));
});
