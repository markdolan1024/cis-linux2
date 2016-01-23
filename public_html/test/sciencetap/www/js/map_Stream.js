/// GLOBAL VARIABLES


	  var lat = window.localStorage.getItem('lat');
	  var lon = window.localStorage.getItem('lon');


	// Get info of the user who is logged
	
	  	var NameLogged 	=	window.localStorage.getItem("FirstName");
		var LastLogged 	=   window.localStorage.getItem("LastName");
		var ImageUser 	=   window.localStorage.getItem("ImageUser");
		
		
	// CREATE AND OBJECT WITH THE IMAGE
	
	


	var image = {
		  url: Url+'ScienceTap/assets/Images/Users/'+ImageUser,
		  size: new google.maps.Size(71, 71),
		  origin: new google.maps.Point(0, 0),
		  //anchor: new google.maps.Point(100, 34),
		  scaledSize: new google.maps.Size(30, 35)
		};
  
  	
  
/*** HERE IS THE FUCTION TO LOAD THE MAP ON MY CURRENT POSITION*/

$('#CurrentPosition').click(function(){
	navigator.geolocation.getCurrentPosition(refreshMap);
});

var refreshMap = function(position){
	initialize(position.coords.latitude,position.coords.longitude);
}







/*** HERE START MY CODE TO THE MAP **/




$(document).ready(function(e) {
	
    detectBrowser();
	initialize(lat,lon);
});

function detectBrowser() {
  var useragent = navigator.userAgent;
  var mapdiv = document.getElementById("mapData");

  if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
	  
	  $('#mapData').css('width','100%');
	   $('#mapData').css('height','410px');

  } else {
   $('#mapData').css('width','100%');
	$('#mapData').css('height','860px');
  }
}






// This variable initialize the map
var map;
var service;
var radius;
var bounds;


function initialize(lat,lon){
	
	 radius = 8000, //how is this set up
     center = new google.maps.LatLng(lat,lon),
     bounds = new google.maps.Circle({center: center, radius: radius}).getBounds();
	
	
	// Opction of the map
 	var mapOptions = {
	 center: center,
	 zoom: 15,
	};
	
   //Initialize the map on canvas and insert the options that we define befor on mapOption
  	 map = new google.maps.Map(document.getElementById('mapData'),mapOptions);
	
	
	// Put marker on the map. On this map I am including my current position marker
	var marker = new google.maps.Marker({
		position: center,
		map: map,
		icon: image,
	    title: NameLogged + ' ' + LastLogged
		
		});
	
	service = new google.maps.places.PlacesService(map);
	
	
	// This ensures we wait until the map bound are initializsed before we perform the search



//	$('#refreshBtn').click(performSearch);
	
	
	var trafficLayer = new google.maps.TrafficLayer();
	
	$('#traficBtn').click(function(){
		
		if(trafficLayer.getMap()){
			trafficLayer.setMap(null);
			
		}else{
			trafficLayer.setMap(map);
		}	
		
	}); // end trafic layer function
	
	
	var WeatherLayer = new google.maps.weather.WeatherLayer({
		
			temperatureUnits: google.maps.weather.TemperatureUnit.CELSIUS
		});
	var cloudLayer = new google.maps.weather.CloudLayer();
	
	$('#weatherBtn').click(function(){
		
		if(WeatherLayer.getMap() || cloudLayer.getMap()){
			WeatherLayer.setMap(null);
			cloudLayer.setMap(null);
			
		}else{
			WeatherLayer.setMap(map);
			cloudLayer.setMap(map);
		}	
		
	}); // end trafic layer function
	
	
} // end initialize


