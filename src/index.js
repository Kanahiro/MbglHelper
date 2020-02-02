let bm = require('./basemap.js');
let gj = require('./geojson.js');

class MbglWrapper {
    constructor(map) {
        this.map = map
    }

    clear() {
        let cleared = {
            'version':8,
            'sources':{},
            'layers':[]
        }
        this.map.setStyle(cleared)
    }

    add(datasource, options={}) {
        if(typeof(datasource) === 'string') {
            this.addBasemap(datasource, options)
            return
        }
        if(typeof(datasource) === 'object') {
            this.addGeojson(datasource, options)
            return
        }
    }

    addBasemap(tileUrl, options={}) {
        bm.add(this.map, tileUrl, options)
    }

    addGeojson(geojson, options={}) {
        gj.add(this.map, geojson, options)
    }
}

module.exports = MbglWrapper

//when load built scripts directly by browser
if (typeof window !== 'undefined') {
    window.MbglWrapper = MbglWrapper;
}