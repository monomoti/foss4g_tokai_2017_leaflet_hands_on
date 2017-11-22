var map = L.map('map');

var gis_baselayer = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
    attribution: "<a href=\"http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html\" target=\"_blank\">国土地理院</a>"
});

gis_baselayer.addTo(map);

map.setView([35.1611,136.8842], 16);

// L.marker([35.1611,136.8842]).addTo(map);
// var cross_icon = L.icon({
//     iconUrl:'../images/cross.gif',
//     iconRetinaUrl:'../images/cross@2x.gif',
//     iconSize:[40,40],
//     iconAnchor:[20,20]
// });
var div_icon = L.divIcon({
    className:"my-div-icon",
    html:"<div>↑&nbsp;愛知大学</div><div>名古屋キャンパス</div>",
    iconSize:[100,40],
    iconAnchor:[0,0]
});
L.marker([35.1611,136.8842],{
    icon:div_icon,
}).bindPopup("HELLO, <a target=\"_brank\" href=\"http://leafletjs.com\">Leaflet</a> !").addTo(map);

