/* eslint-env node */
'use strict';

const CachingWriter = require('broccoli-caching-writer');
const path = require('path');
const sharp = require('sharp');
const RSVP = require('rsvp');

class GenerateIcons extends CachingWriter {
  constructor(inputNode, options) {
    super([inputNode], {
      annotation: 'ember-cli-image-transformer-build'
    });

    sharp.cache(false);
    this.options = options;
  }

  build() {
    const options = this.options;
    const promises = [];
    options.sizes.forEach(size => {
      promises.push(this.writeIcon(size));
    });

    return RSVP.all(promises);
  }
  writeIcon(size) {
    const fileName = `${this.options.outputFileName}${size}.${this.options.convertTo}`;
    const outputPath = path.join(this.outputPath, fileName);
    const originalSvg = path.join(this.inputPaths[0], this.options.inputFilename);
    let image = sharp(originalSvg).resize(size);
    if (this.options.background) {
      image.flatten({ background: this.options.background });
    }

    return image.toFormat(this.options.convertTo).toFile(outputPath);

  }
}

module.exports = GenerateIcons;
