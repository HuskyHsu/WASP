function plot(index){

    var timeSeries = data.reduce(function(a, b) {
        return a.concat([b[index]['S']]);
    }, []);

    var osvg = document.querySelector('.osvg');

    var margin = {top : 20, right : 20, bottom : 20, left : 30},
        width = osvg.clientWidth - margin.left - margin.right,
        height = osvg.clientHeight - margin.top - margin.bottom;
    
    var x = d3.scaleLinear()
        .domain([0, 60])
        .range([0, width]);
    
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) {
                    return d3.max(d, function (dd) {
                        return dd['S']
                    })
                })])
        .range([height, 0]);
    
    var line = d3.line()
        .curve(d3.curveBasis)
        .x(function (d, i) {
            return x(data[i].time);
        })
        .y(function (d) {
            return y(d);
        });
    
    var svg = d3.select('#lineChart')
        .attr('height', height + margin.top + margin.bottom)
        .attr('width', width + margin.left + margin.right);
    
    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
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
    
}