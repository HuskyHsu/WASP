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
    var FactoryIcon = L.icon({
        iconUrl: 'css/images/Factory.png',
        iconSize: [32, 32], // size of the icon
        iconAnchor: [16, 16], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -10] // point from which the popup should open relative to the iconAnchor
    });

    //自動測站Icon
    var AutoSiteIcon = L.icon({
        iconUrl: 'css/images/AutoSite.png',
        iconSize: [32, 32], // size of the icon
        iconAnchor: [16, 16], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -10] // point from which the popup should open relative to the iconAnchor
    });

    //河水堰Icon
    var WeirIcon = L.icon({
        iconUrl: 'css/images/weir.png',
        iconSize: [32, 32], // size of the icon
        iconAnchor: [16, 16], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -10] // point from which the popup should open relative to the iconAnchor
    });

    //樹酯包擺放Icon
    var ResinIcon = L.icon({
        iconUrl: 'css/images/Resin2.png',
        iconSize: [32, 32], // size of the icon
        iconAnchor: [16, 16], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -10] // point from which the popup should open relative to the iconAnchor
    });

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
    var SankuaicuoRiver = L.geoJson(geoData.SankuaicuoRiverWeir, {
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
                icon: WeirIcon
            });
        },
        onEachFeature: onEachFeature
    });

    var AutoSite = L.geoJson(geoData.AutoSite, {
        pointToLayer: seticon(AutoSiteIcon),
        onEachFeature: onEachFeature
    });

    var Factory = L.geoJson(geoData.Factory, {
        pointToLayer: seticon(FactoryIcon),
        onEachFeature: onEachFeature
    });

    var Resin = L.geoJson(geoData.Resin, {
        pointToLayer: seticon(ResinIcon),
        onEachFeature: onEachFeature
    });

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

    map.addControl(new readFileControl());

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

    function callD3(){
        var svg = d3.select(map.getPanes().overlayPane).append("svg");

        var g = svg.append("g").attr("class", "leaflet-zoom-hide");

        var point = [[121.2470551, 25.0175791],[121.2469478, 25.0179158],[121.2464972, 25.0196281]
            ,[121.24655420000001, 25.0205723],[121.2467399, 25.0210876],[121.2468727, 25.0213622]
            ,[121.246862, 25.0217086],[121.2461498, 25.0224365],[121.2457515, 25.022733]
            ,[121.24495090000001, 25.0235922],[121.2446049, 25.0241852],[121.2443689, 25.0245352]
            ,[121.24333350000001, 25.0255511],[121.2420139, 25.0266812],[121.2417899, 25.0279341]
            ,[121.2421346, 25.0284748],[121.2415056, 25.0296535],[121.240702, 25.02985]
            ,[121.2396213, 25.0301347],[121.239101, 25.0315322],[121.2378484, 25.0324362]
            ,[121.2361157, 25.0322054],[121.235944, 25.0322126],[121.2346968, 25.0333038]
            ,[121.2342945, 25.0350463],[121.2336695, 25.0362541],[121.233585, 25.0364874]
            ,[121.232146, 25.0381897],[121.231517, 25.0388143],[121.2316015, 25.0393125]
            ,[121.231399, 25.0405373],[121.2316793, 25.0423136]];

        function projectPoint(d) {
            return map.latLngToLayerPoint(new L.LatLng(d[1], d[0]));
        }

        var transform = d3.geoTransform({point: function (x, y) {
            var point = map.latLngToLayerPoint(new L.LatLng(y, x));
            this.stream.point(point.x, point.y);
        }});
        var path = d3.geoPath().projection(transform);


        var site = g.selectAll("circle")
                .data(point).enter()
                .append("circle")
                .attr("cx", function (d) { return projectPoint(d).x + 30; })
                .attr("cy", function (d) { return projectPoint(d).y + 30; })
                .attr("r", 20);


        map.on("zoomend", reset);
        reset();

        function reset(){

            var bounds = path.bounds(geoData.SankuaicuoGridPoint),
                topLeft = bounds[0],
                bottomRight = bounds[1];

            svg.attr("width", bottomRight[0] - topLeft[0] + 60)
                .attr("height", bottomRight[1] - topLeft[1] + 60)
                .style("left", (topLeft[0] - 30) + "px")
                .style("top", (topLeft[1] - 30) + "px");

            g.attr("transform", "translate(" + (-topLeft[0]) + "," + (-topLeft[1]) + ")");

            var col = d3.scaleLinear()
                    .domain([0, d3.max(data[100], function(d){return d.S})])
                    .range([0, 255]);

            site.attr("cx", function (d) { return projectPoint(d).x + 30; })
                .attr("cy", function (d) { return projectPoint(d).y + 30; })
                .attr("fill", function(d, i) { 
                    return "rgb(" + Math.floor(col(data[100][i].S)) + ",0,0)"
                });

        }


    };

    function onEachFeature(feature, layer) {
        layer.bindPopup(feature.properties.Name);
    }

    function seticon(icon) {
        return function(feature, latlng) {
            return L.marker(latlng, {
                icon: icon
            });
        }
    }

})(window, document);