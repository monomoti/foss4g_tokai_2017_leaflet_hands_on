var options = {
 center : [35.1611,136.8842],
 zoom : 16
}

var map1 = L.map('map1',options);
var osm_j_baselayer = L.tileLayer('http://tile.openstreetmap.jp/{z}/{x}/{y}.png',{
    attribution:'map data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map1);

var map2 = L.map('map2',options);
var gis_baselayer = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
    attribution: "<a href=\"http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html\" target=\"_blank\">国土地理院</a>"
}).addTo(map2);


var moveOtherMap= function(target,center,zoom){
    offHandler(target);
    target.setView(center,zoom);
};

var offHandler = function(target){
    target.off("move");
};

var onHandler = function(this_map){
    var other_map;
    if (this_map === map1){
        other_map = map2;
    }else{
        other_map = map1;
    }

    this_map.on("move",function(e){
        moveOtherMap(other_map,this.getCenter(),this.getZoom());
    },this_map);
};

L.DomEvent.on(map1.getContainer(),"mouseover",function(e){
    onHandler(this);
},map1);

L.DomEvent.on(map2.getContainer(),"mouseover",function(e){
    onHandler(this);
},map2);
