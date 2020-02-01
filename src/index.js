let gjLoader = require('./geojson.js');

class MbglWrapper {
    constructor(map) {
        this.map = map
    }

    import(geojson, options={}) {
        let id = options.id

        if (id === undefined) {
            id = this._defaultId()
        }

        gjLoader.import(this.map, geojson, id, options)
    }

    _isValid(id) {
        let layer = this.map.getLayer(id)
        if (layer === undefined) {
            return true
        }
        return false
    }

    _defaultId() {
        let id = "geojson"
        let counter = 0
        while (!this._isValid(id + String(counter))) {
            counter = counter + 1
        }
        return id + String(counter)
    }
}

module.exports = MbglWrapper

//when load built scripts directly by browser
if (typeof window !== 'undefined') {
    window.MbglWrapper = MbglWrapper;
}