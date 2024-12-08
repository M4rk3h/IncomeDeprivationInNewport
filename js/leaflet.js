// Create a function for the map.
function newportLsoa() {
	// map
	//var map = L.map('lmap').setView([51.58400135786178, -2.9973142409703972], 12);
	var map = L.mapWithLabels('lmap').setView([51.58400135786178, -2.9973142409703972], 12);
	// Tile Layers
	var positron = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
		foo: 'bar',
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/>OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
	}).addTo(map);

	function onEachFeature(feature, layer) {
		var popupContent = feature.properties.popupContent;
		layer.bindPopup(popupContent).openPopup();
	} 	
	L.geoJSON([lsoaNewport], {
		// labels
		label: l => l.feature.properties.popupContent,
		// style on case
		style: function (feature) {
			switch (feature.properties.concern) {
				case 'vlow': return { color: "green" };
				case 'low': return { color: "yellow" };
				case 'moderate': return { color: "orange" };
				case 'highest': return { color: "red" };
			}},
			// any other styles
			stoke: true,
			fillOpacity: 0.4,
			// For each features in the JSON
			onEachFeature: onEachFeature,
			pointToLayer: function (latlng) {
				return L.geoJSON(latlng, {});
			}
		}
	).addTo(map);

	// Legend
	L.control.Legend({
		position: "bottomright",
		legends: [{
			label: "- Very Low Concern",
			type: "polygon",
				color: "black",
				fillColor: "green",
				type: "polygon",
				sides: 4,
				weight: 2
		},
		{
			label: "- Low Concern",
			type: "polygon",
				color: "black",
				fillColor: "yellow",
				type: "polygon",
				sides: 4,
				weight: 2
		},
		{
			label: "- Moderate Concern",
			type: "polygon",
				color: "black",
				fillColor: "orange",
				type: "polygon",
				sides: 4,
				weight: 2
		},
		{
			label: "- Highest Concern",
			type: "polygon",
				color: "black",
				fillColor: "red",
				type: "polygon",
				sides: 4,
				weight: 2
		},
	]
	}).addTo(map);
	console.log(L.geoJSON)
	console.log("Leaflet Version" + " - " + L.version);
};