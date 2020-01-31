let gjLoader = require('./geojson.js');

class MbglWrapper {
    constructor(map) {
        this.map = map
    }

    import(geojson, options={}) {
        let id = options.id

        if (id === undefined) {
            id = "test"
        }

        gjLoader.import(this.map, geojson, id, options)
    }
}

module.exports = MbglWrapper

//when load built scripts directly by browser
if (typeof window !== 'undefined') {
    window.MbglWrapper = MbglWrapper;
}