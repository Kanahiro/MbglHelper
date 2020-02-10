let utils = require('./utils.js')
let raster = require('./layer/raster.js');
let geojson = require('./layer/geojson.js');

class MbglHelper {
    constructor(map) {
        this.map = map
        this.overlays = {}
    }

    removeOverlay(id) {
        if (this.overlays[id] === undefined) {
            return
        }
        for (key in this.overlays) {
            if (key === id) {
                this.map.removeLayer(key)
                this.map.removeSource(key)
                delete this.overlays[key]
                return
            }
        }
    }

    removeOverlays() {
        for (key in this.overlays) {
            this.map.removeLayer(key)
            this.map.removeSource(key)
        }
        this.overlays = {}
    }

    addOverlay(datasource, options={}) {
        let id = options.id
        if (id === undefined) {
            id = utils.generateId(this.map, 'overlay')
        }

        let overlay = {}
        switch (typeof(datasource)) {
            case 'string':
                overlay = raster.make(id, datasource, options)
                break
            case 'object':
                overlay = geojson.make(id, datasource, options)
                break
            default:
                //throw error
                break
        }
        
        this.overlays[id] = overlay
        this.map.addSource(id, this.overlays[id].source)
        this.map.addLayer(this.overlays[id].layer)
    }
}

module.exports = MbglHelper

//when load built scripts directly by browser
if (typeof window !== 'undefined') {
    window.MbglHelper = MbglHelper;
}