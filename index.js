/* eslint-env node */
'use strict';

const path = require('path');
const GenerateIcons = require('./lib/generate-icons');
const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');
const assert = require('assert');

module.exports = {
  name: 'ember-cli-image-transformer',
  imageTransformerConfig: null,
  app: null,
  included(app) {
    this._super.included.apply(this, arguments);

    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }
    this.app = app;

    var addonOptions = (this.parent && this.parent.options) || (this.app && this.app.options) || {};
    this.imageTransformerConfig = addonOptions[this.name] || {
      images: []
    };
  },
  treeForPublic(publicTree) {
    let trees = this.imageTransformerConfig.images.map(obj => {
      this.checkProperty('inputFilename', obj);
      this.checkProperty('outputFileName', obj);
      this.checkProperty('convertTo', obj);
      this.checkProperty('sizes', obj);
      const inputPath = path.join(this.app.project.root, obj.inputFilename);

      const pathData = path.parse(inputPath);
      const imageNode = new Funnel(pathData.dir, {
        include: [pathData.base]
      });
      let options = {
        sizes: obj.sizes,
        inputFilename: pathData.base,
        outputFileName: obj.outputFileName,
        project: this.app.project,
      };
      if ('background' in obj) {
        options.background = obj.background;
      }
      const icons = new GenerateIcons(imageNode, options);

      return new Funnel(icons, {
        destDir: 'assets/icons'
      });

    });

    if (publicTree) {
      trees.push(publicTree);
    }

    return new MergeTrees(trees);
  },
  checkProperty(property, obj) {
    assert.ok(property in obj, `\n${this.name} error: ${property} missing from image definition\n`);
  }
};
