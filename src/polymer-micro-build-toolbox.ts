export * from 'polymer-build';

import mergeStream = require('merge-stream');
import gulpFilter = require('gulp-filter');

export * from './optimize-streams';

exports.mergeStream = mergeStream;
exports.gulpFilter = gulpFilter;