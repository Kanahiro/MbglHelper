module.exports = {
    import: function(map, geojson, options={}) {
        let id = options.id
        if (id === undefined) {
            id = _defaultId(map)
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
    }
}

let _isValid = function(map, id) {
    let layer = map.getLayer(id)
    if (layer === undefined) {
        return true
    }
    return false
}

let _defaultId = function(map) {
    let id = "geojson"
    let counter = 0
    while (!_isValid(map, id + String(counter))) {
        counter = counter + 1
    }
    return id + String(counter)
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
                    'line-opacity': 0.8
                }
            }
            return lineOptions
        default:
            break;
    }
}

let _cleanOptions = function(options, geometryType) {
    let defaultOptions = _classifiedOptions(geometryType)
    if (options.type != undefined) {
        defaultOptions.type = options.type
    }
    if (options.paint != undefined) {
        defaultOptions.paint = options.paint
    }
    return defaultOptions
}