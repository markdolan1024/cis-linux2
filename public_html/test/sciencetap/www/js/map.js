
var lat = window.localStorage.getItem('lat');
var lon = window.localStorage.getItem('lon');
var NameLogged 	=	window.localStorage.getItem("FirstName");
var LastLogged 	=   window.localStorage.getItem("LastName");
var ImageUser 	=   window.localStorage.getItem("ImageUser");
var UserLoged = window.localStorage.getItem('idUser');


/***Load Map to Current Position*/

$('#CurrentPosition').click(function(){
	navigator.geolocation.getCurrentPosition(refreshMap);
});

var refreshMap = function(position){
	initialize(position.coords.latitude,position.coords.longitude);
}


/*** MAP STARTS HERE**/

$(document).ready(function(e) {
    detectBrowser();
	navigator.geolocation.getCurrentPosition(refreshMap);
	getMarkers();
	getSites();
});


function detectBrowser() {
  var useragent = navigator.userAgent;
  var mapdiv = document.getElementById("mapData");

  if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
	  
	  $('#mapData').css('width','100%');
	   $('#mapData').css('height','460px');

  } else {
   $('#mapData').css('width','100%');
	$('#mapData').css('height','910px');
  }
}

// This variable initialize the map
var map;
var service;
var radius;
var bounds;
var latitude;
var longitude;

//Declaration of icons
 
var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
var icons = {
//    	stream: {
//		        	name: 'Stream',
//		            icon: 'Images/stream2.png'
//               	},
               
       	site: {
                 	name: 'Site',
                 	icon: 'Images/site2.png'
               }
};


