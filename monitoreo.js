//Definición de Capas

	//Capas Base
var capaOSM = new L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png'),
	capaGoogleHibrida = new L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'),
	capaGoogleSat = new L.tileLayer(' http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}');
	ESRISat = new L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}')
	Carto = new L.tileLayer('http://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png');

	//Capas de Información
		//Capas UNAM
			//Dependencias
//---------------------------------------
var iconDep = L.icon({
	iconUrl: 'cs/images/marker-icon-2.png'
});
var cluster_UNAM = L.markerClusterGroup({
});
var Dunam = new L.geoJson();

$.getJSON("gj/PUNAMV5F1.geojson", function (data) {
	console.log(data);
    // Def geojson 
  	var z3Layer = new L.geoJson(data, {
		
    onEachFeature: function(feature, layer) {
		
		layer.bindPopup("Has hecho click en: " + feature.properties.nombre +"<br/>Dependencia: "+ feature.properties.dependenci);
    },
	pointToLayer: function(feature, latlng) {
		var marker = L.marker(latlng, {
			icon: iconDep,

			
		});
		return marker;
	}

  	}).addTo(cluster_UNAM,);

});
//optIN de GEOMAN
L.PM.setOptIn(true);
//-----------------------------------------------------------
$.getJSON("gj/PUNAMV5F1.geojson", function (data) {
    // Def geojson 
  	var z2Layer = new L.geoJson(data, {
		
    onEachFeature: function(feature, layer) {
    	layer.bindPopup("Has hecho click en: " + feature.properties.nombre +"<br/>Dependencia: "+ feature.properties.dependenci);
    },
	pointToLayer: function(feature, latlng) {
		var marker = L.marker(latlng, {
			icon: iconDep,

			
		});
		return marker;
	}

  	}).addTo(Dunam);

});
Dunam.name="Dependencias des-agrupadas"
cluster_UNAM.options.iconUrl="cs/images/marker-icon-2.png";
Dunam.options.iconUrl="cs/images/marker-icon-2.png";
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var UltimosSismos = new L.geoJson();
$.getJSON("gj/sism2.geojson",function(data) {
	var usis = new L.geoJson(data, {
		pointToLayer: function(feature, latlng) {
			
			var circleMarker = L.circleMarker (latlng, {
                radius: 10, // Adjust the size of the points as needed
                fillOpacity: 1,
			});
				
			var titl = feature.properties.title;
			var valu = titl.substring(0,3);
			var rt = titl.substring(4,150)
			circleMarker.bindPopup("Magnitud: " + valu + "<br/>Ubicación:" + rt + feature.properties.description );
				  

			return circleMarker;
        },
        style: function(feature, layer) {
			var titl = feature.properties.title;
			var valueus = titl.substring(0,3);
			//prueba
			if(feature === data.features[0]){
				return{
					fillColor: gColor(valueus),
                    color: 'black',
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 0.8
				};
			}else {
            // 
            	return {
                fillColor: gColor(valueus),
                color: gColor(valueus),
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
				}
            };
        }
		
	}).addTo(UltimosSismos);
	//console.log(data.features[0].properties);
});
UltimosSismos.name="Últimos Sismos Detectados (SSN)";
UltimosSismos.options.iconUrl="imagenes/InfoUn/IUsis.png";


function gColor(valueus) {
    var numericValue = parseFloat(valueus);

    if (numericValue >= 0 && numericValue <= 3) {
        return '#3F9C2A'; // 
    } else if (numericValue > 3 && numericValue <= 5) {
        return '#13E513'; //
    } else if (numericValue > 5 && numericValue <= 6) {
        return '#FFF000'; //  
    } else if (numericValue > 6 && numericValue <= 7){
        return '#FF9E00'; //
    } else if (numericValue > 7) {
		return '#FF1F00'
	}
}

//Monitoreo
//CT
//---------------------senderos
var senderos_unam = new L.geoJson();

$.getJSON("gj/Senderos.geojson", function (data) {
    // Def geojson 
	
  	var send = new L.geoJson(data, {
  	  	onEachFeature: function(feature, layer) {
      		layer.bindPopup("Has hecho click en: " + feature.properties.Name);
    	},
	
	style: function(feature, layer) {
		var colsend = feature.properties.Name;
		return {
		fillColor: sColor(colsend),
		color: sColor(colsend),
		weight: 4,
		opacity: 1,
		fillOpacity: 1
		};
	},
	


  	}).addTo(senderos_unam);
});
senderos_unam.options.iconUrl = "imagenes/leyenda/senderos1.png";
//---------------------
var zonas_unam = new L.geoJson();
var colorhash = {
	'Zona 1': '#0CBBEA',
	'Zona 2': '#22F041',
	'Zona 3': '#FFC4DD',
	'Zona 4': '#1F5AA7',
	'Zona 5': '#079F1C',
	'Zona 6': '#D7E25B',
	'Zona 7': '#F042FF',
	'Zona 8': '#FF3333',
	'Zona 9': '#9FE2BF'
};

$.getJSON("gj/ZonasCU.geojson", function (data) {
    // Def geojson 
	
  	var send = new L.geoJson(data, {
  	  	onEachFeature: function(feature, layer) {
			var zon = feature.properties.ZONA;
			var col = colorhash[zon];

			layer.setStyle({
				fillColor: col,
				weight: 2,
				opacity: 1,
				color: 'black',
				fillOpacity: .3,

			});
      		layer.bindPopup("Has hecho click en: " + feature.properties.ZONA);
    	},
  	}).addTo(zonas_unam);
});
zonas_unam.options.iconUrl="imagenes/InfoUn/IUzon.png";
zonas_unam.name="Zonas de CU";
//-------------------------
var rep = new L.geoJson();
var repshash = {
	'Amortiguamiento': '#DA0202',
	'Núcleo': '#A569BD',
	'':'#DA0202',
};

$.getJSON("gj/repsa.geojson", function (data) {
    // Def geojson 
	
  	var repsa = new L.geoJson(data, {
  	  	onEachFeature: function(feature, layer) {
			var rep = feature.properties.Zona;
			var colr = repshash[rep];

			layer.setStyle({
				fillColor: colr,
				weight: 2,
				opacity: 1,
				color: colr,
				fillOpacity: .3,
			});
      		layer.bindPopup("Has hecho click en: " + feature.properties.Zona +"  "+ feature.properties.Código);
    	},
  	}).addTo(rep);
});
rep.options.iconUrl="imagenes/InfoUn/IUrep.png";
rep.name="REPSA";
//-------------------------
function sColor(colsend) {
	var sc = colsend
	if (sc === "Sendero 1") {
		return '#F0C329';
	} else if (sc === "Sendero 2 ") {
		return '#099000';
	} else if (sc === "Sendero 3 ") {
		return '#00B6AD';
	} else if (sc === "Sendero 4 ") {
		return '#10438E';
	} else if (sc === "Sendero 5 ") {
		return '#4F108E';
	} else if (sc === "Sendero 6 ") {
		return '#C90000';
	} else if (sc === "Sendero 7 ") {
		return '#FFCE8B';
	} else if (sc === "Sendero 8 ") {
		return '#88E403';
	} else if (sc === "Sendero 9 ") {
		return '#5ACE9B';
	} else if (sc === "Sendero 10 ") {
		return '#319FB9';
	} else if (sc === "Sendero 11 ") {
		return '#ABD5FF';
	} else if (sc === "Sendero 12 ") {
		return '#C1ABFF';
	} else if (sc === "Sendero 13 ") {
		return '#F4D03F';
	} else if (sc === "Sendero 14 ") {
		return '#58D68D';
	} else if (sc === "Trayecto Paseo de las Facultades - Metro Copilco / Av. Copilco") {
		return '#E74C3C';
	} else if (sc === "Trayecto Av. del Iman - Insurgentes") {
		return '#145A32';
	} else if (sc === "Trayecto Insurgentes - entrada por Edif. Posgrado") {
		return '#F4D03F';
	} else if (sc === "Trayecto Cerro del Agua- Filosofía y Letras") {
		return '#D7BDE2';
	} else if (sc === "Trayecto Circuito Exterior- Dr. Galvéz") {
		return '#3498DB';
	}
}
senderos_unam.name="Senderos universitarios"
//-----------------------fin senderos
//--------------------------pumabus
var ParadaPBr1 = new L.geoJson();
$.getJSON("gj/ParadasR1.geojson", function (data) {
    // Def geojson 
  var pbr1 = new L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
		var circleMarker = L.circleMarker (latlng, {
			fillColor: '#067438',
			weight: 2,
			radius: 4, 
			fillOpacity: 1,
			color: 'black'
		});
		return circleMarker;
	}

  }).addTo(ParadaPBr1);
});
ParadaPBr1.name="Paradas PumaBus Ruta 1";
ParadaPBr1.options.iconUrl="imagenes/InfoUn/PPBR1.png";

var PBR1 = new L.geoJson();
$.getJSON("gj/PBr1.geojson",  function (data) {
    // Def geojson 
  var rut1 = new L.geoJson(data, {
	color: '#067438',
 	}).addTo(PBR1);
});
PBR1.name="PumaBus Ruta 1";
PBR1.options.iconUrl="imagenes/InfoUn/PBR1.png";

var ParadaPBr2 = new L.geoJson();
$.getJSON("gj/ParadasR2.geojson", function (data) {
    // Def geojson 
  var pbr2 = new L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
		var circleMarker = L.circleMarker (latlng, {
			fillColor: '#ECEF25',
			weight: 2,
			radius: 4, 
			fillOpacity: 1,
			color: 'black'
		});
		return circleMarker;
	}

  }).addTo(ParadaPBr2);
});
ParadaPBr2.name="Paradas PumaBus Ruta 2";
ParadaPBr2.options.iconUrl="imagenes/InfoUn/PPBR2.png";

var PBR2 = new L.geoJson();
$.getJSON("gj/PBr2.geojson",  function (data) {
    // Def geojson 
  var rut1 = new L.geoJson(data, {
	color: '#ECEF25',
 	}).addTo(PBR2);
});
PBR2.name="PumaBus Ruta 2";
PBR2.options.iconUrl="imagenes/InfoUn/PBR2.png";

var ParadaPBr3 = new L.geoJson();
$.getJSON("gj/ParadasR3.geojson", function (data) {
    // Def geojson 
  var pbr3 = new L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
		var circleMarker = L.circleMarker (latlng, {
			fillColor: '#00B924',
			weight: 2,
			radius: 4, 
			fillOpacity: 1,
			color: 'black'
		});
		return circleMarker;
	}

  }).addTo(ParadaPBr3);
});
ParadaPBr3.name="Paradas PumaBus Ruta 3";
ParadaPBr3.options.iconUrl="imagenes/InfoUn/PPBR3.png";

var PBR3 = new L.geoJson();
$.getJSON("gj/PBr3.geojson",  function (data) {
    // Def geojson 
  var rut1 = new L.geoJson(data, {
	color: '#00B924',
 	}).addTo(PBR3);
});
PBR3.name="PumaBus Ruta 3";
PBR3.options.iconUrl="imagenes/InfoUn/PBR3.png";

var ParadaPBr4 = new L.geoJson();
$.getJSON("gj/ParadasR4.geojson", function (data) {
    // Def geojson 
  var pbr4 = new L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
		var circleMarker = L.circleMarker (latlng, {
			fillColor: '#765000',
			weight: 2,
			radius: 4, 
			fillOpacity: 1,
			color: 'black'
		});
		return circleMarker;
	}

  }).addTo(ParadaPBr4);
});
ParadaPBr4.name="Paradas PumaBus Ruta 4";
ParadaPBr4.options.iconUrl="imagenes/InfoUn/PPBR4.png";

var PBR4 = new L.geoJson();
$.getJSON("gj/PBr4.geojson",  function (data) {
    // Def geojson 
  var rut1 = new L.geoJson(data, {
	color: '#765000',
 	}).addTo(PBR4);
});
PBR4.name="PumaBus Ruta 4";
PBR4.options.iconUrl="imagenes/InfoUn/PBR4.png";
var ParadaPBr5 = new L.geoJson();
$.getJSON("gj/ParadasR5.geojson", function (data) {
    // Def geojson 
  var pbr5 = new L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
		var circleMarker = L.circleMarker (latlng, {
			fillColor: '#00E1DB',
			weight: 2,
			radius: 4, 
			fillOpacity: 1,
			color: 'black'
		});
		return circleMarker;
	}

  }).addTo(ParadaPBr5);
});
ParadaPBr5.name="Paradas PumaBus Ruta 5";
ParadaPBr5.options.iconUrl="imagenes/InfoUn/PPBR5.png";

var PBR5 = new L.geoJson();
$.getJSON("gj/PBr5.geojson",  function (data) {
    // Def geojson 
  var rut1 = new L.geoJson(data, {
	color: '#00E1DB',
 	}).addTo(PBR5);
});
PBR5.name="PumaBus Ruta 5";
PBR5.options.iconUrl="imagenes/InfoUn/PBR5.png";

var ParadaPBr6 = new L.geoJson();
$.getJSON("gj/ParadasR6.geojson", function (data) {
    // Def geojson 
  var pbr5 = new L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
		var circleMarker = L.circleMarker (latlng, {
			fillColor: '#D32506',
			weight: 2,
			radius: 4, 
			fillOpacity: 1,
			color: 'black'
		});
		return circleMarker;
	}

  }).addTo(ParadaPBr6);
});
ParadaPBr6.name="Paradas PumaBus Ruta 6";
ParadaPBr6.options.iconUrl="imagenes/InfoUn/PPBR6.png";

var PBR6 = new L.geoJson();
$.getJSON("gj/PBr6.geojson",  function (data) {
    // Def geojson 
  var rut1 = new L.geoJson(data, {
	color: '#D32506',
 	}).addTo(PBR6);
});
PBR6.name="PumaBus Ruta 6";
PBR6.options.iconUrl="imagenes/InfoUn/PBR6.png";


var ParadaPBr7 = new L.geoJson();
$.getJSON("gj/ParadasR7.geojson", function (data) {
    // Def geojson 
  var pbr5 = new L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
		var circleMarker = L.circleMarker (latlng, {
			fillColor: '#DC7633',
			weight: 2,
			radius: 4, 
			fillOpacity: 1,
			color: 'black'
		});
		return circleMarker;
	}

  }).addTo(ParadaPBr7);
});
ParadaPBr7.name="Paradas PumaBus Ruta 7";
ParadaPBr7.options.iconUrl="imagenes/InfoUn/PPBR7.png";

var PBR7 = new L.geoJson();
$.getJSON("gj/PBr7.geojson",  function (data) {
    // Def geojson 
  var rut1 = new L.geoJson(data, {
	color: '#DC7633',
 	}).addTo(PBR7);
});
PBR7.name="PumaBus Ruta 7";
PBR7.options.iconUrl="imagenes/InfoUn/PBR7.png";

var ParadaPBr8 = new L.geoJson();
$.getJSON("gj/ParadasR8.geojson", function (data) {
    // Def geojson 
  var pbr5 = new L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
		var circleMarker = L.circleMarker (latlng, {
			fillColor: '#1F618D',
			weight: 2,
			radius: 4, 
			fillOpacity: 1,
			color: 'black'
		});
		return circleMarker;
	}

  }).addTo(ParadaPBr8);
});
ParadaPBr8.name="Paradas PumaBus Ruta 8";
ParadaPBr8.options.iconUrl="imagenes/InfoUn/PPBR8.png";

var PBR8 = new L.geoJson();
$.getJSON("gj/PBr8.geojson",  function (data) {
    // Def geojson 
  var rut1 = new L.geoJson(data, {
	color: '#1F618D',
 	}).addTo(PBR8);
});
PBR8.name="PumaBus Ruta 8";
PBR8.options.iconUrl="imagenes/InfoUn/PBR8.png";

var ParadaPBr9 = new L.geoJson();
$.getJSON("gj/ParadasR9.geojson", function (data) {
    // Def geojson 
  var pbr5 = new L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
		var circleMarker = L.circleMarker (latlng, {
			fillColor: '#D754AE',
			weight: 2,
			radius: 4, 
			fillOpacity: 1,
			color: 'black'
		});
		return circleMarker;
	}

  }).addTo(ParadaPBr9);
});
ParadaPBr9.name="Paradas PumaBus Ruta 9";
ParadaPBr9.options.iconUrl="imagenes/InfoUn/PPBR9.png";

var PBR9 = new L.geoJson();
$.getJSON("gj/PBr9.geojson",  function (data) {
    // Def geojson 
  var rut1 = new L.geoJson(data, {
	color: '#D754AE',
 	}).addTo(PBR9);
});
PBR9.name="PumaBus Ruta 9";
PBR9.options.iconUrl="imagenes/InfoUn/PBR9.png";

var ParadaPBr10 = new L.geoJson();
$.getJSON("gj/ParadasR10.geojson", function (data) {
    // Def geojson 
  var pbr5 = new L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
		var circleMarker = L.circleMarker (latlng, {
			fillColor: '#212F3D',
			weight: 2,
			radius: 4, 
			fillOpacity: 1,
			color: 'black'
		});
		return circleMarker;
	}

  }).addTo(ParadaPBr10);
});
ParadaPBr10.name="Paradas PumaBus Ruta 10";
ParadaPBr10.options.iconUrl="imagenes/InfoUn/PPBR10.png";

var PBR10 = new L.geoJson();
$.getJSON("gj/PBr10.geojson",  function (data) {
    // Def geojson 
  var rut1 = new L.geoJson(data, {
	color: '#212F3D',
 	}).addTo(PBR10);
});
PBR10.name="PumaBus Ruta 10";
PBR10.options.iconUrl="imagenes/InfoUn/PBR10.png";

