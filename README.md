# ember-cli-image-transformer

[![Build Status](https://travis-ci.org/jrjohnson/ember-cli-image-transformer.svg?branch=master)](https://travis-ci.org/jrjohnson/ember-cli-image-transformer)
[![Ember Observer Score](https://emberobserver.com/badges/ember-cli-image-transformer.svg)](https://emberobserver.com/addons/ember-cli-image-transformer)

## Transform Images for your Ember Application from One Source Image

I hate having to create a bunch of identical images for use as icons and favicon images for my application, so I created this addon to take a single source image and transform it into many images of differing sizes, types, and backgrounds.

It is built using EmberJS and takes advantage of the awesome [Sharp](https://github.com/lovell/sharp) library to do the heavy lifting.


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.16 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```bash
ember install ember-cli-image-transformer
```


Usage
------------------------------------------------------------------------------

Create an `ember-cli-image-transformer` section in your `ember-cli-build.js` file with 
an `images` array. Each element in the array represents a different set of images to 
be generated.

```js
module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
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
          background: {r: 255, g: 255, b: 255, alpha: 0},
          sizes: [100],
        }
      ]
    }
  });
```

All generated images will be placed into the `public/assets` path of your application.


### Usage in a template

```handlebars
<!-- application.hbs -->
<img src='assets/transparent-circle100.png'>
```

### Image Options

| Key | Required | Default Value | Example | Description |
|-----|----------|---------------|---------|-------------|
|`inputFileName`| :heavy_check_mark: | none | `public/circle.svg` | Where (relative to the application root) to find the input image |
|`outputFileName`| :heavy_check_mark: | none |  `transparent-circle` | This is combined with the `convertTo` and `size` to create the output file eg `transparent-circle92.png` |
|`convertTo`| :heavy_check_mark: | none |  `png` | The output file type |
|`sizes`| :heavy_check_mark: | none |  `[92, 150]` | An array of image sizes to produce |
|`destination`| | `assets/icons` |  `images/wherever/you/want` | The destination directory for the output images relative to `/public` |
|`background`|  | none |  `{r: 255, g: 255, b: 255, alpha: 0}` | Add a background color to the image. |

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
