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
        [25.02, 121.240],
        [25.05, 121.254]
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

    //建立時間拉軸
    var sliderControl = L.Control.extend({

        options: {
            position: 'topright'
                //control position - allowed: 'topleft', 'topright', 'bottomleft', 'bottomright'
        },

        onAdd: function(map) {
            var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');

            var input = document.createElement('input');
            input.type = 'range';
            input.name = 'time';
            input.min = '0';
            input.value = '0';
            //input.max = data.length - 1;          

            input.style.width = '147px';
            input.style.height = '36px';

            input.addEventListener('input', function() {
                var index = this.value;

                document.querySelector('p[name=showtime]').innerHTML = '時間：' + data[index].time + '天';

                SkCGridPoint.eachLayer(function(circle) {
                    circle.setStyle({
                        fillColor: col(data[index][circle._index][document.querySelector('[name=ws]:checked').value])
                    });
                });

            }, false);

            var p = document.createElement('p');
            p.setAttribute('name', 'showtime');
            p.innerHTML = '時間：';

            var radio = document.createElement('div');
            radio.innerHTML = '<form><input type="radio" name="ws" value="S" checked>底泥<input type="radio" name="ws" value="W" >水體</form>'

            container.appendChild(radio);
            container.appendChild(p);
            container.appendChild(input);

            container.style.backgroundColor = 'white';
            container.style.width = '150px';
            container.style.height = '110px';

            L.DomEvent.disableClickPropagation(container);

            return container;
        }
    });

    //colorBar
    var colorBarControl = L.Control.extend({
        options: {
            position: 'bottomleft'
        },

        onAdd: function(map) {

            var child = document.querySelector('.colorBar');

            var parent = document.querySelector('.leaflet-bottom.leaflet-left');
            if (child !== null)
                parent.removeChild(child);

            var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom colorBar');

            container.style.backgroundColor = 'white';
            container.style.width = '350px';
            container.style.height = '60px';
            container.setAttribute('name', 'colorbar');

            var canvas = document.createElement("canvas");

            canvas.setAttribute('width', '350px');
            canvas.setAttribute('height', '60px');

            var context = canvas.getContext("2d");
            context.textAlign = "center";

            var max = d3.max(data, function(d) {
                return d3.max(d, function(dd) {
                    return dd[document.querySelector('[name=ws]:checked').value]
                })
            });

            for (var i = 0; i < 100; i++) {
                context.beginPath();
                context.rect(i * 3 + 25, 8, 3, 30);
                context.fillStyle = col(i * max / 100);
                //context.fillStyle = d3.interpolateViridis(i/100);
                context.fill();
                context.closePath();
                if (i % 20 == 0) {
                    context.fillStyle = '#000';
                    context.fillText((i * max / 100).toFixed(1), i * 3 + 25, 50);
                }
            }
            context.fillStyle = '#000';
            context.fillText(max.toFixed(1), 325, 50);

            container.appendChild(canvas);
            //container.onclick = function() {
            //    console.log('buttonClicked');
            //}
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
            data = data.slice(1, data.length - 1);
            //data.splice(0, 1);
            //data.pop();
            var head = 32;
            data.forEach(function(item, index) {
                var tem = data[index].split(',');
                tem.forEach(function(item_, index_) {
                    tem[index_] = tem[index_] - 0;
                });
                tem.pop();

                var sitegrid = [];
                for (var i = 1; i <= head; i++) {
                    sitegrid.push({ S: tem[i + head], W: tem[i] });
                }

                sitegrid.time = tem[0];

                //tem.pop();
                data[index] = sitegrid;
            });

            //document.querySelector('[name=Text1]').innerHTML = '模擬天數：' + data[data.length - 1][0] + ' 天';
            document.querySelector('p[name=showtime]').innerHTML = '時間：0天';
            document.querySelector('[name=time]').value = '0';

            window.data = data;

            window.SkCGridPoint = new L.LayerGroup();
            //callD3();
            window.col = d3.scaleLinear()
                .domain([0, d3.max(data, function(d) {
                    return d3.max(d, function(dd) {
                        return dd[document.querySelector('[name=ws]:checked').value]
                    })
                })])
                .range(['#FFFF6F', '#006000']);

            addgridpoint();


        };

        fReader.readAsText(file);
    };


    function addgridpoint() {
        geoData.SankuaicuoGridPoint2.forEach(function(item, index) {

            var circle = L.circle([item[1], item[0]], {
                color: 'black',
                weight: 2,
                fillColor: col(data[document.querySelector('[name=time]').value][index][document.querySelector('[name=ws]:checked').value]),
                fillOpacity: 1,
                radius: 50
            }); //.bindPopup((index + 1).toString())

            circle._index = index;

            circle.on("click", function(event) {
                console.log(event.target._index);
                $('#myModal').modal({ backdrop: false }).show();

                $('#myModal .modal-dialog').draggable({
                    handle: ".modal-header"
                });

                callPolt(event.target._index);
            });

            circle.addTo(SkCGridPoint);
        })

        SkCGridPoint.addTo(map);

        map.addControl(new colorBarControl());

        //SkCGridPoint.eachLayer(function(point, i) {
        //    point.setStyle({
        //        fillColor: '#dddddd'
        //    });
        //});
    };

    function callPolt(index) {

        var timeSeries = data.reduce(function(a, b) {
            return a.concat([b[index][document.querySelector('[name=ws]:checked').value]]);
        }, []);

        var margin = { top: 20, right: 20, bottom: 30, left: 30 },
            width = 730 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        var x = d3.scaleLinear()
            .domain([0, 60])
            .range([0, width]);

        var y = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) {
                return d3.max(d, function(dd) {
                    return dd[document.querySelector('[name=ws]:checked').value]
                })
            })])
            .range([height, 0]);

        var line = d3.line()
            .curve(d3.curveBasis)
            .x(function(d, i) {
                return x(data[i].time);
            })
            .y(function(d) {
                return y(d);
            });

        var svg = d3.select('#plot');

        if (document.querySelector('#plot g') === null) {

            var g = svg.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            g.append("g")
                .attr("class", "axis axis--y")
                .call(d3.axisLeft(y))
                .append("text")
                .attr("fill", "#000")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .style("text-anchor", "end")
                .text("濃度");

            g.append("path")
                .datum(timeSeries)
                .attr("class", "line")
                .attr("d", line);

        } else {

            d3.select('.line')
                .datum(timeSeries)
                .attr("d", line);

        }
    };


    // $(document).on('click', '#myModal .minimize', function () {
    //     $("#myModal .modal-body").slideToggle();
    // })

    $(document).on('click', 'form input[name=ws]', function () {
        window.col = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) {
                return d3.max(d, function(dd) {
                    return dd[document.querySelector('[name=ws]:checked').value]
                })
            })])
            .range(['#FFFF6F', '#006000']);

        map.addControl(new colorBarControl());
        addgridpoint();
    })

    //綁定POP事件
    function onEachFeature(feature, layer) {
        layer.bindPopup(feature.properties.Name);
        return
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
    function setGeoJson(data, icon) {
        return L.geoJson(data, {
            pointToLayer: seticon(icon),
            onEachFeature: onEachFeature
        });
    };

    //取得Icon
    function getIcon(path) {
        return L.icon({
            iconUrl: path,
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -10]
        })
    };

})(window, document);