var ParadaPBr11 = new L.geoJson();
$.getJSON("gj/ParadasR11.geojson", function (data) {
    // Def geojson 
  var pbr5 = new L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
		var circleMarker = L.circleMarker (latlng, {
			fillColor: '#4A235A',
			weight: 2,
			radius: 4, 
			fillOpacity: 1,
			color: 'black'
		});
		return circleMarker;
	}

  }).addTo(ParadaPBr11);
});
ParadaPBr11.name="Paradas PumaBus Ruta 11";
ParadaPBr11.options.iconUrl="imagenes/InfoUn/PPBR11.png";

var PBR11 = new L.geoJson();
$.getJSON("gj/PBr11.geojson",  function (data) {
    // Def geojson 
  var rut1 = new L.geoJson(data, {
	color: '#4A235A',
 	}).addTo(PBR11);
});
PBR11.name="PumaBus Ruta 11";
PBR11.options.iconUrl="imagenes/InfoUn/PBR11.png";

var ParadaPBr12 = new L.geoJson();
$.getJSON("gj/ParadasR12.geojson", function (data) {
    // Def geojson 
  var pbr5 = new L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
		var circleMarker = L.circleMarker (latlng, {
			fillColor: '#D7BDE2',
			weight: 2,
			radius: 4, 
			fillOpacity: 1,
			color: 'black'
		});
		return circleMarker;
	}

  }).addTo(ParadaPBr12);
});
ParadaPBr12.name="Paradas PumaBus Ruta 12";
ParadaPBr12.options.iconUrl="imagenes/InfoUn/PPBR12.png";

var PBR12 = new L.geoJson();
$.getJSON("gj/PBr12.geojson",  function (data) {
    // Def geojson 
  var rut1 = new L.geoJson(data, {
	color: '#D7BDE2',
 	}).addTo(PBR12);
});
PBR12.name="PumaBus Ruta 12";
PBR12.options.iconUrl="imagenes/InfoUn/PBR12.png";

var ParadaPBr13 = new L.geoJson();
$.getJSON("gj/ParadasR13.geojson", function (data) {
    // Def geojson 
  var pbr5 = new L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
		var circleMarker = L.circleMarker (latlng, {
			fillColor: '#49D75E',
			weight: 2,
			radius: 4, 
			fillOpacity: 1,
			color: 'black'
		});
		return circleMarker;
	}

  }).addTo(ParadaPBr13);
});
ParadaPBr13.name="Paradas PumaBus Ruta 13";
ParadaPBr13.options.iconUrl="imagenes/InfoUn/PPBR13.png";

var PBR13 = new L.geoJson();
$.getJSON("gj/PBr13.geojson",  function (data) {
    // Def geojson 
  var rut1 = new L.geoJson(data, {
	color: '#49D75E',
 	}).addTo(PBR13);
});
PBR13.name="PumaBus Ruta 13";
PBR13.options.iconUrl="imagenes/InfoUn/PBR13.png";
//_________________________________PrediosSedes
var PrediosUNAM = new L.geoJson();
$.getJSON("gj/PrediosUNAM.geojson",  function (data) {
    // Def geojson 
  var rut1 = new L.geoJson(data, {
	color: '#1F618D',
 	}).addTo(PrediosUNAM);
});
PrediosUNAM.name="Predios de la UNAM";
PrediosUNAM.options.iconUrl="imagenes/InfoUn/Pred2.png";
//----------------------------------------------------------------------
var BotonsSOS = new L.geoJson();
$.getJSON("gj/BotonesSOS.geojson", function (data) {
	
	var sos = new L.geoJson(data , {	
		
		pointToLayer: function(feature, latlng) {
			var circleMarker = L.circleMarker (latlng, {
				fillColor: '#e15300',
				weight: 1.5,
				radius: 3, 
				fillOpacity: 1,
				color: 'black',
				
			});
			return circleMarker;
		},
		
	}).addTo(BotonsSOS);
});
BotonsSOS.name = "Botones de emergencias";
BotonsSOS.options.iconUrl = "imagenes/InfoUn/SOS.png";

var bicip = new L.geoJson();
$.getJSON("gj/rutaBicip.geojson", function (data) {
	var bic = new L.geoJson(data , {
		color: '#005802',
	}).addTo(bicip);
});
bicip.name="Rutas BiciPuma";
bicip.options.iconUrl="imagenes/infoUn/RBici.png";

var bicicen = new L.geoJson();
$.getJSON("gj/BiciCentro.geojson", function (data) {

    var customIcon = L.icon({
        iconUrl: 'imagenes/InfoUn/Bcent.png'
    });

    var Bpc = new L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            var marker = L.marker(latlng, {
                icon: customIcon,
				
            });
            return marker;
        }
    }).addTo(bicicen);
});
bicicen.name = "Bicicentros Bicipuma ";
bicicen.options.iconUrl="imagenes/InfoUn/Bcent.png";

var CUinund = new L.geoJson();
$.getJSON("gj/CUinund.geojson", function (data) {

   
    var Bpc = new L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            var circleMarker = L.circleMarker(latlng, {
                color: '#30B7DB',
				fillColor: '#30B7DB',
				
            });
            return circleMarker;
        }
    }).addTo(CUinund);
});
CUinund.name="Zonas propensas a inundarse dentro de CU";
CUinund.options.iconUrl="imagenes/InfoUn/Zinun.png";

var FMIXC = new L.geoJson();
$.getJSON("gj/Fmixcoac.geojson",  function (data) {
    // Def geojson 
  var rut1 = new L.geoJson(data, {
	color: '#DF0000',
	dashArray: '5',
 	}).addTo(FMIXC);
});
FMIXC.name="Falla geológica Mixcoac" + "</br> (Instituto de Ingeniería)";
FMIXC.options.iconUrl="";



//---------------------------------------------------------------------------------------------------------------------------------
//var Denue1km = new L.geoJson();
//$.getJSON("gj/DENUE1KM.geojson", function (data) {
//	
//	var den = new L.geoJson(data, {
//		onEachFeature: function(feature, layer) {
//			layer.bindPopup("<ul><li>Actividad: " + feature.properties.nombre_act+"</li><li>Nombre Establecimiento: "+ feature.properties.nom_estab+"</li><li>Entidad: "+ feature.properties.entidad+"</li></ul>");
//		},
//		
//		pointToLayer: function(feature, latlng) {
//			var dcol = feature.properties.codigo_act;
//			var customIcon = L.icon({
//				iconUrl: Dcolor(dcol),
//			});
//			var marker = L.marker(latlng, {
//				icon: customIcon
//		});
//		return marker;
//		}
//	}).addTo(Denue1km);
//});
//Denue1km.name="Registros del DENUE a 1KM de distancia";

//function Dcolor(dcol) {
//	if (dcol.startsWith("21")) {
//		return 'cs/images/IARUNAM1.PNG';
//	} else if (dcol.startsWith("22")) {
//		return 'cs/images/IARUNAM2.PNG';
//	} else if (dcol.startsWith("324")) {
//		return 'cs/images/IARUNAM3.PNG';
//	} else if (dcol.startsWith("325")) {
//		return 'cs/images/IARUNAM4.PNG';
//	} else if (dcol.startsWith("326")) {
//		return 'cs/images/IARUNAM5.PNG';
//	} else if (dcol.startsWith("562")) {
//		return 'cs/images/IARUNAM6.PNG';
//	} else if (dcol.startsWith("62")) {
//		return 'cs/images/IARUNAM7.PNG';
//	} else if (dcol.startsWith("71")) {
//		return 'cs/images/IARUNAM8.PNG';
//	}
//}
//----------------------------------------------Denue 1 km ---------------------------------------------------------------------
var Denue1km21 = new L.geoJson();
$.getJSON("gj/BUFF1KMDENUE21COMPLETO.geojson", function (data) {
	var customIcon = L.icon({
		iconUrl: 'cs/images/IARUNAM1.png'
	});
	var Bpc = new L.geoJson(data, {
		pointToLayer: function(feature, latlng) {
			var marker = L.marker(latlng, {
				icon: customIcon,
					
			});
			return marker;
		},
		onEachFeature: function(feature, layer) {
			layer.bindPopup("<ul><li>Actividad: " + feature.properties.nombre_act+"</li><li>Nombre Establecimiento: "+ feature.properties.nom_estab+"</li><li>Entidad: "+ feature.properties.entidad+"</li></ul>");
		}
	}).addTo(Denue1km21);
});
Denue1km21.name="Minería (21) a 1 km";
Denue1km21.options.iconUrl="cs/images/IARUNAM1.png";

var Denue1km22 = new L.geoJson();
$.getJSON("gj/BUFF1KMDENUE22COMPLETO.geojson", function (data) {
	var customIcon = L.icon({
		iconUrl: 'cs/images/IARUNAM2.png'
	});
	var Bpc = new L.geoJson(data, {
		pointToLayer: function(feature, latlng) {
			var marker = L.marker(latlng, {
				icon: customIcon,
					
			});
			return marker;
		},
		onEachFeature: function(feature, layer) {
			layer.bindPopup("<ul><li>Actividad: " + feature.properties.nombre_act+"</li><li>Nombre Establecimiento: "+ feature.properties.nom_estab+"</li><li>Entidad: "+ feature.properties.entidad+"</li></ul>");
		}
	}).addTo(Denue1km22);
});
Denue1km22.name="Generación, transmisión y distribución de energía eléctrica, suministro de agua y de gas por ductos al consumidor final (22) a 1 km";
Denue1km22.options.iconUrl="cs/images/IARUNAM2.png";

var Denue1km324 = new L.geoJson();
$.getJSON("gj/BUFF1KMDENUE324COMPLETO.geojson", function (data) {
	var customIcon = L.icon({
		iconUrl: 'cs/images/IARUNAM3.png'
	});
	var Bpc = new L.geoJson(data, {
		pointToLayer: function(feature, latlng) {
			var marker = L.marker(latlng, {
				icon: customIcon,
					
			});
			return marker;
		},
		onEachFeature: function(feature, layer) {
			layer.bindPopup("<ul><li>Actividad: " + feature.properties.nombre_act+"</li><li>Nombre Establecimiento: "+ feature.properties.nom_estab+"</li><li>Entidad: "+ feature.properties.entidad+"</li></ul>");
		}
	}).addTo(Denue1km324);
});
Denue1km324.name="Fabricación de productos derivados del petróleo y del carbón (324) a 1 km";
Denue1km324.options.iconUrl="cs/images/IARUNAM3.png";

var Denue1km325 = new L.geoJson();
$.getJSON("gj/BUFF1KMDENUE325COMPLETO.geojson", function (data) {
	var customIcon = L.icon({
		iconUrl: 'cs/images/IARUNAM4.png'
	});
	var Bpc = new L.geoJson(data, {
		pointToLayer: function(feature, latlng) {
			var marker = L.marker(latlng, {
				icon: customIcon,
					
			});
			return marker;
		},
		onEachFeature: function(feature, layer) {
			layer.bindPopup("<ul><li>Actividad: " + feature.properties.nombre_act+"</li><li>Nombre Establecimiento: "+ feature.properties.nom_estab+"</li><li>Entidad: "+ feature.properties.entidad+"</li></ul>");
		}
	}).addTo(Denue1km325);
});
Denue1km325.name="Industria Química(325) a 1 km";
Denue1km325.options.iconUrl="cs/images/IARUNAM4.png";

var Denue1km326 = new L.geoJson();
$.getJSON("gj/BUFF1KMDENUE326COMPLETO.geojson", function (data) {
	var customIcon = L.icon({
		iconUrl: 'cs/images/IARUNAM5.png'
	});
	var Bpc = new L.geoJson(data, {
		pointToLayer: function(feature, latlng) {
			var marker = L.marker(latlng, {
				icon: customIcon,
					
			});
			return marker;
		},
		onEachFeature: function(feature, layer) {
			layer.bindPopup("<ul><li>Actividad: " + feature.properties.nombre_act+"</li><li>Nombre Establecimiento: "+ feature.properties.nom_estab+"</li><li>Entidad: "+ feature.properties.entidad+"</li></ul>");
		}
	}).addTo(Denue1km326);
});
Denue1km326.name="Industria del plástico y del hule (326) a 1 km";
Denue1km326.options.iconUrl="cs/images/IARUNAM5.png";

var Denue1km562 = new L.geoJson();
$.getJSON("gj/BUFF1KMDENUE562COMPLETO.geojson", function (data) {
	var customIcon = L.icon({
		iconUrl: 'cs/images/IARUNAM6.png'
	});
	var Bpc = new L.geoJson(data, {
		pointToLayer: function(feature, latlng) {
			var marker = L.marker(latlng, {
				icon: customIcon,
					
			});
			return marker;
		},
		onEachFeature: function(feature, layer) {
			layer.bindPopup("<ul><li>Actividad: " + feature.properties.nombre_act+"</li><li>Nombre Establecimiento: "+ feature.properties.nom_estab+"</li><li>Entidad: "+ feature.properties.entidad+"</li></ul>");
		}
	}).addTo(Denue1km562);
});
Denue1km562.name="Manejo de desechos y servicios de remediación  (562) a 1 km";
Denue1km562.options.iconUrl="cs/images/IARUNAM6.png";

var Denue1km62 = new L.geoJson();
$.getJSON("gj/BUFF1KMDENUE62COMPLETO.geojson", function (data) {
	var customIcon = L.icon({
		iconUrl: 'cs/images/IARUNAM7.png'
	});
	var Bpc = new L.geoJson(data, {
		pointToLayer: function(feature, latlng) {
			var marker = L.marker(latlng, {
				icon: customIcon,
					
			});
			return marker;
		},
		onEachFeature: function(feature, layer) {
			layer.bindPopup("<ul><li>Actividad: " + feature.properties.nombre_act+"</li><li>Nombre Establecimiento: "+ feature.properties.nom_estab+"</li><li>Entidad: "+ feature.properties.entidad+"</li></ul>");
		}
	}).addTo(Denue1km62);
});
Denue1km62.name="Servicios de salud y de asistencia social (62) a 1 km";
Denue1km62.options.iconUrl="cs/images/IARUNAM7.png";

var Denue1km71 = new L.geoJson();
$.getJSON("gj/BUFF1KMDENUE71COMPLETO.geojson", function (data) {
	var customIcon = L.icon({
		iconUrl: 'cs/images/IARUNAM8.png'
	});
	var Bpc = new L.geoJson(data, {
		pointToLayer: function(feature, latlng) {
			var marker = L.marker(latlng, {
				icon: customIcon,	
			});
			return marker;
		},
		onEachFeature: function(feature, layer) {
			layer.bindPopup("<ul><li>Actividad: " + feature.properties.nombre_act+"</li><li>Nombre Establecimiento: "+ feature.properties.nom_estab+"</li><li>Entidad: "+ feature.properties.entidad+"</li></ul>");
		}
	}).addTo(Denue1km71);
});
Denue1km71.name="Servicios de esparcimiento culturales y deportivos, y otros servicios recreativos  (71) a 1 km";
Denue1km71.options.iconUrl="cs/images/IARUNAM8.png";
//-----------------------------------------------------------fin DENUE 1KM --------------------------------------------------------
//-----------------------------------------------------------DENUE 500m------------------------------------------------------------
var Denue5m21 = new L.geoJson();
$.getJSON("gj/BUFF500mDENUE21COMPLETO.geojson", function (data) {
	var customIcon = L.icon({
		iconUrl: 'cs/images/IARUNAM1.png'
	});
	var Bpc = new L.geoJson(data, {
		pointToLayer: function(feature, latlng) {
			var marker = L.marker(latlng, {
				icon: customIcon,
					
			});
			return marker;
		},
		onEachFeature: function(feature, layer) {
			layer.bindPopup("<ul><li>Actividad: " + feature.properties.nombre_act+"</li><li>Nombre Establecimiento: "+ feature.properties.nom_estab+"</li><li>Entidad: "+ feature.properties.entidad+"</li></ul>");
		}
	}).addTo(Denue5m21);
});
Denue5m21.name="Minería (21) a 500m";
Denue5m21.options.iconUrl="cs/images/IARUNAM1.png";

var Denue5m22 = new L.geoJson();
$.getJSON("gj/BUFF500mDENUE22COMPLETO.geojson", function (data) {
	var customIcon = L.icon({
		iconUrl: 'cs/images/IARUNAM2.png'
	});
	var Bpc = new L.geoJson(data, {
		pointToLayer: function(feature, latlng) {
			var marker = L.marker(latlng, {
				icon: customIcon,
					
			});
			return marker;
		},
		onEachFeature: function(feature, layer) {
			layer.bindPopup("<ul><li>Actividad: " + feature.properties.nombre_act+"</li><li>Nombre Establecimiento: "+ feature.properties.nom_estab+"</li><li>Entidad: "+ feature.properties.entidad+"</li></ul>");
		}
	}).addTo(Denue5m22);
});
Denue5m22.name="Generación, transmisión y distribución de energía eléctrica, suministro de agua y de gas por ductos al consumidor final (22) a 500m";
Denue5m22.options.iconUrl="cs/images/IARUNAM2.png";

var Denue5m324 = new L.geoJson();
$.getJSON("gj/BUFF500mDENUE324COMPLETO.geojson", function (data) {
	var customIcon = L.icon({
		iconUrl: 'cs/images/IARUNAM3.png'
	});
	var Bpc = new L.geoJson(data, {
		pointToLayer: function(feature, latlng) {
			var marker = L.marker(latlng, {
				icon: customIcon,
					
			});
			return marker;
		},
		onEachFeature: function(feature, layer) {
			layer.bindPopup("<ul><li>Actividad: " + feature.properties.nombre_act+"</li><li>Nombre Establecimiento: "+ feature.properties.nom_estab+"</li><li>Entidad: "+ feature.properties.entidad+"</li></ul>");
		}
	}).addTo(Denue5m324);
});
Denue5m324.name="Fabricación de productos derivados del petróleo y del carbón (324) a 500m";
Denue5m324.options.iconUrl="cs/images/IARUNAM3.png";

