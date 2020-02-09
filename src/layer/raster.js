let layerUtils = require('./layerUtils.js')

module.exports = {
    make: function(id, tileUrl, options={}) {
        let cleanedOptions = layerUtils.cleanOptions(options, 'raster')

        let source = {
            'type': 'raster',
            'tiles': [tileUrl],
            'tileSize':cleanedOptions.tileSize,
            'attribution':cleanedOptions.attribution
        }

        let layer = {
            'id': id,
            'type': 'raster',
            'source': id,
            'minzoom':cleanedOptions.minzoom,
            'maxzoom':cleanedOptions.maxzoom,
            'paint':cleanedOptions.paint
        }
        return {
            'source':source,
            'layer':layer
        }
    }
}