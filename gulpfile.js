var requireDir = require('require-dir');

// recursively define gulp tasks
requireDir('build', {
  recurse: true
});