var Denue5m325 = new L.geoJson();
$.getJSON("gj/BUFF500mDENUE325COMPLETO.geojson", function (data) {
	var customIcon = L.icon({
		iconUrl: 'cs/images/IARUNAM4.png'
	});
	var Bpc = new L.geoJson(data, {
		pointToLayer: function(feature, latlng) {
			var marker = L.marker(latlng, {
				icon: customIcon,
					
			});
			return marker;
		},
		onEachFeature: function(feature, layer) {
			layer.bindPopup("<ul><li>Actividad: " + feature.properties.nombre_act+"</li><li>Nombre Establecimiento: "+ feature.properties.nom_estab+"</li><li>Entidad: "+ feature.properties.entidad+"</li></ul>");
		}
	}).addTo(Denue5m325);
});
Denue5m325.name="Industria Química(325) a 500m";
Denue5m325.options.iconUrl="cs/images/IARUNAM4.png";

var Denue5m326 = new L.geoJson();
$.getJSON("gj/BUFF500mDENUE326COMPLETO.geojson", function (data) {
	var customIcon = L.icon({
		iconUrl: 'cs/images/IARUNAM5.png'
	});
	var Bpc = new L.geoJson(data, {
		pointToLayer: function(feature, latlng) {
			var marker = L.marker(latlng, {
				icon: customIcon,
					
			});
			return marker;
		},
		onEachFeature: function(feature, layer) {
			layer.bindPopup("<ul><li>Actividad: " + feature.properties.nombre_act+"</li><li>Nombre Establecimiento: "+ feature.properties.nom_estab+"</li><li>Entidad: "+ feature.properties.entidad+"</li></ul>");
		}
	}).addTo(Denue5m326);
});
Denue5m326.name="Industria del plástico y del hule (326) a 500m";
Denue5m326.options.iconUrl="cs/images/IARUNAM5.png";

var Denue5m562 = new L.geoJson();
$.getJSON("gj/BUFF500mDENUE562COMPLETO.geojson", function (data) {
	var customIcon = L.icon({
		iconUrl: 'cs/images/IARUNAM6.png'
	});
	var Bpc = new L.geoJson(data, {
		pointToLayer: function(feature, latlng) {
			var marker = L.marker(latlng, {
				icon: customIcon,
					
			});
			return marker;
		},
		onEachFeature: function(feature, layer) {
			layer.bindPopup("<ul><li>Actividad: " + feature.properties.nombre_act+"</li><li>Nombre Establecimiento: "+ feature.properties.nom_estab+"</li><li>Entidad: "+ feature.properties.entidad+"</li></ul>");
		}
	}).addTo(Denue5m562);
});
Denue5m562.name="Manejo de desechos y servicios de remediación  (562) a 500m";
Denue5m562.options.iconUrl="cs/images/IARUNAM6.png";

var Denue5m62 = new L.geoJson();
$.getJSON("gj/BUFF500mDENUE62COMPLETO.geojson", function (data) {
	var customIcon = L.icon({
		iconUrl: 'cs/images/IARUNAM7.png'
	});
	var Bpc = new L.geoJson(data, {
		pointToLayer: function(feature, latlng) {
			var marker = L.marker(latlng, {
				icon: customIcon,
					
			});
			return marker;
		},
		onEachFeature: function(feature, layer) {
			layer.bindPopup("<ul><li>Actividad: " + feature.properties.nombre_act+"</li><li>Nombre Establecimiento: "+ feature.properties.nom_estab+"</li><li>Entidad: "+ feature.properties.entidad+"</li></ul>");
		}
	}).addTo(Denue5m62);
});
Denue5m62.name="Servicios de salud y de asistencia social (62) a 500m";
Denue5m62.options.iconUrl="cs/images/IARUNAM7.png";

var Denue5m71 = new L.geoJson();
$.getJSON("gj/BUFF500mDENUE71COMPLETO.geojson", function (data) {
	var customIcon = L.icon({
		iconUrl: 'cs/images/IARUNAM8.png'
	});
	var Bpc = new L.geoJson(data, {
		pointToLayer: function(feature, latlng) {
			var marker = L.marker(latlng, {
				icon: customIcon,	
			});
			return marker;
		},
		onEachFeature: function(feature, layer) {
			layer.bindPopup("<ul><li>Actividad: " + feature.properties.nombre_act+"</li><li>Nombre Establecimiento: "+ feature.properties.nom_estab+"</li><li>Entidad: "+ feature.properties.entidad+"</li></ul>");
		}
	}).addTo(Denue5m71);
});
Denue5m71.name="Servicios de esparcimiento culturales y deportivos, y otros servicios recreativos  (71) a 500m";
Denue5m71.options.iconUrl="cs/images/IARUNAM8.png";
//-----------------------------------------------------------Fin DENUE 500m----------------------------------------------------------
var gas1km = new L.geoJson();
$.getJSON("gj/Gasolineras1Km.geojson", function (data) {

   
    var Bpc = new L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            var circleMarker = L.circleMarker(latlng, {
                color: '#007502',
				fillColor: '#007502',
				radius: 2.5,
            });
            return circleMarker;
        },
		onEachFeature: function(feature, layer) {
			layer.bindPopup("<ul><li>Gasolinera: " + feature.properties.name+"</li><li>Nombre Establecimiento: "+ feature.properties.nom_estab+"</li><li>Entidad: "+ feature.properties.entidad+"</li></ul>");
		}
    }).addTo(gas1km);
});
gas1km.name="Gasolineras a 1km de distancia (CRE)";
gas1km.options.iconUrl="";

var gas500m = new L.geoJson();
$.getJSON("gj/Gasolineras1Km.geojson", function (data) {

   
    var Bpc = new L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            var circleMarker = L.circleMarker(latlng, {
                color: '#05A507',
				fillColor: '#05A507',
				radius:2.5,
            });
            return circleMarker;
        }

    }).addTo(gas500m);
});
gas500m.name="Gasolineras a 500m de distancia (CRE)";
gas500m.options.iconUrl="";

var Gbomb = new L.geoJson();
$.getJSON("gj/GarzasBomber.geojson", function (data) {

   
    var Bpc = new L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            var circleMarker = L.circleMarker(latlng, {
                color: '#0f0f0f',
				fillColor: '#0070B8',
				fillOpacity: 1,
				radius: 2.5,
				
            });
            return circleMarker;
        },
		
    }).addTo(Gbomb);
});
Gbomb.name="Garzas para Bomberos";
Gbomb.options.iconUrl="";

//------------------------------------------------------------------------------------------------------------------------------------
var idpgis_noaa = L.esri.dynamicMapLayer({
	url:"http://servicios2.cenapred.unam.mx:6080/arcgis/rest/services/ServAuto/NoaaCT/MapServer",
	layers:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],
	opacity: 0.7,
	iconUrl: 'imagenes/leyenda/hurricane.png'
});
idpgis_noaa.name="Ciclones Tropicales-NOAA";

	//Capas de Fenómenos
var FG_Volcanes = L.esri.dynamicMapLayer ({
	url:'http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Fenomenos_Geologicos/MapServer/',
	layers: [2],
	
	iconUrl: 'imagenes/leyenda/fg_volcanes.png',
});

//-----------------------------------------capas CENAPRED--fenom Geologicos-----------
var VolPopo = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Fenomenos_Geologicos/MapServer/",
	layers: [255],
	opacity: .8,
	iconUrl:'http://132.247.123.200/AR4/arunam/imagenes/leyenda/rutasEvPop.png',
});
VolPopo.name = "Rutas de Evacuación Volcán Popocatépetl-CENAPRED";



var VPopo_IGCENAPRED_AV = L.esri.dynamicMapLayer({
	url: "http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Fenomenos_Geologicos/MapServer/",
	layers: [334],
	opacity: .5,
	iconUrl:'imagenes/leyenda/PopAvl.png'
});
VPopo_IGCENAPRED_AV.name ="Mapa De Peligros Volcán Popocatépetl ; Avalanchas";
var VPopo_IGCENAPRED_BAL = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Fenomenos_Geologicos/MapServer/",
	layers: [336,337,338],
	opacity: .5,
	iconUrl:'imagenes/leyenda/PopBal.png'
});
VPopo_IGCENAPRED_BAL.name="Mapa De Peligros Volcán Popocatépetl; Balísticos";
var VPopo_IGCENAPRED_CEN = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Fenomenos_Geologicos/MapServer/",
	layers: [339,340,341,342,343,344,345,346,347,348,349,350,351,352,353],
	opacity: .5,
	iconUrl:'imagenes/leyenda/PopCen.png'
});
VPopo_IGCENAPRED_CEN.name="Mapa De Peligros Volcán Popocatépetl; Cenizas";
var VPopo_IGCENAPRED_FPOP = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Fenomenos_Geologicos/MapServer/",
	layers:[354,355,356,357,358,359,360],
	opacity: .5,
	iconUrl:'imagenes/leyenda/PopFl.png'
});
VPopo_IGCENAPRED_FPOP.name="Mapa De Peligros Volcán Popocatépetl; Flujos Piroclásticos y Oleadas Piroclásticoas";
var VPopo_IGCENAPRED_LH = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Fenomenos_Geologicos/MapServer/",
	layers:[362,363,364],
	opacity: .5,
	iconUrl:'imagenes/leyenda/PopLah.png'
});
VPopo_IGCENAPRED_LH.name="Mapa De Peligros Volcán Popocatépetl; Lahares";
var VPopo_IGCENAPRED_LAV = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Fenomenos_Geologicos/MapServer/",
	layers:[366,367,368],
	opacity: .5,
	iconUrl:'imagenes/leyenda/PopLav.png'
});
VPopo_IGCENAPRED_LAV.name="Mapa De Peligros Volcán Popocatépetl; Lavas";
var VPopo_IGCENAPRED_S_ZETP = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Fenomenos_Geologicos/MapServer/",
	layers:[370],
	opacity: .5,
	iconUrl:'imagenes/leyenda/PopZEP.png'
});
VPopo_IGCENAPRED_S_ZETP.name= "Mapa De Peligros Simplificado; Zona Expuesta a Todos los Peligros";
var VPopo_IGCENAPRED_S_AL= L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Fenomenos_Geologicos/MapServer/",
	layers:[371],
	opacity: .5,
	iconUrl:'imagenes/leyenda/PopAlh.png'
});
VPopo_IGCENAPRED_S_AL.name="Mapa de Peligros Simplificado; Área de Lahares";
 //-----------------sismos-----------------------------------------------------------
var Sism7s17 = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Fenomenos_Geologicos/MapServer/",
	layers:[482],
	opacity: .5,
	iconUrl:'imagenes/leyenda/Sace7sept.png'
});
Sism7s17.name=" Aceleraciones del suelo Septiembre 7 de 2017";
var Sism19s17 = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Fenomenos_Geologicos/MapServer/",
	layers:[484],
	opacity: .5,
	iconUrl:'imagenes/leyenda/Sacel2.png'
});
Sism19s17.name="Aceleraciones del suelo, Septiembre 19 de 2017";
var PSIS = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Fenomenos_Geologicos/MapServer/",
	layers:[504],
	opacity: .5,
	iconUrl:'imagenes/leyenda/Sreg.png'
});
PSIS.name="Regionalización Sísmica "
var Zonas = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Fenomenos_Geologicos/MapServer/",
	layers:[508,509,510,511,512,513],
	opacity: .5,
	iconUrl:'imagenes/leyenda/Szon.png'
});
Zonas.name="Zonificación Sísmica de la Ciudad de México";

 //--------------------------------------HUNDIMIENTOS-------------------------------------
var HundimHist = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Fenomenos_Geologicos/MapServer/",
	layers:[405],
	opacity: .5,
	iconUrl:'imagenes/leyenda/Hund.png'
});
HundimHist.name="Hundimientos Históricos por municipios";
var Fract = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Fenomenos_Geologicos/MapServer/",
	layers:[553],
	opacity: .8,
	iconUrl:'imagenes/leyenda/fract.png'
});
Fract.name="Fracturamineto";
var VFalFractur = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Fenomenos_Geologicos/MapServer/",
	layers:[557],
	opacity: .5,
	iconUrl:'imagenes/leyenda/Hvuln.png'
});
VFalFractur.name="Vulenarbilidad física al fracturamiento";
var VulSocFracAGEB = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Fenomenos_Geologicos/MapServer/",
	layers:[559],
	opacity: .5,
	iconUrl:'imagenes/leyenda/fracageb.png'
});
VulSocFracAGEB.name=" Vulnerabilidad social al fracturamineto a nivel AGEB";
var Tsunamis = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Fenomenos_Geologicos/MapServer/",
	layers:[408],
	opacity: .8,
	iconUrl:'imagenes/leyenda/tsun.png'
});
Tsunamis.name="Peligro por Tsunamis";
var SuscepLad = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Fenomenos_Geologicos/MapServer/",
	layers:[413,414,415,416,417],
	opacity: .5,
	iconUrl:'imagenes/leyenda/slad.png'
});
SuscepLad.name=" Susceptibilidad de Laderas";
//-----------------------Datos Básicos-----------------------
var Estados = new L.geoJson();

$.getJSON("gj/Estados.geojson", function (data) {
	// variable para geojson con estilos
  	var est = new L.geoJson(data, {
  	  	style: function(feature, layer) {
		return {
		fillColor: 'transparent',
		color: '#0A3356',
		weight: 1.5,
		opacity: 1,
		fillOpacity: 1
		};
	},
  	}).addTo(Estados);
});
Estados.name="División Estatal";
Estados.options.iconUrl='imagenes/leyenda/EST.png';
var Municipios = new L.geoJson();

$.getJSON("gj/Municip.geojson", function (data) {
	// variable para geojson con estilos
  	var muni = new L.geoJson(data, {
  	  	style: function(feature, layer) {
		return {
		fillColor: 'transparent',
		color: '#CF6100',
		weight: 1,
		opacity: 1,
		fillOpacity: 1
		};
	},
  	}).addTo(Municipios);
});
Municipios.name="División Municipal";
Municipios.options.iconUrl='imagenes/leyenda/mun.png';

