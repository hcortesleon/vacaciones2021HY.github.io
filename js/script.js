var map = L.map('map', {
    zoomControl:true, maxZoom:28, minZoom:1
}).fitBounds([[13.755872,-85.809423],[16.598286,-89.669240]]);
var hash = new L.Hash(map);
map.attributionControl.setPrefix('<a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> &middot');
var autolinker = new Autolinker({truncate: {length: 30, location: 'smart'}});
function removeEmptyRowsFromPopupContent(content, feature) {
 var tempDiv = document.createElement('div');
 tempDiv.innerHTML = content;
 var rows = tempDiv.querySelectorAll('tr');
 for (var i = 0; i < rows.length; i++) {
     var td = rows[i].querySelector('td.visible-with-data');
     var key = td ? td.id : '';
     if (td && td.classList.contains('visible-with-data') && feature.properties[key] == null) {
         rows[i].parentNode.removeChild(rows[i]);
     }
 }
 return tempDiv.innerHTML;
}
document.querySelector(".leaflet-popup-pane").addEventListener("load", function(event) {
  var tagName = event.target.tagName,
    popup = map._popup;
  // Also check if flag is already set.
  if (tagName === "IMG" && popup && !popup._updated) {
    popup._updated = true; // Set flag to prevent looping.
    popup.update();
  }
}, true);
var bounds_group = new L.featureGroup([]);
function setBounds() {
}
;
function pop_vacas_ejem_1(feature, layer) {
    var popupContent = '<table>\
            <tr>\
                <td colspan="2">' + (feature.properties['fid'] !== null ? autolinker.link(feature.properties['fid'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Fecha</th>\
                <td class="visible-with-data" id="Fecha">' + (feature.properties['Fecha'] !== null ? autolinker.link(feature.properties['Fecha'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Hora</th>\
                <td class="visible-with-data" id="Hora">' + (feature.properties['Hora'] !== null ? autolinker.link(feature.properties['Hora'].toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    layer.bindPopup(popupContent, {maxHeight: 200});

    // Add image to sidebar with comment
    layer.on('click', function (e) {
       var url = 'images/' + String(feature.properties['Imagen']).replace(/[\\/:]/g, '_').trim();
       var comment = feature.properties['Comentario'] !== null ? feature.properties['Comentario'] : '';
       console.log("Comentario:", comment); // Verificar que el comentario se esté obteniendo correctamente
       document.getElementById('photo').innerHTML = '<img src="' + url + '" width="300" height="225" title="' + comment + '">';
       document.getElementById('comment').innerText = comment; // Asignar el comentario al elemento HTML en el sidebar
   });


    var popup = layer.getPopup();
    var content = popup.getContent();
    var updatedContent = removeEmptyRowsFromPopupContent(content, feature);
    popup.setContent(updatedContent);
}

function style_vacas_ejem_1_0() {
    return {
        pane: 'pane_vacas_ejem_1',
        radius: 6.0,
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(183,72,75,1.0)',
        interactive: true,
    }
}
map.createPane('pane_vacas_ejem_1');
map.getPane('pane_vacas_ejem_1').style.zIndex = 401;
map.getPane('pane_vacas_ejem_1').style['mix-blend-mode'] = 'normal';
var layer_vacas_ejem_1 = new L.geoJson(json_vacas_ejem_1, {
    attribution: '',
    interactive: true,
    dataVar: 'json_vacas_ejem_1',
    layerName: 'layer_vacas_ejem_1',
    pane: 'pane_vacas_ejem_1',
    onEachFeature: pop_vacas_ejem_1,
    pointToLayer: function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        return L.circleMarker(latlng, style_vacas_ejem_1_0(feature));
    },
});
bounds_group.addLayer(layer_vacas_ejem_1);
map.addLayer(layer_vacas_ejem_1);


var baselayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var esri_img = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  });

var humanitarian_layer = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: 'Data \u00a9 <a href="http://www.openstreetmap.org/copyright">' +
       'OpenStreetMap Contributors </a> Tiles \u00a9 HOT'
     }).addTo(map);


var baseMaps = {};
var overlaysTree = [
    {label: '<img src="legend/vacas_ejem_1.png" /> Lugares Visitados', layer: layer_vacas_ejem_1},
    {label: "OpenStreetMap Humanitario", layer: humanitarian_layer},
    {label: "OpenStreetMap Comun", layer: baselayer},
    {label: "ESRI", layer: esri_img},
    ,]


var lay = L.control.layers.tree(null, overlaysTree,{
    //namedToggle: true,
    selectorBack: true,
    closedSymbol: '&#8862; &#x1f5c0;',
    //openedSymbol: '&#8863; &#x1f5c1;',
    //collapseAll: 'Collapse all',
    //expandAll: 'Expand all',
    collapsed: true,
});
lay.addTo(map);






setBounds();
