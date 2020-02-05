let utils = require('../utils.js')
let layerUtils = require('./layerUtils.js')

module.exports = {
    add: function(map, geojson, options={}) {
        let id = options.id
        if (id === undefined) {
            id = layerUtils.defaultLayerId(map, "geojson")
        }
        
        let layerType = _classify(geojson)
        let cleanedOptions = layerUtils.cleanOptions(options, layerType)

        layerUtils.waitForLoading(map, 100, 
            function() {
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
        )
    },
}

let _classify = function(geojson) {
    if (geojson.type === "FeatureCollection") {
        return geojson.features[0].geometry.type
    }
    return geojson.geometry.type
}