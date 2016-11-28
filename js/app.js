var vm = new Vue({
    el: '#showType',
    data: {
        type: 'S',
        site: 31,
        showTime: '0天0小時0分',
        WSill: 100
    },
    watch: {
    	type: function (val) {
            window.mapObj.map.addControl(new window.colorBarControl());

      		window.chart.draw(vm.site);

            var dx = (data[window.chart.focusIndex][vm.site][vm.type] / data.max[vm.type] * 100) * 3;
            d3.select("#colorBar rect").attr("transform", "translate(" + (dx + 23.5) + ", 8)");

            var col = window.data.colmap[vm.type];
			window.mapObj.SKCGroup.eachLayer(function(circle) {
                circle.setStyle({
                    fillColor: col(window.data[window.chart.focusIndex][vm.site][vm.type])
                });
            });

    	}
  	}
})
