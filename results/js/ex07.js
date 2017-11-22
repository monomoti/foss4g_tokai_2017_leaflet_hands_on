var map = L.map('map',{zoomControl:false,attributionControl:false,zoomSnap:0});

var gsi_baselayer = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
    attribution: "<a href=\"http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html\" target=\"_blank\">国土地理院</a>"
});

var osm_j_baselayer = L.tileLayer('http://tile.openstreetmap.jp/{z}/{x}/{y}.png',{
    attribution:'map data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});


gsi_baselayer.addTo(map);

// map.setView([35.1611,136.8842], 18);

L.control.attribution({
    position:"topleft",
}).addTo(map);

var layer_control = L.control.layers({
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
        div.innerHTML = "MY CUSTOM CONTROL";
        L.DomEvent.on(div,"click",L.DomEvent.stopPropagation);
        L.DomEvent.on(div,"dblclick",L.DomEvent.stopPropagation);
        L.DomEvent.on(div,"mousedown",L.DomEvent.stopPropagation);
        L.DomEvent.on(div,"mousewheel",L.DomEvent.stopPropagation);

        var mode_selector_container = L.DomUtil.create("form");
        div.append(mode_selector_container);
        var mode_normal = L.DomUtil.create("input");
        mode_normal.setAttribute("type","radio");
        mode_normal.setAttribute("name","mode");
        mode_normal.setAttribute("value","normal");
        mode_normal.checked = true;
        mode_selector_container.append(mode_normal);
        mode_selector_container.append("normal");

        var mode_info = L.DomUtil.create("input");
        mode_info.setAttribute("type","radio");
        mode_info.setAttribute("name","mode");
        mode_info.setAttribute("value","info");
        mode_selector_container.append(mode_info);
        mode_selector_container.append("info");

        var mode_pan = L.DomUtil.create("input");
        mode_pan.setAttribute("type","radio");
        mode_pan.setAttribute("name","mode");
        mode_pan.setAttribute("value","pan");
        mode_selector_container.append(mode_pan);
        mode_selector_container.append("pan");

        const click_handlers = {
            "info":function(e){
                var latLng = e.latlng;
                map.openPopup(latLng.toString(),latLng);

            },
            "pan":function(e){
                map.panTo(e.latlng);
            },
        }

        this.click_handler = null;


        L.DomEvent.on(mode_selector_container,"change",function(e){
            this.clearClickHandler();
            tool_mode =mode_selector_container.mode.value;

            if (tool_mode == "normal"){
                return this;
            }

            this.click_handler = click_handlers[tool_mode];
            map.on("click",this.click_handler);
            return this;

        },this);


        return div;
    },
    onRemove:function(the_map){
        this.clearClickHandler();
    },
    clearClickHandler:function(){
        if (this.click_handler){
            map.off("click",this.click_handler);
            this.click_handler = null;
        }        
    }
});


var my_control = new L.Control.MyControlClass({position:"topright"});
my_control.addTo(map);


var nursery_homes = L.geoJSON(h25_chika_kouji,{
    onEachFeature(feature, layer){
        layer.on("click",function(e){
            var content =  "name:" + feature.properties.name +  "<br>price:¥" + feature.properties.price
            this.bindPopup(content).openPopup();
        },layer)
        .on("contextmenu",function(e){
            this.removeFrom(nursery_homes);
        },layer);
    }
}).addTo(map);

layer_control.addOverlay(nursery_homes,"保育所");


map.fitBounds(nursery_homes.getBounds());

