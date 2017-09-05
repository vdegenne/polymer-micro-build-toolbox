const gulp = require('gulp');
const typescript = require('gulp-typescript');
const path = require('path')
const fs = require('fs-extra');
const runSeq = require('run-sequence');
const mergeStream = require('merge-stream');

const tsProject = typescript.createProject(
    'tsconfig.json', {typescript: require('typescript')});


gulp.task('clean', done => {
  fs.remove(path.join(__dirname, 'lib'), done);
});

gulp.task('build', done => {
  runSeq('clean', 'compile', done);
});


gulp.task('compile', _ => {
  let tsReporter = typescript.reporter.defaultReporter();

  return tsProject.src().pipe(tsProject(tsReporter)).pipe(gulp.dest('lib'));
})