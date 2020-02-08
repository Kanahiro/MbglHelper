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

    add(datasource, options={}) {
        switch (typeof(datasource)) {
            case 'string':
                this.addRaster(datasource, options)
                return
            case 'object':
                this.addGeojson(datasource, options)
                return
            default:
                return
        }
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