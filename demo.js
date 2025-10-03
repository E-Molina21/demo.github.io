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
	zoom: 15,
	layers:[capaOSM]
	pmIgnore: false,
	
});
//Cargar Capas Base en boton de control dentro del Mapa
var layerControl = L.control.layers(capasBase, null, {position: 'topleft'}).addTo(mapa);
//Cargar Sidebar

var sidebar = L.Control.sidebar('sidebar').addTo(mapa);


