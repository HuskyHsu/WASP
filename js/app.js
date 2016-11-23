var vm = new Vue({
    el: '#showType',
    data: {
        type: 'S',
        site: 31
    },
    watch: {
    	type: function (val) {
      		window.chart.draw(vm.site, window.chart.focusIndex);

			window.mapObj.SKCGroup.eachLayer(function(circle) {
                circle.setStyle({
                    fillColor: window.data.colmap(window.data[window.chart.focusIndex][vm.site][vm.type])
                });
            });

			window.mapObj.map.addControl(new window.colorBarControl());

    	}
  	}
})
