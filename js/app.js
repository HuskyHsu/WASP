var streets = L.tileLayer('http://mt{s}.google.com/vt/x={x}&y={y}&z={z}&hl=zh-TW', 
	{id: 'streets', 
	 subdomains: "012",
	 attribution: 'Map data: &copy; Google'});

var topography = L.tileLayer('http://mt{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', 
	{id: 'topography', 
	 subdomains: "012",
	 attribution: 'Map data: &copy; Google'});

var baseMaps = {
    "Google地圖": streets,
    "地形": topography
};

var myStyle = {
	"color": "#ff7800",
	"weight": 1,
	"opacity": 0.4
};

//工廠Icon
var FactoryIcon = L.icon({
    iconUrl: 'css/images/Factory.png',
    iconSize:     [32, 32], // size of the icon
    iconAnchor:   [16, 16], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -10] // point from which the popup should open relative to the iconAnchor
});

//自動測站Icon
var AutoSiteIcon = L.icon({
    iconUrl: 'css/images/AutoSite.png',
    iconSize:     [32, 32], // size of the icon
    iconAnchor:   [16, 16], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -10] // point from which the popup should open relative to the iconAnchor
});

//河水堰Icon
var WeirIcon = L.icon({
    iconUrl: 'css/images/weir.png',
    iconSize:     [32, 32], // size of the icon
    iconAnchor:   [16, 16], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -10] // point from which the popup should open relative to the iconAnchor
});

//樹酯包擺放Icon
var ResinIcon = L.icon({
    iconUrl: 'css/images/Resin2.png',
    iconSize:     [32, 32], // size of the icon
    iconAnchor:   [16, 16], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -10] // point from which the popup should open relative to the iconAnchor
});

//面
var PotentialDanger = L.geoJson(data.PotentialDanger, {style: myStyle});

//線
var River = L.geoJson(data.River, {});

function onEachFeature(feature, layer){
		layer.bindPopup(feature.properties.Name);
}

//點
var SankuaicuoRiver = L.geoJson(data.SankuaicuoRiverWeir, {
	pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: WeirIcon});
    },
	onEachFeature: onEachFeature});

var AutoSite = L.geoJson(data.AutoSite, {
	pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: AutoSiteIcon});
    },
	onEachFeature: onEachFeature});

var Factory = L.geoJson(data.Factory, {
	pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: FactoryIcon});
    },
	onEachFeature: onEachFeature});

var Resin = L.geoJson(data.Resin, {
	pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: ResinIcon});
    },
	onEachFeature: onEachFeature});

var overlayMaps = {
    "隱患處": PotentialDanger,
    "溪流": River,
    "三塊厝支線河水堰": SankuaicuoRiver,
    "自動測站": AutoSite,
    "廠商": Factory,
    "樹酯包擺放": Resin
    };

var map = L.map('map', {
    layers: [streets, PotentialDanger, River]
}).fitBounds([
    [24.9790491,121.2355337],
    [25.1031019,121.2712828]
]);

L.control.layers(baseMaps, overlayMaps).addTo(map);

