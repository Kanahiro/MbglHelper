let rsLayer = require('./layer/raster.js');
let gjLayer = require('./layer/geojson.js');

class MbglWrapper {
    constructor(map) {
        this.map = map
    }

    clear() {
        let clearedStyle = {
            'version':8,
            'sources':{},
            'layers':[]
        }
        this.map.setStyle(clearedStyle)
    }

    add(datasource, options={}) {
        switch (typeof(datasource)) {
            case 'string':
                this.addBasemap(datasource, options)
                return
            case 'object':
                this.addGeojson(datasource, options)
                return
            default:
                console.log('import error:The type', typeof(datasource), 'is invalid.')
                return
        }
    }

    addBasemap(tileUrl, options={}) {
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