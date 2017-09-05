export * from 'polymer-build';
export * from './streams';
export * from './optimize-streams';

import mergeStream = require('merge-stream');
import gulpFilter = require('gulp-filter');

exports.mergeStream = mergeStream;
exports.gulpFilter = gulpFilter;