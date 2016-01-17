campi
=====

**campi** is a [Node](http://nodejs.org/) module that encapsulates the raspistill command for taking pictures.

## Author
  - Werner Vesterås <wvesteraas@gmail.com>

## Installation
As with any Node module, use the [Node Package Manager](https://www.npmjs.com/) to install it:

```bash
$ npm install campi
```

## Usage

```javascript
var Campi = require('campi');

var campi = new Campi();

campi.getImageAsStream({ /* options */ }, function (err, stream) {
    if (err) {
        throw err;
    }
    // use stream object
});

campi.getImageAsFile({ /* options */ }, './filename.jpg', function (err) {
    if (err) {
        throw err;
    }
    // use file
});
```

The options object supports the following properties:

Option | Value
--- | ---
**width, w** | Width
**height, h** | Height
**encoding, e** | File encoding (jpg, bmp, gif, png)
**shutter, sh** | Shutter speed (>=0, <=6000000)
**nopreview, n** | No preview (true / false)
**opacity, op** | Opacity (>=0, <=255)
**imxfx, ifx** | Image effect (none, negative, solarise, posterise, whiteboard, blackboard, sketch, denoise, emboss, oilpaint, hatch, gpen, pastel, watercolour, film, blur, saturation)
**metering, mm** | Metering mode (average, spot, backlit, matrix)
**quality, q** | Quality (>=0, <=100)
**timeout, t** | Timeout
**hflip, hf** | Horizontal flip
**vflip, vf** | Vertical flip
**rotation, rot** | degrees the picture will be rotated - integer >0<360
**preview, prev** | size and position of the preview while capturing. fullscreen horizontal, fullscreen vertical, middle screen vertical ('0,0,1920,1080','0,0,1080,1920','0,608,1080,608')
## Examples

See the [examples](https://github.com/vesteraas/campi/tree/master/examples) directory.
