(function(window, document, undefined) {

    //WMTS設定
    var streets = L.tileLayer('http://mt{s}.google.com/vt/x={x}&y={y}&z={z}&hl=zh-TW', {
        id: 'streets',
        subdomains: "012",
        attribution: 'Map data: &copy; Google'
    });

    var topography = L.tileLayer('http://mt{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
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
    var PotentialDanger = L.geoJson(data.PotentialDanger, {
        style: {
            "color": "#ff7800",
            "weight": 1,
            "opacity": 0.4
        }
    });

    //線
    var River = L.geoJson(data.River, {});

    //點
    var SankuaicuoRiver = L.geoJson(data.SankuaicuoRiverWeir, {
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
                icon: WeirIcon
            });
        },
        onEachFeature: onEachFeature
    });

    var AutoSite = L.geoJson(data.AutoSite, {
        pointToLayer: seticon(AutoSiteIcon),
        onEachFeature: onEachFeature
    });

    var Factory = L.geoJson(data.Factory, {
        pointToLayer: seticon(FactoryIcon),
        onEachFeature: onEachFeature
    });

    var Resin = L.geoJson(data.Resin, {
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
        if (!type.match(/application\/vnd.ms-excel|application\/csv/)) {
            return alert('格式錯誤');
        }

        var fReader = new FileReader();
        fReader.onload = function(event) {
            var data = event.target.result;

            data = data.split('\n');
            data.splice(0, 1);
            data.forEach(function(item, index) {
                var tem = data[index].split(',');
                tem.forEach(function(item_, index_) {
                    tem[index_] = tem[index_].trim() - 0;
                });
                tem.pop();
                data[index] = tem;
            });

            //document.querySelector('[name=Text1]').innerHTML = '模擬天數：' + data[data.length - 1][0] + ' 天';

            window.data = data;

        };

        fReader.readAsText(file);

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