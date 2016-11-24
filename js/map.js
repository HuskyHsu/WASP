(function (window, document, undefined) {

    //WMTS設定
    var streets = L.tileLayer('https://mt{s}.google.com/vt/x={x}&y={y}&z={z}&hl=zh-TW', {
            id : 'streets',
            subdomains : "012",
            attribution : 'Map data: &copy; Google'
        });

    var topography = L.tileLayer('https://mt{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
            id : 'topography',
            subdomains : "012",
            attribution : 'Map data: &copy; Google'
        });

    //群組
    var baseMaps = {
        "Google地圖" : streets,
        "地形" : topography
    };

    var map = L.map('map', {
            layers : [streets]
        }).fitBounds([
                [25.01, 121.237],
                [25.05, 121.247]
            ]);

    var SKCGroup = new L.LayerGroup();

    var SankuaicuoGridPoint = [[121.2470551, 25.0175791],[121.2469478, 25.0179158],[121.2464972, 25.0196281]
            ,[121.24655420000001, 25.0205723],[121.2467399, 25.0210876],[121.2468727, 25.0213622]
            ,[121.246862, 25.0217086],[121.2461498, 25.0224365],[121.2457515, 25.022733]
            ,[121.24495090000001, 25.0235922],[121.2446049, 25.0241852],[121.2443689, 25.0245352]
            ,[121.24333350000001, 25.0255511],[121.2420139, 25.0266812],[121.2417899, 25.0279341]
            ,[121.2421346, 25.0284748],[121.2415056, 25.0296535],[121.240702, 25.02985]
            ,[121.2396213, 25.0301347],[121.239101, 25.0315322],[121.2378484, 25.0324362]
            ,[121.2361157, 25.0322054],[121.235944, 25.0322126],[121.2346968, 25.0333038]
            ,[121.2342945, 25.0350463],[121.2336695, 25.0362541],[121.233585, 25.0364874]
            ,[121.232146, 25.0381897],[121.231517, 25.0388143],[121.2316015, 25.0393125]
            ,[121.231399, 25.0405373],[121.2316793, 25.0423136]];

    SankuaicuoGridPoint.forEach(function (item, index) {

        var circle = L.circle([item[1], item[0]], {
                color : 'black',
                weight : 2,
                fillOpacity : 0,
                radius : 50
            }); //.bindPopup((index + 1).toString())

        circle._index = index;

        circle.on("click", function (event) {

            SKCGroup.eachLayer(function(circle) {
                circle.setStyle({
                    color: 'black'
                });
            });

            this.setStyle({ color: 'red' });
            vm.site = circle._index;
            window.chart.draw(vm.site);
        });

        circle.addTo(SKCGroup);
    })

    SKCGroup.addTo(map);

    //綁定至window
    window.mapObj = new Vue({
        data: {
            map: map,
            SKCGroup: SKCGroup
        }
    })

})(window, document);