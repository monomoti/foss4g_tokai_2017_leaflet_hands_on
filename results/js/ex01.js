// var map = new L.Map('map');

var osm_baselayer =  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: 'map data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

var osm_j_baselayer = L.tileLayer('http://tile.openstreetmap.jp/{z}/{x}/{y}.png',{
    attribution:'map data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

var gis_baselayer = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
    attribution: "<a href=\"http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html\" target=\"_blank\">国土地理院</a>"
});

// // map.addLayer(gis_baselayer);
// osm_j_baselayer.addTo(map).on("click",function(e){
//     var latLng = e.latlng;
//     console.log("[" + latLng.lat + "," + latLng.lng + "]");
// });

// map.setView([35.1611,136.8842], 16);


var map = new L.Map('map',{
    center:[35.1611,136.8842],
    zoom:16,
    layers:[osm_j_baselayer]
    });
