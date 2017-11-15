/* eslint-env node */
'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    'ember-cli-image-transformer': {
      images: [
        {
          inputFilename: 'tests/dummy/public/square.svg',
          outputFileName: 'icon-square',
          convertTo: 'png',
          sizes: [16, 32, 45, 900],
        },
        {
          inputFilename: 'tests/dummy/public/circle.svg',
          outputFileName: 'transparent-circle',
          convertTo: 'png',
          background: {r: 255, g: 255, b: 255, alpha: 0},
          sizes: [100],
        },
        {
          inputFilename: 'tests/dummy/public/circle.svg',
          outputFileName: 'circle-with-green-background',
          convertTo: 'jpg',
          background: {r: 0, g: 255, b: 0, alpha: 0},
          sizes: [100],
        }
      ]
    }
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree();
};
