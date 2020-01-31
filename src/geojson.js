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
        defaultOptions.paint = options,paint
    }
    return defaultOptions
}

module.exports = {
    import: function(map, geojson, id, options={}) {
        let geometryType = _classify(geojson)
        let cleanedOptions = _cleanOptions(options, geometryType)
        map.addSource(id, {
            'type': 'geojson',
            'data': geojson
        });
        map.addLayer({
            'id': id,
            'type': cleandOptions.type,
            'source': 'test',
            'layout': {},
            'paint': cleanedOptions.paint
        });
    }
}