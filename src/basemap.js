let utils = require('./utils.js')

module.exports = {
    add: function(map, tileUrl, options={}) {
        let id = options.id
        if (id === undefined) {
            id = utils.defaultId(map, "raster")
        }

        let cleanedOptions = _cleanOptions(options)

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
        });
    }
}

let _cleanOptions = function(options) {
    let defaultOptions = {
        'tileSize':256,
        'attribution':'',
        'minzoom':0,
        'maxzoom':22,
    }

    for(key in options) {
        defaultOptions[key] = options[key]
    }
    return defaultOptions
}