var MGEST_CN = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Datos_Fundamentales/MapServer/",
	layers:[0],
	iconUrl:'imagenes/leyenda/DBcn.png'
});
MGEST_CN.name="Curvas de Nivel";
var MGEST_ZEE = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Datos_Fundamentales/MapServer/",
	layers:[3],
	opacity: .8,
	iconUrl:'imagenes/leyenda/DBzex.png'
});
MGEST_ZEE.name="Zona económica exclusiva";
var CE_locrur = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Datos_Basicos/MapServer/",
	layers:[10],
	iconUrl:'imagenes/leyenda/DBlrh.png'
});
CE_locrur.name="Localidades Rurales (Habitantes)";
var CE_colonias = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Datos_Basicos/MapServer/",
	layers:[11],
	iconUrl:'imagenes/leyenda/DBcol.png'
});
CE_colonias.name="Colonias";
var CE_ManzRur = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Datos_Basicos/MapServer/",
	layers:[12],
	iconUrl:'imagenes/leyenda/DBmzr.png'
});
CE_ManzRur.name="Manzanas Rurales";
var CE_AGBU = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Datos_Basicos/MapServer/",
	layers:[13],
	iconUrl:'imagenes/leyenda/DBageb.png'
});
CE_AGBU.name="Área Geoestadística Básica Urbana 2020";
var USYV_CulAg = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Datos_Basicos/MapServer/",
	layers:[21],
	
	iconUrl:'imagenes/leyenda/DBcag.png'
});
USYV_CulAg.name="Cultivos Agrícolas";
var USYV_EVN = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Datos_Basicos/MapServer/",
	layers:[22],
	
	iconUrl:'imagenes/leyenda/DBevn.png'
});
USYV_EVN.name="Especies Vegetales Naturales";
var USYV_Aforest = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Datos_Basicos/MapServer/",
	layers:[23],
	
	iconUrl:'imagenes/leyenda/DBacf.png'
});
USYV_Aforest.name="Actividades Forestales";
var USYV_ActPec = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Datos_Basicos/MapServer/",
	layers:[24],
	iconUrl:'imagenes/leyenda/DBacp.png'
});
USYV_ActPec.name="Actividades Pecuarias";
var USYV_OtrAct = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Datos_Basicos/MapServer/",
	layers:[25],
	iconUrl:'imagenes/leyenda/DBoac.png'
});
USYV_OtrAct.name="Otras Actividades";
var USYV_PIE = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Datos_Basicos/MapServer/",
	layers:[26],
	iconUrl:'imagenes/leyenda/DBpiec.png'
});
USYV_PIE.name="Puntos de Importancia Ecológica";
var USYV_LIE = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Datos_Basicos/MapServer/",
	layers:[27],
	iconUrl:'imagenes/leyenda/DBliec.png'
});
USYV_LIE.name="Líneas de Importancia Ecológica";
var USYV_CobertArb = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Datos_Basicos/MapServer/",
	layers:[28],
	opacity: .8,
	iconUrl:'imagenes/leyenda/DBcarb.png'
});
USYV_CobertArb.name="Cobertura Arbórea";
var USYV_AspMat = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Datos_Basicos/MapServer/",
	layers:[29],
	opacity: .8,
	iconUrl:'imagenes/leyenda/DBasm.png'
});
USYV_AspMat.name="Aspecto del Matorral";
var USYV_NomAg = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Datos_Basicos/MapServer/",
	layers:[30],
	opacity: .8,
	iconUrl:'imagenes/leyenda/DBnoa.png'
});
USYV_NomAg.name="Nomadismo de Agricultura";
var USYV_GrupVeg = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Datos_Basicos/MapServer/",
	layers:[31],
	opacity: .8,
	iconUrl:'imagenes/leyenda/DBgpve.png'
});
USYV_GrupVeg.name="Grupo de Vegetación";
var USYV_TVeg = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Datos_Basicos/MapServer/",
	layers:[33],
	opacity: .8,
	iconUrl:'imagenes/leyenda/DBtv4.png'
});
USYV_TVeg.name="Tipo de Vegetación Serie IV";
var USYV_TEcos = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Datos_Basicos/MapServer/",
	layers:[34],
	opacity: .8,
	iconUrl:'imagenes/leyenda/DBte4.png'
});
USYV_TEcos.name="Tipo de Ecosistema Serie IV";
var ANPS = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Datos_Basicos/MapServer/",
	layers:[35],
	opacity: .8,
	iconUrl:'imagenes/leyenda/DBANP.png'
});
ANPS.name="Áreas Naturales Protegidas";
var HAS_UnHid = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Datos_Basicos/MapServer/",
	layers:[40],
	opacity: .8,
	iconUrl:'imagenes/leyenda/DBuh.png'
});
HAS_UnHid.name="Unidades Hidrogeológicas (CONABIO)";
var HAS_P = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Datos_Basicos/MapServer/",
	layers:[41],
	opacity: .8,
	iconUrl:'imagenes/leyenda/DBpam.png'
});
HAS_P.name="Puntos de Aprovechamientos Muestreados";
var HAS_PNM= L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Datos_Basicos/MapServer/",
	layers:[42],
	iconUrl:'imagenes/leyenda/DBpan.png'
});
HAS_PNM.name="Puntos de Aprovechamientos No Muestreados";
var HAS_DirF = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Datos_Basicos/MapServer/",
	layers:[43],
	iconUrl:'imagenes/leyenda/DBfldir.png'
});
HAS_DirF.name="Dirección de Flujos";
var HAS_ACP = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Datos_Basicos/MapServer/",
	layers:[44],
	opacity: .8,
	iconUrl:'imagenes/leyenda/DBacop.png'
});
HAS_ACP.name="Áreas de Concentración de Pozos";
var HAS_OAS = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Datos_Basicos/MapServer/",
	layers:[45],
	opacity: .8,
	iconUrl:'imagenes/leyenda/DBoasub.png'
});
HAS_OAS.name="Ordenamientos de Aguas Subterráneas (Conagua, 2018)"
//----------hidrología aguas superf
var HASup_Rios = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Datos_Basicos/MapServer/",
	layers:[47],
	iconUrl: 'imagenes/leyenda/DBrios.png'
});
HASup_Rios.name="Ríos";
var HASup_Rprincip = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Datos_Basicos/MapServer/",
	layers:[48],
	iconUrl:'imagenes/leyenda/DBrpri.png'
});
HASup_Rprincip.name="Ríos Principales";
var HASup_CA = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Datos_Basicos/MapServer/",
	layers:[49],
	opacity: .8,
	iconUrl:'imagenes/leyenda/DBcagu.png'
});
HASup_CA.name="Cuerpos de Agua";
var HASup_Esc = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Datos_Basicos/MapServer/",
	layers:[50],
	opacity: .8,
	iconUrl:'imagenes/leyenda/DBesc.png'
});
HASup_Esc.name="Escurrimiento";
var HASup_HumyANP = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Datos_Basicos/MapServer/",
	layers:[51],
	opacity: .8,
	iconUrl:'imagenes/leyenda/DBhyanp.png'
});
HASup_HumyANP.name="Humedales y ANP (CONAGUA, 2016)";
var HASup_OASup = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Datos_Basicos/MapServer/",
	layers:[52],
	opacity: .8,
	iconUrl:'imagenes/leyenda/DBoasup.png'
});
HASup_OASup.name="Ordenamientos de aguas superficiales (CONAGUA, 2019)";
var HASup_RegHidr = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Datos_Basicos/MapServer/",
	layers:[53],
	opacity: .8,
	iconUrl:'imagenes/leyenda/DBrghi.png'
});
HASup_RegHidr.name="Regiones Hidrológicas";
var HASup_PuntMuest = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Datos_Basicos/MapServer/",
	layers:[54],
	iconUrl:'imagenes/leyenda/DBpm.png'
});
HASup_PuntMuest.name="Puntos de muestreo";
var CLPNac_ISOY24 = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Datos_Basicos/MapServer/",
	layers:[58],
	iconUrl:'imagenes/leyenda/DBisoy.png'
});
CLPNac_ISOY24.name="Isoyetas de Precipitación Media Anual 24hrs";
//---------------------Hidrometeorológicos-----------------------------------------------------
var HM_SeqEscRiesg = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Fenomenos_Hidrometeorologicos/MapServer/",
	layers:[15],
	opacity: .8,
	iconUrl:'imagenes/leyenda/Hseq.png'
});
HM_SeqEscRiesg.name="Escenarios de Riesgo, Sequía";
var HM_Heladas = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Fenomenos_Hidrometeorologicos/MapServer/",
	layers:[20],
	opacity: .8,
	iconUrl:'imagenes/leyenda/Hidhm.png'
});
HM_Heladas.name="Índice de Días con Heladas por Municipio";
var HM_Telect = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Fenomenos_Hidrometeorologicos/MapServer/",
	layers:[29],
	opacity: .8,
	iconUrl:'imagenes/leyenda/Hteer.png'
});
HM_Telect.name="Tormetas Eléctricas, Escenarios de Riesgo";
var HM_Tgr = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Fenomenos_Hidrometeorologicos/MapServer/",
	layers:[39],
	opacity: .8,
	iconUrl:'imagenes/leyenda/Htg.png'
});
HM_Tgr.name="Tormentas de Granizo, Escenarios de Riesgo";
var HM_Tnieve = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Fenomenos_Hidrometeorologicos/MapServer/",
	layers:[47],
	opacity: .8,
	iconUrl:'imagenes/leyenda/Htn.png'
});
HM_Tnieve.name="Tormentas de Nieve, Escenarios de Riesgo";
var HM_InundPC = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Fenomenos_Hidrometeorologicos/MapServer/",
	layers:[53],
	iconUrl:'imagenes/leyenda/Hpcind.png'
});
HM_InundPC.name="Puntos Críticos de Inundación (CONAGUA-CENAPRED, 2020)";
var HM_InundEIxM = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Fenomenos_Hidrometeorologicos/MapServer/",
	layers:[55],
	opacity: .8,
	iconUrl:'imagenes/leyenda/Heipm.png'
});
HM_InundEIxM.name="Eventos de Inundación por Municipio (CENAPRED, 2020)";
var HM_OGelid = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Fenomenos_Hidrometeorologicos/MapServer/",
	layers:[72],
	opacity: .8,
	iconUrl:'imagenes/leyenda/Hog.png'
});
HM_OGelid.name="Ondas Gélidas, Escenarios de Riesgos";
var HM_CTMuni = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Fenomenos_Hidrometeorologicos/MapServer/",
	layers:[75],
	opacity: .8,
	iconUrl:'imagenes/leyenda/Hgpct.png'
});
HM_CTMuni.name="Grado de Peligro por Presencia de Ciclones Tropicales a Nivel Municipal (1949-2020, CENAPRED 2022)";
var GPBTH = L.esri.dynamicMapLayer({
	url: "http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Fenomenos_Hidrometeorologicos/MapServer/",
	layers: [62],
	opacity: 0.8,
	iconUrl: 'imagenes/leyenda/Hog.png',
});
GPBTH.name="Grado de peligro por bajas temperaturas construido con los índices de temperatura mínima y días con heladas";
var HM_CTmun2 = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Fenomenos_Hidrometeorologicos/MapServer/",
	layers:[76],
	opacity: .8,
	iconUrl:'imagenes/leyenda/Hgpct2.png'
});
HM_CTmun2.name="Grado de Peligro por Presencia de Ciclones Tropicales a Nivel Municipal 2 (1949-2020, CENAPRED 2022)";
var HM_viento = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Fenomenos_Hidrometeorologicos/MapServer/",
	layers:[123],
	opacity: .8,
	iconUrl:'imagenes/leyenda/Hze.png'
});
HM_viento.name="Zonificación Eólica (CFE)";
//-------------------------------
//------Sanitario-Ecológicos
var ContAgua = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Sanitario_Ecologicos/MapServer/",
	layers:[1],
	opacity: .8,
	iconUrl:'imagenes/leyenda/SEipca.png'
});
ContAgua.name="Índice de peligro de contaminación de agua a nivel municipal (CENAPRED, 2019)";
//---------------------Quimico-tecnológico----------------------------------------------------
var InceFores = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Quimico_Tecnologico/MapServer/",
	layers:[1],
	iconUrl:'imagenes/leyenda/Qroih.png'
});
InceFores.name="Riesgo de ocurrencia de incendios por factores humanos (CONAFOR, 2020)";
var IndSusQuim = L.esri.dynamicMapLayer({
	url:"http://servicios1.cenapred.unam.mx:6080/arcgis/rest/services/ANR/Quimico_Tecnologico/MapServer/",
	layers:[149],
	iconUrl:'imagenes/leyenda/Qind.png'
});
IndSusQuim.name="Industria con sustancias químicas peligrosas (CENAPRED, 2018)";
//------------------------------------------------------------------------------------------
var gifboun =[[35,-122.5],[-2,-44.5]];

var vid2 = L.layerGroup({
	opacity: .5,
});

//array de las imágenes
var imageUrls = [
	'radar/1.png',
	'radar/2.png',
	'radar/3.png',
	'radar/4.png',
	'radar/5.png',
	'radar/6.png',
	'radar/7.png',
	'radar/8.png',
	'radar/9.png',
	'radar/10.png',
	'radar/11.png',
	'radar/12.png',
	'radar/13.png',
	'radar/14.png',
	'radar/15.png',

];
//preload de las imágenes para evitar pausas raras
var preloadedImages = [];
for (var i = 0; i < imageUrls.length; i++) {
  var img = new Image();
  img.src = imageUrls[i];
  preloadedImages.push(img);
}

// Define una variable que lleva cuenta del ovelay
var currentImageOverlay = null;
// animación con las imágenes
function animateLayer() {
  	if (currentIndex >= imageUrls.length) {
    // Reseteo a primera imagen
    	currentIndex = 0;
  	}

  // Remover la imágen anterior
  	if (currentImageOverlay) {
    	vid2.removeLayer(currentImageOverlay);
  	}

  // Crea un nuevo overlay con la imagen anterior
  	var imageUrl = imageUrls[currentIndex];
  	currentImageOverlay = L.imageOverlay(imageUrl, gifboun, {opacity: 0.5});

  // Añade la imagen al overlay 
  	vid2.addLayer(currentImageOverlay);

  // incrementa el indice de la iteración
  	currentIndex++;

  // ajuste de los cuadros por segundo
  	setTimeout(animateLayer, 500); 
}

// Ivid2 como un layergroup
var vid2 = L.layerGroup();
vid2.name="Radar de tope de nubes (LANOT)";
vid2.options.iconUrl="";
var currentIndex = 0;

//inicia la animación e impide que se pause al esconder capa
animateLayer();
//--------------------------------------------nubes rgb--------------------------------------------------
var gifboun2 =[[34.317223,-125.19056],[5.729281,-78.9325]];

var nrgb = L.layerGroup({
	opacity: .5,
});

//array de las imágenes
var imageUrls2 = [
	'rgb/1.png',
	'rgb/2.png',
	'rgb/3.png',
	'rgb/4.png',
	'rgb/5.png',
	'rgb/6.png',
	'rgb/7.png',
	'rgb/8.png',
	'rgb/9.png',
	'rgb/10.png',
	'rgb/11.png',
	'rgb/12.png',
	'rgb/13.png',
	'rgb/14.png',
	'rgb/15.png',

];
//preload de las imágenes para evitar pausas raras
var preloadedImages2 = [];
for (var i = 0; i < imageUrls2.length; i++) {
  var img2 = new Image();
  img2.src = imageUrls2[i];
  preloadedImages2.push(img2);
}

// Define una variable que lleva cuenta del ovelay
var currentImageOverlay2 = null;
// animación con las imágenes
function animateLayer2() {
  	if (currentIndex2 >= imageUrls2.length) {
    // Reseteo a primera imagen
    	currentIndex2 = 0;
  	}

  // Remover la imágen anterior
  	if (currentImageOverlay2) {
    	nrgb.removeLayer(currentImageOverlay2);
  	}

  // Crea un nuevo overlay con la imagen anterior
  	var imageUrl = imageUrls2[currentIndex2];
  	currentImageOverlay2 = L.imageOverlay(imageUrl, gifboun2, {opacity: 0.5});

  // Añade la imagen al overlay 
  	nrgb.addLayer(currentImageOverlay2);

  // incrementa el indice de la iteración
  	currentIndex2++;

  // ajuste de los cuadros por segundo
  	setTimeout(animateLayer2, 500); 
}

// Ivid2 como un layergroup
var nrgb = L.layerGroup();
nrgb.name="Nubes en Color Real (LANOT)";
nrgb.options.iconUrl="";
var currentIndex2 = 0;

//inicia la animación e impide que se pause al esconder capa
animateLayer2();

//------------------------------Simulacro 2023---------------------------------------------------
var simER = L.esri.dynamicMapLayer({
	url:"https://rmgir.proyectomesoamerica.org/server/rest/services/SegundoSimulacro2023/MapServer/",
	layers:[2,3,8],
	opacity: .7,
	
});
simER.name="Simulacro Huracán Ernesto 2023";
simER.options.iconUrl="imagenes/SSIM2023/simul3.jpg";
var simOD = L.esri.dynamicMapLayer({
	url:"https://rmgir.proyectomesoamerica.org/server/rest/services/SegundoSimulacro2023/MapServer/",
	layers:[4,5,7]

});
simOD.name="Simulacro Huracán Odile 2023";
simOD.options.iconUrl="imagenes/SSIM2023/simul4.jpg";
var sismoN = new L.geoJson();
$.getJSON("gj/sismoN.geojson", function (data) {
    // Def geojson 
	
  	var sisN = new L.geoJson(data, {
  	  	onEachFeature: function(feature, layer) {
      		
    	},
	
	style: function(feature, layer) {
		var colsis = feature.properties.MERCALLI;
		//console.log(feature);
		return {
		fillColor: SisColor(colsis),
		color: 'black',//SisColor(colsis),
		weight: 2,
		opacity: .8,
		fillOpacity: .8,
		};
	},
	


  	}).addTo(sismoN);
});
sismoN.name="Simulacro Sismo Norte del País";
sismoN.options.iconUrl="imagenes/SSIM2023/simul2.jpg";
var sismoS = new L.geoJson();
$.getJSON("gj/sismoS.geojson", function (data) {
    // Def geojson 
	
  	var sisN = new L.geoJson(data, {
  	  	onEachFeature: function(feature, layer) {
      		
    	},
	
	style: function(feature, layer) {
		var colsis = feature.properties.MERCALLI;
		//console.log(feature);
		return {
		fillColor: SisColor(colsis),
		color: 'black',//SisColor(colsis),
		weight: 2,
		opacity: .8,
		fillOpacity: .8,
		};
	},
	


  	}).addTo(sismoS);
});
sismoS.name="Simulacro Sismo Sur del País";
sismoS.options.iconUrl="imagenes/SSIM2023/simul.jpg";
function SisColor(colsis) {
	var sc = colsis
	if (sc == "III") {
		return '#bed2ff';
	} else if(sc === "IV") {
		return '#00fafb';
	}  else if(sc === "V") {
		return '#a5f57a';
	}  else if(sc === "VI") {
		return '#ffff00';
	}  else if(sc === "VII") {
		return '#ffd37f';
	}  else if(sc === "VIII") {
		return '#ffaa00';
	}  else if(sc === "IX") {
		return '#ff5500';
	}  else if(sc === "X") {
		return '#e60000';
	}  else if(sc === "XI") {
		return '#a83800';
	} 
}



var vias = new L.geoJson();
$.getJSON("gj/Vialidades.geojson",  function (data) {
    // Def geojson 

	var rutpre = new L.geoJson(data, {
		weight: 5,
		color: "black"
	}).addTo(vias);

  	var rut1 = new L.geoJson(data, {
		weight: 3,
		color: '#EC7C06',
 	}).addTo(vias);
});
vias.name="Vialidades ";
vias.options.iconUrl="";



var PrTemp = new L.geoJson();
$.getJSON("gj/PyT.geojson",function(data) {
	var send = new L.geoJson(data, {
		
		onEachFeature: function(feature, layer) {
		var zon = feature.properties.probprec;
		var col = precolor(zon);


		layer.setStyle({
			fillColor: col,
			weight: 1,
			opacity: 1,
			color: 'black',
			fillOpacity: .8,

		});
		  layer.bindPopup("Municipio: "+ feature.properties.nmun +"</br> Probabilidad de lluvia: " + feature.properties.probprec +"%"+ "</br>Precipitación esperada: " + feature.properties.prec+" Litros/metro cuadrado" );
	},
  }).addTo(PrTemp);
	//console.log(data.features[0].properties);
});
PrTemp.name="Probabilidad de lluvia"+"</br> esperada por día" + "</br> actualizado cada 6 horas " + "</br>(SMN)";
PrTemp.options.iconUrl="imagenes/InfoUn/Precip.png";


