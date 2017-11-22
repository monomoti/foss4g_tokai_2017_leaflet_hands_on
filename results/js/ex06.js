var map = L.map('map',{zoomControl:false,attributionControl:false});

var gsi_baselayer = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
    attribution: "<a href=\"http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html\" target=\"_blank\">国土地理院</a>"
});

var osm_j_baselayer = L.tileLayer('http://tile.openstreetmap.jp/{z}/{x}/{y}.png',{
    attribution:'map data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});


gsi_baselayer.addTo(map);

map.setView([35.1611,136.8842], 18);

L.control.attribution({
    position:"topleft",
}).addTo(map);

L.control.layers({
    "地理院地図":gsi_baselayer,
    "OSM JAPAN":osm_j_baselayer,
},
{},{position:"bottomright"}
).addTo(map);

L.control.scale({
    metric:true,
    imperial:false,
    position:"bottomleft"
}).addTo(map);

L.control.zoom({position:"bottomright"}).addTo(map);

L.Control.MyControlClass = L.Control.extend({
    onAdd:function(the_map){
        var div = L.DomUtil.create("div");
        div.setAttribute("class","my-custom-control");
        div.innerHTML = "MY CUSTOM Control";
        L.DomEvent.on(div,"click",L.DomEvent.stopPropagation);
        L.DomEvent.on(div,"dblclick",L.DomEvent.stopPropagation);
        L.DomEvent.on(div,"mousedown",L.DomEvent.stopPropagation);
        L.DomEvent.on(div,"mousewheel",L.DomEvent.stopPropagation);

        return div;
    },
    onRemove:function(the_map){

    }
});

var my_control = new L.Control.MyControlClass({position:"bottomleft"});
my_control.addTo(map);




