const gulp = require('gulp'),
  del = require('del'),
  less = require('gulp-less'),
  cssmin = require('gulp-minify-css'),
  concat = require('gulp-concat'),
  Karma = require('karma'),
  webpack = require('webpack'),
  gulpWebpack = require('gulp-webpack')

const config = {
  paths: {
    css: ['./src/css/**/*.css'],
    less: ['./src/less/*.less'],
    js: ['./src/**/*.js'],
    app: './src/app.js',
    html: ['./src/**/*.html'],
    images: './src/images/**/*.*'
  },
  dest: {
    style: 'style.css',
    app: 'dist',
    dist: 'dist',
    less: 'src/css',
    images: 'dist/images'
  }
}

/**
 * Cleaning dist/ folder
 */

gulp.task('clean', function(cb) {
  del([config.dest.dist + '/**'], cb).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'))
  })
})

/**
   * Copy html files from src to dist
   */
gulp.task('html', function() {
  return gulp.src(config.paths.html).pipe(gulp.dest(config.dest.dist))
})
gulp.task('images', function() {
  return gulp.src(config.paths.images).pipe(gulp.dest(config.dest.images))
})
gulp.task('less', function() {
  return gulp.src(config.paths.less).pipe(less()).pipe(gulp.dest(config.dest.less))
})
gulp.task('css', ['less'], function() {
  return gulp
    .src(config.paths.css)
    .pipe(concat(config.dest.style))
    .pipe(gulp.dest(config.dest.dist))
})
gulp.task('css:min', ['less'], function() {
  return gulp
    .src(config.paths.css)
    .pipe(concat(config.dest.style))
    .pipe(cssmin())
    .pipe(gulp.dest(config.dest.dist))
})
gulp.task('js', function() {
  return gulp
    .src(config.paths.app)
    .pipe(gulpWebpack(require('./webpack.config.dev'), webpack))
    .pipe(gulp.dest(config.dest.app))
})
gulp.task('js:min', function() {
  return gulp
    .src(config.paths.app)
    .pipe(gulpWebpack(require('./webpack.config.prod'), webpack))
    .pipe(gulp.dest(config.dest.app))
})
// Watches
gulp.task('watch:html', function() {
  return gulp.watch([config.paths.html], ['html'])
})
gulp.task('watch:images', function() {
  return gulp.watch([config.paths.images], ['images'])
})
gulp.task('watch:less', function() {
  return gulp.watch([config.paths.less], ['css'])
})
gulp.task('watch', ['watch:html', 'watch:images', 'watch:less'])

/********************
   * *               **
   * *      TEST     **
   * *               **
   ********************/

gulp.task('test', function(done) {
  return new Karma.Server(
    {
      configFile: __dirname + '/karma.conf.js',
      singleRun: false
    },
    done
  ).start()
})
gulp.task('test:1', function(done) {
  return new Karma.Server(
    {
      configFile: __dirname + '/karma.conf.js',
      singleRun: true
    },
    done
  ).start()
})

gulp.task('run', ['html', 'images', 'css', 'js', 'watch'])
gulp.task('build', ['html', 'images', 'css', 'js'])
gulp.task('build:min', ['html', 'images', 'css:min', 'js:min'])
gulp.task('default', ['run'])