function precolor(zon) {
    var numericValue = parseFloat(zon);

    if (numericValue >= 0 && numericValue <= 20) {
        return '#3F9C2A'; // 
    } else if (numericValue > 20 && numericValue <= 40) {
        return '#13E513'; //
    } else if (numericValue > 40 && numericValue <= 60) {
        return '#FFF000'; //  
    } else if (numericValue > 60 && numericValue <= 80){
        return '#FF9E00'; //
    } else if (numericValue > 80 && numericValue <= 100) {
		return '#FF1F00'
	}
}

var TempM = new L.geoJson();
$.getJSON("gj/PyT.geojson",function(data) {
	var send = new L.geoJson(data, {
		
		onEachFeature: function(feature, layer) {
		
		layer.setStyle({
			fillColor: '#b19245',
			weight: 1,
			opacity: 1,
			color: 'black',
			fillOpacity: .8,

		});
		  layer.bindPopup("Municipio: "+ feature.properties.nmun +"</br> Temperaruta Máxima: " + feature.properties.tmax +"°C"+ "</br>Temperatura Mínima: " + feature.properties.tmin +"°C" );
	},
  }).addTo(TempM);
	//console.log(data.features[0].properties);
});
TempM.name="Pronóstico de temperatura" +"<br/>Máxima y Mínima"+"</br> esperada por día" + "</br> actualizado cada 6 horas " + "</br>(SMN)";
TempM.options.iconUrl="imagenes/InfoUn/Temps.png";


//------------------sim 2024

var simul24 = new L.geoJson();
$.getJSON("gj/simul24.geojson", function (data) {
    // Def geojson 
	
  	var sisN = new L.geoJson(data, {
  	  	onEachFeature: function(feature, layer) {
      		
    	},
	
	style: function(feature, layer) {
		var colsis = feature.properties.MERCALLI;
		//console.log(feature);
		return {
		fillColor: SisColor(colsis),
		color: 'black',//SisColor(colsis),
		weight: 2,
		opacity: .8,
		fillOpacity: .8,
		};
	},
	


  	}).addTo(simul24);
});
simul24.name="Simulacro nacional 2024";
simul24.options.iconUrl="";
function SisColor(colsis) {
	var sc = colsis
	if (sc == "III") {
		return '#bed2ff';
	} else if(sc === "IV") {
		return '#00fafb';
	}  else if(sc === "V") {
		return '#a5f57a';
	}  else if(sc === "VI") {
		return '#ffff00';
	}  else if(sc === "VII") {
		return '#ffd37f';
	}  else if(sc === "VIII") {
		return '#ffaa00';
	}  else if(sc === "IX") {
		return '#ff5500';
	}  else if(sc === "X") {
		return '#e60000';
	}  else if(sc === "XI") {
		return '#a83800';
	} 
}


var incend = new L.geoJson();
$.getJSON("gj/Incendios.geojson",  function (data) {
    // Def geojson 
	var Bpc = new L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            var circleMarker = L.circleMarker(latlng, {
                color: '#f02100',
				fillColor: '#f02100',
				fillOpacity: .9,
            });
			
            return circleMarker;
        },
		onEachFeature: function(feature, layer) {
			layer.bindPopup("Incidente: " + feature.properties.tipo);
		}
		
 	}).addTo(incend);
});
incend.name="Atenciones Bomberos";
incend.options.iconUrl=" ";

var Seqm = new L.geoJson();
var colorseq = {
	'nan': '#7197b0',
	'D0': '#fedd79',
	'D1': '#feb751',
	'D2': '#fd8d3c',
	'D3': '#f45629',
	'D4': '#bd0026',
	'': 'white'
	
};

$.getJSON("Sequia/Munseq.geojson", function (data) {
    // Def geojson 
	
  	var send = new L.geoJson(data, {
  	  	onEachFeature: function(feature, layer) {
			var zon = feature.properties.Fecha_Actualizacion_Sequias;
			var col = colorseq[zon];

			layer.setStyle({
				fillColor: col,
				weight: .5,
				opacity: 1,
				color: 'black',
				fillOpacity: .7,

			});
      		layer.bindPopup("Municipio: " + feature.properties.NOMBRE_MUN );
    	},
  	}).addTo(Seqm);
});
Seqm.options.iconUrl="imagenes/InfoUn/sequia.png";
Seqm.name="Nivel de Sequía por municipio "+"</br>Actualizado cada 15 días(SMN)";

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Variables de Capas
	//Capas Base
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
	layers:[capaOSM,cluster_UNAM,PrediosUNAM],
	pmIgnore: false,
	
});
//Cargar Capas Base en boton de control dentro del Mapa
var layerControl = L.control.layers(capasBase, null, {position: 'topleft'}).addTo(mapa);
//Cargar Sidebar

var sidebar = L.control.sidebar('sidebar').addTo(mapa);

//---------------------------
//var sidebar2 = L.control.sidebar('sidebar2').addTo(mapa);

//-----------------------//
//Locate
//var lc= L.control.locate().addTo(mapa);
//Search
var searchControl = new L.Control.Search({
	layer: cluster_UNAM,
	propertyName: 'nombre',
	marker: false,
	initial: false,
	moveToLocation: function(latlng, title, map) {
		//map.fitBounds( latlng.layer.getBounds() );
		//var zoom = map.getBoundsZoom(latlng.layer.getBounds()); //Solo funciona en poligonos
		map.setView(latlng, 19); // access the zoom
	}
});
mapa.addControl(searchControl);

//Dibujo por Usuario GEOMAN

mapa.on('pm:create', (e) =>{
	e.layer.options.pmIgnore = false;
	L.PM.reInitLayer(e.layer);
});

//------prueba de  spatialBookmark
//variable del control y su propiedad de posición
var CustomControl = L.Control.extend({
	options: {
		position: 'bottomleft',
		
	},
	//onAdd que determinará la acción del boton
	onAdd: function(mapa) {
		var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
        var button = L.DomUtil.create('a', 'leaflet-bar-part leaflet-bar-part-single custom-button', container);
        var icon = L.DomUtil.create('span', 'custom-icon', button);

		

		//En este caso el boton regresa a la vista y zoom inicial
        button.onclick = function(e) {
           mapa.flyTo(new L.LatLng( 19.33,-99.18555),15);
        };

        return button;
    }

});
var Home = new CustomControl();
Home.addTo(mapa);
//----marca de agua----------------------------------------------------------------
L.Control.Watermark= L.Control.extend({
	options: {
		position: 'bottomright',
	},
	onAdd: function(mapa) {
		var container = L.DomUtil.create('div', 'leaflet-control-watermark')
		var img = L.DomUtil.create('img', 'leaflet-watermark-image', container);
		img.src = 'cs/images/ARUNAM08.png';
		img.style.width = '200px';
		img.onclick = function(e) {
			var defaultUrl = 'http://132.247.123.200/arunam/'; 
            var targetUrl = document.referrer || defaultUrl;

            // Checa si la pagina es la misma a la inicial
            if (targetUrl === window.location.href) {
                // si no lo es regresa a la inicial con el default
                targetUrl = defaultUrl;
            }

            window.top.location.href = targetUrl;
		};
		return container;
	},
	onRemove: function(mapa) {

	}
});
L.control.watermark = function(opts) {
	return new L.Control.Watermark(opts);
}
var Wmark = new L.control.watermark().addTo(mapa);
//--------------------------------------------------------------------
//mapa.pm.addControls({
//	position: 'bottomright'
//});
mapa.pm.addControls({
	drawCircleMarker: false,
	drawControls: false,
	editControls: false,
	customControls: true
});
//imprimir como png
var aImg = L.easyPrint({
	title: 'Guardar como PNG',
	filename: 'Mapa ARUNAM',
	position: 'topleft',
	exportOnly: true,
	tileWait: 50000,
	sizeModes: ['A4Landscape','Current'],
}).addTo(mapa);


var cont = mapa.pm.Toolbar.createCustomControl({
	name: 'dib',
	block: 'custom',
	title: 'Comienza a dibujar o editar',
	toggle: true,
	disableByOtherButtons: false,
	onClick: function(e) {
		// revisa estado de controles
		var controlsEnabled = mapa.pm.getGlobalOptions().controlsEnabled;

		// Log de estado de controles
		//console.log('Controls Enabled:', controlsEnabled);
	
		// Toggle dependiendo del estado y cambiar el estado
		if (controlsEnabled) {
		  mapa.pm.removeControls();
		  mapa.pm.addControls({
			cutPolygon: false,
			drawControls: false,
			editControls: false,
			customControls: true
		  });
		  mapa.pm.setGlobalOptions({controlsEnabled: false});
		} else {
		  mapa.pm.removeControls();
		  mapa.pm.addControls({
			cutPolygon: false,
			positions: {
			  draw: 'bottomright',
			  edit: 'bottomleft'
			},
			drawControls: true,
			editControls: true,
			customControls: true
		  });
		  mapa.pm.setGlobalOptions({controlsEnabled: true});
		}

	  }
});




// barra de escala
mapa.pm.Toolbar.addControls(cont);
L.control.scale({
	position: 'bottomleft',
	imperial: false,
}).addTo(mapa);

// mediciones
mapa.on('pm:create', function(e){
	if(e.layer instanceof L.Polygon ) {
		var cread = e.layer.toGeoJSON();
		var aream = turf.area(cread);
		var areakm = (turf.area(cread)/1000000);
		var popupContent = 'Área de: ' + aream.toFixed(3)+ ' Metros cuadrados'+ '<br> Área de: ' + areakm.toFixed(3) + ' Kilómetros cuadrados';
		e.layer.bindPopup(popupContent).openPopup();
		console.log('El área es de: ', aream, ' metros cuadrados')
		console.log('El Area es de: ', areakm, ' kilómetros cuadrados')
		console.log(cread);
		e.layer.on('pm:edit', function(e){
			var cread = e.layer.toGeoJSON();
			var aream = turf.area(cread);
			var areakm = (turf.area(cread)/1000000);
			var popupContent = 'Área de: ' + aream.toFixed(3)+ ' Metros cuadrados'+ '<br> Área de: ' + areakm.toFixed(3) + ' Kilómetros cuadrados';
			e.layer.bindPopup(popupContent).openPopup();
			console.log('El área es de: ', aream, ' metros cuadrados')
			console.log('El Area es de: ', areakm, ' kilómetros cuadrados')
		});
	} else if (e.layer instanceof L.Polyline) {
		var lin = e.layer.toGeoJSON();
		var lon = turf.length(lin);
		var popupContL = 'Longitud de: '+ lon.toFixed(3) + 'Kilometros';
		e.layer.bindPopup(popupContL).openPopup();
		console.log('longitud de:',lon);
		e.layer.on('pm:edit', function(e) {
			var lin = e.layer.toGeoJSON();
			var lon = turf.length(lin);
			var popupContL = 'Longitud de: '+ lon.toFixed(3) + 'Kilometros';
			e.layer.bindPopup(popupContL).openPopup();
			console.log('longitud de:',lon);
		});
	} else if (e.layer instanceof L.Marker ) {
		var lay = e.layer.toGeoJSON();
		var mark = turf.getCoord(lay);
		var popupContent2 = 'Coordenadas de Marcador: ' + mark ;
		e.layer.bindPopup(popupContent2).openPopup();
		e.layer.on('pm:edit', function(e) {
			var lay = e.layer.toGeoJSON();
			var mark = turf.getCoord(lay);
			var popupContent2 = 'Coordenadas de Marcador: ' + mark ;
			e.layer.bindPopup(popupContent2).openPopup();
		});
	} else if(e.layer instanceof L.Circle ) {
		var circ = e.layer;
		var r = prompt('Valor del Radio');
		r = parseFloat(r);
		if(r !==null && r !==NaN ) {
			var center = circ.getLatLng();
			var rad = circ.setRadius(r)
			var areaC = (Math.PI * (r**2));
			console.log(e.layer.pm._layer.pm._layer._mRadius);
			var popupContC = 'Área del circulo: '+ areaC.toFixed(4)+'metros cuadrados'+'<br> Rádio de: ' + r.toFixed(2) + ' metros ';
			e.layer.bindPopup(popupContC).openPopup();
			e.layer.on('pm:edit', function(e) {
				var circ = e.layer;
				var r = prompt('Valor del Radio');
				r = parseFloat(r);
				var center = circ.getLatLng();
				var rad = circ.setRadius(r)
				var areaC = (Math.PI * (r**2));
				var popupContC = 'Área del circulo: '+ areaC.toFixed(4)+'metros cuadrados'+'<br> Rádio de: ' + r.toFixed(2) + ' metros ';
			e.layer.bindPopup(popupContC).openPopup();	
			});
		} else {
			
		}
	}
});
//Herramientas de análisis2

//capa Edificios Pubica
var EP = new L.geoJson();


EP.options.iconUrl="imagenes/leyenda/Edif.png";

$.getJSON("gj/EdifPublicV16.geojson", function (data) {
	
    // Def geojson 
  	var EdPublic = new L.geoJson(data, {
		color: '#e15300',
		zIndex: 1,
		onEachFeature: function(feature, layer) {
			layer.bindPopup("Has hecho click en: " + feature.properties.edificios+"<br/>Dependencia:"+ feature.properties.dependenci);
			//para despiegue de información en la barra lateral
			layer.on('click', function() {
				//var pcont = "Nombre de entidad: "+ feature.properties.nom_ent + "<br/>Dependencia: " + feature.properties.dependenci + "<br/>Edificio: "+ feature.properties.edificios + "<br/>Número de programa interno: " + feature.properties.num_pip  + "<br/>Nombre oficial: " + feature.properties.nom_ofic + "<br/>Nombre común: " + feature.properties.nom_coloq + "<br/> Uso de cada edificio: " + feature.properties.usos_ + "<br/> N° de pisos: " + feature.properties.num_pisos + "<br/> N° de extintores: " + feature.properties.extintores + "<br/> Tipo de extintores: " + feature.properties.tipo_de_ex + "<br/>M° de hidrantes: " + feature.properties.hidrantes + "<br/>Detectores de humo o calor: " + feature.properties.d_hum_cal + "<br/>Brigada de evacuación: " + feature.properties.b_e + "<br/>Brigada de primeros auxilios: " + feature.properties.b_p_a + "<br/>Brigada de manejo de extintores: " + feature.properties.b_m_e + "<br/>Brigada de búsqueda y rescate: " + feature.properties.b_b_r + "<br/>Rutas de evacuación: " + feature.properties.r_e + "<br/>Alerta sísmica automatizada audible: " + feature.properties.a_s_a_a + "<br/>Alarma contra incendios: " + feature.properties.a_c_i + "<br/>Plan de emergencia contra sismos: " +  feature.properties.p_e_s + "<br/>Plan de emergencia contra incendios: " + feature.properties.p_e_i + "<br/>Rampas para discapacitados: " + feature.properties.rampas + "<br/>Sanitarios para discapacitados: " + feature.properties.sanitarios + "<br/>Elevadores para discapacitados: " + feature.properties.elevador + "<br/>Plataformas para discapacitados: " + feature.properties.plataforma + "<br/>Barandales para discapacitados: " + feature.properties.barandales + "<br/>Señalizaciones para discapacitados: " + feature.properties.señalizac + "<br/>Dispositivos de sistema braille: " + feature.properties.braille +"<br/>espacio_au: "+feature.properties.espacio_au + "<br/>Aulas especiales o Aulas específicas: " + feature.properties.aulas_espe + "<br/>Cajón de estacionamineto: " + feature.properties.cajones_es + "<br/>Vulnerabilidad: " + feature.properties.vulnerabil + "<br/>Factor de riesgo: " + feature.properties.factor_de_ + "<br/>Titular: " + feature.properties.titular + "<br/>Reporte 19: " + feature.properties.reporte_19 +  "<br/>Solicitud: " + feature.properties.solicitude +"<br/>Protección civil: " + feature.properties.pc + "<br/>Riesgos químicos tecnológicos: " + feature.properties.r_q_t + "<br/>Sustancias peligrosas principales: " + feature.properties.s_p_p + "<br/>Residuos peligrosos sólidos generados: " + feature.properties.r_p_s_g + "<br/>Peligrosidad de residuos peligrosos sólidos: " + feature.properties.r_p_s_g_p + "<br/>Residuos Peligrosos líquidos generados: " + feature.properties.r_p_l_g + "<br/>Peligrosidad de residuos líquidos generados: " + feature.properties.r_p_l_p + "<br/>Fluidos conducidos en tuberías: " + feature.properties.f_c_t + "<br/>Gases de uso común, tipo de cilindro contenedor: " + feature.properties.g_u_c + "<br/>Gases de uso común, tipo de cilindro contenedor: " + feature.properties.g_u_c_t_c + "<br/>Cilindro gas LP (Cantidad): " + feature.properties.c_g_l_p_c + "<br/>Cilindro gas LP (Litro): " + feature.properties.c_g_lp_cp + "<br/>Riesgos Circundantes: " + feature.properties.r_c + "<br/>Video 3D:<video  width='320' height='240' autoplay loop controls><source src='videos/"+feature.properties.videos_3d+"' type='video/mp4'>Your browser does not support the video tag.</video><br/>Reporte de Incidencias: " + feature.properties.url_doc + "<br/>Modelo:<model-viewer src='modelos/" +feature.properties.modelo+"' ar quick.look.browsers='safari chrome' ar-modes='scene-viewer webxr' poster='esp.png' reveal='auto' camera-controls enable-pan ></model-viewer>";
				//document.getElementById('Linfo').innerHTML = pcont;
				var gener = "Dependencia: " + feature.properties.dependenci + "</br>Nombre de entidad: "+ feature.properties.nom_ent + "<br/>Titular: " + feature.properties.titular + "<br/>Edificio: "+ feature.properties.edificios +  "<br/> Uso de cada edificio: " + feature.properties.usos_ + "<br/> N° de pisos: " + feature.properties.num_pisos + "</br> Url web institucional: " + feature.properties.url_ins;
				document.getElementById('General').innerHTML = gener;

				var PC = "N° de extintores: " + feature.properties.extintores + "<br/>N° de hidrantes: " + feature.properties.hidrantes +  "<br/>Brigada de evacuación: " + feature.properties.b_e + "<br/>Brigada de primeros auxilios: " + feature.properties.b_p_a + "<br/>Brigada de manejo de extintores: " + feature.properties.b_m_e + "<br/>Brigada de búsqueda y rescate: " + feature.properties.b_b_r +  "<br/>Alerta sísmica automatizada audible: " + feature.properties.a_s_a_a + "<br/>Alarma contra incendios: " + feature.properties.a_c_i + "</br>Accesibilidad para personas con discapacidad: " + feature.properties.apcd;
				document.getElementById('ProteccionCivil').innerHTML = PC;

				
				var RyP = "Peligro: " + feature. properties.Peligros + "</br>Vulnerabilidad: " + feature.properties.Vulnerabilidad +  "<br/>Sustancias peligrosas principales: " + feature.properties.s_p_p +  "<br/>Fluidos conducidos en tuberías: " + feature.properties.f_c_t ;
				document.getElementById('RyP').innerHTML = RyP;

				var Docs = "Video 3D:<video  width='320' height='240' autoplay loop controls><source src='videos/"+feature.properties.url_videos+"' type='video/mp4'>Your browser does not support the video tag.</video>" + "<br/>Modelo:<model-viewer src='modelos/" +feature.properties.url_modelo+"' ar quick.look.browsers='safari chrome' ar-modes='scene-viewer webxr' poster='esp.png' reveal='auto' camera-controls enable-pan ></model-viewer>";
				document.getElementById('Docs').innerHTML = Docs;

			});
    	}
  	}).addTo(EP);
	
	
});

