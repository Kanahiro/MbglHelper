let utils = require('../utils.js')
let layerUtils = require('./layerUtils.js')

module.exports = {
    add: function(map, url, options={}) {
        let id = options.id
        if (id === undefined) {
            id = layerUtils.defaultLayerId(map, 'vector')
        }

        let style = map.getStyle()
        let sources = style.sources
        let layers = style.layers

        map.setStyle(url, {'diff':false})

        layerUtils.waitForLoading(map, 100, 
            function(){
                let vtStyle = map.getStyle()
                let vtSources = vtStyle.sources
                let vtLayers = vtStyle.layers
                console.log(vtStyle)
                utils.clear(map)

                let newSources = {}
                for (key in sources) {
                    newSources[key] = sources[key]
                }
                for (key in vtSources) {
                    newSources[key] = vtSources[key]
                }
                let newLayers = layers.concat(vtLayers)

                let newStyle = {
                    'version':8,
                    'sources':newSources,
                    'layers':newLayers,
                }
                if (vtStyle.glyphs != undefined) {
                    newStyle.glyphs = vtStyle.glyphs
                }
                if (vtStyle.sprite != undefined) {
                    newStyle.sprite = vtStyle.sprite
                }

                map.setStyle(newStyle, {'diff':false})
            }
        )
    }
}