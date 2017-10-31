// var vm = new Vue({
//     el: '#showType',
//     data: {
//         type: 'S',
//         site: 31,
//         showTime: '0天0小時0分',
//         WSill: 100
//     },
//     watch: {
//     	type: function (val) {
//             window.mapObj.map.addControl(new window.colorBarControl());

//       		window.chart.draw(vm.site);

//             var dx = (data[window.chart.focusIndex][vm.site][vm.type] / data.max[vm.type] * 100) * 3;
//             d3.select("#colorBar rect").attr("transform", "translate(" + (dx + 23.5) + ", 8)");

//             var col = window.data.colmap[vm.type];
// 			window.mapObj.SKCGroup.eachLayer(function(circle) {
//                 circle.setStyle({
//                     fillColor: col(window.data[window.chart.focusIndex][vm.site][vm.type])
//                 });
//             });

//     	}
//   	}
// })

var vm = new Vue({
    el: '#showType',
    data: {
        area: "臺中 - 詹厝園圳",
        scenario: "渠道網格"
    },
    methods: {
        changeArea(rowId, event) {
            if (this.area == "臺中 - 詹厝園圳"){
                window.mapObj.map.fitBounds(window.mapObj.TaichungGrid.getBounds().pad(0.2));
            }
        },
        changeScenario(rowId, event) {
            if (this.scenario == "情境一"){
                window.mapObj.TaichungGrid.eachLayer(function(Grid) {
                    if (this.area == "臺中 - 詹厝園圳"){
                        TaichungScenario[this.scenario]

                    }
                    Grid.setStyle({
                        color: 'red'
                    });
                });
            }
            
        }
    }
})

window.colmap = {
    T: d3.scaleLinear()
        .range(['#FFFF6F', '#006000']),
    C: d3.scaleLinear()
    .range(['#FFFF6F', '#006000'])
};