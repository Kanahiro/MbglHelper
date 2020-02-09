let layerUtils = require('./layerUtils.js')

module.exports = {
    make: function(id, geojson, options={}) {    
        let layerType = _classify(geojson)
        let cleanedOptions = layerUtils.cleanOptions(options, layerType)

        let source = {
            'type': 'geojson',
            'data': geojson
        }

        let layer = {
            'id': id,
            'type': cleanedOptions.type,
            'source': id,
            'layout': {},
            'paint': cleanedOptions.paint
        }

        return {
            'source':source,
            'layer':layer
        }
    },
}

let _classify = function(geojson) {
    if (geojson.type === "FeatureCollection") {
        return geojson.features[0].geometry.type
    }
    return geojson.geometry.type
}