//-----------------------prueba de filtro-----------------

//--------------------------------------------------------------
///coordenadas del cursos
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

//---------------------------------------DRAG'NDROP---------------------------------------------------------------------------------------
var dndlayers =[];
var controldnd = L.Control.fileLayerLoad({
	position: 'topright',
	layer: L.geoJson,
	layerOptions: {style: {color:'red'}},
	addToMap: true,
	fileSizeLimit: 500000,
	formats: [
		'.geojson',
		'.gpx',
		'.kml',
	],
	
});

controldnd.addTo(mapa);

var controlContainer = controldnd.getContainer();
var anchorElement = controlContainer.querySelector('.leaflet-control-filelayer');
anchorElement.classList.add('custom-file-layer-control');

var layerswitcherCreated;
var layerswitcher;

controldnd.loader.on('data:loaded', function (event) {
	if (!layerswitcherCreated) {
	  	layerswitcher = L.control.layers().addTo(mapa);
	  	layerswitcherCreated = true;

	  	var layerswitcherContainer = layerswitcher.getContainer();
        layerswitcherContainer.classList.add('capas-usr')

       
	}
  
	layerswitcher.addOverlay(event.layer, event.filename);
	dndlayers.push(event.filename);
  

	event.layer.addTo(mapa); 

});
  
controldnd.loader.on('data:error', function (error) {
	console.error(error);
});



////-------------------------------------------------------- Información Universitaria--------------------------------------------------
EP.name = "Edificios";
cluster_UNAM.name = "Dependencias agrupadas"


function dep() {
	return L.layerGroup([
		cluster_UNAM,
		Dunam,	
	]);
}

var depe = dep();
var Linfocont = document.getElementById('Linfo');
var adep = document.getElementById('depend');

function addLayerGroupCheckboxes(depe, container, ) {
  // leyers del layergroup
	var layers = depe.getLayers();
	
  // Loop para cada capa para crear el check
	for (var i = 0; i < layers.length; i++) {
		var layer = layers[i];
    	var name = layer.name;
		//console.log(layer.name);
    	// Crea la checkbox
    	var checkbox = L.DomUtil.create('input', 'leaflet-control-layers-selector');
    	checkbox.type = 'checkbox';
    	checkbox.value = name;
    	checkbox.checked = mapa.hasLayer(layer);

		var br = L.DomUtil.create('br');
 	   // crea la etiqueta del checkbox
    	var label = L.DomUtil.create('label', 'leaflet-control-layers-label');
    	label.innerHTML = name;
		//prueba
		;
		//div para cada checkbox y label
		var checkboxContainer = L.DomUtil.create('div', 'checkbox-container');
		checkboxContainer.appendChild(checkbox);
		checkboxContainer.appendChild(label);
		//prueba
		checkboxContainer.appendChild(br);
		//checkboxContainer.appendChild(iconZ);

    	// añade checkbox y contenedor a un contenedor final
		//container.appendChild(checkboxContainer);

		
	
    	// control de visibilidad para cada capa 
		(function (layer, checkboxContainer) {
			L.DomEvent.on(checkbox, 'click', function(){
				if(this.checked) {
					layer.addTo(mapa);
					//
					var img = L.DomUtil.create('img');
					img.src = layer.options.iconUrl;
					img.style.display = 'width:45px';
					checkboxContainer.appendChild(img);

					img.id = layer.name+'L';
				} else {
					mapa.removeLayer(layer);
					var l = layer.name+'L';
					var borrar = document.getElementById(l);
					borrar.remove();
					console.log('apagada');
					
				}
			});
		})(layer, checkboxContainer);
		//
		container.appendChild(checkboxContainer);
		//

  	}
}
addLayerGroupCheckboxes(depe, adep);

function createLayerGroupIU() {
	return L.layerGroup([
		//cluster_UNAM,
		//Dunam,
		PrediosUNAM
		
	]);
}

var lg = createLayerGroupIU();
var Linfocont = document.getElementById('Linfo');
var a1 = document.getElementById('X');

function addLayerGroupCheckboxes(lg, container, ) {
  // leyers del layergroup
	var layers = lg.getLayers();
	
  // Loop para cada capa para crear el check
	for (var i = 0; i < layers.length; i++) {
		var layer = layers[i];
    	var name = layer.name;
		//console.log(layer.name);
    	// Crea la checkbox
    	var checkbox = L.DomUtil.create('input', 'leaflet-control-layers-selector');
    	checkbox.type = 'checkbox';
    	checkbox.value = name;
    	checkbox.checked = mapa.hasLayer(layer);

		var br = L.DomUtil.create('br');
 	   // crea la etiqueta del checkbox
    	var label = L.DomUtil.create('label', 'leaflet-control-layers-label');
    	label.innerHTML = name;
		//prueba
		;
		//div para cada checkbox y label
		var checkboxContainer = L.DomUtil.create('div', 'checkbox-container');
		checkboxContainer.appendChild(checkbox);
		checkboxContainer.appendChild(label);
		//prueba
		checkboxContainer.appendChild(br);
		//checkboxContainer.appendChild(iconZ);

    	// añade checkbox y contenedor a un contenedor final
		//container.appendChild(checkboxContainer);

	
    	// control de visibilidad para cada capa 
		(function (layer, checkboxContainer) {
			L.DomEvent.on(checkbox, 'click', function(){
				if(this.checked) {
					layer.addTo(mapa);
					//
					var img = L.DomUtil.create('img');
					img.src = layer.options.iconUrl;
					img.style.display = 'width:45px';
					checkboxContainer.appendChild(img);

					img.id = layer.name+'L';
				} else {
					mapa.removeLayer(layer);
					var l = layer.name+'L';
					var borrar = document.getElementById(l);
					borrar.remove();
					console.log('apagada');
					
				}
			});
		})(layer, checkboxContainer);
		//
		container.appendChild(checkboxContainer);
		//

  	}
}
addLayerGroupCheckboxes(lg, a1);

     //----------------------------------
	 //------------------Capas con despliegue de información extra-------------------
function createLayerGroupIUV() {
	return L.layerGroup([
		EP,
	
	]);
}

var lgV = createLayerGroupIUV();
	
var a1V = document.getElementById('V');
var Linfo = document.getElementById('Linfo');

function addLayerGroupCheckboxes(lgV, container, Linfo) {
	  // leyers del layergroup
	var layers = lgV.getLayers();
		
	  // Loop para cada capa para crear el check
	for (var i = 0; i < layers.length; i++) {
		var layer = layers[i];
		var name = layer.name;
		
			// Crea la checkbox
		var checkbox = L.DomUtil.create('input', 'leaflet-control-layers-selector');
		checkbox.type = 'checkbox';
		checkbox.value = name;
		checkbox.checked = mapa.hasLayer(layer);
	
		var br = L.DomUtil.create('br');
			// crea la etiqueta del checkbox
		var label = L.DomUtil.create('label', 'leaflet-control-layers-label');
		label.innerHTML = name;
			//prueba
	
			//div para cada checkbox y label
		var checkboxContainer = L.DomUtil.create('div', 'checkbox-container');
		checkboxContainer.appendChild(checkbox);
		checkboxContainer.appendChild(label);
			//prueba
		checkboxContainer.appendChild(br);
			//checkboxContainer.appendChild(iconZ);
	
			// añade checkbox y contenedor a un contenedor final
			//container.appendChild(checkboxContainer);
	
	
			// control de visibilidad para cada capa 
		(function (layer, checkboxContainer, Linfo) {
			L.DomEvent.on(checkbox, 'click', function(){
				if(this.checked) {
					layer.addTo(mapa);
						//
					var img = L.DomUtil.create('img');
					img.src = layer.options.iconUrl;
					img.style.display = 'width:45px';
					checkboxContainer.appendChild(img);
	
					img.id = layer.name+'L';
					
					console.log(_layers);
					
				} else {
					mapa.removeLayer(layer);
					var l = layer.name+'L';
					var borrar = document.getElementById(l);
					borrar.remove();
					Linfo.innerHTML= '';
				}
			});
		})(layer, checkboxContainer, Linfo);
			//
		container.appendChild(checkboxContainer);
			//
	
		}
}
addLayerGroupCheckboxes(lgV, a1V, Linfo);
//-------------------------------------------------------------------------------------
function createLayerGroupIUV2() {
	return L.layerGroup([
		CUinund,
		FMIXC,
		incend,
	]);
}

var lgV2 = createLayerGroupIUV2();
	
var a1V2 = document.getElementById('IE');


function addLayerGroupCheckboxes(lgV2, container, ) {
	  // leyers del layergroup
	var layers = lgV2.getLayers();
		
	  // Loop para cada capa para crear el check
	for (var i = 0; i < layers.length; i++) {
		var layer = layers[i];
		var name = layer.name;
		
			// Crea la checkbox
		var checkbox = L.DomUtil.create('input', 'leaflet-control-layers-selector');
		checkbox.type = 'checkbox';
		checkbox.value = name;
		checkbox.checked = mapa.hasLayer(layer);
	
		var br = L.DomUtil.create('br');
			// crea la etiqueta del checkbox
		var label = L.DomUtil.create('label', 'leaflet-control-layers-label');
		label.innerHTML = name;
			//prueba
	
			//div para cada checkbox y label
		var checkboxContainer = L.DomUtil.create('div', 'checkbox-container');
		checkboxContainer.appendChild(checkbox);
		checkboxContainer.appendChild(label);
			//prueba
		checkboxContainer.appendChild(br);
			//checkboxContainer.appendChild(iconZ);
	
			// añade checkbox y contenedor a un contenedor final
			//container.appendChild(checkboxContainer);
	
	
			// control de visibilidad para cada capa 
		(function (layer, checkboxContainer, Linfo) {
			L.DomEvent.on(checkbox, 'click', function(){
				if(this.checked) {
					layer.addTo(mapa);
						//
					var img = L.DomUtil.create('img');
					img.src = layer.options.iconUrl;
					img.style.display = 'width:45px';
					checkboxContainer.appendChild(img);
	
					img.id = layer.name+'L';
					
					console.log(_layers);
					
				} else {
					mapa.removeLayer(layer);
					var l = layer.name+'L';
					var borrar = document.getElementById(l);
					borrar.remove();
					Linfo.innerHTML= '';
				}
			});
		})(layer, checkboxContainer, Linfo);
			//
		container.appendChild(checkboxContainer);
			//
	
		}
}
addLayerGroupCheckboxes(lgV2, a1V2);

//----------------------------------------------------------ATencion univ

function createLayerGroupatm() {
	return L.layerGroup([
		senderos_unam,
		BotonsSOS,
		zonas_unam,
		rep,
		Gbomb,
	]);
}

var lgatm = createLayerGroupatm();
	
var a1atm = document.getElementById('atm');


function addLayerGroupCheckboxes(lgatm, container, ) {
	  // leyers del layergroup
	var layers = lgatm.getLayers();
		
	  // Loop para cada capa para crear el check
	for (var i = 0; i < layers.length; i++) {
		var layer = layers[i];
		var name = layer.name;
		
			// Crea la checkbox
		var checkbox = L.DomUtil.create('input', 'leaflet-control-layers-selector');
		checkbox.type = 'checkbox';
		checkbox.value = name;
		checkbox.checked = mapa.hasLayer(layer);
	
		var br = L.DomUtil.create('br');
			// crea la etiqueta del checkbox
		var label = L.DomUtil.create('label', 'leaflet-control-layers-label');
		label.innerHTML = name;
			//prueba
	
			//div para cada checkbox y label
		var checkboxContainer = L.DomUtil.create('div', 'checkbox-container');
		checkboxContainer.appendChild(checkbox);
		checkboxContainer.appendChild(label);
			//prueba
		checkboxContainer.appendChild(br);
			//checkboxContainer.appendChild(iconZ);
	
			// añade checkbox y contenedor a un contenedor final
			//container.appendChild(checkboxContainer);
	
	
			// control de visibilidad para cada capa 
		(function (layer, checkboxContainer, Linfo) {
			L.DomEvent.on(checkbox, 'click', function(){
				if(this.checked) {
					layer.addTo(mapa);
						//
					var img = L.DomUtil.create('img');
					img.src = layer.options.iconUrl;
					img.style.display = 'width:45px';
					checkboxContainer.appendChild(img);
	
					img.id = layer.name+'L';
					
					console.log(_layers);
					
				} else {
					mapa.removeLayer(layer);
					var l = layer.name+'L';
					var borrar = document.getElementById(l);
					borrar.remove();
					Linfo.innerHTML= '';
				}
			});
		})(layer, checkboxContainer, Linfo);
			//
		container.appendChild(checkboxContainer);
			//
	
		}
}
addLayerGroupCheckboxes(lgatm, a1atm);

//-------------------------------------------------------------------------------------
function createLayerGroupIUV3() {
	return L.layerGroup([
		vias,
		bicip,
		bicicen,
		ParadaPBr1,
		PBR1,
		ParadaPBr2,
		PBR2,
		ParadaPBr3,
		PBR3,
		ParadaPBr4,
		PBR4,
		ParadaPBr5,
		PBR5,
		ParadaPBr6,
		PBR6,
		ParadaPBr7,
		PBR7,
		ParadaPBr8,
		PBR8,
		ParadaPBr9,
		PBR9,
		ParadaPBr10,
		PBR10,
		ParadaPBr11,
		PBR11,
		ParadaPBr12,
		PBR12,
		ParadaPBr13,
		PBR13
	]);
}

var lgV3 = createLayerGroupIUV3();
	
var a1V3 = document.getElementById('dm');


function addLayerGroupCheckboxes(lgV3, container, ) {
	  // leyers del layergroup
	var layers = lgV3.getLayers();
		
	  // Loop para cada capa para crear el check
	for (var i = 0; i < layers.length; i++) {
		var layer = layers[i];
		var name = layer.name;
		
			// Crea la checkbox
		var checkbox = L.DomUtil.create('input', 'leaflet-control-layers-selector');
		checkbox.type = 'checkbox';
		checkbox.value = name;
		checkbox.checked = mapa.hasLayer(layer);
	
		var br = L.DomUtil.create('br');
			// crea la etiqueta del checkbox
		var label = L.DomUtil.create('label', 'leaflet-control-layers-label');
		label.innerHTML = name;
			//prueba
	
			//div para cada checkbox y label
		var checkboxContainer = L.DomUtil.create('div', 'checkbox-container');
		checkboxContainer.appendChild(checkbox);
		checkboxContainer.appendChild(label);
			//prueba
		checkboxContainer.appendChild(br);
			//checkboxContainer.appendChild(iconZ);
	
			// añade checkbox y contenedor a un contenedor final
			//container.appendChild(checkboxContainer);
	
	
			// control de visibilidad para cada capa 
		(function (layer, checkboxContainer, Linfo) {
			L.DomEvent.on(checkbox, 'click', function(){
				if(this.checked) {
					layer.addTo(mapa);
						//
					var img = L.DomUtil.create('img');
					img.src = layer.options.iconUrl;
					img.style.display = 'width:45px';
					checkboxContainer.appendChild(img);
	
					img.id = layer.name+'L';
					
					console.log(_layers);
					
				} else {
					mapa.removeLayer(layer);
					var l = layer.name+'L';
					var borrar = document.getElementById(l);
					borrar.remove();
					Linfo.innerHTML= '';
				}
			});
		})(layer, checkboxContainer, Linfo);
			//
		container.appendChild(checkboxContainer);
			//
	
		}
}
addLayerGroupCheckboxes(lgV3, a1V3);




//---------------------------------------------------------------/ información Universitaria---------------------------------------

//-------------------------------------------------------------- Monitoreo de Fenómenos-----------------------------------------------