function initialize(lat,lon){
	
	 radius = 8000, 
     center = new google.maps.LatLng(lat,lon),
     bounds = new google.maps.Circle({center: center, radius: radius}).getBounds();
	
	
	
	//MAP OPTIONS
 	var mapOptions = {
	 center: center,
	 zoom: 15,
	};
	
   //CREATE MAP W/ MAP OPTIONS
  	 map = new google.maps.Map(document.getElementById('mapData'),mapOptions);
	 
	 
	 
	 // This create the layout into the map
	 
	 

	layer = new google.maps.FusionTablesLayer({
    query: {
      select: 'geometry',
      from: '1_kb24whPAZttu2FPYLAFPUAUb8f6PNnSUL48TzX7'
    },
	 options: {
        styleId: 3,
        templateId: 4,
		strokeWeight: 3 
      }
	
  });
  layer.setMap(map);

   
  	//MAP LEGEND   
  	for (var key in icons) {
  	                  var type = icons[key];
  	                  var name = type.name;
  	                  var icon = type.icon;
  	                  var div = document.createElement('div');
  	                  div.innerHTML = '<img src="' + icon + '"> ' + name;
  	                  legend.appendChild(div);
  	 }
  	map.controls[google.maps.ControlPosition.RIGHT_TOP].push(document.getElementById('legend'));
		
	service = new google.maps.places.PlacesService(map);
	
	var trafficLayer = new google.maps.TrafficLayer();
		
		$('#trafficBtn').click(function(){
			
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
	
function getMarkers() {
     
   	var content = 'idUser=' + UserLoged +'&DisplayMarkers=true';
   	var infoWindow = new google.maps.InfoWindow({
   	      maxWidth: 200
   	  });
   	  
   	  
	$.ajax({
		type:'POST',
		data: content,
		url: Url+'PHP/getMarkers2.php',
		dataType:'Json',
		success: function(data){
  		
			if(data.Status = 'success'){
		console.log(data.Status);	
			
				var Sites_Id = data.Sites_Id;
				var Lat = data.Lat;
				var Lon = data.Lon;
				var Site_Name = data.Site_Name;
				var Site_Description = data.Site_Description;
						 	
				for (var i in Sites_Id) {
				 	    var point = new google.maps.LatLng(Lat[i],Lon[i]);  
				        var marker = new google.maps.Marker({
				 	       	map: map,
				 	       	position: point,
				 	       	icon: "Images/site2.png",
				 	       	animation: google.maps.Animation.DROP
				        });
				       
				        var html = "<div id='iwhtml'><b>"+
				        				"<div id=iwTitleBox>"+
				        					"<h3 id='markerName'>" + Site_Name[i] + "</h3></b> <br/>" +
				        				"</div>"+
				        				"<p>  Latitude: " + Lat[i] +"</p>"+ 
				        				"<p>  Longitude: " + Lon[i] +"</p>"+"<br/>"+
				        				"<div id='iwContent'>"+
				        					Site_Description[i]+"<br/>"+
				        				"</div>"+
				        				"<div id='iwFooter'>"+"<br/>"+
				        					"<center><button><a href='images.html'>"+
				        						"<img src='css/images/icons-png/plus-black.png' />"+
				        					"</a></button>"+"  "+
				        					"<button><a href=''>"+"  "+
				        						"<img src='css/images/icons-png/eye-black.png' />"+
				        					"</a></button>"+"  "+
				        					"<button><a href='#viewPhotos' onclick='getPhotoBySite("+Sites_Id[i]+")'>"+
				        						"<img src='css/images/icons-png/camera-black.png' />"+
				        					"</a></button></center>"+
				        				"</div>"+
				        			"</div>";
				        				 	              
				 	    bindInfoWindow(marker, map, infoWindow, html);
				 	}//end of for loop
				
				
									     	
			}else{
		console.log(data.Status);	
				alert('All is lost');     		
			}
				     	
		}
				     	 
	});
	
	return false;
		     
}


function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(latitude,longitude),
    content: content,

  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

function bindInfoWindow(marker, map, infoWindow, html) {
	google.maps.event.addListener(marker, 'click', function() {
		infoWindow.setContent(html);
		infoWindow.open(map, marker);
	});
}


function getSites() {
     
   	var content = 'DisplayMarkers=true';  
   	  
	$.ajax({
		type:'POST',
		data: content,
		url: Url+'PHP/getMarkers2.php',
		dataType:'Json',
		success: function(data){
  		
			if(data.Status = 'success'){

				var Sites_Id = data.Sites_Id;
				var Site_Name = data.Site_Name;
				var Lat = data.Lat;
				var Lon = data.Lon;
						 	
				for (var i in Sites_Id) { 				      
				      
				      $('#siteList').append(
				      '<div id="site" onclick="centerMap('+Lat[i]+','+Lon[i]+')">'+Site_Name[i]+'</div>'
				      );	
				        
				 	}//end of for loop
									     	
			}else{
				alert('All is lost');     		
			}
				     	
		}
				     	 
	});
	
	return false;
		     
}

function centerMap(lat, lon) {
	
	var sitePosition = new google.maps.LatLng(lat,lon);
	map.setCenter(sitePosition);
	

}



function getPhotoBySite(siteId) {

//	window.open("http://www.web-huertas.com/work/programs/ScienceTapApp/photo.html");
  	
  	//alert(siteId);
  	
    var site_Id = siteId;
	var content = 'site_Id='+site_Id+'&DisplayPhotos=true';
	
		     
	$.ajax({
		type:'POST',
		data: content,
		url: Url+'PHP/getPhoto.php',
		dataType:'Json',
		success: function(data){
			if(data.Status = 'success'){
						
				var photoId = data.Photo_Id;
				var lat = data.Lat_Photo;
				var lng = data.Lon_Photo;
				var date = data.Date;
				var link = data.link;
				var time = data.Time;
				var site = data.Site_Id;
				
				var photoIds = photoId.toString();
				var lats = lat.toString();
				var lngs = lng.toString();
				var dates = date.toString();
				var links = link.toString();
				
									     		
				$('#imageContainer').html("");
				     	
				for(var i in photoId){ 
					if(site[i]==siteId){
						$('#imageContainer').append(
						'<div id="photoTile">'+
						'<a href="#pageBigPhoto" onclick="viewPhoto('+photoId[i]+','+lat[i]+','+lng[i]+',\''+date[i]+'\',\''+link[i]+'\')" data-transition="slideup"><img id="photo" alt="1" src="'+UrlMap+''+link[i]+'"></a></div>'
						);	

					} 							
												
				} // This is the end of my foor loop
				
									     	
			}else{
				alert('All is lost');     		
			}
				     	
		}
				     	 
	});
	
	return false;
		     
}


function viewPhoto(idPhoto,lat, lng, date, link) {
	
	var urlPhoto = UrlMap+''+link;
	$('#photoSingle').attr("src",urlPhoto);
	$('#infoPhoto').append(
		'<div id="info">'+
		'<p>Latitude: <em>'+lat+'</em><br />  Longitude: <em>'+lng+'</em><br/>'+
		'Date: <em>'+date+'</em></p>'+
		'</div>'
	);
	
	
//	var i=0;
//	$('#nextPhoto').click(function(){
//		if(idPhoto!=photoIds[i]){
//			viewPhoto(idPhotos[i], lat[i], lng[i], date[i], link[i], lats, lngs, times, photoIds);
//		}
//		i++;
		
//		
//	}); 		
}



