(function (window, document, undefined) {

    window.Charts = {};

    var line = function (info) {
        this.data = info.data;
        this.focusIndex = 0;
    }

    line.prototype.draw = function (index) {

        var data = this.data;
        var thisObj = this;
        this.max = data.max[vm.type];

        var osvg = document.querySelector('.osvg');

        var margin = { top : 20, right : 20, bottom : 40, left : 40 };
        var width = osvg.clientWidth - margin.left - margin.right - 10;
        var height = osvg.clientHeight - margin.top - margin.bottom - 10;

        var bisectDate = d3.bisector(function(d) { return d.time; }).left;

        var x = d3.scaleLinear()
            .domain([0, vm.type == "S" ? 30 : 1])
            .range([0, width])
            .clamp(true);

        var y = d3.scaleLinear()
            .domain([0, this.max])
            .range([height, 0]);

        // var line = d3.line()
        //     .x(function (d) { return x(d.time); })
        //     .y(function (d) { return y(d[index][vm.type]); });

        var area = d3.area()
            .x(function (d) { return x(d.time); })
            .y0(function(d) { return (height) })
            .y1(function (d) { return y(d[index][vm.type]); });

        d3.select('#lineChart').remove();
        var svg = d3.select('.osvg').append("svg")
            .attr('id', 'lineChart')
            .attr('height', height + margin.top + margin.bottom)
            .attr('width', width + margin.left + margin.right);

        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append("linearGradient")
            .attr("id", "temperature-gradient")
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", 0).attr("y1", height)
            .attr("x2", 0).attr("y2", 0)
            .selectAll("stop")
            .data([
                { offset: "0%", color: '#FFFF6F' },
                { offset: "100%", color: '#006000' }
            ])
            .enter().append("stop")
            .attr("offset", function(d) {
                return d.offset; })
            .attr("stop-color", function(d) {
                return d.color; });

        g.append("path")
            .datum(data)
            .attr("class", "area")
            .attr("d", area);

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .append("text")
            .attr("fill", "#000")
            .attr("y", 22)
            .attr("x", width)
            .attr("dy", "0.71em")
            .style("text-anchor", "end")
            .text('時間(天)');

        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .style("text-anchor", "end")
            .text(vm.type == "S" ? '底泥銅濃度(ppm)' : '水體銅濃度(ppb)');

        var focus = svg.append("g")
            .attr("class", "focus")
            .attr("transform", "translate(" + (x(data[this.focusIndex].time) + margin.left) + "," + (y(data[this.focusIndex][index][vm.type]) + margin.top) + ")");
            //.style("display", "none");

        focus.append("circle")
            .attr("r", 6);
        
        svg.append("rect")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height)
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .on("mouseover", function() { focus.style("display", null); })
            //.on("mouseout", function() { focus.style("display", "none"); })
            .on("mousemove", mousemove);

        d3.select('#colorBar').remove();
        var colorbar = d3.select('.colorBar')
            .append('svg')
            .attr('id', 'colorBar')
            .style("position", "absolute")
            .style("left", '0')
            .style("top", '0')
            .attr("width", 350)
            .attr("height", 70)
            .append('rect')
            .attr("transform", "translate(23.5, 8)")
            .attr("width", 3)
            .attr("height", 30)
        
        function mousemove() {
            var x0 = x.invert(d3.mouse(this)[0]),
                i = bisectDate(data, x0, 1),
                d0 = data[i - 1],
                d1 = data[i],
                d = x0 - d0.time > d1.time - x0 ? d1 : d0,
                t = x0 - d0.time > d1.time - x0 ? (i - 1) : i;
            focus.attr("transform", "translate(" + (x(d.time) + margin.left) + "," + (y(d[index][vm.type]) + margin.top) + ")");

            var dx = (d[index][vm.type] / data.max[vm.type] * 100) * 3;
            colorbar.attr("transform", "translate(" + (dx + 23.5) + ", 8)");

            var col = window.data.colmap[vm.type];

            window.mapObj.SKCGroup.eachLayer(function(circle) {
                circle.setStyle({
                    fillColor: col(d[circle._index][vm.type])
                });
            });

            thisObj.focusIndex = t == i ? t - 1 : t + 1;

            var day = Math.floor(d.time);
            var hour = Math.floor((d.time - day)*24);
            var minute = Math.round((d.time - day - hour/24)*24*60);
            vm.showTime = day + '天' + hour + '小時' + minute + '分';

        }


    }

    window.Charts.line = line;

})(window, document);
