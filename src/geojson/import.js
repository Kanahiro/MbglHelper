let classify = function(feature) {
    return feature.type
}

module.exports = {
    import: function(map, geojson) {
        map.addSource('test', {
            'type': 'geojson',
            'data': geojson
        });;
        map.addLayer({
            'id': 'test',
            'type': 'fill',
            'source': 'test',
            'layout': {},
            'paint': {
            'fill-color': '#088',
            'fill-opacity': 0.8
            }
        });
    }
}