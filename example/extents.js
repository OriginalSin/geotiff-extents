var fs = require('fs')
var geotiff = require('geotiff')
var epsg = require('epsg-to-proj')
var extents = require('../')

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