function MonFen() {
	return L.layerGroup([
		idpgis_noaa,
		UltimosSismos,
		//vid1,
		vid2,
		nrgb,
		//idpgisP,
		//ct_noaa,
		TempM,
		PrTemp,
		Seqm,
	]);
}

var MF = MonFen();

var a2 = document.getElementById('MF');

function addLayerGroupCheckboxes(MF, container) {
  // leyers del layergroup
	var layers = MF.getLayers();
	
  // Loop para cada capa para crear el check
	for (var i = 0; i < layers.length; i++) {
		var layer = layers[i];
    	var name = layer.name;
		//console.log(layer.name);
    	// Crea la checkbox
    	var checkbox = L.DomUtil.create('input', 'leaflet-control-layers-selector');
    	checkbox.type = 'checkbox';
    	checkbox.value = name;
    	checkbox.checked = mapa.hasLayer(layer);

		var br = L.DomUtil.create('br');
 	   // crea la etiqueta del checkbox
    	var label = L.DomUtil.create('label', 'leaflet-control-layers-label');
    	label.innerHTML = name;
		//prueba

		//div para cada checkbox y label
		var checkboxContainer = L.DomUtil.create('div', 'checkbox-container');
		checkboxContainer.appendChild(checkbox);
		checkboxContainer.appendChild(label);
		//prueba
		checkboxContainer.appendChild(br);
		//checkboxContainer.appendChild(iconZ);

    	// añade checkbox y contenedor a un contenedor final
		//container.appendChild(checkboxContainer);

	
    	// control de visibilidad para cada capa 
		(function (layer, checkboxContainer) {
			L.DomEvent.on(checkbox, 'click', function(){
				if(this.checked) {
					layer.addTo(mapa);
					//
					var img = L.DomUtil.create('img');
					img.src = layer.options.iconUrl;
					img.style.display = 'width:45px';
					checkboxContainer.appendChild(img);
					
					img.id = layer.name+'L';

				} else {
					mapa.removeLayer(layer);
					var l = layer.name+'L';
					var borrar = document.getElementById(l);
					borrar.remove();
				}
			});
		})(layer, checkboxContainer);
		//
		container.appendChild(checkboxContainer);
		//

  	}
}
addLayerGroupCheckboxes(MF, a2);
//------------------------------------------------------------Segundo Simulacro Nacional 2023 

function SSN23() {
	return L.layerGroup([
		simOD,
		simER,
		sismoN,
		sismoS,
		//idpgisP,
		//ct_noaa,
	]);
}

var SSn = SSN23();

var aS = document.getElementById('SSN2023');

function addLayerGroupCheckboxes(SSn, container) {
  // leyers del layergroup
	var layers = SSn.getLayers();
	
  // Loop para cada capa para crear el check
	for (var i = 0; i < layers.length; i++) {
		var layer = layers[i];
    	var name = layer.name;
		//console.log(layer.name);
    	// Crea la checkbox
    	var checkbox = L.DomUtil.create('input', 'leaflet-control-layers-selector');
    	checkbox.type = 'checkbox';
    	checkbox.value = name;
    	checkbox.checked = mapa.hasLayer(layer);

		var br = L.DomUtil.create('br');
 	   // crea la etiqueta del checkbox
    	var label = L.DomUtil.create('label', 'leaflet-control-layers-label');
    	label.innerHTML = name;
		//prueba

		//div para cada checkbox y label
		var checkboxContainer = L.DomUtil.create('div', 'checkbox-container');
		checkboxContainer.appendChild(checkbox);
		checkboxContainer.appendChild(label);
		//prueba
		checkboxContainer.appendChild(br);
		//checkboxContainer.appendChild(iconZ);

    	// añade checkbox y contenedor a un contenedor final
		//container.appendChild(checkboxContainer);

	
    	// control de visibilidad para cada capa 
		(function (layer, checkboxContainer) {
			L.DomEvent.on(checkbox, 'click', function(){
				if(this.checked) {
					layer.addTo(mapa);
					//
					var img = L.DomUtil.create('img');
					img.src = layer.options.iconUrl;
					img.style.display = 'width:45px';
					checkboxContainer.appendChild(img);
					
					img.id = layer.name+'L';

				} else {
					mapa.removeLayer(layer);
					var l = layer.name+'L';
					var borrar = document.getElementById(l);
					borrar.remove();
				}
			});
		})(layer, checkboxContainer);
		//
		container.appendChild(checkboxContainer);
		//

  	}
}
addLayerGroupCheckboxes(SSn, aS);


function SSN24() {
	return L.layerGroup([
		simul24,
	]);
}

var SSn4 = SSN24();

var aS4 = document.getElementById('SSN2024');

function addLayerGroupCheckboxes(SSn4, container) {
  // leyers del layergroup
	var layers = SSn4.getLayers();
	
  // Loop para cada capa para crear el check
	for (var i = 0; i < layers.length; i++) {
		var layer = layers[i];
    	var name = layer.name;
		//console.log(layer.name);
    	// Crea la checkbox
    	var checkbox = L.DomUtil.create('input', 'leaflet-control-layers-selector');
    	checkbox.type = 'checkbox';
    	checkbox.value = name;
    	checkbox.checked = mapa.hasLayer(layer);

		var br = L.DomUtil.create('br');
 	   // crea la etiqueta del checkbox
    	var label = L.DomUtil.create('label', 'leaflet-control-layers-label');
    	label.innerHTML = name;
		//prueba

		//div para cada checkbox y label
		var checkboxContainer = L.DomUtil.create('div', 'checkbox-container');
		checkboxContainer.appendChild(checkbox);
		checkboxContainer.appendChild(label);
		//prueba
		checkboxContainer.appendChild(br);
		//checkboxContainer.appendChild(iconZ);

    	// añade checkbox y contenedor a un contenedor final
		//container.appendChild(checkboxContainer);

	
    	// control de visibilidad para cada capa 
		(function (layer, checkboxContainer) {
			L.DomEvent.on(checkbox, 'click', function(){
				if(this.checked) {
					layer.addTo(mapa);
					//
					var img = L.DomUtil.create('img');
					img.src = layer.options.iconUrl;
					img.style.display = 'width:45px';
					checkboxContainer.appendChild(img);
					
					img.id = layer.name+'L';

				} else {
					mapa.removeLayer(layer);
					var l = layer.name+'L';
					var borrar = document.getElementById(l);
					borrar.remove();
				}
			});
		})(layer, checkboxContainer);
		//
		container.appendChild(checkboxContainer);
		//

  	}
}
addLayerGroupCheckboxes(SSn4, aS4);

//--------------------------------------------------------------/Monitoreo de Fenómenos---------------------------------------------

//-------------------------------------------------------------- Información de fenómenos-----------------------------------------------
FG_Volcanes.name = "Volcanes Activos";
  //----------------------------------------------------------------------volcánes activos------------------

  function InfDFV() {
	return L.layerGroup([
		FG_Volcanes,
		
	]);
}

var IV = InfDFV();

var a3 = document.getElementById('IV');

function addLayerGroupCheckboxes(IFV, container) {
  // leyers del layergroup
	var layers = IFV.getLayers();
	
  // Loop para cada capa para crear el check
	for (var i = 0; i < layers.length; i++) {
		var layer = layers[i];
    	var name = layer.name;
		
    	// Crea la checkbox
    	var checkbox = L.DomUtil.create('input', 'leaflet-control-layers-selector');
    	checkbox.type = 'checkbox';
    	checkbox.value = name;
    	checkbox.checked = mapa.hasLayer(layer);

		var br = L.DomUtil.create('br');
 	   // crea la etiqueta del checkbox
    	var label = L.DomUtil.create('label', 'leaflet-control-layers-label');
    	label.innerHTML = name;
		//prueba

		//div para cada checkbox y label
		var checkboxContainer = L.DomUtil.create('div', 'checkbox-container');
		checkboxContainer.appendChild(checkbox);
		checkboxContainer.appendChild(label);
		//prueba
		checkboxContainer.appendChild(br);

    	// control de visibilidad para cada capa 
		(function (layer, checkboxContainer) {
			L.DomEvent.on(checkbox, 'click', function(){
				if(this.checked) {
					layer.addTo(mapa);
					//
					var img = L.DomUtil.create('img');
					img.src = layer.options.iconUrl;
					img.style.display = 'width:45px';
					checkboxContainer.appendChild(img);

					img.id = layer.name+'L';

				} else {
					mapa.removeLayer(layer);
					var l = layer.name+'L';
					var borrar = document.getElementById(l);
					borrar.remove();
				}
			});
		})(layer, checkboxContainer);
		//
		container.appendChild(checkboxContainer);
		//

  	}
}
addLayerGroupCheckboxes(IV, a3);

  //--------------------------------------------------------------------Popocatépetl--------------------
function InfDFenomV() {
	return L.layerGroup([
		VolPopo,
		VPopo_IGCENAPRED_AV,
		VPopo_IGCENAPRED_BAL,
		VPopo_IGCENAPRED_CEN,
		VPopo_IGCENAPRED_FPOP,
		VPopo_IGCENAPRED_LH,
		VPopo_IGCENAPRED_LAV,
		VPopo_IGCENAPRED_S_ZETP,
		VPopo_IGCENAPRED_S_AL,
	]);
}

var IFV = InfDFenomV();

var a3 = document.getElementById('IFV');

function addLayerGroupCheckboxes(IFV, container) {
  // leyers del layergroup
	var layers = IFV.getLayers();
	
  // Loop para cada capa para crear el check
	for (var i = 0; i < layers.length; i++) {
		var layer = layers[i];
    	var name = layer.name;
		
    	// Crea la checkbox
    	var checkbox = L.DomUtil.create('input', 'leaflet-control-layers-selector');
    	checkbox.type = 'checkbox';
    	checkbox.value = name;
    	checkbox.checked = mapa.hasLayer(layer);

		var br = L.DomUtil.create('br');
 	   // crea la etiqueta del checkbox
    	var label = L.DomUtil.create('label', 'leaflet-control-layers-label');
    	label.innerHTML = name;
		//prueba

		//div para cada checkbox y label
		var checkboxContainer = L.DomUtil.create('div', 'checkbox-container');
		checkboxContainer.appendChild(checkbox);
		checkboxContainer.appendChild(label);
		//prueba
		checkboxContainer.appendChild(br);

    	// control de visibilidad para cada capa 
		(function (layer, checkboxContainer) {
			L.DomEvent.on(checkbox, 'click', function(){
				if(this.checked) {
					layer.addTo(mapa);
					//
					var img = L.DomUtil.create('img');
					img.src = layer.options.iconUrl;
					img.style.display = 'width:45px';
					checkboxContainer.appendChild(img);

					img.id = layer.name+'L';

				} else {
					mapa.removeLayer(layer);
					var l = layer.name+'L';
					var borrar = document.getElementById(l);
					borrar.remove();
				}
			});
		})(layer, checkboxContainer);
		//
		container.appendChild(checkboxContainer);
		//

  	}
}
addLayerGroupCheckboxes(IFV, a3);
  //---------------------------------------------------------sismos--------------------------------------------
  function InfSIS() {
	return L.layerGroup([
		Sism7s17,
		Sism19s17,
		PSIS,
		Zonas,
	]);
}

var SIS = InfSIS();

var a5 = document.getElementById('SIS');

function addLayerGroupCheckboxes(SIS, container) {
  // leyers del layergroup
	var layers = SIS.getLayers();
	
  // Loop para cada capa para crear el check
	for (var i = 0; i < layers.length; i++) {
		var layer = layers[i];
    	var name = layer.name;
		
    	// Crea la checkbox
    	var checkbox = L.DomUtil.create('input', 'leaflet-control-layers-selector');
    	checkbox.type = 'checkbox';
    	checkbox.value = name;
    	checkbox.checked = mapa.hasLayer(layer);

		var br = L.DomUtil.create('br');
 	   // crea la etiqueta del checkbox
    	var label = L.DomUtil.create('label', 'leaflet-control-layers-label');
    	label.innerHTML = name;
		//prueba

		//div para cada checkbox y label
		var checkboxContainer = L.DomUtil.create('div', 'checkbox-container');
		checkboxContainer.appendChild(checkbox);
		checkboxContainer.appendChild(label);
		//prueba
		checkboxContainer.appendChild(br);

    	// control de visibilidad para cada capa 
		(function (layer, checkboxContainer) {
			L.DomEvent.on(checkbox, 'click', function(){
				if(this.checked) {
					layer.addTo(mapa);
					//
					var img = L.DomUtil.create('img');
					img.src = layer.options.iconUrl;
					img.style.display = 'width:45px';
					checkboxContainer.appendChild(img);

					img.id = layer.name+'L';

				} else {
					mapa.removeLayer(layer);
					var l = layer.name+'L';
					var borrar = document.getElementById(l);
					borrar.remove();
				}
			});
		})(layer, checkboxContainer);
		//
		container.appendChild(checkboxContainer);
		//

  	}
}
addLayerGroupCheckboxes(SIS, a5);

 //------------------------------------------------------------------hundimientos
function InfH() {
	return L.layerGroup([
		HundimHist,
		Fract,
		VFalFractur,
		VulSocFracAGEB,
	]);
}

var HUN = InfH();

var a6 = document.getElementById('HUN');

function addLayerGroupCheckboxes(HUN, container) {
  // leyers del layergroup
	var layers = HUN.getLayers();
	
  // Loop para cada capa para crear el check
	for (var i = 0; i < layers.length; i++) {
		var layer = layers[i];
    	var name = layer.name;
		
    	// Crea la checkbox
    	var checkbox = L.DomUtil.create('input', 'leaflet-control-layers-selector');
    	checkbox.type = 'checkbox';
    	checkbox.value = name;
    	checkbox.checked = mapa.hasLayer(layer);

		var br = L.DomUtil.create('br');
 	   // crea la etiqueta del checkbox
    	var label = L.DomUtil.create('label', 'leaflet-control-layers-label');
    	label.innerHTML = name;
		//prueba

		//div para cada checkbox y label
		var checkboxContainer = L.DomUtil.create('div', 'checkbox-container');
		checkboxContainer.appendChild(checkbox);
		checkboxContainer.appendChild(label);
		//prueba
		checkboxContainer.appendChild(br);

    	// control de visibilidad para cada capa 
		(function (layer, checkboxContainer) {
			L.DomEvent.on(checkbox, 'click', function(){
				if(this.checked) {
					layer.addTo(mapa);
					//
					var img = L.DomUtil.create('img');
					img.src = layer.options.iconUrl;
					img.style.display = 'width:45px';
					checkboxContainer.appendChild(img);

					img.id = layer.name+'L';

				} else {
					mapa.removeLayer(layer);
					var l = layer.name+'L';
					var borrar = document.getElementById(l);
					borrar.remove();
				}
			});
		})(layer, checkboxContainer);
		//
		container.appendChild(checkboxContainer);
		//

  	}
}
addLayerGroupCheckboxes(HUN, a6);

  //-------------------------tsunamis
function tsunam() {
	return L.layerGroup([
		Tsunamis
	]);
}

var TSU = tsunam();

var a7 = document.getElementById('TSU');

function addLayerGroupCheckboxes(TSU, container) {
  // leyers del layergroup
	var layers = TSU.getLayers();
	
  // Loop para cada capa para crear el check
	for (var i = 0; i < layers.length; i++) {
		var layer = layers[i];
    	var name = layer.name;
		
    	// Crea la checkbox
    	var checkbox = L.DomUtil.create('input', 'leaflet-control-layers-selector');
    	checkbox.type = 'checkbox';
    	checkbox.value = name;
    	checkbox.checked = mapa.hasLayer(layer);

		var br = L.DomUtil.create('br');
 	   // crea la etiqueta del checkbox
    	var label = L.DomUtil.create('label', 'leaflet-control-layers-label');
    	label.innerHTML = name;
		//prueba

		//div para cada checkbox y label
		var checkboxContainer = L.DomUtil.create('div', 'checkbox-container');
		checkboxContainer.appendChild(checkbox);
		checkboxContainer.appendChild(label);
		//prueba
		checkboxContainer.appendChild(br);

    	// control de visibilidad para cada capa 
		(function (layer, checkboxContainer) {
			L.DomEvent.on(checkbox, 'click', function(){
				if(this.checked) {
					layer.addTo(mapa);
					//
					var img = L.DomUtil.create('img');
					img.src = layer.options.iconUrl;
					img.style.display = 'width:45px';
					checkboxContainer.appendChild(img);

					img.id = layer.name+'L';

				} else {
					mapa.removeLayer(layer);
					var l = layer.name+'L';
					var borrar = document.getElementById(l);
					borrar.remove();
				}
			});
		})(layer, checkboxContainer);
		//
		container.appendChild(checkboxContainer);
		//

  	}
}
addLayerGroupCheckboxes(TSU, a7);

 //-------------------------------------------Susceptibilidad de laderas---------------------

function Laderas() {
	return L.layerGroup([
		SuscepLad,
	]);
}

var LAD = Laderas();

var a8 = document.getElementById('LAD');

