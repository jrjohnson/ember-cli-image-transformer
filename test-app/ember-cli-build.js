'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    'ember-cli-image-transformer': {
      images: [
        {
          inputFilename: 'public/square.svg',
          outputFileName: 'icon-square',
          convertTo: 'png',
          sizes: [16, 32, 45, 900],
        },
        {
          inputFilename: 'public/circle.svg',
          outputFileName: 'transparent-circle',
          convertTo: 'png',
          background: { r: 255, g: 255, b: 255, alpha: 0 },
          sizes: [100],
        },
        {
          inputFilename: 'public/circle.svg',
          outputFileName: 'circle-with-green-background',
          convertTo: 'jpg',
          background: { r: 0, g: 255, b: 0, alpha: 0 },
          sizes: [100],
        },
        {
          inputFilename: 'public/square.svg',
          outputFileName: 'bigsquare',
          convertTo: 'png',
          destination: 'big/images',
          sizes: [200],
        },
      ],
    },
  });

  const { maybeEmbroider } = require('@embroider/test-setup');
  return maybeEmbroider(app, {
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
  });
};
