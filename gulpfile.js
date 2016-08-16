const gulp = require('gulp'),
  del = require('del'),
  less = require('gulp-less'),
  cssmin = require('gulp-minify-css'),
  concat = require('gulp-concat'),
  webpack = require('webpack-stream'),
  Karma = require('karma');

const config = {
  paths: {
    css: [
      './src/css/**/*.css'
    ],
    less: [
      './src/less/*.less',
    ],
    js: [
      './src/**/*.js'
    ],
    app: './src/app.js',
    html: ['./src/**/*.html'],
    images: './src/images/**/*.*',
  },
  dest: {
    style: 'style.css',
    app: 'dist',
    dist: 'dist',
    less: 'src/css',
    images: 'dist/images',
  }
};


/**
 * Cleaning dist/ folder
 */

gulp.task('clean', function (cb) {
  del([config.dest.panel.dist + '/**'], cb).then((paths) => {
    console.log('Deleted files and folders:\n', paths.join('\n'))
  });
})

  /**
   * Copy html files from src to dist
   */
  .task('html', function () {
    return gulp.src(config.paths.html)
      .pipe(gulp.dest(config.dest.dist))
  })

  .task('images', function () {
    return gulp.src(config.paths.images)
      .pipe(gulp.dest(config.dest.images))
  })

  .task('less', function () {
    return gulp.src(config.paths.less)
      .pipe(less())
      .pipe(gulp.dest(config.dest.less))
  })

  .task('css', ['less'], function () {
    return gulp.src(config.paths.css)
      .pipe(concat(config.dest.style))
      .pipe(gulp.dest(config.dest.dist))
  })

  .task('css:min', ['less'], function () {
    return gulp.src(config.paths.css)
      .pipe(concat(config.dest.style))
      .pipe(cssmin())
      .pipe(gulp.dest(config.dest.dist))
  })

  .task('js', function () {
    return gulp.src(config.paths.app)
      .pipe(webpack(require('./webpack.config.js')))
      .pipe(gulp.dest(config.dest.app))
  })
  .task('js:min', function () {
    return gulp.src(config.paths.js)
      .pipe(webpack(require('./webpack.config.min.js')))
      .pipe(gulp.dest(config.dest.app))
  })

  // Watches
  .task('watch:html', function () {
    return gulp.watch(
      [
        config.paths.html
      ], [
        'html'
      ]);
  })
  .task('watch:images', function () {
    return gulp.watch(
      [
        config.paths.images
      ], [
        'images'
      ]);
  })
  .task('watch:less', function () {
    return gulp.watch(
      [
        config.paths.less
      ], [
        'css'
      ]);
  })

  .task('watch', ['watch:html', 'watch:images', 'watch:less'])

  /********************
   * *               **
   * *      TEST     **
   * *               **
   ********************/

  .task('test', function (done) {
    return new Karma.Server({
      configFile: __dirname + '/karma.conf.js',
      singleRun: false
    }, done).start();
  })

  .task('test:1', function (done) {
    return new Karma.Server({
      configFile: __dirname + '/karma.conf.js',
      singleRun: true
    }, done).start();
  })

  .task('run', ['html', 'images', 'css', 'js', 'watch'])
  .task('build', ['html', 'images', 'css', 'js'])
  .task('build:min', ['html', 'images', 'css:min', 'js:min'])

  .task('default', ['run']);
