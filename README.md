# ember-cli-image-transformer

[![Build Status](https://travis-ci.org/jrjohnson/ember-cli-image-transformer.svg?branch=master)](https://travis-ci.org/jrjohnson/ember-cli-image-transformer)
[![Ember Observer Score](https://emberobserver.com/badges/ember-cli-image-transformer.svg)](https://emberobserver.com/addons/ember-cli-image-transformer)
[![Greenkeeper badge](https://badges.greenkeeper.io/jrjohnson/ember-cli-image-transformer.svg)](https://greenkeeper.io/)

## Transform Images for your Ember Application

I hate having to create a bunch of identical images to use as favicon and
icon images for my application.  This addon was created to take a single image and
transform it into many images of differing sizes, types, and backgrounds.

It takes advantage of the awesome [Sharp](https://github.com/lovell/sharp) library to 
do the heavy lifting.

## Installation

```bash
ember install ember-cli-image-transformer
```

## Usage

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


### Developing this addon
#### Installation

* `git clone <repository-url>` this repository
* `cd ember-cli-image-transformer`
* `yarn install`

#### Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

#### Running Tests

* `yarn test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

#### Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
