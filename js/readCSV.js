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

            window.colmap = d3.scaleLinear()
                .domain([0, d3.max(data, function(d) {
                    return d3.max(d, function(dd) {
                        return dd['S']
                    })
                })])
                .range(['#FFFF6F', '#006000']);

            //plot(0);
            window.chart = new window.Charts.line({data: data});
            window.chart.draw(31, 0);
            window.mapObj.SKCGroup.eachLayer(function(circle) {
                circle.setStyle({
                    fillOpacity: 1,
                    fillColor: colmap(data[0][circle._index]['S'])
                });

                if (circle._index == 31){
                    circle.setStyle({ color: 'red' });
                }
            });

            window.focusIndex = 0;


        };

        fReader.readAsText(file);
    };

})(window, document);