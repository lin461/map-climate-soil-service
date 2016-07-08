
var map = L.map('mapid').setView([38.440191,-78.87508], 10);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	maxZoom: 18,
	id: 'lexburner.0h0dfk7p',
	accessToken: 'pk.eyJ1IjoibGV4YnVybmVyIiwiYSI6ImNpb29tcGRyMjAwMDd1cGtxcXNheHIwNmgifQ.hf0NpYvJTKFfCV5TOyxiUw'
}).addTo(map);

var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
	draw: {
		polygon: {
			shapeOptions: {
				color: 'purple'
			},
			allowIntersection: false,
			drawError: {
				color: 'orange',
				setTimeout: 1000
			},
			showArea: true,
			metric: false,
			repeatMode: true
		},
		polyline: {
			shapeOptions: {
				color: 'red'
			}
		},
		rect: {
			shapeOptions: {
				color: 'green'
			}
		},
		circle: {
			shapeOptions: {
				color: 'steelblue'
			}
		}
	},
	edit: {
		featureGroup: drawnItems
	}
});
map.addControl(drawControl);

map.on('draw:created', function (e) {
	var type = e.layerType,
		layer = e.layer;

	var latlngs;

	drawnItems.addLayer(layer);

	if (type === 'marker' || type === 'circle') {
		// Do marker specific actions
		layer.on('click', function(e){
			//layer.bindPopup("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng);
			climate_post(e.latlng.lat, e.latlng.lng);
		});
		//layer.bindPopup('LatLng: ' + layer.getLatLng()).openPopup();
	}

	// if (type is polygon || rectangle) 
	else {
		layer.on('click', function(e){
			//console.log(layer.toGeoJSON());
			soil_post(layer.toGeoJSON());
		});
	}
});