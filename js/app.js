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

var setScenario = function(scenario, gridObj){
    var max = 0;
    Object.keys(scenario).map(function(objectKey, index) {
        var value = scenario[objectKey];
        max = value > max ? value : max;
    });

    var colmap = window.colmap.W;
    colmap.domain([0, max]);

    gridObj.eachLayer(function(layer) {

        layer.setStyle({
            color: colmap(scenario[layer.pid.toString()])
        })
        
    });
}

var vm = new Vue({
    el: '#showType',
    data: {
        area: "臺中 - 詹厝園圳",
        scenario: "渠道網格",
    },
    methods: {
        changeArea(rowId, event) {
            if (this.area == "臺中 - 詹厝園圳"){
                window.mapObj.map.fitBounds(window.mapObj.TaichungGrid.getBounds().pad(0.2));
                setScenario(TaichungScenario[this.scenario], window.mapObj.TaichungGrid)
            } else if (this.area == "彰化 - 新圳"){
                window.mapObj.map.fitBounds(window.mapObj.ChanghuaGrid.getBounds().pad(0.2));
                setScenario(ChanghuaScenario[this.scenario], window.mapObj.ChanghuaGrid)      
            }
        },
        changeScenario(rowId, event) {
            if (this.area == "臺中 - 詹厝園圳"){
                setScenario(TaichungScenario[this.scenario], window.mapObj.TaichungGrid)
            }
            if (this.area == "彰化 - 新圳"){
                setScenario(ChanghuaScenario[this.scenario], window.mapObj.ChanghuaGrid)                
            }
        }
    }
})

window.colmap = {
    W: d3.scaleLinear()
        .range(['#FFFF6F', '#006000']),
    S: d3.scaleLinear()
        .range(['#FFFF6F', '#006000'])
};