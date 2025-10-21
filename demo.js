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

//var sidebar = L.control.sidebar({sidebar}).addTo(mapa);
var sidebar = L.control.sidebar({
    autopan: false,       // whether to maintain the centered map point when opening the sidebar
    closeButton: true,    // whether t add a close button to the panes
    container: 'sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
    position: 'left',     // left or right
}).addTo(mapa);


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



//Delcaracion capas
const staticlay = {
  "Manglares": {
    type: "png",
    url: "mang.png",
    layer: null
  },
  
};

//añadido desde una checkbox
const layerList = document.getElementById("home");

// Create checkboxes dynamically
Object.entries(availableLayers).forEach(([name, info]) => {
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.dataset.layerName = name;

  checkbox.addEventListener("change", async (e) => {
    const checked = e.target.checked;
    const layerName = e.target.dataset.layerName;
    const layerInfo = availableLayers[layerName];

    if (checked) {
      // Lazy-load only if not already loaded
      if (!layerInfo.layer) {
        console.log(`Loading ${layerName}...`);
        if (layerInfo.type === "geojson") {
          const response = await fetch(layerInfo.url);
          const data = await response.json();
          layerInfo.layer = L.geoJSON(data);
        } else if (layerInfo.type === "tile") {
          layerInfo.layer = L.tileLayer(layerInfo.url, layerInfo.options || {});
        } else if (layerInfo.type === "wms") {
          layerInfo.layer = L.tileLayer.wms(layerInfo.url, layerInfo.options || {});
        }
      }
      map.addLayer(layerInfo.layer);
    } else {
      if (layerInfo.layer) map.removeLayer(layerInfo.layer);
    }
  });

  label.appendChild(checkbox);
  label.append(" " + name);
  layerList.appendChild(label);
});





