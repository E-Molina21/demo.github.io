	//Capas Base
var capaOSM = new L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png'),
	capaGoogleHibrida = new L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'),
	capaGoogleSat = new L.tileLayer(' http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}');
	ESRISat = new L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}')
	Carto = new L.tileLayer('http://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png');




var capasBase = {
    "OpenStreetMap": capaOSM,
	"Google": capaGoogleHibrida, 
	"Google Satélite": capaGoogleSat,
	"ESRI": ESRISat,
	"Carto Dark": Carto,
}; 
	//Variable de mapa
var mapa = new L.map('mapa', {
	center: [19.33,-99.18555],
	zoom: 10,
	layers:[capaOSM]
	
	
});
//Cargar Capas Base en boton de control dentro del Mapa
var layerControl = L.control.layers(capasBase, null, {position: 'topleft'}).addTo(mapa);
//Cargar Sidebar

var sidebar = L.control.sidebar({sidebar}).addTo(mapa);



var coordsBox = L.control({
	position: 'bottomleft'
});

coordsBox.onAdd = function (mapa) {
	this._div = L.DomUtil.create('div', 'leaflet-control-coordinates');
	this._div.innerHTML = 'Latitud: 0.00<br>Longitud: 0.00';
	return this._div;
};

coordsBox.update = function (latlng) {
	this._div.innerHTML = 'Latitud: ' + latlng.lat.toFixed(5) + '<br>Longitud: ' + latlng.lng.toFixed(5);
};

coordsBox.addTo(mapa);
mapa.on('mousemove', function (e) {
	coordsBox.update(e.latlng);
});






