(function(window, document, undefined) {
	//Class起始設定
	var LineCharts = function(id, data) {

		var margin = {
			top: 20,
			right: 50,
			bottom: 30,
			left: 50
		};
		var width = 960 - margin.left - margin.right;
		var height = 500 - margin.top - margin.bottom;

		this.svg = d3.select(id)
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom);

		this.path = this.svg.append("g")
			.append("path")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
			.datum(data)
			.attr("class", "line");

		//this.data = data;

		var x = d3.scaleLinear() //scalePoint
			.domain(d3.extent(data, function(d) {
				return d[0];
			}))
			.range([0, width]);

		this.y = d3.scaleLinear()
			.range([height, 0]);

		//var x = this.x;

		this.line = d3.line()
			.x(function(d) {
				return x(d[0])
			});


		//axis
		this.axis = this.svg.append("g")
			.attr("class", "axis");

		this.axis.append("g")
			.attr("transform", "translate(" + margin.left + "," + (margin.top + height) + ")")
			.attr("class", "axis axis--x")
			.call(d3.axisBottom(x));

		this.axis.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
			.attr("class", "axis axis--y");

		this.axis.append("text")
			.attr("y", margin.top + height)
			.attr("x", margin.left + width)
			.attr("dy", "3.2em")
			.style("text-anchor", "end")
			.text(this.data2_name);

	};

	//線
	LineCharts.prototype.linrre = function(site) {

		//data.splice(150, data.length);

		var y = this.y.domain([0, d3.max(data, function(d) {
			return d[site];
		})]);

		this.line.y(function(d) {
			return y(d[site])
		});

		this.path.attr("d", this.line);

		this.axis.selectAll("g.axis.axis--y").call(d3.axisLeft(y));



	};


	window.Charts = {
		Line: LineCharts
	};

})(window, document);