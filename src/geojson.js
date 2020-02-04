let utils = require('./utils.js')

module.exports = {
    add: function(map, geojson, options={}) {
        let id = options.id
        if (id === undefined) {
            id = utils.defaultLayerId(map, "geojson")
        }
        
        let geometryType = _classify(geojson)
        let cleanedOptions = _cleanOptions(options, geometryType)

        map.addSource(id, {
            'type': 'geojson',
            'data': geojson
        });
        map.addLayer({
            'id': id,
            'type': cleanedOptions.type,
            'source': id,
            'layout': {},
            'paint': cleanedOptions.paint
        });
    },
}

let _classify = function(geojson) {
    if (geojson.type === "FeatureCollection") {
        return geojson.features[0].geometry.type
    }
    return geojson.geometry.type
}

let _randomColor = function() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

let _classifiedOptions = function(geometryType) {
    switch (geometryType) {
        case "MultiPolygon":
        case "Polygon":
            let polygonOptions = {
                type:"fill",
                paint:{
                    'fill-color': _randomColor(),
                    'fill-opacity': 0.8
                }
            }
            return polygonOptions
        case "MultiLineString":
        case "String":
            let lineOptions = {
                type:"line",
                paint:{
                    'line-color': _randomColor(),
                    'line-opacity': 0.8,
                    'line-width':3
                }
            }
            return lineOptions
        case "Point":
            let circleOptions = {
                type:"circle",
                paint:{
                    'circle-color': _randomColor(),
                    'circle-opacity': 0.8,
                    'circle-radius':5,
                    'circle-stroke-color':"#ffffff",
                    'circle-stroke-width':1
                }
            }
            return circleOptions
        default:
            break;
    }
}

let _cleanOptions = function(options, geometryType) {
    let defaultOptions = _classifiedOptions(geometryType)
    for(key in options) {
        defaultOptions[key] = options[key]
    }
    return defaultOptions
}