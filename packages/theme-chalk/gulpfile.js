'use strict'
/* eslint-disable @typescript-eslint/no-var-requires */
const { series, src, dest } = require('gulp')
const stylus = require('gulp-stylus')
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')

function compile() {
  return src('./src/*.styl')
    .pipe(stylus())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cssmin())
    .pipe(dest('./lib'))
}

exports.build = series(compile)
