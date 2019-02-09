var lat = 0 ;
var lon = 0 ;
var info = tag;


function myMap() {
  var amsterdam = new google.maps.LatLng(lat, lon);

  var mapCanvas = document.getElementById("map");
  var mapOptions = {center: amsterdam, zoom: 16};
  var map = new google.maps.Map(mapCanvas,mapOptions);

  var marker = new google.maps.Marker({
    //center: amsterdam,                         
    //radius: 20,                  
    //strokeColor: "darkblue",   
    //strokeOpacity: 0.8,       
    //strokeWeight: 2,         
    //fillColor: "red",       
    //fillOpacity: 1
    position: amsterdam
  });
  marker.setMap(map);

  var infowindow = new google.maps.InfoWindow({
    content: info
  });
  infowindow.open(map,marker);
}

$(document).ready(() => {

  var socket_1 = io('/' + api + '/' + count);

  var socket_2 = io('/' + api + '/' + name + '/' + count); 

  socket_2.on('sensorValue', (data) => {
    $('#sensorValue').html(data);
  });

  socket_2.on('sensorName', (data) => {
  	$('#sensorName').html(data);
  });

  socket_1.on('value', (data) => { 
  	$('#value').html(data);
  });

  socket_1.on('lattitude', (data) => {
  	lat = data;
  	$('#lattitude').html(data);
  	myMap();
  });

  socket_1.on('longitude', (data) => {
  	lon = data;
  	$('#longitude').html(data);
  	myMap();
  });

});
   

  