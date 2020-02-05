let utils = require('../utils.js')
let layerUtils = require('./layerUtils.js')

module.exports = {
    add: function(map, tileUrl, options={}) {
        let id = options.id
        if (id === undefined) {
            id = layerUtils.defaultLayerId(map, 'raster')
        }

        let cleanedOptions = layerUtils.cleanOptions(options, 'raster')

        layerUtils.waitForLoading(map, 100, 
            function() {
                map.addSource(id, {
                    'type': 'raster',
                    'tiles': [tileUrl],
                    'tileSize':cleanedOptions.tileSize,
                    'attribution':cleanedOptions.attribution
                });
                map.addLayer({
                    'id': id,
                    'type': 'raster',
                    'source': id,
                    'minzoom':cleanedOptions.minzoom,
                    'maxzoom':cleanedOptions.maxzoom,
                    'paint':cleanedOptions.paint
                })
            }
        )
    }
}