function addLayerGroupCheckboxes(LAD, container) {
  // leyers del layergroup
	var layers = LAD.getLayers();
	
  // Loop para cada capa para crear el check
	for (var i = 0; i < layers.length; i++) {
		var layer = layers[i];
    	var name = layer.name;
		
    	// Crea la checkbox
    	var checkbox = L.DomUtil.create('input', 'leaflet-control-layers-selector');
    	checkbox.type = 'checkbox';
    	checkbox.value = name;
    	checkbox.checked = mapa.hasLayer(layer);

		var br = L.DomUtil.create('br');
 	   // crea la etiqueta del checkbox
    	var label = L.DomUtil.create('label', 'leaflet-control-layers-label');
    	label.innerHTML = name;
		//prueba

		//div para cada checkbox y label
		var checkboxContainer = L.DomUtil.create('div', 'checkbox-container');
		checkboxContainer.appendChild(checkbox);
		checkboxContainer.appendChild(label);
		//prueba
		checkboxContainer.appendChild(br);

    	// control de visibilidad para cada capa 
		(function (layer, checkboxContainer) {
			L.DomEvent.on(checkbox, 'click', function(){
				if(this.checked) {
					layer.addTo(mapa);
					//
					var img = L.DomUtil.create('img');
					img.src = layer.options.iconUrl;
					img.style.display = 'width:45px';
					checkboxContainer.appendChild(img);

					img.id = layer.name+'L';

				} else {
					mapa.removeLayer(layer);
					var l = layer.name+'L';
					var borrar = document.getElementById(l);
					borrar.remove();
				}
			});
		})(layer, checkboxContainer);
		//
		container.appendChild(checkboxContainer);
		//

  	}
}
addLayerGroupCheckboxes(LAD, a8);

//-----------------------Datos básicos------------------------------
function Dbas() {
	return L.layerGroup([

		Municipios,

		MGEST_ZEE,
		//-----censo 2020
		CE_locrur,
		CE_colonias,
		CE_ManzRur,
		CE_AGBU,
		//-----USyV Serie IV
		USYV_CulAg,
		USYV_EVN,
		USYV_Aforest,
		USYV_ActPec,
		USYV_OtrAct,
		USYV_PIE,
		USYV_LIE,
		USYV_CobertArb,
		USYV_AspMat,
		USYV_NomAg,
		USYV_GrupVeg,
		//------USyV tipos
		USYV_TVeg,
		USYV_TEcos,
		//----USyV anp
		ANPS,
		//---Hidrología, Aguas Subterraneas
		HAS_UnHid,
		HAS_P,
		HAS_PNM,
		HAS_DirF,
		HAS_ACP,
		HAS_OAS,
		//----Hidrología, Aguas Superficiales
		HASup_Rios,
		HASup_Rprincip,
		HASup_CA,
		HASup_Esc,
		HASup_Esc,
		HASup_HumyANP,
		HASup_OASup,
		HASup_RegHidr,
		HASup_PuntMuest,
		//---Climatología, Precipitacvión Nacional 2018
		CLPNac_ISOY24,
		//Marco Geoestadistico
		Estados,
		MGEST_CN,
	]);
}

var DBAS = Dbas();

var a9 = document.getElementById('DBAS');

function addLayerGroupCheckboxes(DBAS, container) {
  // leyers del layergroup
	var layers = DBAS.getLayers();
	
  // Loop para cada capa para crear el check
	for (var i = 0; i < layers.length; i++) {
		var layer = layers[i];
    	var name = layer.name;
		
    	// Crea la checkbox
    	var checkbox = L.DomUtil.create('input', 'leaflet-control-layers-selector');
    	checkbox.type = 'checkbox';
    	checkbox.value = name;
    	checkbox.checked = mapa.hasLayer(layer);

		var br = L.DomUtil.create('br');
 	   // crea la etiqueta del checkbox
    	var label = L.DomUtil.create('label', 'leaflet-control-layers-label');
    	label.innerHTML = name;
		//prueba

		//div para cada checkbox y label
		var checkboxContainer = L.DomUtil.create('div', 'checkbox-container');
		checkboxContainer.appendChild(checkbox);
		checkboxContainer.appendChild(label);
		//prueba
		checkboxContainer.appendChild(br);

    	// control de visibilidad para cada capa 
		(function (layer, checkboxContainer) {
			L.DomEvent.on(checkbox, 'click', function(){
				if(this.checked) {
					layer.addTo(mapa);
					//
					var img = L.DomUtil.create('img');
					img.src = layer.options.iconUrl;
					img.style.display = 'width:45px';
					checkboxContainer.appendChild(img);

					img.id = layer.name+'L';

				} else {
					mapa.removeLayer(layer);
					var l = layer.name+'L';
					var borrar = document.getElementById(l);
					borrar.remove();
				}
			});
		})(layer, checkboxContainer);
		//
		container.appendChild(checkboxContainer);
		//

  	}
}
addLayerGroupCheckboxes(DBAS, a9);
  //------------hidrometeorológicos
function hmeteor() {
	return L.layerGroup([
		HM_SeqEscRiesg,
		HM_Heladas,
		HM_Telect,
		HM_Tgr,
		HM_Tnieve,
		HM_InundPC,
		HM_InundEIxM,
		HM_OGelid,
		GPBTH,
		HM_CTMuni,
		HM_CTmun2,
		
	]);
}

var HidroM = hmeteor();

var a10 = document.getElementById('HidroM');

function addLayerGroupCheckboxes(HidroM, container) {
  // leyers del layergroup
	var layers = HidroM.getLayers();
	
  // Loop para cada capa para crear el check
	for (var i = 0; i < layers.length; i++) {
		var layer = layers[i];
    	var name = layer.name;
		
    	// Crea la checkbox
    	var checkbox = L.DomUtil.create('input', 'leaflet-control-layers-selector');
    	checkbox.type = 'checkbox';
    	checkbox.value = name;
    	checkbox.checked = mapa.hasLayer(layer);

		var br = L.DomUtil.create('br');
 	   // crea la etiqueta del checkbox
    	var label = L.DomUtil.create('label', 'leaflet-control-layers-label');
    	label.innerHTML = name;
		//prueba

		//div para cada checkbox y label
		var checkboxContainer = L.DomUtil.create('div', 'checkbox-container');
		checkboxContainer.appendChild(checkbox);
		checkboxContainer.appendChild(label);
		//prueba
		checkboxContainer.appendChild(br);

    	// control de visibilidad para cada capa 
		(function (layer, checkboxContainer) {
			L.DomEvent.on(checkbox, 'click', function(){
				if(this.checked) {
					layer.addTo(mapa);
					//
					var img = L.DomUtil.create('img');
					img.src = layer.options.iconUrl;
					img.style.display = 'width:45px';
					checkboxContainer.appendChild(img);

					img.id = layer.name+'L';

				} else {
					mapa.removeLayer(layer);
					var l = layer.name+'L';
					var borrar = document.getElementById(l);
					borrar.remove();
					;
				}
			});
		})(layer, checkboxContainer);
		//
		container.appendChild(checkboxContainer);
		//

  	}
}
addLayerGroupCheckboxes(HidroM, a10);
//------------------------------------------------SanitarioEcológicos--------------------------------------------

function SanitEc() {
	return L.layerGroup([
		ContAgua,		
	]);
}

var SanEc = SanitEc();

var aSe = document.getElementById('SanitEcol');

function addLayerGroupCheckboxes(SanEc, container) {
  // leyers del layergroup
	var layers = SanEc.getLayers();
	
  // Loop para cada capa para crear el check
	for (var i = 0; i < layers.length; i++) {
		var layer = layers[i];
    	var name = layer.name;
		
    	// Crea la checkbox
    	var checkbox = L.DomUtil.create('input', 'leaflet-control-layers-selector');
    	checkbox.type = 'checkbox';
    	checkbox.value = name;
    	checkbox.checked = mapa.hasLayer(layer);

		var br = L.DomUtil.create('br');
 	   // crea la etiqueta del checkbox
    	var label = L.DomUtil.create('label', 'leaflet-control-layers-label');
    	label.innerHTML = name;
		//prueba

		//div para cada checkbox y label
		var checkboxContainer = L.DomUtil.create('div', 'checkbox-container');
		checkboxContainer.appendChild(checkbox);
		checkboxContainer.appendChild(label);
		//prueba
		checkboxContainer.appendChild(br);

    	// control de visibilidad para cada capa 
		(function (layer, checkboxContainer) {
			L.DomEvent.on(checkbox, 'click', function(){
				if(this.checked) {
					layer.addTo(mapa);
					//
					var img = L.DomUtil.create('img');
					img.src = layer.options.iconUrl;
					img.style.display = 'width:45px';
					checkboxContainer.appendChild(img);

					img.id = layer.name+'L';

				} else {
					mapa.removeLayer(layer);
					var l = layer.name+'L';
					var borrar = document.getElementById(l);
					borrar.remove();
					;
				}
			});
		})(layer, checkboxContainer);
		//
		container.appendChild(checkboxContainer);
		//

  	}
}
addLayerGroupCheckboxes(SanEc, aSe);

//---------------------------------------------------------QuimicTecngolog------------------------------
function QuimTec() {
	return L.layerGroup([
			InceFores,
			IndSusQuim,	
	]);
}

var QT = QuimTec();

var aQT = document.getElementById('QmTec');

function addLayerGroupCheckboxes(QT, container) {
  // leyers del layergroup
	var layers = QT.getLayers();
	
  // Loop para cada capa para crear el check
	for (var i = 0; i < layers.length; i++) {
		var layer = layers[i];
    	var name = layer.name;
		
    	// Crea la checkbox
    	var checkbox = L.DomUtil.create('input', 'leaflet-control-layers-selector');
    	checkbox.type = 'checkbox';
    	checkbox.value = name;
    	checkbox.checked = mapa.hasLayer(layer);

		var br = L.DomUtil.create('br');
 	   // crea la etiqueta del checkbox
    	var label = L.DomUtil.create('label', 'leaflet-control-layers-label');
    	label.innerHTML = name;
		//prueba

		//div para cada checkbox y label
		var checkboxContainer = L.DomUtil.create('div', 'checkbox-container');
		checkboxContainer.appendChild(checkbox);
		checkboxContainer.appendChild(label);
		//prueba
		checkboxContainer.appendChild(br);

    	// control de visibilidad para cada capa 
		(function (layer, checkboxContainer) {
			L.DomEvent.on(checkbox, 'click', function(){
				if(this.checked) {
					layer.addTo(mapa);
					//
					var img = L.DomUtil.create('img');
					img.src = layer.options.iconUrl;
					img.style.display = 'width:45px';
					checkboxContainer.appendChild(img);

					img.id = layer.name+'L';

				} else {
					mapa.removeLayer(layer);
					var l = layer.name+'L';
					var borrar = document.getElementById(l);
					borrar.remove();
					;
				}
			});
		})(layer, checkboxContainer);
		//
		container.appendChild(checkboxContainer);
		//

  	}
}
addLayerGroupCheckboxes(QT, aQT);
//
function DEN() {
	return L.layerGroup([
		Denue1km21,
		Denue1km22,
		Denue1km324,
		Denue1km325,
		Denue1km326,
		Denue1km62,
		Denue1km71,
		Denue5m21,
		Denue5m22,
		Denue5m324,
		Denue5m325,
		Denue5m326,
		Denue5m562,
		Denue5m62,
		Denue5m71,
		gas1km,
		gas500m,
	]);
}

var DENUE = DEN();

var DENU = document.getElementById('DENUE');

function addLayerGroupCheckboxes(DENUE, container) {
  // leyers del layergroup
	var layers = DENUE.getLayers();
	
  // Loop para cada capa para crear el check
	for (var i = 0; i < layers.length; i++) {
		var layer = layers[i];
    	var name = layer.name;
		
    	// Crea la checkbox
    	var checkbox = L.DomUtil.create('input', 'leaflet-control-layers-selector');
    	checkbox.type = 'checkbox';
    	checkbox.value = name;
    	checkbox.checked = mapa.hasLayer(layer);

		var br = L.DomUtil.create('br');
 	   // crea la etiqueta del checkbox
    	var label = L.DomUtil.create('label', 'leaflet-control-layers-label');
    	label.innerHTML = name;
		//prueba

		//div para cada checkbox y label
		var checkboxContainer = L.DomUtil.create('div', 'checkbox-container');
		checkboxContainer.appendChild(checkbox);
		checkboxContainer.appendChild(label);
		//prueba
		checkboxContainer.appendChild(br);

    	// control de visibilidad para cada capa 
		(function (layer, checkboxContainer) {
			L.DomEvent.on(checkbox, 'click', function(){
				if(this.checked) {
					layer.addTo(mapa);
					//
					var img = L.DomUtil.create('img');
					img.src = layer.options.iconUrl;
					img.style.display = 'width:45px';
					checkboxContainer.appendChild(img);

					img.id = layer.name+'L';

				} else {
					mapa.removeLayer(layer);
					var l = layer.name+'L';
					var borrar = document.getElementById(l);
					borrar.remove();
					;
				}
			});
		})(layer, checkboxContainer);
		//
		container.appendChild(checkboxContainer);
		//

  	}
}
addLayerGroupCheckboxes(DENUE, DENU);



//--------------------------------------------------------------/Información de Fenómenos---------------------------------------------

//------------------------------------------------------------- Herramientas----------------------------------------------------------

//---------------------------------------------prueba de impresión 



//var pdf = mapa.pm.Toolbar.createCustomControl({
//	name: 'pdf',
//	block: 'custom',
//	title: 'Crea PDF',
//	toggle: true,
//	disableByOtherButtons: false,
//	onClick: function(e) {
//
//		function pdf() {
//			html2canvas(document.getElementById('mapa')).then(function(canvas) {
//		
//
//				var mapURL = canvas.toDataURL();
//
//			
//			var docDefinition= {
//				pageSize: 'A4',
//				pageOrientation: 'portrait',
//				content: [
//					{ text: 'mapa1', fontSize: 20, margin: [0,0,0,20]},
//					{ image: mapURL  },
//					{ text: 'cont extra', margin: [0,20,0,0]}
//				]
//			};
//
//
//			pdfMake.createPdf(docDefinition).download('Mapa.pdf');
//		});
//		}
//		
//		pdf();
//	}
//}); 

//---------------------------------------------------------------------

//---------------------------------------------------------------------
const layerNamesArray = [];

mapa.on("layeradd", function (event) {
	const layer = event.layer;

	if(layer.name !== undefined) {
		console.log("añadida:", layer.name);
		layerNamesArray.push(layer.name);
		
	}
});

mapa.on("layerremove", function (event) {
	const layer = event.layer;
	if(layer.name !== undefined) {
		const index = layerNamesArray.indexOf(layer.name);
		if (index !== -1) {
			layerNamesArray.splice(index, 1);
			console.log("Removida:", layer.name);
		}
	}
});
//---------------------------busqueda img---------------------------
const layerImgArray = [];

mapa.on("layeradd", function (event) {
	const layer = event.layer;

	if(layer.name !== undefined) {
		console.log("añadidaIMG:", layer.options.iconUrl);
		console.log("class:", layer.class );
		layerImgArray.push(layer.options.iconUrl);
	
	}
});

mapa.on("layerremove", function (event) {
	const layer = event.layer;
	if(layer.name !== undefined) {
		const index = layerImgArray.indexOf(layer.options.iconUrl);
		if (index !== -1) {
			layerImgArray.splice(index, 1);
			console.log("RemovidaIMG:", layer.options.iconUrl);
		}
	}
});

const userMadeLayers = [];

//----------------capas creadas por usuarios

  
mapa.on('pm:create', function (e) {
	var layer = e.layer;
	userMadeLayers.push(layer);
	console.log("creación de:", userMadeLayers);
});
  
  
mapa.on('pm:remove', function (e) {
	var layer = e.layer;
	var index = userMadeLayers.indexOf(layer);
	if (index !== -1) {
	  userMadeLayers.splice(index, 1); 
	}
});

function getUserMadeLayerNames() {
	  var userMadeLayerNames = [];
	  userMadeLayers.forEach(function(layer) {
		var layerNamec = prompt('Nombre del dibujo:');
		if (layerNamec) {
	  		layer.pm._name = layerNamec; 
	 		userMadeLayers.push(layer); 
		}
			userMadeLayerNames.push(layer.pm._name); 
	  	});
	  return userMadeLayerNames;
}


// sus mediciones---------------------------------------------------------------
const layerMed = [];
mapa.on('pm:create', function (e) {
	var layer = e.layer;
	layerMed.push(layer._popup._content);

}); 
mapa.on('pm:remove', function (e) {
	var layer = e.layer;
	var index = layerMed.indexOf(layer);
	if (index !== -1) {
	  layerMed.splice(index, 1); 
	}
});
//////-----impresión

var browserControl = L.control.browserPrint({
	title: 'Imprimir mapa',
	documentTitle:'Mapa desde el Atlas de riesgos de la UNAM',
	pageSize: 'A4',
	//contentSelector: "#additional-content",
	position: 'topleft',
	pagesSelector:  "#additional-content",
	cancelWithEsc: true,
	printModes: ["Portrait","Landscape","Custom"]
}).addTo(mapa);



mapa.on(L.BrowserPrint.Event.PrePrint, function() {
	var tituloUsr = prompt('Nombre Del mapa a crear:');
	var titlElem = document.getElementById("title1"); 
	titlElem.textContent = tituloUsr;
	var subcont = document.getElementById("subCont");
	//subcont.textContent = layerNamesArray;
	var content = '<ul>';
	layerNamesArray.forEach(function(layerName, index1) {
		var icon = layerImgArray[index1];
		content += '<li>' + layerName + '&nbsp&nbsp&nbsp&nbsp'+'<img src="' + icon +'"</li>';
	});
	content += '</ul>';
	subcont.innerHTML = content;
	//------------------------------------------------
	var subcont2 = document.getElementById("sub2");
	var userMadeLayerNames = getUserMadeLayerNames();
	var content2 = '<ul>'
	userMadeLayerNames.forEach(function(layerNamec, ind) {
		var med = layerMed[ind];
		content2 += '<li>' + layerNamec + '&nbsp&nbsp&nbsp&nbsp'+med +'</li>';
	});
	content2 += '</ul>';
	subcont2.innerHTML = content2;


});