let vcLayer = require('./layer/vector.js');
let rsLayer = require('./layer/raster.js');
let gjLayer = require('./layer/geojson.js');
let utils = require('./utils.js')

class MbglWrapper {
    constructor(map) {
        this.map = map
    }

    clear() {
        utils.clear(this.map)
    }

    addVector(url, options={}) {
        vcLayer.add(this.map, url, options)
    }

    addRaster(tileUrl, options={}) {
        rsLayer.add(this.map, tileUrl, options)
    }

    addGeojson(geojson, options={}) {
        gjLayer.add(this.map, geojson, options)
    }
}

module.exports = MbglWrapper

//when load built scripts directly by browser
if (typeof window !== 'undefined') {
    window.MbglWrapper = MbglWrapper;
}