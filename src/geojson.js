let classify = function(feature) {
    return feature.type
}

module.exports = {
    import: function(map, geojson, id, type, paint) {
        map.addSource(id, {
            'type': 'geojson',
            'data': geojson
        });
        map.addLayer({
            'id': id,
            'type': type,
            'source': 'test',
            'layout': {},
            'paint': paint
        });
    }
}