let utils = require('./utils.js')
let raster = require('./layer/raster.js');
let geojson = require('./layer/geojson.js');

class MbglHelper {
    constructor(basemap) {
        this.basemap = basemap
        this.overlay = {}
    }

    remove(id) {
        for (key in this.overlay) {
            if (key === id) {
                this.basemap.removeLayer(key)
                this.basemap.removeSource(key)
                return
            }
        }
    }

    removeOverlays() {
        for (key in this.overlay) {
            this.basemap.removeLayer(key)
            this.basemap.removeSource(key)
        }
        this.overlay = {}
    }

    removeAll() {
        let clearedStyle = {
            'version':8,
            'sources':{},
            'layers':[]
        }
        this.basemap.setStyle(clearedStyle, {'diff':false})
    }

    add(datasource, options={}) {
        let id = options.id
        if (id === undefined) {
            id = utils.generateId(this.basemap, 'overlay')
        }

        let type = options.type
        if (type === undefined) {
            type = utils.classify(typeof(datasource))
        }

        let overlay = {}
        
        switch (type) {
            case 'raster':
                overlay = raster.make(id, datasource, options)
                break
            case 'geojson':
                overlay = geojson.make(id, datasource, options)
                break
            default:
                //throw error
                break
        }
        
        this.overlay[id] = overlay
        this.basemap.addSource(id, this.overlay[id].source)
        this.basemap.addLayer(this.overlay[id].layer)
    }
}

module.exports = MbglHelper

//when load built scripts directly by browser
if (typeof window !== 'undefined') {
    window.MbglHelper = MbglHelper;
}