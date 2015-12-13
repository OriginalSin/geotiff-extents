module.exports = function (opts) {
  var proj = opts.proj
  var mt = opts.tiePoint, mp = opts.pixelScale
  var ih = opts.height, iw = opts.width
  var cw = mt[3] - mt[0] * mp[0]
  var cs = mt[4] - (ih - mt[1]) * mp[1]
  var ce = mt[3] + (iw - mt[0]) * mp[0]
  var cn = mt[4] + mt[1] * mp[1]
  return {
    upperLeft: proj(opts.from, opts.to, [cw,cn]),
    lowerLeft: proj(opts.from, opts.to, [cw,cs]),
    upperRight: proj(opts.from, opts.to, [ce,cn]),
    lowerRight: proj(opts.from, opts.to, [ce,cs]),
    center: proj(opts.from, opts.to, [(cw+ce)/2,(cn+cs)/2])
  }
}
