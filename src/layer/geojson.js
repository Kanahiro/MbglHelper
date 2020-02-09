let layerUtils = require('./layerUtils.js')

module.exports = {
    add: function(wrapper, geojson, options={}) {
        let id = options.id
        if (id === undefined) {
            id = layerUtils.defaultLayerId(wrapper.basemap, "geojson")
        }
        
        let layerType = _classify(geojson)
        let cleanedOptions = layerUtils.cleanOptions(options, layerType)

        layerUtils.waitForLoading(wrapper.basemap, 100, 
            function() {
                let source = {
                    'type': 'geojson',
                    'data': geojson
                }
                wrapper.basemap.addSource(id, source);

                let layer = {
                    'id': id,
                    'type': cleanedOptions.type,
                    'source': id,
                    'layout': {},
                    'paint': cleanedOptions.paint
                }
                wrapper.basemap.addLayer(layer);

                wrapper.overlay[id] = {
                    'source':source,
                    'layer':layer
                }
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