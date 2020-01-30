let gjLoader = require('./geojson/import.js');

class MbglWrapper {
    constructor(map) {
        this.map = map
    }

    import(geojson) {
        gjLoader.import(this.map, geojson)
    }
}

module.exports = MbglWrapper
if (typeof window !== 'undefined') {
    window.MbglWrapper = MbglWrapper;
}