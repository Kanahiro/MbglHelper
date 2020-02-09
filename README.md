## Abstract
Mbglhelper is a helper library for Mapbox GL JS, designed to access Mapbox API more easily.

## Usage
Read example/index.html firstly.

#### Declaration
Mbglhelper needs mapboxgl.Map to initialize.
helper think the map in argument as BASEMAP, means background.

```javascript
let map = new mapboxgl.Map({
    container: 'mapPane',
    //empty style
    style: {
        'version':8,
        'sources':{},
        'layers':[]
    }
});
let mbglHelper = new MbglHelper(map)
```

## APIs

### Layer Importing
Correspondingly to the basemap, this helper think user-importing-maps through this as OVERLAY.

#### Raster

```javascript
let options = {
    'id':'osm',
    'tileSize':256,
    'attribution':'© OpenStreetMap contributors',
    'minzoom':0,
    'maxzoom':22
}
mbglHelper.add('https://tile.openstreetmap.jp/{z}/{x}/{y}.png', 'raster', options)
```

Or more simply you can write as follwoing.

```javascript
mbglHelper.add('https://tile.openstreetmap.jp/{z}/{x}/{y}.png')
//default options will be set
/*
    {
        "id":"overlay0",
        "type":"raster",
        'tileSize':256,
        'attribution':'',
        'minzoom':0,
        'maxzoom':22
    }
*/
```

#### GeoJson

You can show GeoJson on your map easily as following.

```javascript
//quoted from Mapbox GL JS example
let geojson = {
    'type': 'Feature',
    'geometry': {
        'type': 'Polygon',
        'coordinates': [
            [
                [-67.13734351262877, 45.137451890638886],
                [-66.96466, 44.8097],
                [-68.03252, 44.3252],
                [-69.06, 43.98],
                [-70.11617, 43.68405],
                [-70.64573401557249, 43.090083319667144],
                [-70.75102474636725, 43.08003225358635],
                [-70.79761105007827, 43.21973948828747],
                [-70.98176001655037, 43.36789581966826],
                [-70.94416541205806, 43.46633942318431],
                [-71.08482, 45.3052400000002],
                [-70.6600225491012, 45.46022288673396],
                [-70.30495378282376, 45.914794623389355],
                [-70.00014034695016, 46.69317088478567],
                [-69.23708614772835, 47.44777598732787],
                [-68.90478084987546, 47.184794623394396],
                [-68.23430497910454, 47.35462921812177],
                [-67.79035274928509, 47.066248887716995],
                [-67.79141211614706, 45.702585354182816],
                [-67.13734351262877, 45.137451890638886]
            ]
        ]
    }
}
let options = {
    "id":"testLayer",
    "type":"fill",
    "paint":{
        "fill-color":"#990000",
        "fill-opacity":0.8
        }
    }
mbglHelper.add(geojson, 'geojson', options)
```

Or more simply you can write as follwoing.

```javascript
mbglHelper.add(geojson)
//default options will be set
/*
    {
        "id":"overlay0",
        "type":"fill",
        "paint":{
            "fill-color":RANDOM_COLOR,
            "fill-opacity":0.8
        }
    }
*/
```

### General
```javascript
//remove all overlay sources and layers
mbglHelper.clear()
```