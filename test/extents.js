var test = require('tape')
var fs = require('fs')
var path = require('path')
var geotiff = require('geotiff')
var epsg = require('epsg-to-proj')
var extents = require('../')

var file = path.join(__dirname, 'data/geotiff_alaska_omi_ai_20151213_0000.tif')
var data = fs.readFileSync(file)

test('extents', function (t) {
  var im = geotiff.parse(data).getImage()
  var gk = im.getGeoKeys()
  var fd = im.getFileDirectory()
  var ex = extents({
    tiePoint: fd.ModelTiepoint,
    pixelScale: fd.ModelPixelScale,
    width: fd.ImageWidth,
    height: fd.ImageLength,
    proj: require('proj4'),
    from: epsg[gk.ProjectedCSTypeGeoKey || gk.GeographicTypeGeoKey],
    to: epsg[4326]
  })
  t.deepEqual(ex, {
    upperLeft: [ 169.81556701660156, 88.10682678222656 ],
    lowerLeft: [ 169.81556701660156, 27.64122678222656 ],
    upperRight: [ 250.4363670166016, 88.10682678222656 ],
    lowerRight: [ 250.4363670166016, 27.64122678222656 ],
    center: [ 210.12596701660158, 57.874026782226565 ]
  })
  t.end()
})
