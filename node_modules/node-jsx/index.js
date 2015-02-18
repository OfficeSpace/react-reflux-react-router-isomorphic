var fs = require('fs');
var React = require('react-tools');

var installed = false;

function shouldTransform(filename, options) {
  exclude = 
    ((options['exclude'] == null) ||
    (typeof options['exclude'].test != 'function') || // needs regex
    (!options['exclude'].test(filename)))

  return exclude
}

function install(options) {
  if (installed) {
    return;
  }

  options = options || {};

  // Import everything in the transformer codepath before we add the import hook
  React.transform('', options);

  require.extensions[options.extension || '.js'] = function(module, filename) {
    var src = fs.readFileSync(filename, {encoding: 'utf8'});
    if (typeof options.additionalTransform == 'function') {
      src = options.additionalTransform(src);
    }
    try {
      if (shouldTransform(filename, options)) {
        src = React.transform(src, options);
      }
    } catch (e) {
      throw new Error('Error transforming ' + filename + ' to JSX: ' + e.toString());
    }
    module._compile(src, filename);
  };

  installed = true;
}

module.exports = {
  install: install
};
