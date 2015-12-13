# geotiff-extents

compute the corner and center bounding coordinates for a geotiff

# example

``` js
var fs = require('fs')
var geotiff = require('geotiff')
var epsg = require('epsg-to-proj')
var extents = require('geotiff-extents')

var data = fs.readFileSync(process.argv[2])
var im = geotiff.parse(data).getImage()
var fd = im.getFileDirectory()

console.log(extents({
  tiePoint: fd.ModelTiepoint,
  pixelScale: fd.ModelPixelScale,
  width: fd.ImageWidth,
  height: fd.ImageLength,
  proj: require('proj4'),
  from: epsg[im.getGeoKeys().ProjectedCSTypeGeoKey],
  to: epsg[4326]
}))
```

output:

```
$ node extents.js LC80700192015294LGN00_B2.TIF
{ upperLeft: [ -155.62757614534797, 59.781490186078884 ],
  lowerLeft: [ -155.46612438446172, 57.56866631571051 ],
  upperRight: [ -151.27624278582903, 59.79644709112181 ],
  lowerRight: [ -151.3822362875974, 57.58238285553903 ],
  center: [ -153.4380373185701, 58.69959098078464 ] }
```

and this output matches up with the listgeo command:

```
$ listgeo -d LC80700192015294LGN00_B2.TIF | tail -n5
Upper Left    (  352500.000, 6630000.000)  (-155.6275761,59.7814902)
Lower Left    (  352500.000, 6383370.000)  (-155.4661244,57.5686663)
Upper Right   (  596730.000, 6630000.000)  (-151.2762428,59.7964471)
Lower Right   (  596730.000, 6383370.000)  (-151.3822363,57.5823829)
Center        (  474615.000, 6506685.000)  (-153.4380373,58.6995910)
```

# api

``` js
var extents = require('geotiff-extents')
```

## var ex = extents(opts)

Compute the bounding and center coordinates `ex` given:

* `opts.tiePoint` - an array (or Float64Array etc) of `K*6` tie point
coordinates mapping `(I,J,K)` points in raster space to `(X,Y,Z)` points in
model space.
* `opts.pixelScale` - an array (or Float64Array etc) of 3 sizes for raster
spacing in model space units
* `opts.width` - width of the image in raster (pixel) coordinates
* `opts.height` - height of the image in raster (pixel) coordinates
* `opts.proj` - `proj4(src,dst)` coordinate transform implementation
* `opts.from` - proj string describing the tie point coordinate system
* `opts.to` - proj string describing the output coordinate system

The georeferencing tags are defined in more detail in
[2.6.1 GeoTIFF Tags for Coordinate Transformations][1].

[1]: http://www.remotesensing.org/geotiff/spec/geotiff2.6.html#2.6.1

The output object `ex` has these properties, which map to 2-element coordinate
pair arrays in the coordinate system specified by `opts.to`:

* `ex.upperLeft`
* `ex.lowerLeft`
* `ex.upperRight`
* `ex.lowerRight`
* `ex.center`

# install

```
npm install geotiff-extents
```

# license

BSD
