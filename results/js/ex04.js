var map = L.map('map');

var gsi_baselayer = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
    attribution: "<a href=\"http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html\" target=\"_blank\">国土地理院</a>"
});

var osm_j_baselayer = L.tileLayer('http://tile.openstreetmap.jp/{z}/{x}/{y}.png',{
    attribution:'map data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});


gsi_baselayer.addTo(map);

// map.setView([35.1611,136.8842], 18);

var overlays = L.featureGroup().addTo(map);

var div_icon = L.divIcon({
    className:"my-div-icon",
    html:"<div>↑&nbsp;愛知大学</div><div>名古屋キャンパス</div>",
    iconSize:[100,40],
    iconAnchor:[0,0]
});
L.marker([35.1611,136.8842],{
    icon:div_icon,
}).addTo(overlays);

var route = L.polyline([
    [35.170931759646294, 136.88297510147098],
    [35.17131764533583, 136.884241104126],
    [35.169072466563655, 136.88484191894534],
    [35.1676691983501, 136.88518524169925],
    [35.16463454803477, 136.8855714797974],
    [35.163967962276885, 136.885678768158],
    [35.162389184741635, 136.88608646392825],
    [35.16212605217294, 136.8855929374695],
    [35.16195062998756, 136.8845629692078],
    [35.1617401228657, 136.88381195068362],
    [35.161494530534924, 136.88396215438846]
],{
    color:"red",
    weight:6,
    dashArray:"20, 10, 5,10",
    lineCap:"square",
    lineJoin:"square"
}).addTo(overlays);

var aichi_univ_coords = [
    [35.16138050527214, 136.8836295604706],
    [35.16163486910046, 136.88459515571597],
    [35.16141558998541, 136.88472390174869],
    [35.16137173409146, 136.8846380710602],
    [35.16124016626777, 136.88472390174869],
    [35.161266479849516, 136.8848526477814],
    [35.16103842852472, 136.884959936142],
    [35.16074020659675, 136.88390851020816],
];

var aichi_univ = L.polygon(aichi_univ_coords,{
    color:"#dc143c",
    fillColor:"#800000",
    fillOpacity:0.8,
    dashArray:"20, 10, 5,10",
}).addTo(overlays);


L.control.layers({
    "地理院地図":gsi_baselayer,
    "OSM JAPAN":osm_j_baselayer,
},{"my overlays":overlays}).addTo(map);

map.fitBounds(overlays.getBounds());

