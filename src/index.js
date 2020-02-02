let bm = require('./basemap.js');
let gj = require('./geojson.js');

class MbglWrapper {
    constructor(map) {
        this.map = map
    }

    addBasemap(tileUrl, options={}) {
        bm.addBasemap(this.map, tileUrl, options)
    }

    import(geojson, options={}) {
        gj.import(this.map, geojson, options)
    }
}

module.exports = MbglWrapper

//when load built scripts directly by browser
if (typeof window !== 'undefined') {
    window.MbglWrapper = MbglWrapper;
}