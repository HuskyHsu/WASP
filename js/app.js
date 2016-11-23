var vm = new Vue({
    el: '#showType',
    data: {
        type: 'S',
        site: 31
    },
    watch: {
    	type: function (val) {
      		window.chart.draw(vm.site, window.chart.focusIndex);
    	}
  	}
})
