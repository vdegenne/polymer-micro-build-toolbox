# polymer-micro-build-toolbox

This package provides `polymer-build` module and the `getOptimizeStreams` helper from the `polymer-cli` project. It also provides the `merge-stream` for merging sources and dependencies during the building process, `gulp-filter` to remove the index.html file from the processed sources (see the example).
The reason I gathered these tools is because I don't directly use the polymer CLI and needed a way to minify and bundle my application shells.

## example

Here's one example using this module to customize your polymer build workflow

```javascript
const {PolymerProject, HtmlSplitter} = require('polymer-build');
const {getOptimizeStreams} = require('polymer-micro-build-toolbox');
const filter = require('gulp-filter');

const project = new PolymerProject({
    root: 'src/components/mymodule', /* the root should content an index.html, make an empty one if you have none */
    shell: 'mymodule-shell.html'
});

const htmlSplitter = new HtmlSplitter();

let buildstream = mergeStream(project.sources(), project.dependencies())
  .pipe(filter(file => file.path !== project.config.entrypoint))
  .pipe(htmlSplitter.split())
  .pipe(getOptimizeStreams({ css: { minify: true }, js: { minify: true }, html: { minify: true }}))
  .pipe(htmlSplitter.rejoin())
  .pipe(project.bundler());

buildstream.on('data', function (file) {
  file.pipe(fs.createWriteStream('app-shell.min.html', 'utf8'));
});
```