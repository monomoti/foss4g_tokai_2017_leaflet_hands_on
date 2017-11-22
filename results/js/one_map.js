var map = L.map('map');

var osm_baselayer =  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: 'map data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

var osm_j_baselayer = L.tileLayer('http://tile.openstreetmap.jp/{z}/{x}/{y}.png',{
    attribution:'map data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

var gis_baselayer = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
    attribution: "<a href=\"http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html\" target=\"_blank\">国土地理院</a>"
});

// map.addLayer(gis_baselayer);
osm_j_baselayer.addTo(map);

map.setView([35.1612299,136.8820748, 134], 16).on("click",function(e){
    // console.log(e.latlng);
});

L.marker(the_location).addTo(map);

L.polyline(route_to_aichi_univ_coords).addTo(map);
L.polygon(aichi_univ_coords).addTo(map);
L.polygon(polygon_with_holes_coords).addTo(map);

L.geoJson(c506).addTo(map);