'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var pkg = require('./package');
var now = new Date();
var scripts = {
  all: [
    'gulpfile.js',
    'src/slider.js',
    'docs/js/main.js'
  ],
  docs: 'docs/js',
  src: 'src/slider.js',
  dest: 'dist'
};
var replacement = {
  regexp: /@\w+/g,
  filter: function (placeholder) {
    switch (placeholder) {
      case '@VERSION':
        placeholder = pkg.version;
        break;

      case '@YEAR':
        placeholder = now.getFullYear();
        break;

      case '@DATE':
        placeholder = now.toISOString();
        break;
    }

    return placeholder;
  }
};

gulp.task('jscopy', function () {
  return gulp.src(scripts.src)
  .pipe(gulp.dest(scripts.docs))
  .pipe(gulp.dest(scripts.dest));
});

gulp.task('jshint', function () {
  return gulp.src(scripts.all)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'));
});

gulp.task('jscs', function () {
  return gulp.src(scripts.all)
    .pipe(plugins.jscs())
    .pipe(plugins.jscs.reporter());
});

gulp.task('js', ['jshint', 'jscs'], function () {
  return gulp.src(scripts.src)
    .pipe(plugins.replace(replacement.regexp, replacement.filter))
    .pipe(gulp.dest(scripts.dest))
    .pipe(gulp.dest(scripts.docs))
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(plugins.uglify({
      preserveComments: 'license'
    }))
    .pipe(gulp.dest(scripts.dest));
});

gulp.task('htmlcomb', function () {
  return gulp.src('docs/*.html')
    .pipe(plugins.htmlcomb())
    .pipe(gulp.dest('docs'));
});

gulp.task('docs', ['js'], function () {
  return gulp.src('docs/**')
    .pipe(gulp.dest('_gh_pages'));
});

gulp.task('release', ['docs'], function () {
  return gulp.src('dist/*.{js,css}')
    .pipe(gulp.dest('_releases/' + pkg.version));
});

gulp.task('watch', function () {
  gulp.watch(scripts.src, ['jscopy']);
  gulp.watch('docs/**', ['docs']);
});

gulp.task('default', ['watch']);
