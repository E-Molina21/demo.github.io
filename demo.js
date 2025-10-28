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


//--------------------------------

//-------------------------------


//Delcaracion capas
const staticlay = {
  "Manglares": {
    type: "image",
    url: "mang2.png",
	bounds: [[21.240,-87.519],[21.726,-87.092]],
	options: {opacity: 0.7},
    layer: null
  },
	"Vías": {
    type: "geojson",
    url: "ViasPSTL.geojson",
    options: {
     
    style: {
     color: "#ff7f00",
     weight: 3,     
      opacity: 1   
     },
	},

    layer: null
  },
	"Vías Rápidas o Carreteras": {
		type: "geojson",
		url: "ViasMTRW.geojson",
		options: {
			style: {
			color:  "#ff7f00",
     		weight: 5,     
      		opacity: 1   
     	},
		},
		layer: null
	},
	"Vías residenciales": {
		type: "geojson",
		url: "ViasResid2.geojson",
		options: {
			style: {
			color:  "#0F0F0F",
     		weight: 1,     
      		opacity: 1   
     		},
		},
		layer: null
	},
	"CDMX": {
		type: "geojson",
		url: "CDMX.geojson",
		options: {
			style:{
				color: "#3c0000",
				weight: 5,
				opacity: 1, 
				fillOpacity: 0.0,
				dashArray: "5,10"
			},
		},
		layer: null
	},
	"Cuerpos de Agua": {
		type: "geojson",
		url: "AguaCDMX.geojson",
		options: {
			style:{
				color: "#75c8dd",
				fillColor: "#75c8dd", 
				weight: 1,
				opacity: 1, 
				fillOpacity: 1,
				
			},
		},
		layer: null
	},
		"Inventario de Áreas Verdes": {
		type: "geojson",
		url: "InvAreasVerd.geojson",
		options: {
			style:{
				color: "#becf50",
				fillColor: "#becf50", 
				weight: 1,
				opacity: 1, 
				fillOpacity: 1,
				
			},
		},
		layer: null
	},
		"Suelos de Conservación": {
		type: "geojson",
		url: "SueloConserv.geojson",
		options: {
			style:{
				color: "#9acf50",
				fillColor: "#9acf50", 
				weight: 1,
				opacity: 1, 
				fillOpacity: 1,
				
			},
		},
		layer: null
	},
	
};

const dynlay = {
	"Ciclones Tropicales NOAA": {
		type: "esri-dynamic",
		url:"https://mapservices.weather.noaa.gov/tropical/rest/services/tropical/NHC_tropical_weather_summary/MapServer/",
		layers:[0,4],
		opacity: 0.7,
		layer: null
	},


};

//añadido desde una checkbox
const layerList = document.getElementById("home");

Object.entries(staticlay).forEach(([name, info]) => {
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.dataset.layerName = name;

  checkbox.addEventListener("change", async (e) => {
    const checked = e.target.checked;
    const layerName = e.target.dataset.layerName;
    const layerInfo = staticlay[layerName];

    if (checked) {
      if (!layerInfo.layer) {
        console.log(`Loading ${layerName}...`);

        if (layerInfo.type === "geojson") {
          const response = await fetch(layerInfo.url);
          const data = await response.json();
          layerInfo.layer = L.geoJSON(data, layerInfo.options || {});
        } else if (layerInfo.type === "tile") {
          layerInfo.layer = L.tileLayer(layerInfo.url, layerInfo.options || {});
        } else if (layerInfo.type === "wms") {
          layerInfo.layer = L.tileLayer.wms(layerInfo.url, layerInfo.options || {});
        } else if (layerInfo.type === "image") {
          if (!layerInfo.bounds) {
            console.error(`Missing bounds for image layer: ${layerName}`);
            return;
          }
          layerInfo.layer = L.imageOverlay(layerInfo.url, layerInfo.bounds, layerInfo.options || {});
        }
      }

      if (layerInfo.layer) mapa.addLayer(layerInfo.layer);
    } else {
      if (layerInfo.layer) mapa.removeLayer(layerInfo.layer);
    }
  });

  label.appendChild(checkbox);
  label.append(" " + name);
  layerList.appendChild(label);
});

//------------------------------------------------------dinamicas-------------------------------

const layerListdyn = document.getElementById("dyn");

// Create checkboxes dynamically
Object.entries(dynlay).forEach(([name, info]) => {
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.dataset.layerName = name;

  checkbox.addEventListener("change", async (e) => {
    const checked = e.target.checked;
    const layerName = e.target.dataset.layerName;
    const layerInfo = dynlay[layerName];

      if (checked) {
      // Lazy-load only if not already loaded
      if (!layerInfo.layer) {
        console.log(`Loading ${layerName}...`);

        if (layerInfo.type === "geojson") {
          const response = await fetch(layerInfo.url);
          const data = await response.json();
		  const opts = layerInfo.options || {};
          layerInfo.layer = L.geoJSON(data);

        } else if (layerInfo.type === "tile") {
          layerInfo.layer = L.tileLayer(layerInfo.url, layerInfo.options || {});

        } else if (layerInfo.type === "image") {
          layerInfo.layer = L.imageOverlay(layerInfo.url, layerInfo.bounds, layerInfo.options || {});

        } else if (layerInfo.type === "wms") {
          layerInfo.layer = L.tileLayer.wms(layerInfo.url, layerInfo.options || {});

        } else if (layerInfo.type === "esri-dynamic") {
          // Esri dynamic map layer (MapServer export)
          if (!L.esri) {
            console.error("Esri Leaflet plugin not loaded. Add <script src='https://unpkg.com/esri-leaflet'></script> before this script.");
            return;
          }
          layerInfo.layer = L.esri.dynamicMapLayer({
            url: layerInfo.url,
            layers: layerInfo.layers || [],
            opacity: layerInfo.opacity || 1
          });

        } else if (layerInfo.type === "esri-feature") {
          // Esri Feature Layer (vector data)
          if (!L.esri) {
            console.error("Esri Leaflet plugin not loaded. Add <script src='https://unpkg.com/esri-leaflet'></script> before this script.");
            return;
          }

          layerInfo.layer = L.esri.featureLayer({
            url: layerInfo.url,
            pointToLayer: (geojson, latlng) =>
              L.circleMarker(latlng, {
                radius: 5,
                fillColor: "#0077be",
                color: "#004466",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
              }),
            onEachFeature: (feature, layer) => {
              let popup = "";
              const props = feature.properties || {};
              for (const key in props) {
                popup += `<b>${key}</b>: ${props[key]}<br>`;
              }
              layer.bindPopup(popup);
            }
          });
        }
      }

      // Add to map if created
      if (layerInfo.layer) mapa.addLayer(layerInfo.layer);

    } else {
      // Remove layer if toggled off
      if (layerInfo.layer) mapa.removeLayer(layerInfo.layer);
    }
  });

  label.appendChild(checkbox);
  label.append(" " + name);
  layerListdyn.appendChild(label);
});











































