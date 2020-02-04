module.exports = {
    defaultLayerId: function(map, id) {
        let counter = 0
        while (!_isValid(map, id + String(counter))) {
            counter = counter + 1
        }
        return id + String(counter)
    }
}
let _isValid = function(map, id) {
    let layer = map.getLayer(id)
    if (layer === undefined) {
        return true
    }
    return false
}