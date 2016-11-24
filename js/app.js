var vm = new Vue({
    el: '#showType',
    data: {
        type: 'S',
        site: 31,
        showTime: '0天0小時0分'
    },
    watch: {
    	type: function (val) {
      		window.chart.draw(vm.site);

            var col = window.data.colmap[vm.type];
			window.mapObj.SKCGroup.eachLayer(function(circle) {
                circle.setStyle({
                    fillColor: col(window.data[window.chart.focusIndex][vm.site][vm.type])
                });
            });

			window.mapObj.map.addControl(new window.colorBarControl());
    	}
  	}
})
