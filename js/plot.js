(function (window, document, undefined) {

    window.Charts = {};

    var line = function (info) {

        this.data = info.data;
        this.extent = d3.extent(data, function (d) {
                return d3.max(d, function (dd) {
                    return dd['S']
                })
            });
    }

    line.prototype.draw = function (index, focusIndex) {

        var timeSeries = this.data.reduce(function (a, b) {
                return a.concat([b[index]['S']]);
            }, []);

        var osvg = document.querySelector('.osvg');

        var margin = { top : 20, right : 20, bottom : 40, left : 40 };
        var width = osvg.clientWidth - margin.left - margin.right - 10;
        var height = osvg.clientHeight - margin.top - margin.bottom - 10;

        var data = this.data;

        var bisectDate = d3.bisector(function(d) { return d.time; }).left;

        var x = d3.scaleLinear()
            .domain([0, 60])
            .range([0, width])
            .clamp(true);

        var y = d3.scaleLinear()
            .domain(this.extent)
            .range([height, 0]);

        var line = d3.line()
            .x(function (d, i) { return x(data[i].time); })
            .y(function (d) { return y(d); });

        d3.select('#lineChart').remove();
        var svg = d3.select('.osvg').append("svg")
            .attr('id', 'lineChart')
            .attr('height', height + margin.top + margin.bottom)
            .attr('width', width + margin.left + margin.right);

        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        g.append("path")
            .datum(timeSeries)
            .attr("class", "line")
            .attr("d", line);

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
            .text('底泥銅濃度(ppm)');

        g.append("path")
            .datum(timeSeries)
            .attr("class", "line")
            .attr("d", line);

        var focus = svg.append("g")
            .attr("class", "focus")
            .attr("transform", "translate(" + (x(data[focusIndex].time) + margin.left) + "," + (y(data[focusIndex][index]['S']) + margin.top) + ")");
            //.style("display", "none");

        focus.append("circle")
            .attr("r", 6);
        
        svg.append("rect")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height)
            .attr("transform", "translate(" + (margin.left) + "," + (margin.top) + ")")
            .on("mouseover", function() { focus.style("display", null); })
            //.on("mouseout", function() { focus.style("display", "none"); })
            .on("mousemove", mousemove);
        
        function mousemove() {
            var x0 = x.invert(d3.mouse(this)[0]),
                i = bisectDate(data, x0, 1),
                d0 = data[i - 1],
                d1 = data[i],
                d = x0 - d0.time > d1.time - x0 ? d1 : d0,
                t = x0 - d0.time > d1.time - x0 ? (i - 1) : i;
            focus.attr("transform", "translate(" + (x(d.time) + margin.left) + "," + (y(d[index]['S']) + margin.top) + ")");

            window.mapObj.SKCGroup.eachLayer(function(circle) {
                circle.setStyle({
                    fillColor: colmap(d[circle._index]['S'])
                });
            });

            window.focusIndex = t;

        }




    }

    window.Charts.line = line;

})(window, document);
