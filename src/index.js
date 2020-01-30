let gjLoader = require('./geojson.js');

class MbglWrapper {
    constructor(map) {
        this.map = map
    }

    import(geojson, options={}) {
        let id = options.id
        let type = options.type
        let paint = options.paint

        if (id === undefined) {
            id = "test"
        }
        
        let geometryType = this._classify(geojson)
        if (type === undefined) {
            let options = this._classifiedOptions(geometryType)
            type = options.type
        }
        if (paint === undefined) {
            let options = this._classifiedOptions(geometryType)
            paint = options.paint
        }

        gjLoader.import(this.map, geojson, id, type, paint)
    }

    _classify(geojson) {
        if (geojson.type === "FeatureCollection") {
            return geojson.features[0].geometry.type
        }
        return geojson.geometry.type
    }

    _classifiedOptions(geometryType) {
        switch (geometryType) {
            case "MultiPolygon":
            case "Polygon":
                return this._polygonOptions()
            case "MultiLineString":
            case "String":
                return this._lineOptions()
            default:
                break;
        }
    }
    
    _polygonOptions() {
        return {
            type:"fill",
            paint:{
                'fill-color': this._randomColor(),
                'fill-opacity': 0.8
            }
        }
    }

    _lineOptions() {
        return {
            type:"line",
            paint:{
                'line-color': this._randomColor(),
                'line-opacity': 0.8
            }
        }
    }

    _randomColor() {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }

}

module.exports = MbglWrapper

//when load built scripts directly by browser
if (typeof window !== 'undefined') {
    window.MbglWrapper = MbglWrapper;
}