"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("polymer-build"));
const mergeStream = require("merge-stream");
const gulpFilter = require("gulp-filter");
__export(require("./optimize-streams"));
exports.mergeStream = mergeStream;
exports.gulpFilter = gulpFilter;
