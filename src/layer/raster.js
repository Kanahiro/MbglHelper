let layerUtils = require('./layerUtils.js')

module.exports = {
    add: function(wrapper, tileUrl, options={}) {
        let id = options.id
        if (id === undefined) {
            id = layerUtils.defaultLayerId(wrapper.basemap, 'raster')
        }

        let cleanedOptions = layerUtils.cleanOptions(options, 'raster')

        layerUtils.waitForLoading(wrapper.basemap, 100, 
            function() {
                let source = {
                    'type': 'raster',
                    'tiles': [tileUrl],
                    'tileSize':cleanedOptions.tileSize,
                    'attribution':cleanedOptions.attribution
                }
                wrapper.basemap.addSource(id, source);

                let layer = {
                    'id': id,
                    'type': 'raster',
                    'source': id,
                    'minzoom':cleanedOptions.minzoom,
                    'maxzoom':cleanedOptions.maxzoom,
                    'paint':cleanedOptions.paint
                }
                wrapper.basemap.addLayer(layer)
                wrapper.overlay[id] = {
                    'source':source,
                    'layer':layer
                }
            }
        )
    }
}