module.exports = {
    generateId: function(map, id) {
        let counter = 0
        while (!_isValid(map, id + String(counter))) {
            counter = counter + 1
        }
        return id + String(counter)
    },
    classify: function(dataType) {
        let layerType = ''
        switch (dataType) {
            case 'string':
                layerType = 'raster'
                break;
            case 'object':
                layerType = 'geojson'
                break;
            default:
                break;
        }
        return layerType
    },
    waitForLoading: function(map, time, method) {
        let interval = setInterval(
            function() {
                if (map.isStyleLoaded()) {
                    clearInterval(interval)
                    method()
                }
            }, time
        )
    }
}
let _isValid = function(map, id) {
    let layer = map.getLayer(id)
    if (layer === undefined) {
        return true
    }
    return false
}