module.exports = {
    clear(map) {
        let clearedStyle = {
            'version':8,
            'sources':{},
            'layers':[]
        }
        map.setStyle(clearedStyle, {'diff':false})
    }
}