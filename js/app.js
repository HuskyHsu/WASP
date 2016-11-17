(function(window, document, undefined) {

    //WMTS設定
    var streets = L.tileLayer('https://mt{s}.google.com/vt/x={x}&y={y}&z={z}&hl=zh-TW', {
        id: 'streets',
        subdomains: "012",
        attribution: 'Map data: &copy; Google'
    });

    var topography = L.tileLayer('https://mt{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
        id: 'topography',
        subdomains: "012",
        attribution: 'Map data: &copy; Google'
    });

    //群組
    var baseMaps = {
        "Google地圖": streets,
        "地形": topography
    };

    //工廠Icon
    var FactoryIcon = getIcon('css/images/Factory.png');
    //自動測站Icon
    var AutoSiteIcon = getIcon('css/images/AutoSite.png');
    //河水堰Icon
    var WeirIcon = getIcon('css/images/weir.png');
    //樹酯包擺放Icon
    var ResinIcon = getIcon('css/images/Resin2.png');

    //面
    var PotentialDanger = L.geoJson(geoData.PotentialDanger, {
        style: {
            "color": "#ff7800",
            "weight": 1,
            "opacity": 0.4
        }
    });

    //線
    var River = L.geoJson(geoData.River, {});

    //點
    var SankuaicuoRiver = setGeoJson(geoData.SankuaicuoRiverWeir, WeirIcon);
    var AutoSite = setGeoJson(geoData.AutoSite, AutoSiteIcon);
    var Factory = setGeoJson(geoData.Factory, FactoryIcon);
    var Resin = setGeoJson(geoData.Resin, ResinIcon);

    var overlayMaps = {
        "隱患處": PotentialDanger,
        "溪流": River,

        "三塊厝支線河水堰": SankuaicuoRiver,
        "自動測站": AutoSite,
        "廠商": Factory,
        "樹酯包擺放": Resin
    };

    var map = L.map('map', {
        layers: [streets, PotentialDanger, River]
    }).fitBounds([
        [24.9790491, 121.2355337],
        [25.1031019, 121.2712828]
    ]);

    L.control.layers(baseMaps, overlayMaps).addTo(map);

    //建立讀檔用Control物件
    var readFileControl = L.Control.extend({

        options: {
            position: 'topright'
                //control position - allowed: 'topleft', 'topright', 'bottomleft', 'bottomright'
        },

        onAdd: function(map) {
            var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom csv');

            var input = document.createElement('input');
            input.type = 'file';
            input.name = 'upload';

            input.style.width = '36px';
            input.style.height = '36px';

            input.onchange = readfile;

            container.appendChild(input);

            container.style.backgroundColor = 'white';
            container.style.width = '36px';
            container.style.height = '36px';

            //container.onclick = function() {
            //    console.log('buttonClicked');
            //}
            return container;
        }
    });


    var sliderControl = L.Control.extend({

        options: {
            position: 'topright'
                //control position - allowed: 'topleft', 'topright', 'bottomleft', 'bottomright'
        },

        onAdd: function(map) {
            var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');

            var input = document.createElement('input');
            input.type = 'range';
            input.name = 'slider';

            input.style.width = '100px';
            input.style.height = '36px';

            //input.onchange = ;

            container.appendChild(input);

            container.style.backgroundColor = 'white';
            container.style.width = '100px';
            container.style.height = '36px';

            //container.onclick = function() {
            //    console.log('buttonClicked');
            //}

            L.DomEvent.disableClickPropagation(container);
            
            return container;
        }
    });

    map.addControl(new readFileControl());
    map.addControl(new sliderControl());

    //讀檔
    function readfile() {
        var file = this.files[0];
        //var name = file.name;
        //var size = file.size;
        var type = file.type;

        //NO CSV!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        if (!type.match(/application\/vnd.ms-excel|application\/csv|text\/csv/)) {
            return alert('格式錯誤');
        }

        var fReader = new FileReader();
        fReader.onload = function(event) {
            var data = event.target.result;

            data = data.replace(/ /g, "").split('\n');
            data.splice(0, 1);
            data.pop();
            var head = 32;
            data.forEach(function(item, index) {
                var tem = data[index].split(',');
                tem.forEach(function(item_, index_) {
                    tem[index_] = tem[index_] - 0;
                });
                tem.pop();

                var sitegrid = [];
                for (var i = 1; i <= head; i++){
                        sitegrid.push({S: tem[i + head], W: tem[i]});
                }

                sitegrid.time = tem[0];

                //tem.pop();
                data[index] = sitegrid;
            });

            //document.querySelector('[name=Text1]').innerHTML = '模擬天數：' + data[data.length - 1][0] + ' 天';

            window.data = data;

            callD3();

        };

        fReader.readAsText(file);
    };

    //呼叫D3繪圖
    function callD3(){
        var svg = d3.select(map.getPanes().overlayPane).append("svg");
        var g = svg.append("g").attr("class", "leaflet-zoom-hide");
        var point = geoData.SankuaicuoGridPoint2;

        var margin = 30;

        var ymm = d3.extent(point, function(d){ return d[1]});
        var xmm = d3.extent(point, function(d){ return d[0]});

        var site = g.selectAll("circle")
                .data(point).enter()
                .append("circle")
                .attr("cx", function (d) { return projectPoint(d).x + margin; })
                .attr("cy", function (d) { return projectPoint(d).y + margin; })
                .attr("r", 20);

        map.on("zoomend", reset);
        reset();

        function reset(){

            var topLeft = projectPoint([xmm[0], ymm[1]]);
            var bottomRight = projectPoint([xmm[1], ymm[0]]);

            svg.attr("width", bottomRight.x - topLeft.x + margin*2)
                .attr("height", bottomRight.y - topLeft.y + margin*2)
                .style("left", (topLeft.x - margin) + "px")
                .style("top", (topLeft.y - margin) + "px");

            g.attr("transform", "translate(" + (-topLeft.x) + "," + (-topLeft.y) + ")");

            var col = d3.scaleLinear()
                    .domain([0, d3.max(data[100], function(d){return d.S})])
                    .range([0, 255]);

            site.attr("cx", function (d) { return projectPoint(d).x + margin; })
                .attr("cy", function (d) { return projectPoint(d).y + margin; })
                .attr("fill", function(d, i) { 
                    return "rgb(" + Math.floor(col(data[100][i].S)) + ",0,0)"
                });

        }

        function projectPoint(d) {
            return map.latLngToLayerPoint(new L.LatLng(d[1], d[0]));
        }
    };

    //綁定POP事件
    function onEachFeature(feature, layer) {
        layer.bindPopup(feature.properties.Name);
    };

    //設定Icon物件
    function seticon(icon) {
        return function(feature, latlng) {
            return L.marker(latlng, {
                icon: icon
            });
        }
    };

    //設定GeoJson物件
    function setGeoJson(data, icon){
        return L.geoJson(data, {
            pointToLayer: seticon(icon),
            onEachFeature: onEachFeature
        });
    };

    //取得Icon
    function getIcon(path){
        return L.icon({
            iconUrl: path,
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -10] 
        })
    };

})(window, document);