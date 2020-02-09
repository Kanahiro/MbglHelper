module.exports = {
    defaultLayerId: function(map, id) {
        let counter = 0
        while (!_isValid(map, id + String(counter))) {
            counter = counter + 1
        }
        return id + String(counter)
    },
    cleanOptions: function(options, layerType) {
        let defaultOptions = _classifiedOptions(layerType)
        for(key in options) {
            defaultOptions[key] = options[key]
        }
        return defaultOptions
    },
}

let _isValid = function(map, id) {
    let layer = map.getLayer(id)
    if (layer === undefined) {
        return true
    }
    return false
}

let _classifiedOptions = function(layerType) {
    switch (layerType) {
        case 'MultiPolygon':
        case 'Polygon':
            let polygonOptions = {
                type:'fill',
                paint:{
                    'fill-color': _randomColor(),
                    'fill-opacity': 0.8
                }
            }
            return polygonOptions
        case 'MultiLineString':
        case 'String':
            let lineOptions = {
                type:'line',
                paint:{
                    'line-color': _randomColor(),
                    'line-opacity': 0.8,
                    'line-width':3
                }
            }
            return lineOptions
        case 'Point':
            let circleOptions = {
                type:'circle',
                paint:{
                    'circle-color': _randomColor(),
                    'circle-opacity': 0.8,
                    'circle-radius':5,
                    'circle-stroke-color':'#ffffff',
                    'circle-stroke-width':1
                }
            }
            return circleOptions
        case 'raster':
            let rasterOptions = {
                'tileSize':256,
                'attribution':'',
                'minzoom':0,
                'maxzoom':22,
                'paint':{}
            }
            return rasterOptions
        case 'vector':
            let vectorOptions = {
                'tileSize':512,
                'attribution':'',
                'minzoom':0,
                'maxzoom':22,
                'paint':{}
            }
            return vectorOptions
        default:
            break;
    }
}

let _randomColor = function() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}