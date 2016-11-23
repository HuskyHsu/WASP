(function (window, document, undefined) {

	var input = document.querySelector('input[name=file]');

	input.onchange = readfile;

	//讀檔
    function readfile() {
        var file = this.files[0];
        //var name = file.name;
        //var size = file.size;
        //var type = file.type;

        //NO CSV!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        if (!file.type.match(/application\/vnd.ms-excel|application\/csv|text\/csv/)) {
            return alert('格式錯誤');
        }

        var fReader = new FileReader();
        fReader.onload = function(event) {
            var data = event.target.result;

            data = data.replace(/ /g, "").split('\n');
            data = data.slice(1, data.length - 1);

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

            window.data = data;
            window.data.max = d3.max(data, function (d) {
                return d3.max(d, function (dd) {
                    return dd[vm.type]
                })
            });
            window.data.colmap = d3.scaleLinear()
                .domain([0, window.data.max])
                .range(['#FFFF6F', '#006000']);

            window.chart = new window.Charts.line({data: data});
            window.chart.draw(vm.site);
            window.mapObj.SKCGroup.eachLayer(function(circle) {
                circle.setStyle({
                    fillOpacity: 1,
                    fillColor: window.data.colmap(data[0][circle._index][vm.type])
                });

                if (circle._index == 31){
                    circle.setStyle({ color: 'red' });
                }
            });

            //colorBar
            window.colorBarControl = L.Control.extend({
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
                    container.style.height = '70px';
                    container.setAttribute('name', 'colorbar');

                    var canvas = document.createElement("canvas");

                    canvas.setAttribute('width', '350px');
                    canvas.setAttribute('height', '70px');

                    var context = canvas.getContext("2d");
                    context.textAlign = "center";

                    var max = window.data.max;

                    for (var i = 0; i < 100; i++) {
                        context.beginPath();
                        context.rect(i * 3 + 25, 8, 3, 30);
                        context.fillStyle = window.data.colmap(i * max / 100);
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

                    context.fillText(vm.type == "S" ? '底泥銅濃度(ppm)' : '水體銅濃度(ppb)', 280, 65);


                    container.appendChild(canvas);

                    return container;
                }
            });

            window.mapObj.map.addControl(new window.colorBarControl());

        };

        fReader.readAsText(file);
    };

})(window, document);