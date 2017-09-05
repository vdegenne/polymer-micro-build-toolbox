# polymer-micro-build-toolbox

This package provides `polymer-build` module and the `getOptimizeStreams` helper from the `polymer-cli` project. It also provides the `merge-stream` for merging sources and dependencies during the building process, `gulp-filter` to remove the index.html file from the processed sources (see the example).
The reason I gathered these tools is because I don't directly use the polymer CLI and needed a way to minify and bundle my application shells.

## install

You can use yarn to install this package

```
yarn add polymer-micro-build-toolbox --dev
```


## example

Here's one example using this module to customize your polymer build workflow

```javascript
const {PolymerProject, HtmlSplitter, pipeStreams, getOptimizeStreams, mergeStream, gulpFilter} = require('polymer-micro-build-toolbox');
const fs = require('fs');

// (1.)
const project = new PolymerProject({
  root: 'src/src/www',
  shell: 'components/vcms/vcms-shell.html'
});

const htmlSplitter = new HtmlSplitter();
const optimizeOptions = { css: { minify: true }, js: { minify: true }, html: { minify: true }};

// (2.)
let buildStream =  pipeStreams([
  mergeStream(project.sources(), project.dependencies()),
  htmlSplitter.split(),
  getOptimizeStreams(optimizeOptions),
  htmlSplitter.rejoin(),
  project.bundler(),
  gulpFilter(file => file.path !== project.config.entrypoint) // (3.)
]);

// (4.)
buildStream.on('data', file => {
  file.pipe(fs.createWriteStream('vcms-shell.min.html'));
}).on('end', _ => {
  console.log('build success');
});
```

1. We create the project object.
   If we make the build from a parent directory, we need to inform the root directory. Or else the process will assume the `index.html` file is where we invoked the script.

2. We use the `pipeStreams` function to start the building workflow.
   The `pipeStreams` needs to be used, trying to pipe() streams together will likely fail.

3. We can use `gulpFilter` helper to remove the index.html file from the stream.

4. Endpoint where we write the processed minified shell to a file.