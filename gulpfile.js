'use strict'

const gulp             = require('gulp')
const webpack          = require('webpack')
const webpackConfig    = require('./webpack.config.js')
const webpackDevServer = require('webpack-dev-server')
const runSequence      = require('run-sequence')
const gulpLoadPlugins  = require('gulp-load-plugins')
const $ = gulpLoadPlugins({
  pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});

gulp.task('ejs', ()=> {
gulp.src([
    './source/templates/**/*.ejs',
    '!./source/templates/**/_*.ejs'
    ])
    .pipe($.ejs())
    .pipe($.plumber({}))
    .pipe(gulp.dest('dist/templates'));
});

gulp.task('sass', () => {
      const AUTOPREFIXER_BROWSERS = [
        'ie >= 11',
        'last 3 version',
        'ios >= 7',
        'android >= 4.0'
      ];
      gulp.src([
        './source/assets/stylesheets/**/*.scss'
         ])
         .pipe($.plumber({}))
         .pipe($.sass({outputStyle: 'compressed'}))
         .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
         .pipe(gulp.dest('dist/assets/stylesheets/'));
});

gulp.task('webpack', () => {
    webpack(webpackConfig, (err, stats) => {
        if(err) throw new $.gutil.PluginError('webpack', err);
        $.gutil.log('[webpack]', stats.toString({}));
    })
});

gulp.task('webpack-dev-server', function(callback) {
    let compiler = webpack(webpackConfig)
    // NOTE: https://webpack.github.io/docs/webpack-dev-server.html
    new webpackDevServer(compiler, {
        // 簡易サーバーのオプション
        contentBase: './dist/',
        hot: true
    }).listen(8080, 'localhost', (err) => {
        if(err) throw new $.gutil.PluginError('webpack-dev-server', err);
        $.gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
    });
});

gulp.task('clean', $.shell.task(['rm -rf dist']))

gulp.task('dist', () => {
  runSequence(
    'clean',
    ['webpack', 'ejs', 'sass']
  );
})

gulp.task('serve', () => {
    gulp.watch(['source/templates/**/*.ejs'], ['ejs']);
    gulp.watch(['source/javascripts/**/*.js'], ['webpack']);
})

gulp.task('default', ['serve', 'webpack-dev-server'])
