!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){let r=n(1);class o{constructor(t){this.map=t}import(t,e={}){let n=e.id;void 0===n&&(n=this._defaultId()),r.import(this.map,t,n,e)}_isValid(t){return void 0===this.map.getLayer(t)}_defaultId(){let t="geojson",e=0;for(;!this._isValid(t+String(e));)e+=1;return t+String(e)}}t.exports=o,"undefined"!=typeof window&&(window.MbglWrapper=o)},function(t,e){t.exports={import:function(t,e,n={}){let i=n.id;void 0===i&&(i=r(t));let l=o(e),a=u(n,l);t.addSource(i,{type:"geojson",data:e}),t.addLayer({id:i,type:a.type,source:i,layout:{},paint:a.paint})}};let n=function(t,e){return void 0===t.getLayer(e)},r=function(t){let e="geojson",r=0;for(;!n(t,e+String(r));)r+=1;return e+String(r)},o=function(t){return"FeatureCollection"===t.type?t.features[0].geometry.type:t.geometry.type},i=function(){return"#"+Math.floor(16777215*Math.random()).toString(16)},u=function(t,e){let n=function(t){switch(t){case"MultiPolygon":case"Polygon":return{type:"fill",paint:{"fill-color":i(),"fill-opacity":.8}};case"MultiLineString":case"String":return{type:"line",paint:{"line-color":i(),"line-opacity":.8}}}}(e);return null!=t.type&&(n.type=t.type),null!=t.paint&&(n.paint=t.paint),n}}]);