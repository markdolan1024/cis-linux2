/// GLOBAL VARIABLES



	var searchByTeamName = true;
	var searchByLeader = true;
	var PlayBtn = false;
	var owl;
	var PlayBtn2 = false;

	  var lat = window.localStorage.getItem('lat');
	  var lon = window.localStorage.getItem('lon');
	  var UserLoged = window.localStorage.getItem('idUser');
	

	// Get info of the user who is logged
	
	  	var NameLogged 	=	window.localStorage.getItem("FirstName");
		var LastLogged 	=   window.localStorage.getItem("LastName");
		var ImageUser 	=   window.localStorage.getItem("ImageUser");
		var User_Type	=   window.localStorage.getItem("Usert_Type");
		var url;
		
	// CREATE AND OBJECT WITH THE IMAGE
	
	


	var image = {
		  url: Url+'assets/Images/Users/'+ImageUser,
		  size: new google.maps.Size(71, 71),
		  origin: new google.maps.Point(0, 0),
		  //anchor: new google.maps.Point(100, 34),
		  scaledSize: new google.maps.Size(30, 35)
		};
  
  	
  
$(document).ready(function(e) {
	
	
		var dataString = 'UserLoged='+UserLoged+'&DisplayStreamBySpecifiUser=true';
	
			 
			
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				  dataType:"Json",
				async: "false",
				  success: function(data) {
					  
					 
					  if (data.Status == 'success'){
						  
						  
						  
						  $('#contentProjectTable').html("");
					
	
								var Stream_Id  	= data.Stream_Id;
								var Stream_Name = data.Stream_Name;
								var Water_body 	= data.Water_body;
								var Lat 		= data.Lat;
								var Lon 		= data.Lon;
								var DateStream 	= data.DateStream;
								var Time 		= data.Time;
								var Leader_Id 	= data.Leader_Id;
								
								var idTeam 		= data.idTeam;
								var NameTeam 	= data.Name;
								var Description	= data.Description;
								var URL 		= data.URL;
								var TeamImg 	= data.TeamImg;
								var Remarks 	= data.Remarks;
								var ParentID	= data.ParentID;
								
					
							for (var i in Stream_Id) {
								var clickFunction = 'onclick="selectStreamByLine('+Stream_Id[i]+',\''+Stream_Name[i]+'\',\''+Water_body[i]+'\','+Lat[i]+','+Lon[i]+',\''+DateStream[i]+'\',\''+Time[i]+'\','+Leader_Id[i]+','+idTeam[i]+',\''+NameTeam[i]+'\',\''+Description[i]+'\',\''+URL[i]+'\',\''+TeamImg[i]+'\',\''+Remarks[i]+'\','+UserLoged+')">';
								$('#contentProjectTable').append(
								
                     '<div class="lineMembersTeam" ' + clickFunction +
                        '<div class="leftLineMembers2"></div>'+
                        '<div class="centerLineMembers">'+
                              '<div class="nameBoxMembers"><p>'+Stream_Name[i]+'</p> </div>'+
                              '<div class="UniBoxMembers"> <p><span class="TeamLabel">Team:</span> '+NameTeam[i] +'</p> </div>'+
					 	'</div>'+
                        '<div class="rightLineMembers">'+
						
						'<a href="#pageAddStream" data-transition="slide"> ' +'<img src="Images/FordwardBlack.png" alt="iconNext" /></a>'+
                        '</div>'+
                      '</div>'
                    
                    
                    
								
					 		   );
			
                 		 } // End form loop
				  
					
				 
				 
					  }else{
						  
						  //alert('You do not belong any Stream yet');
						  
						  }
						 
				  }
			});
			return false;
   
	
 
});

/*** HERE IS THE FUCTION TO LOAD THE MAP ON MY CURRENT POSITION*/

$('#CurrentPosition').click(function(){
	navigator.geolocation.getCurrentPosition(refreshMap);
});

var refreshMap = function(position){
	initialize(position.coords.latitude,position.coords.longitude);
	loadMarker();
}

var LoadMapProject = function(){
	 detectBrowser();
	navigator.geolocation.getCurrentPosition(refreshMap);
	
}



function detectBrowser() {
  var useragent = navigator.userAgent;
  var mapdiv = document.getElementById("mapData");

  if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
	  
	  $('#mapData').css('width','100%');
	   $('#mapData').css('height','415px');

  } else {
    $('#mapData').css('width','100%');
	$('#mapData').css('height','870px');
	
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
	 zoom: 16
	// mapTypeId: google.maps.MapTypeId.SATELLITE,
	 //disableDefaultUI: true
	};
	
	
	
   //Initialize the map on canvas and insert the options that we define befor on mapOption
  	 map = new google.maps.Map(document.getElementById('mapData'),mapOptions);
	
	
	
	
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

	
	
	// Put marker on the map. On this map I am including my current position marker
	var marker = new google.maps.Marker({
		position: center,
		map: map,
		icon: image,
	    title: NameLogged + ' ' + LastLogged
		
		});
	
	service = new google.maps.places.PlacesService(map);
	
	
	// This ensures we wait until the map bound are initializsed before we perform the search



	
	
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
			map.setZoom(12);
		}	
		
	}); // end trafic layer function
	
	
	
	//HERE IS TO CREATE THE BOX INFO
	
	
        
	
} // end initialize






/* THIS FOLLOWING FUNCTION IS TO GO TO THE DESIRED STREAM ON THE MAP WITH THE SPECIFIC IMG */





function StreamPointer(lat,lon){
	map.setCenter(new google.maps.LatLng(lat, lon), 13);
	loadMarker();
	
	
} // end initialize




















//When the Window finishes loading...

// This is to configure the marker on the windows. 

 $(window).load(function () {
	  
    var Marker = null;
    var infowindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();
	
	
	
 
 	var dataString = 'UserLoged='+UserLoged+'&DisplayStreamBySpecifiUser=true';
        //Carry out an Ajax request.
        $.ajax({
            url: Url+'PHP/GeoJson.php',
		 type: "POST",
				async: "false",
			data: dataString,
            success:function(data){
					//Display data on the console to check the data
					console.log(data);
					
					
				
				
				
				
				
				 //Loop through each location.
				
                $.each(data, function(){
					
					
				
					var contentString =
						
                               	'<div class="lineContainerMarker">'+
                                    '<div class="leftLineMarker">Stream:</div>'+
                                    '<div class="rightLineMarker"><p>'+this.Stream_Name +'</p></div>'+
                                '</div>'+
                                '<div class="lineContainerMarker">'+
                                    '<div class="leftLineMarker">Water_body:</div>'+
                                    '<div class="rightLineMarker"><p>'+this.Water_body +'</p></div>'+
                                '</div>'+
                                '<div class="lineContainerMarker">'+
                                    '<div class="leftLineMarker">Date:</div>'+
                                    '<div class="rightLineMarker"><p>'+this.DateStream +'</p></div>'+
                                '</div>'+
                                '<div class="lineContainerMarker">'+
                                    '<div class="leftLineMarker">Time:</div>'+
                                    '<div class="rightLineMarker">'+this.Time+'</div>'+
                                '</div>'+
                               
                                '<div class="lineContainerMarker">'+
                                    '<div class="leftLineMarker">Team:</div>'+
                                    '<div class="rightLineMarker">'+this.Name+'</div>'+
                                '</div>'+
                                '<div class="lineContainerMarker">'+
                                   '<a href="#pageAddStream" data-transition="slide" onclick="selectStream('+this.Stream_Id+',\''+this.Stream_Name+'\',\''+this.Water_body+'\','+ this.Lat+','+this.Lon+',\''+this.DateStream+'\',\''+this.Time+'\','+this.Leader_Id+','+this.idTeam+',\''+this.NameTeam+'\',\''+this.Description+'\',\''+this.URL+'\',\''+this.TeamImg+'\',\''+this.Remarks+'\','+UserLoged+')">Select Project</a>'+
                                '</div>'
					
					
					
					
				//	var contentString = this.Stream_Name;
					
					
	
					
					
					
					
					if(this.TeamImg.length > 0){
						url = Url+'assets/Images/Teams/'+this.TeamImg
					}else{
						
						url = 'Images/Icons/teamGoogle.png'
						}
					
						// Create my icon with the picture of the team
					var image = {
						  url: url,
						  size: new google.maps.Size(71, 71),
						  origin: new google.maps.Point(0, 0),
						  //anchor: new google.maps.Point(100, 34),
						  scaledSize: new google.maps.Size(30, 35)
					};
  
               var infowindow = new google.maps.InfoWindow({
     			 content: contentString,
     			 maxWidth: 200
 				 });
			   
			   
					
				
                    //Plot the location as a marker
                    var pos = new google.maps.LatLng(this.Lat, this.Lon); 
					
                  var Marker=  new google.maps.Marker({
                        position: pos,
                        map: map,
						title:this.Stream_Name,
						info:contentString,
						icon:image
				
                    });
					
					google.maps.event.addListener(Marker, 'click', function() {
  				  	infowindow.open(map,Marker);
				  });
					
					loadStreamOnPanel(UserLoged); 	
					
                });
            }
        });
 
    });
	
	
	
	
	// Load the markert manually
	
	
	 // This is to configure the marker on the windows. 



var loadMarker = function(){
	
	  
    var Marker = null;
    var infowindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();
	
	
	
 
 	var dataString = 'UserLoged='+UserLoged+'&DisplayStreamBySpecifiUser=true';
        //Carry out an Ajax request.
        $.ajax({
            url: Url+'PHP/GeoJson.php',
		 type: "POST",
			data: dataString,
            success:function(data){
					//Display data on the console to check the data
					console.log(data);
					
					
				
				
				
				
				
				 //Loop through each location.
				
                $.each(data, function(){
					
					
				
					var contentString =
						
                               	'<div class="lineContainerMarker">'+
                                    '<div class="leftLineMarker">Stream:</div>'+
                                    '<div class="rightLineMarker"><p>'+this.Stream_Name +'</p></div>'+
                                '</div>'+
                                '<div class="lineContainerMarker">'+
                                    '<div class="leftLineMarker">Water_body:</div>'+
                                    '<div class="rightLineMarker"><p>'+this.Water_body +'</p></div>'+
                                '</div>'+
                                '<div class="lineContainerMarker">'+
                                    '<div class="leftLineMarker">Date:</div>'+
                                    '<div class="rightLineMarker"><p>'+this.DateStream +'</p></div>'+
                                '</div>'+
                                '<div class="lineContainerMarker">'+
                                    '<div class="leftLineMarker">Time:</div>'+
                                    '<div class="rightLineMarker">'+this.Time+'</div>'+
                                '</div>'+
                               
                                '<div class="lineContainerMarker">'+
                                    '<div class="leftLineMarker">Team:</div>'+
                                    '<div class="rightLineMarker">'+this.Name+'</div>'+
                                '</div>'+
                                '<div class="lineContainerMarker">'+
                                   '<a href="#pageAddStream" data-transition="slide" onclick="selectStream('+this.Stream_Id+',\''+this.Stream_Name+'\',\''+this.Water_body+'\','+ this.Lat+','+this.Lon+',\''+this.DateStream+'\',\''+this.Time+'\','+this.Leader_Id+','+this.idTeam+',\''+this.NameTeam+'\',\''+this.Description+'\',\''+this.URL+'\',\''+this.TeamImg+'\',\''+this.Remarks+'\')">Select Project</a>'+
                                '</div>'
					
					
					
					
				//	var contentString = this.Stream_Name;
					
					
	
					
					
					
					
					if(this.TeamImg.length > 0){
						url = Url+'assets/Images/Teams/'+this.TeamImg
					}else{
						
						url = 'Images/Icons/teamGoogle.png'
						}
					
						// Create my icon with the picture of the team
					var image = {
						  url: url,
						  size: new google.maps.Size(71, 71),
						  origin: new google.maps.Point(0, 0),
						  //anchor: new google.maps.Point(100, 34),
						  scaledSize: new google.maps.Size(30, 35)
					};
  
               var infowindow = new google.maps.InfoWindow({
     			 content: contentString,
     			 maxWidth: 200
 				 });
			   
			   
					
				
                    //Plot the location as a marker
                    var pos = new google.maps.LatLng(this.Lat, this.Lon); 
					
                  var Marker=  new google.maps.Marker({
                        position: pos,
                        map: map,
						title:this.Stream_Name,
						info:contentString,
						icon:image
				
                    });
					
					google.maps.event.addListener(Marker, 'click', function() {
  				  	infowindow.open(map,Marker);
				  });
					
					 	
					
                });
            }
        });
 
    }
	
	
	
	
	
	
	
	
	
$('#nameTagSearch').click(function(){
	
	$('#contSerchByRolePanel').hide();
	$('#contSerchByNamePanel').hide();
	
	if(searchByTeamName ==  true){
		
		$('#divSearchPanel').css('height', '100px');
		
		setTimeout(function(){
			$('#contSerchByNamePanel').show();
			},1000)
		
		searchByTeamName = false;
	}else{
		$('#contSerchByNamePanel').hide();
		$('#divSearchPanel').css('height', '0px');
		searchByTeamName = true;
		}
	
	
});


$('#lastTagSearch').click(function(){
	
	$('#contSerchByRolePanel').hide();
	$('#contSerchByNamePanel').hide();
	
	if(searchByLeader ==  true){
		
		$('#divSearchPanel').css('height', '100px');
		
		setTimeout(function(){
			$('#contSerchByRolePanel').show();
			},1000)
		
		searchByLeader = false;
	}else{
		$('#contSerchByRolePanel').hide();
		$('#divSearchPanel').css('height', '0px');
		searchByLeader = true;
		}
	
});








var loadStreamOnPanel = function(TeamImg){
	
	
		var dataString = 'UserLoged='+UserLoged+'&DisplayStreamBySpecifiUser=true';
	
			 
			
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				async: "false",
				  dataType:"Json",
				  success: function(data) {
					  
					 
					  if (data.Status == 'success'){
						  
						  
						  
						  $('#contMenuStreams').html("");
					
	
								var Stream_Id  	= data.Stream_Id;
								var Stream_Name = data.Stream_Name;
								var Water_body 	= data.Water_body;
								var Lat 		= data.Lat;
								var Lon 		= data.Lon;
								var DateStream 	= data.DateStream;
								var Time 		= data.Time;
								var Leader_Id 	= data.Leader_Id;
								
								var idTeam 		= data.idTeam;
								var NameTeam 	= data.Name;
								var Description	= data.Description;
								var URL 		= data.URL;
								var TeamImg 	= data.TeamImg;
								var Remarks 	= data.Remarks;
								var ParentID	= data.ParentID;
								
					
							for (var i in Stream_Id) {
								
								$('#contMenuStreams').append(
								
									'<div class="lineSearchStream">'+
									'<div class="leftSearchStream"><a href="#pageAddStream" data-transition="slide"'+
									 'onclick="selectStream('+Stream_Id[i]+',\''+Stream_Name[i]+'\',\''+Water_body[i]+'\','+Lat[i]+','+Lon[i]+',\''+DateStream[i]+'\',\''+Time[i]+'\','+Leader_Id[i]+','+idTeam[i]+',\''+NameTeam[i]+'\',\''+Description[i]+'\',\''+URL[i]+'\',\''+TeamImg[i]+'\',\''+Remarks[i]+'\','+UserLoged+')" id="linkStream">'+Stream_Name[i]+'</a>'+
									
									
									
									
									'</div>'+
										'<div class="rightSearchStream">'+
											
											'<a href="javascript:StreamPointer('+Lat[i]+','+Lon[i]+')"><img src="Images/Icons/CurrentPosition.png" alt="Current Icon"></a>'+
										'</div>'+
									'</div>'
								
					 		   );
			
                 		 } // End form loop
				  
					
				 
				 
					  }else{
						  
						//  alert('You do not belong any Stream yet');
						  
						  }
						 
				  }
			});
			return false;
   
	
	
	}





	
$('#searchByStreamNameBtnPanel').click(function(){
	
		var nameStream = $('#searchByStreamNamePanel').val();
	
		if(nameStream == ""){
			alert("Introduce a Stream name to search");	
			$('#searchByStreamNamePanel').focus();
		}else{
			
			
			
			var dataString = 'UserLoged='+UserLoged+'&nameStream='+nameStream+'&SearchStreamByname=true';
	
			 
			
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				  dataType:"Json",
				  success: function(data) {
					  
					 
					  if (data.Status == 'success'){
						  
						  
						  
						  $('#contMenuStreams').html("");
					
	
								var Stream_Id  	= data.Stream_Id;
								var Stream_Name = data.Stream_Name;
								var Water_body 	= data.Water_body;
								var Lat 		= data.Lat;
								var Lon 		= data.Lon;
								var DateStream 	= data.DateStream;
								var Time 		= data.Time;
								var Leader_Id 	= data.Leader_Id;
								
								var idTeam 		= data.idTeam;
								var NameTeam 	= data.Name;
								var Description	= data.Description;
								var URL 		= data.URL;
								var TeamImg 	= data.TeamImg;
								var Remarks 	= data.Remarks;
								var ParentID	= data.ParentID;
								
					
							for (var i in Stream_Id) {
								
								$('#contMenuStreams').append(
								
									'<div class="lineSearchStream">'+
									'<div class="leftSearchStream"><a href="#pageAddStream" data-transition="slide"'+
									 'onclick="selectStream('+Stream_Id[i]+',\''+Stream_Name[i]+'\',\''+Water_body[i]+'\','+Lat[i]+','+Lon[i]+',\''+DateStream[i]+'\',\''+Time[i]+'\','+Leader_Id[i]+','+idTeam[i]+',\''+NameTeam[i]+'\',\''+Description[i]+'\',\''+URL[i]+'\',\''+TeamImg[i]+'\',\''+Remarks[i]+'\','+UserLoged+')" id="linkStream">'+Stream_Name[i]+'</a>'+
									
									
									
									
									'</div>'+
										'<div class="rightSearchStream">'+
											
											'<a href="javascript:StreamPointer('+Lat[i]+','+Lon[i]+')"><img src="Images/Icons/CurrentPosition.png" alt="Current Icon"></a>'+
										'</div>'+
									'</div>'
								
					 		   );
			
                 		 } // End form loop
				  
					
				 
				 
					  }else{
						  
						//  alert('You do not belong any Stream yet');
						  
						  }
						 
				  }
			});
			return false;
   
			
			
			
			
			
		} // End else condition
	
});






	
	
var selectStream = function(Stream_Id,Stream_Name,Water_body,Lat,Lon,DateStream,Time,Leader_Id,idTeam,NameTeam,Description,URL,TeamImg,Remarks,UserLoged){
		
		$('#Stream_Id_p').html(Stream_Id);
		$('#Stream_Name_p').html(Stream_Name);
		$('#Stream_Water_p').html(Water_body);
		$('#Stream_Lat_p').html(Lat);
		$('#Stream_Lon_p').html(Lon);
		$('#Stream_Date_p').html(DateStream);
		$('#Stream_Time_p').html(Time);
		$('#Stream_Leader_p').html(Leader_Id);
		$('#Stream_TeamName_p').html(NameTeam);
		$('#Stream_Description_p').html(Description);
		$('#Stream_URL_p').html(URL);
		$('#Stream_TeamImg_p').html(TeamImg);
		$('#Stream_Remarks_p').html(Remarks);
		
		$('#siteStream_Id').val(Stream_Id);
		$('#siteUser_Id').val(UserLoged);
		
		displaySite(Stream_Id);

}
	
	
	
	
	
	
var selectStreamByLine = function(Stream_Id,Stream_Name,Water_body,Lat,Lon,DateStream,Time,Leader_Id,idTeam,NameTeam,Description,URL,TeamImg,Remarks,UserLoged){
		
		window.location = "data.html#pageAddStream";
		
		$('#Stream_Id_p').html(Stream_Id);
		$('#Stream_Name_p').html(Stream_Name);
		$('#Stream_Water_p').html(Water_body);
		$('#Stream_Lat_p').html(Lat);
		$('#Stream_Lon_p').html(Lon);
		$('#Stream_Date_p').html(DateStream);
		$('#Stream_Time_p').html(Time);
		$('#Stream_Leader_p').html(Leader_Id);
		$('#Stream_TeamName_p').html(NameTeam);
		$('#Stream_Description_p').html(Description);
		$('#Stream_URL_p').html(URL);
		$('#Stream_TeamImg_p').html(TeamImg);
		$('#Stream_Remarks_p').html(Remarks);
		$('#siteStream_Id').val(Stream_Id);
		$('#siteUser_Id').val(UserLoged);
		
		displaySite(Stream_Id);

}
	
	
	
	
$('.FooterMenuAddSites').click(function(){
	
	$('#containerSites').css('display','none');
	$('#containerAddSite').css('display','-webkit-box');
	
	$('.FooterMenuAddSites').css('display','none');
	$('.FooterMenuDisplaySites').css('display','-webkit-box');
	
});


$('.FooterMenuDisplaySites').click(function(){
	
	$('#containerAddSite').css('display','none');
	$('#containerSites').css('display','-webkit-box');
	
	$('.FooterMenuDisplaySites').css('display','none');
	$('.FooterMenuAddSites').css('display','-webkit-box');
	
});


var backToDisplaySites = function(){


	
	$('#containerAddSite').css('display','none');
	$('#containerSites').css('display','-webkit-box');
	
	$('.FooterMenuDisplaySites').css('display','none');
	$('.FooterMenuAddSites').css('display','-webkit-box');
	
}


$('#btnAddSite').click(function(){
	
	var SiteName 			= $('#siteNameInput').val();
	var Latitud 			= $('#siteLaitudInput').val();
	var Longitude 			= $('#siteLongitudInput').val();
	var Description 		= $('#siteDescriptionSite').val();
	var Stream_Id_site 		= $('#siteStream_Id').val();
	var User_Logged_Site 	= 	$('#siteUser_Id').val();
	
	
	if(SiteName == ""){
		alert("Site Name are required");
		$('#siteNameInput').focus();
	}else if(Latitud	== ""){
		alert("Latitude are required");
		$('#Latitud').focus();
	}else if(Longitude	== ""){
		alert("Longitude are required");
		$('#Longitude').focus();
	}else if(Description	== ""){
		alert("Site description are required");
		$('#Description').focus();
	}else{
		
		
		
			var dataString = 'SiteName='+SiteName+'&Latitud='+Latitud+'&Longitude='+Longitude+'&Description='+Description+'&Stream_Id_site='+Stream_Id_site+'&User_Logged_Site='+User_Logged_Site+'&AddSite=true';
	
			 
			
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				  dataType:"Json",
				  success: function(data) {
					  
					 
					  if (data.Status == 'success'){
						  
						 
						  	displaySite(Stream_Id_site);
							backToDisplaySites();
							
							$('#siteNameInput').val("");
							$('#siteLaitudInput').val("");
							$('#siteLongitudInput').val("");
							$('#siteDescriptionSite').val("");
						
					  }else  if (data.Status == 'Repeated'){
						  
						  alert("Already exist a Site with this name. \n Choose another name to create it");
						  
					  } else{
						  
						  alert('Error creating Site');
						  
						  }
						 
				  }
			});
			return false;
			
		
	} // end else condition
	
	
	
});

	
                       
	
	
var displaySite = function(Stream_Id){
	
	
	
	
	
			var dataString = 'Stream_Id='+Stream_Id+'&DisplaySitesByStream_Id=true';
	
			 
			
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				async: "false",
				  dataType:"Json",
				  success: function(data) {
					  
					 
					  if (data.Status == 'success'){
						  $('#containerSiteLoop').html("");
						  
						  	var Sites_Id = data.Sites_Id;
						  	var Site_Name = data.Site_Name;
						  	var Lat = data.Lat;
						 	var Lon = data.Lon;
						  	var Site_Description = data.Site_Description;
						  	var Stream_Stream = data.Stream_Stream;
						  	var user_idUser = data.user_idUser;
							 
						  
						
						
							for (var i in Sites_Id) {
								
								$('#containerSiteLoop').append(
								
								'<div class="LineSites">'+
									'<div class="leftLineSite"><p>'+Site_Name[i]+'</p></div>'+
									'<div class="rightLineSite">'+
										'<a href="javascript:capturePhotoSite('+Sites_Id[i]+','+Lat[i]+','+Lon[i]+')"><img src="Images/CameraIOS.png" alt="TakeImage"></a>'+
										'<a href="#displayObservations" data-transition="slide" onclick="displayObservationsBySite('+Sites_Id[i]+','+Lat[i]+','+Lon[i]+')" ><img src="Images/DocumentIcon.png" alt="DisplayImage"></a>'+
										'<a href="javascript:checkUserToForm('+Sites_Id[i]+','+Lat[i]+','+Lon[i]+','+Stream_Stream[i]+')"><img src="Images/addDataIOS.png" alt="TakeImage"></a>'+
										
										'<a href="javascript:downloadExcelFile('+Sites_Id[i]+','+Stream_Stream[i]+')"><img src="Images/Icons/Excel_Icon2.png" alt="TakeImage"></a>'+
									 '</div><!-- end rightLineSite -->'+
								'</div><!-- end LineSites -->'
								
					 		   );
			
                 		 } // End form loop
						
						
						
					  } else{
						   $('#containerSiteLoop').html("");
						  
						  $('#containerSiteLoop').append(
						  
						  	'<p id="NoDisplayInfo">No Sites availables to on this stream</p>'
						
						  );
						  
						 }
						 
				  }
			});
			return false;
			
	
} /// end displaySite
	
	
	
	
$('#rightLineCoordenates').click(function(){
		
	navigator.geolocation.getCurrentPosition(addOnFormSite);	
});





var addOnFormSite = function(position){
	$('#siteLaitudInput').val(position.coords.latitude);
	$('#siteLongitudInput').val(position.coords.longitude);

}




//////// This part create my modal windows to insert other vaulues /////////

var createModalInput = function(){
	
	//This create the modal window
	
	
	$('body').append(
			'<div id="modalBoxAlert">'+
              '<div id="boxAlert">'+
			  '<a href="javascript:closeModalBox()" id="closeButton"><img src="Images/close.png" alt="closeIcon"></a>'+
                      '<input type="text" id="otherSelect" placeholder="Other" />'+
                      '<button type="button" id="btnOtherSelect" onclick="AddOption()">Add</button>'+
              '</div>'+
         '</div>'					

								
	 );
	 
	 
	
	$('#modalBoxAlert').css('display','block');
	$('#modalBoxAlert').css('position','fixed');
	$('#modalBoxAlert').css('top','0');
	$('#modalBoxAlert').css('right','0');
	$('#modalBoxAlert').css('bottom','0');
	$('#modalBoxAlert').css('left','0');
	$('#modalBoxAlert').css('background-color','rgba(0,0,0,0.2)');
	$('#modalBoxAlert').css('opacity','1');
	$('#modalBoxAlert').css('z-index','1000');


	$('#boxAlert').css('text-align','center');
	$('#boxAlert').css('width','70%');
	$('#boxAlert').css('height','80px');
	$('#boxAlert').css('padding','10px');
	$('#boxAlert').css('position','fixed');
	$('#boxAlert').css('top','100px');
	$('#boxAlert').css('left','10%');
	$('#boxAlert').css('background','-webkit-linear-gradient(#fff, #DDD)');
	$('#boxAlert').css('-webkit-box-shadow','2px 2px 2px rgba(0,0,0,0.5)');



	$('#boxAlert input').css('margin-top','10px');
	$('#boxAlert input').css('text-align','center');
	$('#boxAlert input').css('width','95%');


	$('#btnOtherSelect').css('margin-top','10px');
	$('#btnOtherSelect').css('width','55%');


	$('#closeButton').css('position','absolute');
	$('#closeButton').css('top','-15px');
	$('#closeButton').css('left','-15px');
	
	
	// Now I need to apply style of this modal
 

} // End of muy function createModalInput


var closeModalBox =  function(){
	$('#modalBoxAlert').hide();
	$('#modalBoxAlert').remove();
	
	$('#boxAlert').hide();
	$('#boxAlert').remove();
	
	$('#closeButton').hide();
	$('#closeButton').remove();
}



var checkSurface = function(){
	
	var SurfaceValue = $('#SurfaceCoatInpt').val();
	
	if(SurfaceValue == 'Other'){
		createModalInput();
	}
	
	
}

var AddOption = function(){
	

	var OterValue = $('#otherSelect').val();
	if(OterValue == ""){
	
	}else{
		
     	$('#SurfaceCoatInpt').append(
			'<option value="'+OterValue+'">'+OterValue+'</option>'	
		 );
		 
		$('#SurfaceCoatInpt option[value="'+OterValue+'"]').prop("selected","selected").change();

		 
		closeModalBox();
	}
	
}


var AddOptionOdor = function(){
	

	var OterValue = $('#otherSelect').val();
	if(OterValue == ""){
	
	}else{
		
     	$('#OdorCoatInpt').append(
			'<option value="'+OterValue+'">'+OterValue+'</option>'	
		 );
		 
		$('#OdorCoatInpt option[value="'+OterValue+'"]').prop("selected","selected").change();

		 
		closeModalBox();
	}
	
}



var checkOdor = function(){
	
	var Odor = $('#OdorCoatInpt').val();
	if(Odor == 'Other'){
		createModalInputOdor();
	}
	
	
}






var createModalInputOdor = function(){
	
	//This create the modal window
	
	
	$('body').append(
			'<div id="modalBoxAlert">'+
              '<div id="boxAlert">'+
			  '<a href="javascript:closeModalBox()" id="closeButton"><img src="Images/close.png" alt="closeIcon"></a>'+
                      '<input type="text" id="otherSelect" placeholder="Other" />'+
                      '<button type="button" id="btnOtherSelect" onclick="AddOptionOdor()">Add</button>'+
              '</div>'+
         '</div>'					

								
	 );
	 
	 
	
	$('#modalBoxAlert').css('display','block');
	$('#modalBoxAlert').css('position','fixed');
	$('#modalBoxAlert').css('top','0');
	$('#modalBoxAlert').css('right','0');
	$('#modalBoxAlert').css('bottom','0');
	$('#modalBoxAlert').css('left','0');
	$('#modalBoxAlert').css('background-color','rgba(0,0,0,0.2)');
	$('#modalBoxAlert').css('opacity','1');
	$('#modalBoxAlert').css('z-index','1000');


	$('#boxAlert').css('text-align','center');
	$('#boxAlert').css('width','70%');
	$('#boxAlert').css('height','80px');
	$('#boxAlert').css('padding','10px');
	$('#boxAlert').css('position','fixed');
	$('#boxAlert').css('top','100px');
	$('#boxAlert').css('left','10%');
	$('#boxAlert').css('background','-webkit-linear-gradient(#fff, #DDD)');
	$('#boxAlert').css('-webkit-box-shadow','2px 2px 2px rgba(0,0,0,0.5)');



	$('#boxAlert input').css('margin-top','10px');
	$('#boxAlert input').css('text-align','center');
	$('#boxAlert input').css('width','95%');


	$('#btnOtherSelect').css('margin-top','10px');
	$('#btnOtherSelect').css('width','55%');


	$('#closeButton').css('position','absolute');
	$('#closeButton').css('top','-15px');
	$('#closeButton').css('left','-15px');
	
	
	// Now I need to apply style of this modal
 

} // End of muy function createModalInput













var checkBedColor = function(){
	
var StreamBedColor = $('#StreamBedColorInput').val();
	if(StreamBedColor == 'Other'){
		createModalInputBedColor();
	}
	
}




var createModalInputBedColor = function(){
	
	//This create the modal window
	
	
	$('body').append(
			'<div id="modalBoxAlert">'+
              '<div id="boxAlert">'+
			  '<a href="javascript:closeModalBox()" id="closeButton"><img src="Images/close.png" alt="closeIcon"></a>'+
                      '<input type="text" id="otherSelect" placeholder="Other" />'+
                      '<button type="button" id="btnOtherSelect" onclick="AddOptionBedColor()">Add</button>'+
              '</div>'+
         '</div>'					

								
	 );
	 
	 
	
	$('#modalBoxAlert').css('display','block');
	$('#modalBoxAlert').css('position','fixed');
	$('#modalBoxAlert').css('top','0');
	$('#modalBoxAlert').css('right','0');
	$('#modalBoxAlert').css('bottom','0');
	$('#modalBoxAlert').css('left','0');
	$('#modalBoxAlert').css('background-color','rgba(0,0,0,0.2)');
	$('#modalBoxAlert').css('opacity','1');
	$('#modalBoxAlert').css('z-index','1000');


	$('#boxAlert').css('text-align','center');
	$('#boxAlert').css('width','70%');
	$('#boxAlert').css('height','80px');
	$('#boxAlert').css('padding','10px');
	$('#boxAlert').css('position','fixed');
	$('#boxAlert').css('top','100px');
	$('#boxAlert').css('left','10%');
	$('#boxAlert').css('background','-webkit-linear-gradient(#fff, #DDD)');
	$('#boxAlert').css('-webkit-box-shadow','2px 2px 2px rgba(0,0,0,0.5)');



	$('#boxAlert input').css('margin-top','10px');
	$('#boxAlert input').css('text-align','center');
	$('#boxAlert input').css('width','95%');


	$('#btnOtherSelect').css('margin-top','10px');
	$('#btnOtherSelect').css('width','55%');


	$('#closeButton').css('position','absolute');
	$('#closeButton').css('top','-15px');
	$('#closeButton').css('left','-15px');
	
	
	// Now I need to apply style of this modal
 

} // End of muy function createModalInput




var AddOptionBedColor = function(){
	

	var OterValue = $('#otherSelect').val();
	if(OterValue == ""){
	
	}else{
		
     	$('#StreamBedColorInput').append(
			'<option value="'+OterValue+'">'+OterValue+'</option>'	
		 );
		 
		$('#StreamBedColorInput option[value="'+OterValue+'"]').prop("selected","selected").change();

		 
		closeModalBox();
	}
	
}







$('#PhysicalMeasure').click(function(){
	
	
	
	
	$('body').append(
			'<div id="modalBoxAlert">'+
              '<div id="boxAlert">'+
			  '<a href="javascript:closeModalBox()" id="closeButton"><img src="Images/close.png" alt="closeIcon"></a>'+
                   '<div id="contMessageModal">'+
					 '<p> Define a 10 ft. section of the stream, ideally without exposed rocks, turbulence, upstream eddies, or aquatic vegetation. The below measurements will be used to calculate average width, depth, velocity, and discharge.</p>'+
					'</div>'+ 
              '</div>'+
         '</div>'					

								
	 );
	 
	 
	
	$('#modalBoxAlert').css('display','block');
	$('#modalBoxAlert').css('position','fixed');
	$('#modalBoxAlert').css('top','0');
	$('#modalBoxAlert').css('right','0');
	$('#modalBoxAlert').css('bottom','0');
	$('#modalBoxAlert').css('left','0');
	$('#modalBoxAlert').css('background-color','rgba(0,0,0,0.2)');
	$('#modalBoxAlert').css('opacity','1');
	$('#modalBoxAlert').css('z-index','1000');


	$('#boxAlert').css('text-align','center');
	$('#boxAlert').css('border','1px ridge #800');
	$('#boxAlert').css('width','70%');
	$('#boxAlert').css('height','130px');
	$('#boxAlert').css('padding','10px');
	$('#boxAlert').css('position','fixed');
	$('#boxAlert').css('top','100px');
	$('#boxAlert').css('left','10%');
	$('#boxAlert').css('background-color','#FFF');
	$('#boxAlert').css('-webkit-box-shadow','2px 2px 2px rgba(0,0,0,0.5)');
	$('#boxAlert').css('overflow','auto');



	
	$('#contMessageModal').css('widht','90%');
	$('#contMessageModal').css('height','120px');
	$('#contMessageModal').css('overflow','auto');
	
	// Now I need to apply style of this modal
 
 	$('#closeButton').css('position','absolute');
	$('#closeButton').css('top','-11px');
	$('#closeButton').css('left','-11px');
	
	
});



$('#QuestionStream').click(function(){
	
	
	
	
	$('body').append(
			'<div id="modalBoxAlert">'+
              '<div id="boxAlert">'+
			  '<a href="javascript:closeModalBox()" id="closeButton"><img src="Images/close.png" alt="closeIcon"></a>'+
                   '<div id="contMessageModal">'+
					 '<p> Three measurements in the reach (ft.)</p>'+
					'</div>'+ 
              '</div>'+
         '</div>'					

								
	 );
	 
	 
	
	$('#modalBoxAlert').css('display','block');
	$('#modalBoxAlert').css('position','fixed');
	$('#modalBoxAlert').css('top','0');
	$('#modalBoxAlert').css('right','0');
	$('#modalBoxAlert').css('bottom','0');
	$('#modalBoxAlert').css('left','0');
	$('#modalBoxAlert').css('background-color','rgba(0,0,0,0.2)');
	$('#modalBoxAlert').css('opacity','1');
	$('#modalBoxAlert').css('z-index','1000');


	$('#boxAlert').css('text-align','center');
	$('#boxAlert').css('width','70%');
	$('#boxAlert').css('height','130px');
	$('#boxAlert').css('padding','10px');
	$('#boxAlert').css('position','fixed');
	$('#boxAlert').css('top','100px');
	$('#boxAlert').css('left','10%');
	$('#boxAlert').css('background-color','#FFF');
	$('#boxAlert').css('-webkit-box-shadow','2px 2px 2px rgba(0,0,0,0.5)');
	$('#boxAlert').css('overflow','auto');
	$('#boxAlert').css('border','1px ridge #800');


	
	$('#contMessageModal').css('widht','90%');
	$('#contMessageModal').css('height','120px');
	$('#contMessageModal').css('overflow','auto');
	
	// Now I need to apply style of this modal
 
 	$('#closeButton').css('position','absolute');
	$('#closeButton').css('top','-11px');
	$('#closeButton').css('left','-11px');
	
	
});






$('#QuestionTime').click(function(){
	
	
	
	
	$('body').append(
			'<div id="modalBoxAlert">'+
              '<div id="boxAlert">'+
			  '<a href="javascript:closeModalBox()" id="closeButton"><img src="Images/close.png" alt="closeIcon"></a>'+
                   '<div id="contMessageModal">'+
					 '<p> (sec) Record the time it takes an object to flat the 10 ft. section. If the stream width is > 10 ft., then measure three times (at the midstream and between midstream and each bank). If the stream is < 10 ft. then, measure twice (at the midstream and between the midstream and one bank).</p>'+
					'</div>'+ 
              '</div>'+
         '</div>'					

								
	 );
	 
	 
	
	$('#modalBoxAlert').css('display','block');
	$('#modalBoxAlert').css('position','fixed');
	$('#modalBoxAlert').css('top','0');
	$('#modalBoxAlert').css('right','0');
	$('#modalBoxAlert').css('bottom','0');
	$('#modalBoxAlert').css('left','0');
	$('#modalBoxAlert').css('background-color','rgba(0,0,0,0.2)');
	$('#modalBoxAlert').css('opacity','1');
	$('#modalBoxAlert').css('z-index','1000');


	$('#boxAlert').css('text-align','center');
	$('#boxAlert').css('width','70%');
	$('#boxAlert').css('height','130px');
	$('#boxAlert').css('padding','10px');
	$('#boxAlert').css('position','fixed');
	$('#boxAlert').css('top','100px');
	$('#boxAlert').css('left','10%');
	$('#boxAlert').css('background-color','#FFF');
	$('#boxAlert').css('-webkit-box-shadow','2px 2px 2px rgba(0,0,0,0.5)');
	$('#boxAlert').css('overflow','auto');
	$('#boxAlert').css('border','1px ridge #800');


	
	$('#contMessageModal').css('widht','90%');
	$('#contMessageModal').css('height','120px');
	$('#contMessageModal').css('overflow','auto');
	
	// Now I need to apply style of this modal
 
 	$('#closeButton').css('position','absolute');
	$('#closeButton').css('top','-11px');
	$('#closeButton').css('left','-11px');
	
	
});







$('#QuestionDepth').click(function(){
	
	
	
	
	$('body').append(
			'<div id="modalBoxAlert">'+
              '<div id="boxAlert">'+
			  '<a href="javascript:closeModalBox()" id="closeButton"><img src="Images/close.png" alt="closeIcon"></a>'+
                   '<div id="contMessageModal">'+
					 '<p> Measure along a transect at least 5 times. Record where measurements (ft.) are taken along with the depth(in.).</p>'+
					'</div>'+ 
              '</div>'+
         '</div>'					

								
	 );
	 
	 
	
	$('#modalBoxAlert').css('display','block');
	$('#modalBoxAlert').css('position','fixed');
	$('#modalBoxAlert').css('top','0');
	$('#modalBoxAlert').css('right','0');
	$('#modalBoxAlert').css('bottom','0');
	$('#modalBoxAlert').css('left','0');
	$('#modalBoxAlert').css('background-color','rgba(0,0,0,0.2)');
	$('#modalBoxAlert').css('opacity','1');
	$('#modalBoxAlert').css('z-index','1000');


	$('#boxAlert').css('text-align','center');
	$('#boxAlert').css('width','70%');
	$('#boxAlert').css('height','130px');
	$('#boxAlert').css('padding','10px');
	$('#boxAlert').css('position','fixed');
	$('#boxAlert').css('top','100px');
	$('#boxAlert').css('left','10%');
	$('#boxAlert').css('background-color','#FFF');
	$('#boxAlert').css('-webkit-box-shadow','2px 2px 2px rgba(0,0,0,0.5)');
	$('#boxAlert').css('overflow','auto');
	$('#boxAlert').css('border','1px ridge #800');



	$('#contMessageModal').css('widht','90%');
	$('#contMessageModal').css('height','120px');
	$('#contMessageModal').css('overflow','auto');
	
	// Now I need to apply style of this modal
 
 	$('#closeButton').css('position','absolute');
	$('#closeButton').css('top','-11px');
	$('#closeButton').css('left','-11px');
	
	
});





var checkUserToForm = function(Site_Id,Lat,Lon,Stream_Id){

// Now I need to display all forms depending the projects\


// First I need to create the modalBox to select the forms

	$('body').append(
			'<div id="modalBoxAlert">'+
              '<div id="boxAlert">'+
			  	 '<p class="titleFormSelection">Select form</p>'+
				 	'<hr>'+
					   '<div id="contMessageModal">'+
							'<ul id="menuFormsLi">'+
								
							'</ul>'+
						'</div>'+ 
              '</div>'+
         '</div>'
		 
		 );
	 
	 
	
	$('#modalBoxAlert').css('display','block');
	$('#modalBoxAlert').css('position','fixed');
	$('#modalBoxAlert').css('top','0');
	$('#modalBoxAlert').css('right','0');
	$('#modalBoxAlert').css('bottom','0');
	$('#modalBoxAlert').css('left','0');
	$('#modalBoxAlert').css('background-color','rgba(0,0,0,0.2)');
	$('#modalBoxAlert').css('opacity','1');
	$('#modalBoxAlert').css('z-index','1000');


	$('#boxAlert').css('text-align','center');
	$('#boxAlert').css('width','70%');
	$('#boxAlert').css('height','210px');
	$('#boxAlert').css('padding','10px');
	$('#boxAlert').css('position','fixed');
	$('#boxAlert').css('top','100px');
	$('#boxAlert').css('left','10%');
	$('#boxAlert').css('background-color','#FFF');
	$('#boxAlert').css('-webkit-box-shadow','2px 2px 2px rgba(0,0,0,0.5)');
	$('#boxAlert').css('overflow','hidden');
	$('#boxAlert').css('border','1px ridge #800');





	$('#contMessageModal').css('display','-webkit-box');
	$('#contMessageModal').css('-webkit-box-orient','vertical');
	$('#contMessageModal').css('overflow','scroll');


	$('#contMessageModal ul').css('width','100%');
	$('#contMessageModal ul').css('height','50px');
	$('#contMessageModal ul').css('border','1px outset #e7e7e7');

	$('#contMessageModal ul li').css('display','-webkit-box');
	$('#contMessageModal ul li').css('-webkit-box-align','center');
	$('#contMessageModal ul li').css('-webkit-box-pack','center');
	$('#contMessageModal ul li').css('height','50px');
	$('#contMessageModal ul li').css('border','1px outset #e7e7e7');

	
	$('.titleFormSelection').css('text-align','center');
	$('.titleFormSelection').css('font-size','18px');
	$('.titleFormSelection').css('color','#700');
	$('.titleFormSelection').css('text-shadow','2px 2px 2px rgba(0,0,0,0.5)');



	 checkFormByStreamId(Stream_Id,Site_Id);




	
} // end checkUserToForm

/*

var checkUserToForm = function(Site_Id,Lat,Lon,Stream_Id){
	
	

if(User_Type == 1){
		
		$('.lineFormObservations2').hide();
		$('.lineFormObservationsTime').hide();
		$('.lineFormObservationsStream').hide();
		$('.lineFormObservationsDepth').hide();
		$('.lineFormObservationsMeasures').hide();
		$('.titleFormMeasures').hide();
		$('.hrResearch').hide();
		$('#typeObservation').val('Citizens');
		$('#Site_Id').val(Site_Id);
		$('#Lat_Site').val(Lat);
		$('#Lon_Site').val(Lon);


}else{
	
		$('body').append(
			'<div id="modalBoxAlert">'+
              '<div id="boxAlert">'+
			  	 '<p class="titleFormSelection">Select form</p>'+
				 	'<hr>'+
					   '<div id="contMessageModal">'+
							'<ul id="menuFormsLi">'+
								'<li id="btnCitizens">Citizens Science</li>'+
								'<li id="btnResearch">Researchers</li>'+
							'</ul>'+
						'</div>'+ 
              '</div>'+
         '</div>'
		 
		 );
	 
	 
	
	$('#modalBoxAlert').css('display','block');
	$('#modalBoxAlert').css('position','fixed');
	$('#modalBoxAlert').css('top','0');
	$('#modalBoxAlert').css('right','0');
	$('#modalBoxAlert').css('bottom','0');
	$('#modalBoxAlert').css('left','0');
	$('#modalBoxAlert').css('background-color','rgba(0,0,0,0.2)');
	$('#modalBoxAlert').css('opacity','1');
	$('#modalBoxAlert').css('z-index','1000');


	$('#boxAlert').css('text-align','center');
	$('#boxAlert').css('width','70%');
	$('#boxAlert').css('height','210px');
	$('#boxAlert').css('padding','10px');
	$('#boxAlert').css('position','fixed');
	$('#boxAlert').css('top','100px');
	$('#boxAlert').css('left','10%');
	$('#boxAlert').css('background-color','#FFF');
	$('#boxAlert').css('-webkit-box-shadow','2px 2px 2px rgba(0,0,0,0.5)');
	$('#boxAlert').css('overflow','hidden');
	$('#boxAlert').css('border','1px ridge #800');





	$('#contMessageModal').css('display','-webkit-box');
	$('#contMessageModal').css('-webkit-box-orient','vertical');
	$('#contMessageModal').css('overflow','scroll');



	$('#contMessageModal ul').css('width','100%');
	$('#contMessageModal ul').css('height','50px');
	$('#contMessageModal ul').css('border','1px outset #e7e7e7');

	$('#contMessageModal ul li').css('display','-webkit-box');
	$('#contMessageModal ul li').css('-webkit-box-align','center');
	$('#contMessageModal ul li').css('-webkit-box-pack','center');
	$('#contMessageModal ul li').css('height','50px');
	$('#contMessageModal ul li').css('border','1px outset #e7e7e7');

	
	$('.titleFormSelection').css('text-align','center');
	$('.titleFormSelection').css('font-size','18px');
	$('.titleFormSelection').css('color','#700');
	$('.titleFormSelection').css('text-shadow','2px 2px 2px rgba(0,0,0,0.5)');



	 checkFormByStreamId(Stream_Id,Site_Id);
	
	
		$('#btnCitizens').click(function(){
			$('#btnCitizens').css('background-color','#e7e7e7');
			$('#btnCitizens').css('border','1px inset #e7e7e7');
			setTimeout(function(){
				$('#btnCitizens').css('background-color','#FFF');
				$('#btnCitizens').css('border','1px outset #e7e7e7');
			},50);
			
				
			$('.lineFormObservations2').hide();
			$('.lineFormObservationsTime').hide();
			$('.lineFormObservationsStream').hide();
			$('.lineFormObservationsDepth').hide();
			$('.lineFormObservationsMeasures').hide();
			$('.titleFormMeasures').hide();
			$('.hrResearch').hide();
			$('#typeObservation').val('Citizens');
			$('#Site_Id').val(Site_Id);
			$('#Lat_Site').val(Lat);
			$('#Lon_Site').val(Lon);
	
			$('#bntObservation').show();
			$('#bntObservationUpdate').hide();
			
			
			 /// NOW I NEED TO EMPTY ALL FIELDS TO START NEW DATA.
			 
			 
			 
								 $('#DaysRainfalInput').val("");
								 $('#ApproxRainfalInput').val("");
								 
								 $('#WeatherInput option[value=""]').prop("selected","selected").change();
								$('#RainTypeInput option[value=""]').prop("selected","selected").change();
								$('#WaterClarityInput option[value=""]').prop("selected","selected").change();
								$('#SurfaceCoatInpt option[value=""]').prop("selected","selected").change();
								$('#OdorCoatInpt option[value=""]').prop("selected","selected").change();
								$('#StreamBedColorInput option[value=""]').prop("selected","selected").change();
								$('#ShadeInpt option[value=""]').prop("selected","selected").change();
								$('#AlgaeCoverInpt option[value=""]').prop("selected","selected").change();
								$('#AlgaeLocationInpt option[value=""]').prop("selected","selected").change();
								$('#AquaticVegetationInpt option[value=""]').prop("selected","selected").change();
								$('#FlowInpt option[value=""]').prop("selected","selected").change();
								
								 $('#indiNewErosionInput').val("");
								 $('#RiparianVegetationInput').val("");
								 $('#AnimalObservationInput').val("");
								 $('#AditionalNotesInput').val("");
								 $('#SamplesTakenInput').val("");
								 
								$('#DissolvelOxygenInput').val("");
								$('#pHInput').val("");
								$('#temperatureInput').val("");
								$('#conductivityInput').val("");
								$('#StreamWidth1').val("");
								$('#StreamWidth2').val("");
								$('#StreamWidth3').val("");
							    $('#timeTravel1').val("");
								$('#timeTravel2').val("");
								$('#timeTravel3').val("");
								$('#Loc1').val("");
								$('#Depth1').val("");
								$('#Loc2').val("");
								$('#Depth2').val("");
								$('#Loc3').val("");
								$('#Depth3').val("");
								$('#Loc4').val("");
								$('#Depth4').val("");
								$('#Loc5').val("");
								$('#Depth5').val("");
								$('#Loc6').val("");
								$('#Depth6').val("");
								$('#Loc7').val("");
								$('#Depth7').val("");
								$('#Loc8').val("");
								$('#Depth8').val("");
								$('#Loc9').val("");
								$('#Depth9').val("");
								$('#Loc10').val("");
								$('#Depth10').val("");
								$('#Loc11').val("");
								$('#Depth11').val("");
								$('#Loc12').val("");
								$('#Depth12').val("");
								$('#Loc13').val("");
								$('#Depth13').val("");
								$('#Loc14').val("");
								$('#Depth14').val("");
			 
			 
			
			
			
	
			closeModalBox();
				
			
	});


	

// The following function is to simulate that the button is pressed
	$('#btnResearch').click(function(){
			$('#btnResearch').css('background-color','#e7e7e7');
			$('#btnResearch').css('border','1px inset #e7e7e7');
			setTimeout(function(){
				$('#btnResearch').css('background-color','#FFF');
				$('#btnResearch').css('border','1px outset #e7e7e7');
				},50);
			$('.lineFormObservations2').show();
			$('.lineFormObservationsTime').show();
			$('.lineFormObservationsStream').show();
			$('.lineFormObservationsDepth').show();
			$('.lineFormObservationsMeasures').show();
			$('.titleFormMeasures').show();
			$('.hrResearch').show();
			$('#typeObservation').val('Researchers');
			$('#Site_Id').val(Site_Id);
			$('#Lat_Site').val(Lat);
			$('#Lon_Site').val(Lon);
			$('#bntObservation').show();
			$('#bntObservationUpdate').hide();
			
			
			
			 /// NOW I NEED TO EMPTY ALL FIELDS TO START NEW DATA.
			 
			 
			 
								 $('#DaysRainfalInput').val("");
								 $('#ApproxRainfalInput').val("");
								 
								 $('#WeatherInput option[value=""]').prop("selected","selected").change();
								$('#RainTypeInput option[value=""]').prop("selected","selected").change();
								$('#WaterClarityInput option[value=""]').prop("selected","selected").change();
								$('#SurfaceCoatInpt option[value=""]').prop("selected","selected").change();
								$('#OdorCoatInpt option[value=""]').prop("selected","selected").change();
								$('#StreamBedColorInput option[value=""]').prop("selected","selected").change();
								$('#ShadeInpt option[value=""]').prop("selected","selected").change();
								$('#AlgaeCoverInpt option[value=""]').prop("selected","selected").change();
								$('#AlgaeLocationInpt option[value=""]').prop("selected","selected").change();
								$('#AquaticVegetationInpt option[value=""]').prop("selected","selected").change();
								$('#FlowInpt option[value=""]').prop("selected","selected").change();
								
								 $('#indiNewErosionInput').val("");
								 $('#RiparianVegetationInput').val("");
								 $('#AnimalObservationInput').val("");
								 $('#AditionalNotesInput').val("");
								 $('#SamplesTakenInput').val("");
								 
								$('#DissolvelOxygenInput').val("");
								$('#pHInput').val("");
								$('#temperatureInput').val("");
								$('#conductivityInput').val("");
								$('#StreamWidth1').val("");
								$('#StreamWidth2').val("");
								$('#StreamWidth3').val("");
							    $('#timeTravel1').val("");
								$('#timeTravel2').val("");
								$('#timeTravel3').val("");
								$('#Loc1').val("");
								$('#Depth1').val("");
								$('#Loc2').val("");
								$('#Depth2').val("");
								$('#Loc3').val("");
								$('#Depth3').val("");
								$('#Loc4').val("");
								$('#Depth4').val("");
								$('#Loc5').val("");
								$('#Depth5').val("");
								$('#Loc6').val("");
								$('#Depth6').val("");
								$('#Loc7').val("");
								$('#Depth7').val("");
								$('#Loc8').val("");
								$('#Depth8').val("");
								$('#Loc9').val("");
								$('#Depth9').val("");
								$('#Loc10').val("");
								$('#Depth10').val("");
								$('#Loc11').val("");
								$('#Depth11').val("");
								$('#Loc12').val("");
								$('#Depth12').val("");
								$('#Loc13').val("");
								$('#Depth13').val("");
								$('#Loc14').val("");
								$('#Depth14').val("");
			 
			 
			
			
			closeModalBox();
	});


	}
}

*/





$('#bntObservation').click(function(){

	var typeObservation = $('#typeObservation').val();
	
	if(typeObservation == 'Citizens'){
		// heres I need to take all information of the citizens form ty submit //
		
		var DaysRainfalInput 		= $('#DaysRainfalInput').val();
		var ApproxRainfalInput	 	= $('#ApproxRainfalInput').val();
		var WeatherInput	 		= $('#WeatherInput').val();
		var RainTypeInput 			= $('#RainTypeInput').val();
		var WaterClarityInput 		= $('#WaterClarityInput').val();
		var SurfaceCoatInpt 		= $('#SurfaceCoatInpt').val();
		var OdorCoatInpt 			= $('#OdorCoatInpt').val();
		var StreamBedColor		 	= $('#StreamBedColorInput').val();
		var ShadeInpt 				= $('#ShadeInpt').val();
		var AlgaeCoverInpt 			= $('#AlgaeCoverInpt').val();
		
	/*	var AlgaeLocationInpt 		= $('#AlgaeLocationInpt').val(); */
		
		var AquaticVegetationInpt 	= $('#AquaticVegetationInpt').val();
		var FlowInpt 				= $('#FlowInpt').val();
		
		var LeafPacks 				= $('#LeafPacks').val();
		
		var indiNewErosionInput 	= $('#indiNewErosionInput').val();
		var RiparianVegetationInput = $('#RiparianVegetationInput').val();
		var AnimalObservationInput 	= $('#AnimalObservationInput').val();
		var AditionalNotesInput 	= $('#AditionalNotesInput').val();
		var SamplesTakenInput 		= $('#SamplesTakenInput').val();
		var Site_Id 				= $('#Site_Id').val();
		var Lat_Site				= $('#Lat_Site').val();
		var Lon_Site				= $('#Lon_Site').val();
			
		
				
				//// I HERE I NEED TO SUBMIT THESE INFORMATION TO THE SERVER AND MANAGE IT WITH PHP ////
		
			var dataString = 'DaysRainfalInput='+DaysRainfalInput+'&ApproxRainfalInput='+ApproxRainfalInput+'&WeatherInput='+WeatherInput+
							 '&RainTypeInput='+RainTypeInput+'&WaterClarityInput='+WaterClarityInput+'&SurfaceCoatInpt='+SurfaceCoatInpt+
							 '&OdorCoatInpt='+OdorCoatInpt+'&StreamBedColor='+StreamBedColor+'&ShadeInpt='+ShadeInpt+'&AlgaeCoverInpt='+AlgaeCoverInpt+	
							 '&LeafPacks='+LeafPacks+'&AquaticVegetationInpt='+AquaticVegetationInpt+'&FlowInpt='+FlowInpt+
							'&indiNewErosionInput='+indiNewErosionInput+'&RiparianVegetationInput='+RiparianVegetationInput+
							'&AnimalObservationInput='+AnimalObservationInput+'&AditionalNotesInput='+AditionalNotesInput+
							'&SamplesTakenInput='+SamplesTakenInput+'&UserLoged='+UserLoged+'&Site_Id='+Site_Id+'&InsertObservational=true';
			 
			
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				async: "false",
				  dataType:"Json",
				  success: function(data) {
					  
					 
					  if (data.Status == 'success'){
						  
						  
						  //I need to sabe the ID of the observation on javascript session to getlater
							window.localStorage.setItem("ObservationID",data.ObservationLastId);
							window.localStorage.setItem('lat_Image',Lat_Site);
							window.localStorage.setItem('lon_Image',Lon_Site);
							window.localStorage.setItem('Site_Id',Site_Id);
							
							
							
						  var confirmResult = confirm("Do you want includes picture on this observation?");
						
							if(confirmResult == true){
								
								 $('#DaysRainfalInput').val("");
								 $('#ApproxRainfalInput').val("");
								 $('#WeatherInput').val("");
								 $('#RainTypeInput').val("");
								 $('#WaterClarityInput').val("");
								 $('#SurfaceCoatInpt').val("");
								 $('#OdorCoatInpt').val("");
								 $('#StreamBedColorInput').val("");
								 $('#ShadeInpt').val("");
								 $('#AlgaeCoverInpt').val("");
								 $('#LeafPacks').val("");
								 /* $('#AlgaeLocationInpt').val(""); */
								 $('#AquaticVegetationInpt').val("");
								 $('#FlowInpt').val("");
								 $('#indiNewErosionInput').val("");
								 $('#RiparianVegetationInput').val("");
								 $('#AnimalObservationInput').val("");
								 $('#AditionalNotesInput').val("");
								 $('#SamplesTakenInput').val("");
							
								 capturePhoto();
							
							}else{
								
								 $('#DaysRainfalInput').val("");
								 $('#ApproxRainfalInput').val("");
								 $('#WeatherInput').val("");
								 $('#RainTypeInput').val("");
								 $('#WaterClarityInput').val("");
								 $('#SurfaceCoatInpt').val("");
								 $('#OdorCoatInpt').val("");
								 $('#StreamBedColorInput').val("");
								 $('#ShadeInpt').val("");
								 $('#AlgaeCoverInpt').val("");
								 
								 $('#LeafPacks').val("");
								 /* $('#AlgaeLocationInpt').val(""); */
								 $('#AquaticVegetationInpt').val("");
								 $('#FlowInpt').val("");
								 $('#indiNewErosionInput').val("");
								 $('#RiparianVegetationInput').val("");
								 $('#AnimalObservationInput').val("");
								 $('#AditionalNotesInput').val("");
								 $('#SamplesTakenInput').val("");
								
							
								window.location = "data.html#pageAddStream";
								}
						
						
				 
					  }else{
						  
						  alert('Error creating new observational');
						  
						  }
						 
				  }
			});
			return false;
 	
	
	}else{
		
		
		// HERE ON THIS SLOT I NEED TO CREATE THE CODE TO SUBMIT THE RESEARCH FORM ////
		
		
		var DaysRainfalInput 		= $('#DaysRainfalInput').val();
		var ApproxRainfalInput	 	= $('#ApproxRainfalInput').val();
		var WeatherInput	 		= $('#WeatherInput').val();
		var RainTypeInput 			= $('#RainTypeInput').val();
		var WaterClarityInput 		= $('#WaterClarityInput').val();
		var SurfaceCoatInpt 		= $('#SurfaceCoatInpt').val();
		var OdorCoatInpt 			= $('#OdorCoatInpt').val();
		var StreamBedColor		 	= $('#StreamBedColorInput').val();
		var ShadeInpt 				= $('#ShadeInpt').val();
		var AlgaeCoverInpt 			= $('#AlgaeCoverInpt').val();
		
		var LeafPacks 				= $('#LeafPacks').val();
		
		/* var AlgaeLocationInpt 		= $('#AlgaeLocationInpt').val(); */
		
		var AquaticVegetationInpt 	= $('#AquaticVegetationInpt').val();
		var FlowInpt 				= $('#FlowInpt').val();
		var indiNewErosionInput 	= $('#indiNewErosionInput').val();
		var RiparianVegetationInput = $('#RiparianVegetationInput').val();
		var AnimalObservationInput 	= $('#AnimalObservationInput').val();
		var AditionalNotesInput 	= $('#AditionalNotesInput').val();
		var SamplesTakenInput 		= $('#SamplesTakenInput').val();
		var Site_Id 				= $('#Site_Id').val();
		var Lat_Site				= $('#Lat_Site').val();
		var Lon_Site				= $('#Lon_Site').val();
		
		//RESEARCH FORM START HERE
		
		var DissolvelOxygenInput 	= $('#DissolvelOxygenInput').val();
		var pHInput 				= $('#pHInput').val();
		var temperatureInput 		= $('#temperatureInput').val();
		var conductivityInput 		= $('#conductivityInput').val();
		
		
		
		var StreamWidth1 			= $('#StreamWidth1').val();
		var StreamWidth2 			= $('#StreamWidth2').val();
		var StreamWidth3 			= $('#StreamWidth3').val();
		
		var timeTravel1 			= $('#timeTravel1').val();
		var timeTravel2 			= $('#timeTravel2').val();
		var timeTravel3 			= $('#timeTravel3').val();
		
		var Loc1 					= $('#Loc1').val();
		var Depth1 					= $('#Depth1').val();
		
		var Loc2 					= $('#Loc2').val();
		var Depth2 					= $('#Depth2').val();
		
		var Loc3 					= $('#Loc3').val();
		var Depth3 					= $('#Depth3').val();
		
		var Loc4 					= $('#Loc4').val();
		var Depth4 					= $('#Depth4').val();
		
		var Loc5 					= $('#Loc5').val();
		var Depth5 					= $('#Depth5').val();
		
		var Loc6 					= $('#Loc6').val();
		var Depth6 					= $('#Depth6').val();
		
		var Loc7 					= $('#Loc7').val();
		var Depth7 					= $('#Depth7').val();
	
		var Loc8 					= $('#Loc8').val();
		var Depth8 					= $('#Depth8').val();
		
		var Loc9 					= $('#Loc9').val();
		var Depth9 					= $('#Depth9').val();
		
		var Loc10 					= $('#Loc10').val();
		var Depth10 				= $('#Depth10').val();
		
		
		var Loc11 					= $('#Loc11').val();
		var Depth11 				= $('#Depth11').val();
		
		var Loc12 					= $('#Loc12').val();
		var Depth12 				= $('#Depth12').val();
		
		
		var Loc13 					= $('#Loc13').val();
		var Depth13 				= $('#Depth13').val();
		
		var Loc14 					= $('#Loc14').val();
		var Depth14 				= $('#Depth14').val();
		
		
		
			//// I HERE I NEED TO SUBMIT THESE INFORMATION TO THE SERVER AND MANAGE IT WITH PHP ////
	
			var dataString = 'DaysRainfalInput='+DaysRainfalInput+'&ApproxRainfalInput='+ApproxRainfalInput+'&WeatherInput='+WeatherInput+
							 '&RainTypeInput='+RainTypeInput+'&WaterClarityInput='+WaterClarityInput+'&SurfaceCoatInpt='+SurfaceCoatInpt+
							 '&OdorCoatInpt='+OdorCoatInpt+'&StreamBedColor='+StreamBedColor+'&ShadeInpt='+ShadeInpt+'&AlgaeCoverInpt='+AlgaeCoverInpt+	
							 '&LeafPacks='+LeafPacks+'&AquaticVegetationInpt='+AquaticVegetationInpt+'&FlowInpt='+FlowInpt+
							'&indiNewErosionInput='+indiNewErosionInput+'&RiparianVegetationInput='+RiparianVegetationInput+
							'&AnimalObservationInput='+AnimalObservationInput+'&AditionalNotesInput='+AditionalNotesInput+
							'&SamplesTakenInput='+SamplesTakenInput+'&UserLoged='+UserLoged+'&Site_Id='+Site_Id+'&DissolvelOxygenInput='+DissolvelOxygenInput+
							'&pHInput='+pHInput+'&temperatureInput='+temperatureInput+'&conductivityInput='+conductivityInput+'&StreamWidth1='+StreamWidth1+
							'&StreamWidth1='+StreamWidth1+'&StreamWidth2='+StreamWidth2+'&StreamWidth3='+StreamWidth3+'&timeTravel1='+timeTravel1+
							'&timeTravel2='+timeTravel2+'&timeTravel3='+timeTravel3+'&Loc1='+Loc1+'&Depth1='+Depth1+'&Loc2='+Loc2+'&Depth2='+Depth2+
							'&Loc3='+Loc3+'&Depth3='+Depth3+'&Loc4='+Loc4+'&Depth4='+Depth4+'&Loc5='+Loc5+'&Depth5='+Depth5+'&Loc6='+Loc6+'&Depth6='+Depth6+
							'&Loc7='+Loc7+'&Depth7='+Depth7+'&Loc8='+Loc8+'&Depth8='+Depth8+'&Loc9='+Loc9+'&Depth9='+Depth9+'&Loc10='+Loc10+'&Depth10='+Depth10+
							'&Loc11='+Loc11+'&Depth11='+Depth11+'&Loc12='+Loc12+'&Depth12='+Depth12+'&Loc13='+Loc13+'&Depth13='+Depth13+
							'&Loc14='+Loc14+'&Depth14='+Depth14+'&InsertObservationalReserarcher=true';
			 
			
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				async: "false",
				  data: dataString,
				  dataType:"Json",
				  success: function(data) {
					  
					 
					  if (data.Status == 'success'){
						  
						  
						  //I need to sabe the ID of the observation on javascript session to getlater
						  window.localStorage.setItem("ObservationID",data.ObservationLastId);
						   
							window.localStorage.setItem('lat_Image',Lat_Site);
							window.localStorage.setItem('lon_Image',Lon_Site);
							window.localStorage.setItem('Site_Id',Site_Id);
							
						  var confirmResult = confirm("Do you want includes picture on this observation?");
						
							if(confirmResult == true){
								
								 $('#DaysRainfalInput').val("");
								 $('#ApproxRainfalInput').val("");
								 $('#WeatherInput').val("");
								 $('#RainTypeInput').val("");
								 $('#WaterClarityInput').val("");
								 $('#SurfaceCoatInpt').val("");
								 $('#OdorCoatInpt').val("");
								 $('#StreamBedColorInput').val("");
								 $('#ShadeInpt').val("");
								 $('#AlgaeCoverInpt').val("");
								 $('#AlgaeLocationInpt').val("");
								 $('#AquaticVegetationInpt').val("");
								 $('#FlowInpt').val("");
								 $('#indiNewErosionInput').val("");
								 $('#RiparianVegetationInput').val("");
								 $('#AnimalObservationInput').val("");
								 $('#AditionalNotesInput').val("");
								 $('#SamplesTakenInput').val("");
								 
								$('#DissolvelOxygenInput').val("");
								$('#pHInput').val("");
								$('#temperatureInput').val("");
								$('#conductivityInput').val("");
								$('#StreamWidth1').val("");
								$('#StreamWidth2').val("");
								$('#StreamWidth3').val("");
							    $('#timeTravel1').val("");
								$('#timeTravel2').val("");
								$('#timeTravel3').val("");
								$('#Loc1').val("");
								$('#Depth1').val("");
								$('#Loc2').val("");
								$('#Depth2').val("");
								$('#Loc3').val("");
								$('#Depth3').val("");
								$('#Loc4').val("");
								$('#Depth4').val("");
								$('#Loc5').val("");
								$('#Depth5').val("");
								$('#Loc6').val("");
								$('#Depth6').val("");
								$('#Loc7').val("");
								$('#Depth7').val("");
								$('#Loc8').val("");
								$('#Depth8').val("");
								$('#Loc9').val("");
								$('#Depth9').val("");
								$('#Loc10').val("");
								$('#Depth10').val("");
								$('#Loc11').val("");
								$('#Depth11').val("");
								$('#Loc12').val("");
								$('#Depth12').val("");
								$('#Loc13').val("");
								$('#Depth13').val("");
								$('#Loc14').val("");
								$('#Depth14').val("");
								 
								 capturePhoto();
							
							}else{
								
								 $('#DaysRainfalInput').val("");
								 $('#ApproxRainfalInput').val("");
								 $('#WeatherInput').val("");
								 $('#RainTypeInput').val("");
								 $('#WaterClarityInput').val("");
								 $('#SurfaceCoatInpt').val("");
								 $('#OdorCoatInpt').val("");
								 $('#StreamBedColorInput').val("");
								 $('#ShadeInpt').val("");
								 $('#AlgaeCoverInpt').val("");
								 $('#AlgaeLocationInpt').val("");
								 $('#AquaticVegetationInpt').val("");
								 $('#FlowInpt').val("");
								 $('#indiNewErosionInput').val("");
								 $('#RiparianVegetationInput').val("");
								 $('#AnimalObservationInput').val("");
								 $('#AditionalNotesInput').val("");
								 $('#SamplesTakenInput').val("");
								 $('#DissolvelOxygenInput').val("");
								$('#pHInput').val("");
								$('#temperatureInput').val("");
								$('#conductivityInput').val("");
								$('#StreamWidth1').val("");
								$('#StreamWidth2').val("");
								$('#StreamWidth3').val("");
							    $('#timeTravel1').val("");
								$('#timeTravel2').val("");
								$('#timeTravel3').val("");
								$('#Loc1').val("");
								$('#Depth1').val("");
								$('#Loc2').val("");
								$('#Depth2').val("");
								$('#Loc3').val("");
								$('#Depth3').val("");
								$('#Loc4').val("");
								$('#Depth4').val("");
								$('#Loc5').val("");
								$('#Depth5').val("");
								$('#Loc6').val("");
								$('#Depth6').val("");
								$('#Loc7').val("");
								$('#Depth7').val("");
								$('#Loc8').val("");
								$('#Depth8').val("");
								$('#Loc9').val("");
								$('#Depth9').val("");
								$('#Loc10').val("");
								$('#Depth10').val("");
								$('#Loc11').val("");
								$('#Depth11').val("");
								$('#Loc12').val("");
								$('#Depth12').val("");
								$('#Loc13').val("");
								$('#Depth13').val("");
								$('#Loc14').val("");
								$('#Depth14').val("");
								
								
								window.location = "data.html#pageAddStream";
								}
						
						
				 
					  }else{
						  
						  alert('Error creating new observational');
						  
						  }
						 
				  }
			});
			return false;

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//////////////////////////////////
	
	
		
	} // End else condition sesearch form
	

});


function refreshPage()
{
    jQuery.mobile.changePage(window.location.href, {
        allowSamePageTransition: true,
        transition: 'none',
        reloadPage: true
    });
}







// The following functions is to avoid text into input type numbers.]





jQuery("#DaysRainfalInput").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });




jQuery("#DissolvelOxygenInput").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });



jQuery("#pHInput").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });








jQuery("#temperatureInput").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });



jQuery("#conductivityInput").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });





jQuery("#StreamWidth1").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });








jQuery("#StreamWidth2").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });



jQuery("#StreamWidth3").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });






jQuery("#timeTravel1").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });


jQuery("#timeTravel2").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });


jQuery("#timeTravel3").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });









jQuery("#Loc1").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });



jQuery("#Depth1").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });








jQuery("#Loc2").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });



jQuery("#Depth2").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });





jQuery("#Loc3").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });



jQuery("#Depth3").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });


		
	

		
		
		
		


jQuery("#Loc4").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });



jQuery("#Depth4").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });






jQuery("#Loc5").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });



jQuery("#Depth5").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });


		
		


jQuery("#Loc6").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });



jQuery("#Depth6").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });





jQuery("#Loc7").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });



jQuery("#Depth7").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });


		
	

		
	


jQuery("#Loc8").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });



jQuery("#Depth8").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });


		
		
		


jQuery("#Loc9").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });



jQuery("#Depth9").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });


		
	
	
	


jQuery("#Loc10").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });



jQuery("#Depth10").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });


		
	
	


jQuery("#Loc11").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });



jQuery("#Depth11").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });


		
	
	


jQuery("#Loc12").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });



jQuery("#Depth12").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });


		
	
		


jQuery("#Loc13").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });



jQuery("#Depth13").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });


		
		
		


jQuery("#Loc14").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });



jQuery("#Depth14").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ( jQuery.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
  });


		
$('#needleImgBnt').click(function(){
	
	window.location = "compass.html";
});
	
	
	
	
	
	
	
	
var displayObservationsBySite = function(Sites_Id_Input,Lat,Lon){

	var dataString = 'Sites_Id='+Sites_Id_Input+'&UserLoged='+UserLoged+'&DisplaySitesByObservation=true';

	$.ajax({
	type: "POST",
	url: Url+'PHP/FunctionsMobile.php',
	data: dataString,
	async: "false",
	dataType:"Json",
	success: function(data) {

	if (data.Status == 'success'){
		console.log(data.Status);
		$('#containerObersationsLoop').html("");

		var Stream_Id = data.Stream_Id;
		var Stream_Name = data.Stream_Name;
		var Water_body = data.Water_body;
		var Leader_Id = data.Leader_Id;
		var idTeam = data.idTeam;
		var idUser = data.idUser;
		var Observations_Id 			= data.Observations_Id;
		var Days_Since_Last_Rainfall 	= data.Days_Since_Last_Rainfall;
		var Approximate_Rainfall 		= data.Approximate_Rainfall;
		var Current_Weather 			= data.Current_Weather;
		var Rain 						= data.Rain;
		var Water_Clarity 				= data.Water_Clarity;
		var Surface_Coating 			= data.Surface_Coating;
		var Odor 						= data.Odor;
		var Stream_Bed_Color 			= data.Stream_Bed_Color;
		var Shade_Percentage 			= data.Shade_Percentage;
		var Algae_Cover 				= data.Algae_Cover;
		var LeafPacks 				= data.LeafPacks;
		var Aquatic_Vegetation 			= data.Aquatic_Vegetation;
		var Flow 						= data.Flow;
		var Indication_New_Erosion 		= data.Indication_New_Erosion;
		var Change_riparian_vegetation  = data.Change_riparian_vegetation;
		var Animal_Observation 			= data.Animal_Observation;
		var Additional_Notes 		    = data.Additional_Notes;
		var Samples_Taken 				= data.Samples_Taken;
		var DateObservation 			= data.DateObservation;
		var TimeObservation 		    = data.TimeObservation;
		var Sites_Id 					= data.Sites_Id;
		var Site_Name 		    		= data.Site_Name;
		var Site_Description 			= data.Site_Description;
		var Lat 						= data.Lat;
		var Lon 		    			= data.Lon;
		var TodayDate 		    			= data.TodayDate;

		for (var i in Observations_Id) {

			//replace all single quotes by html characters
			var Erosion = Indication_New_Erosion[i].replace(/'/g, ' ');
			var riparian_vegetation = Change_riparian_vegetation[i].replace(/'/g, ' ');
			var AnimalObservation = Animal_Observation[i].replace(/'/g, ' ');
			var AdditionalNotes = Additional_Notes[i].replace(/'/g, ' ');

			var SamplesTaken = Samples_Taken[i].replace(/'/g, ' ');
			var AdditionalNotes = Additional_Notes[i].replace(/'/g, ' ');

			// This function is to avoid modifications on the correct day
			if(DateObservation[i] == TodayDate){

				$('#containerObersationsLoop').append(

				'<div class="lineObservationLoop">'+
				'<div class="columnsDateObervations">'+
				'<p>'+DateObservation[i]+'</p>'+
				'</div>'+
				'<div class="columnsObervationsStream">'+
				'<p>Citizens Science</p>'+
				'</div>'+
				'<div class="columnsObervationsSite">'+
				'<p>'+Site_Name[i]+'</p>'+
				'</div>'+

				'<div class="rightLineObervations">'+
				'<a href="javascript:UpdateObservations('+Observations_Id[i]+','+Days_Since_Last_Rainfall[i]+',\''+Approximate_Rainfall[i]+'\',\''+Current_Weather[i]+'\',\''+Rain[i]+'\',\''+Water_Clarity[i]+'\',\''+Surface_Coating[i]+'\',\''+Odor[i]+'\',\''+Stream_Bed_Color[i]+'\',\''+Shade_Percentage[i]+'\',\''+Algae_Cover[i]+'\',\''+LeafPacks[i]+'\',\''+Aquatic_Vegetation[i]+'\',\''+Flow[i]+'\',\''+Erosion+'\',\''+riparian_vegetation+'\',\''+AnimalObservation+'\',\''+AdditionalNotes+'\',\''+SamplesTaken+'\',\''+DateObservation[i]+'\',\''+TimeObservation[i]+'\','+Sites_Id[i]+','+Lat[i]+','+Lon[i]+')"><img src="Images/EditIcon.png" alt="EditIcon" /></a>'+
				'<a href="#infoSite" data-transition="slideup" id="EditObservationLink" onclick="fullInfoObervation('+Observations_Id[i]+','+Days_Since_Last_Rainfall[i]+',\''+Approximate_Rainfall[i]+'\',\''+Current_Weather[i]+'\',\''+Rain[i]+'\',\''+Water_Clarity[i]+'\',\''+Surface_Coating[i]+'\',\''+Odor[i]+'\',\''+Stream_Bed_Color[i]+'\',\''+Shade_Percentage[i]+'\',\''+Algae_Cover[i]+'\',\''+LeafPacks[i]+'\',\''+Aquatic_Vegetation[i]+'\',\''+Flow[i]+'\',\''+Erosion+'\',\''+riparian_vegetation+'\',\''+AnimalObservation+'\',\''+AdditionalNotes+'\',\''+SamplesTaken+'\',\''+DateObservation[i]+'\',\''+TimeObservation[i]+'\','+Sites_Id[i]+','+Lat[i]+','+Lon[i]+')"><img src="Images/EyeIcon.png" alt="EyeIcon" /></a>'+
				'</div>'+
				'</div>'

				); 	

			}else{

				$('#containerObersationsLoop').append(

				'<div class="lineObservationLoop">'+
				'<div class="columnsDateObervations">'+
				'<p>'+DateObservation[i]+'</p>'+
				'</div>'+
				'<div class="columnsObervationsStream">'+
				'<p>Citizens Science</p>'+
				'</div>'+
				'<div class="columnsObervationsSite">'+
				'<p>'+Site_Name[i]+'</p>'+
				'</div>'+
				'<div class="rightLineObervations">'+
				'<a href="#infoSite" data-transition="slideup" id="EditObservationLink" onclick="fullInfoObervation('+Observations_Id[i]+','+Days_Since_Last_Rainfall[i]+',\''+Approximate_Rainfall[i]+'\',\''+Current_Weather[i]+'\',\''+Rain[i]+'\',\''+Water_Clarity[i]+'\',\''+Surface_Coating[i]+'\',\''+Odor[i]+'\',\''+Stream_Bed_Color[i]+'\',\''+Shade_Percentage[i]+'\',\''+Algae_Cover[i]+'\',\''+LeafPacks[i]+'\',\''+Aquatic_Vegetation[i]+'\',\''+Flow[i]+'\',\''+Erosion+'\',\''+riparian_vegetation+'\',\''+AnimalObservation+'\',\''+AdditionalNotes+'\',\''+SamplesTaken+'\',\''+DateObservation[i]+'\',\''+TimeObservation[i]+'\','+Sites_Id[i]+','+Lat[i]+','+Lon[i]+')"><img src="Images/EyeIcon.png" alt="EyeIcon" /></a>'+
				'</div>'+
				'</div>'

				);

			} 

		} // End for loop
		displayDynamicObservationBySite(Sites_Id_Input);



	} else{ // end if (data.Status == 'success')

	console.log(data.Status);
	$('#containerObersationsLoop').html("");
	displayDynamicObservationBySite(Sites_Id_Input);

	}

}
});


return false;


}  // end dataObservationsDisplay
	
	
	
	
	
	
	
	
	
var displayDynamicObservationBySite = function(Sites_Id){

	var dataString = 'Sites_Id='+Sites_Id+'&UserLoged='+UserLoged+'&displayDynamicObservationBySite=true';

	$.ajax({
	type: "POST",
	url: Url+'PHP/FunctionsMobile.php',
	async: "false",
	data: dataString,
	dataType:"Json",
	success: function(data) {

		if (data.Status == 'success'){

		var DataId 			 		= data.DataId;
		var Data_Description 		= data.Data_Description;
		var Field_Id 		 		= data.Field_Id;
		var DynamicObservation 		= data.DynamicObservation;
		var Date_DynaOberservation 	= data.Date_DynaOberservation;
		var Lat_DynamiData 			= data.Lat_DynamiData;
		var Lon_DynamiData 			= data.Lon_DynamiData;


		var Sites_Id 			 	= data.Sites_Id;
		var Site_Name 				= data.Site_Name;
		var Site_Description 		= data.Site_Description;
		var Lat 					= data.Lat;
		var Lon 					= data.Lon;

		var Stream_Id 				= data.Stream_Id;
		var Stream_Name 			= data.Stream_Name;
		var Water_body 				= data.Water_body;
		var DateStream 				= data.DateStream;
		var Leader_Id 				= data.Leader_Id;
		var idTeam 					= data.idTeam;

		var Date_Form 				= data.Date_Form;
		var Field_Id 				= data.Field_Id;
		var Field_Name 				= data.Field_Name;
		var Field_Type_Id 			= data.Field_Type_Id;
		var TodayDate = data.TodayDate;
		var Form_Name = data.Form_Name;

			for (var i in DynamicObservation) {

			//replace all single quotes by html characters var Data_Description = Data_Description[i].replace(/'/g, ' ');
			// This function is to avoid modifications on the correct day
				if(Date_DynaOberservation[i] == TodayDate){
					$('#containerObersationsLoop').append(
					'<div class="lineObservationLoop">'+
					'<div class="columnsDateObervations">'+
						'<p>'+Date_DynaOberservation[i]+'</p>'+
					'</div>'+
					'<div class="columnsObervationsStream">'+
						'<p>'+Form_Name[i]+'</p>'+
					'</div>'+
					'<div class="columnsObervationsSite">'+
						'<p>'+Site_Name[i]+'</p>'+
					'</div>'+
					'<div class="rightLineObervations">'+
					'<a href="data.html#ResultFormEdit" onclick="UpdateDynamicObservations('+Form_Id[i]+',\''+Form_Name[i]+'\','+Sites_Id[i]+','+DynamicObservation[i]+')"><img src="Images/EditIcon.png" alt="EditIcon" /></a>'+
					'<a href="data.html#infoDynamicObservation" onclick="fullInfoDynamicObervation('+DynamicObservation[i]+')"><img src="Images/EyeIcon.png" alt="EyeIcon" /></a>'+
					'</div>'+
					'</div>'
					); 	
				}else{
					$('#containerObersationsLoop').append(
					'<div class="lineObservationLoop">'+
					'<div class="columnsDateObervations">'+
						'<p>'+Date_DynaOberservation[i]+'</p>'+
					'</div>'+
					'<div class="columnsObervationsStream">'+
						'<p>'+Form_Name[i]+'</p>'+
					'</div>'+
					'<div class="columnsObervationsSite">'+
						'<p>'+Site_Name[i]+'</p>'+
					'</div>'+
					'<div class="rightLineObervations">'+
					'<a href="data.html#infoDynamicObservation" onclick="fullInfoDynamicObervation('+DynamicObservation[i]+')"><img src="Images/EyeIcon.png" alt="EyeIcon" /></a>'+
					'</div>'+
					'</div>'
					);
				}
			} // End for loop

			$('#containerObersationsLoop').append(
				'<div id="photoDisplay">'+
				'</div>'
				);
			displayPhotos(Sites_Id);	
		} else{

		}

	}
});

return false;

}  // end dataObservationsDisplay
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
var UpdateObservations = function(Observations_Id,Days_Since_Last_Rainfall,Approximate_Rainfall,Current_Weather,Rain,Water_Clarity,Surface_Coating,Odor,Stream_Bed_Color,Shade_Percentage,Algae_Cover,LeafPacks,Aquatic_Vegetation,Flow,Indication_New_Erosion,riparian_vegetation,AnimalObservation,AdditionalNotes,SamplesTaken,DateObservation,TimeObservation,Sites_Id,Lat,Lon){
	
			// Open page wich contain the form

			window.location = "#observationsForms";
	
	
								 $('#DaysRainfalInput').val(Days_Since_Last_Rainfall);
								 $('#ApproxRainfalInput').val(Approximate_Rainfall);
						
						
						
								$('#WeatherInput option[value="'+Current_Weather+'"]').prop("selected","selected").change();
								$('#RainTypeInput option[value="'+Rain+'"]').prop("selected","selected").change();
								$('#WaterClarityInput option[value="'+Water_Clarity+'"]').prop("selected","selected").change();
								$('#SurfaceCoatInpt option[value="'+Surface_Coating+'"]').prop("selected","selected").change();
								$('#OdorCoatInpt option[value="'+Odor+'"]').prop("selected","selected").change();
								$('#StreamBedColorInput option[value="'+Stream_Bed_Color+'"]').prop("selected","selected").change();
								$('#ShadeInpt option[value="'+Shade_Percentage+'"]').prop("selected","selected").change();
								$('#AlgaeCoverInpt option[value="'+Algae_Cover+'"]').prop("selected","selected").change();
								$('#LeafPacks option[value="'+LeafPacks+'"]').prop("selected","selected").change();
								$('#AquaticVegetationInpt option[value="'+Aquatic_Vegetation+'"]').prop("selected","selected").change();
								$('#FlowInpt option[value="'+Flow+'"]').prop("selected","selected").change();
							
								
								
								$('#indiNewErosionInput option[value="'+Indication_New_Erosion+'"]').prop("selected","selected").change();
								$('#RiparianVegetationInput option[value="'+riparian_vegetation+'"]').prop("selected","selected").change();
								$('#AnimalObservationInput option[value="'+AnimalObservation+'"]').prop("selected","selected").change();			
					 
								
								 
								 $('#AditionalNotesInput').val(AdditionalNotes);
								 $('#SamplesTakenInput').val(SamplesTaken);
								 $('#ObservationIdToUpdate').val(Observations_Id);
								
								checkTypeForm(Observations_Id,Sites_Id,Lat,Lon);
	
				// Now I need to detect if this for is for citizens sciences or researchers and also download images
				
				
				
	
} // End UpdateObservations





var checkTypeForm = function(Observations_Id,Sites_Id,Lat,Lon){
	
	
	var dataString = 'Observations_Id='+Observations_Id+'&CheckImagesAndFormType2=true';
	
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				async: "false",
				  dataType:"Json",
				  success: function(data) {
					  
					  
					  	var Measurements_Id 		= data.Measurements_Id;
						var Dissolved_Oxygen_mg_L 	= data.Dissolved_Oxygen_mg_L;
						var pH 						= data.pH;
						var Temperature_Celsius 	= data.Temperature_Celsius;
						var Conductivity 			= data.Conductivity;
						
						var Physical_Measurements_Id 	= data.Physical_Measurements_Id;
						var Stream_Width_Ft_1 			= data.Stream_Width_Ft_1;
						var Stream_Width_Ft_2 			= data.Stream_Width_Ft_2;
						var Stream_Width_Ft_3 			= data.Stream_Width_Ft_3;
						var Time_Travel_1 				= data.Time_Travel_1;	
						var Time_Travel_2 				= data.Time_Travel_2;
						var Time_Travel_3 				= data.Time_Travel_3;
						
						var Depth_1 				= data.Depth_1;	
						var Depth_2 				= data.Depth_2;
						var Depth_3 				= data.Depth_3;
						var Depth_4 				= data.Depth_4;	
						var Depth_5 				= data.Depth_5;
						var Depth_6 				= data.Depth_6;
						var Depth_7 				= data.Depth_7;	
						var Depth_8 				= data.Depth_8;
						var Depth_9 				= data.Depth_9;
						var Depth_10 				= data.Depth_10;	
						var Depth_11 				= data.Depth_11;
						var Depth_12 				= data.Depth_12;
						var Depth_13 				= data.Depth_13;	
						var Depth_14 				= data.Depth_14;
						
						var Depth_Loc_1 			= data.Depth_Loc_1;
						var Depth_Loc_2 			= data.Depth_Loc_2;
						var Depth_Loc_3 			= data.Depth_Loc_3;
						var Depth_Loc_4 			= data.Depth_Loc_4;
						var Depth_Loc_5 			= data.Depth_Loc_5;
						var Depth_Loc_6 			= data.Depth_Loc_6;
						var Depth_Loc_7 			= data.Depth_Loc_7;
						var Depth_Loc_8 			= data.Depth_Loc_8;
						var Depth_Loc_9 			= data.Depth_Loc_9;
						var Depth_Loc_10 			= data.Depth_Loc_10;
						var Depth_Loc_11 			= data.Depth_Loc_11;
						var Depth_Loc_12 			= data.Depth_Loc_12;
						var Depth_Loc_13 			= data.Depth_Loc_13;
						var Depth_Loc_14 			= data.Depth_Loc_14;
						
					
					 if(data.FormType == 'Citizens'){
						  
						  
						 	$('.lineFormObservations2').hide();
							$('.lineFormObservationsTime').hide();
							$('.lineFormObservationsStream').hide();
							$('.lineFormObservationsDepth').hide();
							$('.lineFormObservationsMeasures').hide();
							$('.titleFormMeasures').hide();
							$('.hrResearch').hide();
							$('#typeObservation').val('Citizens');
							$('#bntObservation').hide();
							$('#bntObservationUpdate').show();
							$('#Site_Id').val(Sites_Id);
							$('#Lat_Site').val(Lat);
							$('#Lon_Site').val(Lon);
						  
						  
						  
					 }else{
						 
							$('.lineFormObservations2').show();
							$('.lineFormObservationsTime').show();
							$('.lineFormObservationsStream').show();
							$('.lineFormObservationsDepth').show();
							$('.lineFormObservationsMeasures').show();
							$('.titleFormMeasures').show();
							$('.hrResearch').show();
							$('#typeObservation').val('Researchers');
							$('#bntObservation').hide();
							$('#bntObservationUpdate').show();
							$('#Site_Id').val(Sites_Id);
							$('#Lat_Site').val(Lat);
							$('#Lon_Site').val(Lon);
							$('#Measurements_Id').val(Measurements_Id);
							$('#Physical_Measurements_Id').val(Physical_Measurements_Id);
						
						/// Now I need to complete the aditional info
						
					
						
								$('#DissolvelOxygenInput').val(Dissolved_Oxygen_mg_L);
								$('#pHInput').val(pH);
								$('#temperatureInput').val(Temperature_Celsius);
								$('#conductivityInput').val(Conductivity);
						
								
								$('#StreamWidth1').val(Stream_Width_Ft_1);
								$('#StreamWidth2').val(Stream_Width_Ft_2);
								$('#StreamWidth3').val(Stream_Width_Ft_3);
							    $('#timeTravel1').val(Time_Travel_1);
								$('#timeTravel2').val(Time_Travel_2);
								$('#timeTravel3').val(Time_Travel_3);
								
								$('#Loc1').val(Depth_Loc_1);
								$('#Depth1').val(Depth_1);
								$('#Loc2').val(Depth_Loc_2);
								$('#Depth2').val(Depth_2);
								$('#Loc3').val(Depth_Loc_3);
								$('#Depth3').val(Depth_3);
								$('#Loc4').val(Depth_Loc_4);
								$('#Depth4').val(Depth_4);
								$('#Loc5').val(Depth_Loc_5);
								$('#Depth5').val(Depth_5);
								$('#Loc6').val(Depth_Loc_6);
								$('#Depth6').val(Depth_6);
								$('#Loc7').val(Depth_Loc_7);
								$('#Depth7').val(Depth_7);
								$('#Loc8').val(Depth_Loc_8);
								$('#Depth8').val(Depth_8);
								$('#Loc9').val(Depth_Loc_9);
								$('#Depth9').val(Depth_9);
								$('#Loc10').val(Depth_Loc_10);
								$('#Depth10').val(Depth_10);
								$('#Loc11').val(Depth_Loc_11);
								$('#Depth11').val(Depth_11);
								$('#Loc12').val(Depth_Loc_12);
								$('#Depth12').val(Depth_12);
								$('#Loc13').val(Depth_Loc_13);
								$('#Depth13').val(Depth_13);
								$('#Loc14').val(Depth_Loc_14);
								$('#Depth14').val(Depth_14);
						
				
						
						}
					 
						 
				  } // end success function datas
			});
			return false;

} // CheckTypeForm function




$('#bntObservationUpdate').click(function(){
	
	
	var typeObservation = $('#typeObservation').val();
	
	
	
	if(typeObservation == 'Citizens'){
		// heres I need to take all information of the citizens form ty submit //
		
		var DaysRainfalInput 		= $('#DaysRainfalInput').val();
		var ApproxRainfalInput	 	= $('#ApproxRainfalInput').val();
		var WeatherInput	 		= $('#WeatherInput').val();
		var RainTypeInput 			= $('#RainTypeInput').val();
		var WaterClarityInput 		= $('#WaterClarityInput').val();
		var SurfaceCoatInpt 		= $('#SurfaceCoatInpt').val();
		var OdorCoatInpt 			= $('#OdorCoatInpt').val();
		var StreamBedColor		 	= $('#StreamBedColorInput').val();
		var ShadeInpt 				= $('#ShadeInpt').val();
		var AlgaeCoverInpt 			= $('#AlgaeCoverInpt').val();
		var LeafPacks 				= $('#LeafPacks').val();
		
		/* var AlgaeLocationInpt 		= $('#AlgaeLocationInpt').val(); */
		var AquaticVegetationInpt 	= $('#AquaticVegetationInpt').val();
		var FlowInpt 				= $('#FlowInpt').val();
		var indiNewErosionInput 	= $('#indiNewErosionInput').val();
		var RiparianVegetationInput = $('#RiparianVegetationInput').val();
		var AnimalObservationInput 	= $('#AnimalObservationInput').val();
		var AditionalNotesInput 	= $('#AditionalNotesInput').val();
		var SamplesTakenInput 		= $('#SamplesTakenInput').val();
		var Site_Id 				= $('#Site_Id').val();
		var Lat_Site				= $('#Lat_Site').val();
		var Lon_Site				= $('#Lon_Site').val();
		var ObservationId			= $('#ObservationIdToUpdate').val();
	
		
				
				//// I HERE I NEED TO SUBMIT THESE INFORMATION TO THE SERVER AND MANAGE IT WITH PHP ////
		
			var dataString = 'DaysRainfalInput='+DaysRainfalInput+'&ApproxRainfalInput='+ApproxRainfalInput+'&WeatherInput='+WeatherInput+
							 '&RainTypeInput='+RainTypeInput+'&WaterClarityInput='+WaterClarityInput+'&SurfaceCoatInpt='+SurfaceCoatInpt+
							 '&OdorCoatInpt='+OdorCoatInpt+'&StreamBedColor='+StreamBedColor+'&ShadeInpt='+ShadeInpt+'&AlgaeCoverInpt='+AlgaeCoverInpt+	
							 '&LeafPacks='+LeafPacks+'&AquaticVegetationInpt='+AquaticVegetationInpt+'&FlowInpt='+FlowInpt+
							'&indiNewErosionInput='+indiNewErosionInput+'&RiparianVegetationInput='+RiparianVegetationInput+
							'&AnimalObservationInput='+AnimalObservationInput+'&AditionalNotesInput='+AditionalNotesInput+
							'&SamplesTakenInput='+SamplesTakenInput+'&UserLoged='+UserLoged+'&Site_Id='+Site_Id+'&ObservationId='+ObservationId+
							'&UpdateObservational=true';
			 
			
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				  dataType:"Json",
				  success: function(data) {
					  
					 
					  if (data.Status == 'success'){
						  
						  
						  	alert("Update Successfully");
					
								 $('#DaysRainfalInput').val("");
								 $('#ApproxRainfalInput').val("");
								 $('#WeatherInput').val("");
								 $('#RainTypeInput').val("");
								 $('#WaterClarityInput').val("");
								 $('#SurfaceCoatInpt').val("");
								 $('#OdorCoatInpt').val("");
								 $('#StreamBedColorInput').val("");
								 $('#ShadeInpt').val("");
								 $('#AlgaeCoverInpt').val("");
								 $('#LeafPacks').val("");
								 $('#AquaticVegetationInpt').val("");
								 $('#FlowInpt').val("");
								 $('#indiNewErosionInput').val("");
								 $('#RiparianVegetationInput').val("");
								 $('#AnimalObservationInput').val("");
								 $('#AditionalNotesInput').val("");
								 $('#SamplesTakenInput').val("");
							
							
							
								window.location = "data.html#pageAddStream";
								
						
						
				 
					  }else{
						  
						  alert('Error updating observation');
						  
						  }
						 
				  }
			});
			return false;
 	
	
	}else{
		
		
		// HERE ON THIS SLOT I NEED TO CREATE THE CODE TO SUBMIT THE RESEARCH FORM ////
		
		
		var DaysRainfalInput 		= $('#DaysRainfalInput').val();
		var ApproxRainfalInput	 	= $('#ApproxRainfalInput').val();
		var WeatherInput	 		= $('#WeatherInput').val();
		var RainTypeInput 			= $('#RainTypeInput').val();
		var WaterClarityInput 		= $('#WaterClarityInput').val();
		var SurfaceCoatInpt 		= $('#SurfaceCoatInpt').val();
		var OdorCoatInpt 			= $('#OdorCoatInpt').val();
		var StreamBedColor		 	= $('#StreamBedColorInput').val();
		var ShadeInpt 				= $('#ShadeInpt').val();
		var AlgaeCoverInpt 			= $('#AlgaeCoverInpt').val();
		var AlgaeLocationInpt 		= $('#AlgaeLocationInpt').val();
		var AquaticVegetationInpt 	= $('#AquaticVegetationInpt').val();
		var FlowInpt 				= $('#FlowInpt').val();
		var indiNewErosionInput 	= $('#indiNewErosionInput').val();
		var RiparianVegetationInput = $('#RiparianVegetationInput').val();
		var AnimalObservationInput 	= $('#AnimalObservationInput').val();
		var AditionalNotesInput 	= $('#AditionalNotesInput').val();
		var SamplesTakenInput 		= $('#SamplesTakenInput').val();
		var Site_Id 				= $('#Site_Id').val();
		var Lat_Site				= $('#Lat_Site').val();
		var Lon_Site				= $('#Lon_Site').val();
		var ObservationId			= $('#ObservationIdToUpdate').val();
		var Physical_Measurements_Id = $('#Physical_Measurements_Id').val();
		//RESEARCH FORM START HERE
		
		var Measurements_Id			= $('#Measurements_Id').val();	
		var DissolvelOxygenInput 	= $('#DissolvelOxygenInput').val();
		var pHInput 				= $('#pHInput').val();
		var temperatureInput 		= $('#temperatureInput').val();
		var conductivityInput 		= $('#conductivityInput').val();
		
		
		
		var StreamWidth1 			= $('#StreamWidth1').val();
		var StreamWidth2 			= $('#StreamWidth2').val();
		var StreamWidth3 			= $('#StreamWidth3').val();
		
		var timeTravel1 			= $('#timeTravel1').val();
		var timeTravel2 			= $('#timeTravel2').val();
		var timeTravel3 			= $('#timeTravel3').val();
		
		var Loc1 					= $('#Loc1').val();
		var Depth1 					= $('#Depth1').val();
		var Loc2 					= $('#Loc2').val();
		var Depth2 					= $('#Depth2').val();
		var Loc3 					= $('#Loc3').val();
		var Depth3 					= $('#Depth3').val();
		var Loc4 					= $('#Loc4').val();
		var Depth4 					= $('#Depth4').val();
		var Loc5 					= $('#Loc5').val();
		var Depth5 					= $('#Depth5').val();
		var Loc6 					= $('#Loc6').val();
		var Depth6 					= $('#Depth6').val();
		var Loc7 					= $('#Loc7').val();
		var Depth7 					= $('#Depth7').val();
		var Loc8 					= $('#Loc8').val();
		var Depth8 					= $('#Depth8').val();
		var Loc9 					= $('#Loc9').val();
		var Depth9 					= $('#Depth9').val();
		var Loc10 					= $('#Loc10').val();
		var Depth10 				= $('#Depth10').val();
		var Loc11 					= $('#Loc11').val();
		var Depth11 				= $('#Depth11').val();
		var Loc12 					= $('#Loc12').val();
		var Depth12 				= $('#Depth12').val();
		var Loc13 					= $('#Loc13').val();
		var Depth13 				= $('#Depth13').val();
		var Loc14 					= $('#Loc14').val();
		var Depth14 				= $('#Depth14').val();
		
			//// I HERE I NEED TO SUBMIT THESE INFORMATION TO THE SERVER AND MANAGE IT WITH PHP ////
	
			var dataString = 'DaysRainfalInput='+DaysRainfalInput+'&ApproxRainfalInput='+ApproxRainfalInput+'&WeatherInput='+WeatherInput+
							 '&RainTypeInput='+RainTypeInput+'&WaterClarityInput='+WaterClarityInput+'&SurfaceCoatInpt='+SurfaceCoatInpt+
							 '&OdorCoatInpt='+OdorCoatInpt+'&StreamBedColor='+StreamBedColor+'&ShadeInpt='+ShadeInpt+'&AlgaeCoverInpt='+AlgaeCoverInpt+	
							 '&AlgaeLocationInpt='+AlgaeLocationInpt+'&AquaticVegetationInpt='+AquaticVegetationInpt+'&FlowInpt='+FlowInpt+
							'&indiNewErosionInput='+indiNewErosionInput+'&RiparianVegetationInput='+RiparianVegetationInput+
							'&AnimalObservationInput='+AnimalObservationInput+'&AditionalNotesInput='+AditionalNotesInput+
							'&SamplesTakenInput='+SamplesTakenInput+'&UserLoged='+UserLoged+'&Site_Id='+Site_Id+'&DissolvelOxygenInput='+DissolvelOxygenInput+
							'&pHInput='+pHInput+'&temperatureInput='+temperatureInput+'&conductivityInput='+conductivityInput+'&StreamWidth1='+StreamWidth1+
							'&StreamWidth1='+StreamWidth1+'&StreamWidth2='+StreamWidth2+'&StreamWidth3='+StreamWidth3+'&timeTravel1='+timeTravel1+
							'&timeTravel2='+timeTravel2+'&timeTravel3='+timeTravel3+'&Loc1='+Loc1+'&Depth1='+Depth1+'&Loc2='+Loc2+'&Depth2='+Depth2+
							'&Loc3='+Loc3+'&Depth3='+Depth3+'&Loc4='+Loc4+'&Depth4='+Depth4+'&Loc5='+Loc5+'&Depth5='+Depth5+'&Loc6='+Loc6+'&Depth6='+Depth6+
							'&Loc7='+Loc7+'&Depth7='+Depth7+'&Loc8='+Loc8+'&Depth8='+Depth8+'&Loc9='+Loc9+'&Depth9='+Depth9+'&Loc10='+Loc10+'&Depth10='+Depth10+
							'&Loc11='+Loc11+'&Depth11='+Depth11+'&Loc12='+Loc12+'&Depth12='+Depth12+'&Loc13='+Loc13+'&Depth13='+Depth13+
							'&Loc14='+Loc14+'&Depth14='+Depth14+'&ObservationId='+ObservationId+'&Measurements_Id='+Measurements_Id+
							'&Physical_Measurements_Id='+Physical_Measurements_Id+'&UpdateObservationalReserarcher=true';
			 
			
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				  dataType:"Json",
				  success: function(data) {
					  
					 
					  if (data.Status == 'success'){
						  
					
								
								 $('#DaysRainfalInput').val("");
								 $('#ApproxRainfalInput').val("");
								 $('#WeatherInput').val("");
								 $('#RainTypeInput').val("");
								 $('#WaterClarityInput').val("");
								 $('#SurfaceCoatInpt').val("");
								 $('#OdorCoatInpt').val("");
								 $('#StreamBedColorInput').val("");
								 $('#ShadeInpt').val("");
								 $('#AlgaeCoverInpt').val("");
								 $('#AlgaeLocationInpt').val("");
								 $('#AquaticVegetationInpt').val("");
								 $('#FlowInpt').val("");
								 $('#indiNewErosionInput').val("");
								 $('#RiparianVegetationInput').val("");
								 $('#AnimalObservationInput').val("");
								 $('#AditionalNotesInput').val("");
								 $('#SamplesTakenInput').val("");
								 
								$('#DissolvelOxygenInput').val("");
								$('#pHInput').val("");
								$('#temperatureInput').val("");
								$('#conductivityInput').val("");
								$('#StreamWidth1').val("");
								$('#StreamWidth2').val("");
								$('#StreamWidth3').val("");
							    $('#timeTravel1').val("");
								$('#timeTravel2').val("");
								$('#timeTravel3').val("");
								$('#Loc1').val("");
								$('#Depth1').val("");
								$('#Loc2').val("");
								$('#Depth2').val("");
								$('#Loc3').val("");
								$('#Depth3').val("");
								$('#Loc4').val("");
								$('#Depth4').val("");
								$('#Loc5').val("");
								$('#Depth5').val("");
								$('#Loc6').val("");
								$('#Depth6').val("");
								$('#Loc7').val("");
								$('#Depth7').val("");
								$('#Loc8').val("");
								$('#Depth8').val("");
								$('#Loc9').val("");
								$('#Depth9').val("");
								$('#Loc10').val("");
								$('#Depth10').val("");
								$('#Loc11').val("");
								$('#Depth11').val("");
								$('#Loc12').val("");
								$('#Depth12').val("");
								$('#Loc13').val("");
								$('#Depth13').val("");
								$('#Loc14').val("");
								$('#Depth14').val("");
								 
							
								window.location = "data.html#pageAddStream";
						
						
						
				 
					  }else{
						  
						  alert('Error updation observation');
						  
						  }
						 
				  }
			});
			return false;

	
	

	
		
	} // End else condition sesearch form
	
	
	
});




var fullInfoObervation = function(Observations_Id,Days_Since_Last_Rainfall,Approximate_Rainfall,Current_Weather,Rain,Water_Clarity,Surface_Coating,Odor,Stream_Bed_Color,Shade_Percentage,Algae_Cover,LeafPacks,Aquatic_Vegetation,Flow,Erosion,riparian_vegetation,AnimalObservation,AdditionalNotes,SamplesTaken,DateObservation,TimeObservation,Sites_Id,Lat,Lon){
	
	
	$('#lastRainFallInfo').html(Days_Since_Last_Rainfall);
	$('#approxRainfallInfo').html(Approximate_Rainfall);
	$('#currentWeatherInfo').html(Current_Weather);
	$('#rainInfo').html(Rain);
	$('#waterClarityInfo').html(Water_Clarity);
	$('#surfaceCoatingInfo').html(Surface_Coating);
	$('#OdorInfo').html(Odor);
	$('#StreamBedColorInfo').html(Stream_Bed_Color);
	$('#shadeInfo').html(Shade_Percentage);
	
	$('#algaeCoverInfo').html(Algae_Cover);
	
	/* $('#AlgaeLocationInfo').html(Algae_Location); */
	$('#LeafPacksInfo').html(LeafPacks);
	
	$('#AquaticVegetationInfo').html(Aquatic_Vegetation);
	$('#flowInfo').html(Flow);
	$('#ErosionInfo').html(Erosion);
	
	$('#changeRiparianInfo').html(riparian_vegetation);
	$('#animalObservationInfo').html(AnimalObservation);
	$('#AditionalNotesInfo').html(AdditionalNotes);
	
	$('#SamplesTakenInfo').html(SamplesTaken);
	
	
	// At this point I need to check if this observations is citizens science or research
	
	checkTypeObservations(Observations_Id);
	ImagesObservations(Observations_Id);


} // End fullInfoObservations



var checkTypeObservations = function(Observations_Id){
	
	
			var dataString = 'Observations_Id='+Observations_Id+'&checkKindOfData=true';
	
			 
			
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				async: "false",
				  dataType:"Json",
				  success: function(data) {
					  
					 
					 
					  if(data.FormType == 'Citizens'){
						  
						  
						 	$('#containerResearchInfo').hide();
				    }else{
						
						$('#containerResearchInfo').show();
						
					
						var Dissolved_Oxygen_mg_L 	= data.Dissolved_Oxygen_mg_L;
						var pH 						= data.pH;
						var Temperature_Celsius 	= data.Temperature_Celsius;
						var Conductivity 			= data.Conductivity;
						
						var Physical_Measurements_Id 	= data.Physical_Measurements_Id;
						var Stream_Width_Ft_1 			= data.Stream_Width_Ft_1;
						var Stream_Width_Ft_2 			= data.Stream_Width_Ft_2;
						var Stream_Width_Ft_3 			= data.Stream_Width_Ft_3;
						var Time_Travel_1 				= data.Time_Travel_1;	
						var Time_Travel_2 				= data.Time_Travel_2;
						var Time_Travel_3 				= data.Time_Travel_3;
						
						var Depth_1 				= data.Depth_1;	
						var Depth_2 				= data.Depth_2;
						var Depth_3 				= data.Depth_3;
						var Depth_4 				= data.Depth_4;	
						var Depth_5 				= data.Depth_5;
						var Depth_6 				= data.Depth_6;
						var Depth_7 				= data.Depth_7;	
						var Depth_8 				= data.Depth_8;
						var Depth_9 				= data.Depth_9;
						var Depth_10 				= data.Depth_10;	
						var Depth_11 				= data.Depth_11;
						var Depth_12 				= data.Depth_12;
						var Depth_13 				= data.Depth_13;	
						var Depth_14 				= data.Depth_14;
						
						var Depth_Loc_1 			= data.Depth_Loc_1;
						var Depth_Loc_2 			= data.Depth_Loc_2;
						var Depth_Loc_3 			= data.Depth_Loc_3;
						var Depth_Loc_4 			= data.Depth_Loc_4;
						var Depth_Loc_5 			= data.Depth_Loc_5;
						var Depth_Loc_6 			= data.Depth_Loc_6;
						var Depth_Loc_7 			= data.Depth_Loc_7;
						var Depth_Loc_8 			= data.Depth_Loc_8;
						var Depth_Loc_9 			= data.Depth_Loc_9;
						var Depth_Loc_10 			= data.Depth_Loc_10;
						var Depth_Loc_11 			= data.Depth_Loc_11;
						var Depth_Loc_12 			= data.Depth_Loc_12;
						var Depth_Loc_13 			= data.Depth_Loc_13;
						var Depth_Loc_14 			= data.Depth_Loc_14;
						
						
							
						
						
						
						/// Now I need to complete the aditional info
						
					
						
								$('#DissolvelOxygenInfo').html(Dissolved_Oxygen_mg_L);
								$('#pHInfo').html(pH);
								$('#temperatureInfo').html(Temperature_Celsius+'&deg');
								$('#conductivityInfo').html(Conductivity);
						
								
								$('#StreamWidth1Info').html(Stream_Width_Ft_1);
								$('#StreamWidth2Info').html(Stream_Width_Ft_2);
								$('#StreamWidth3Info').html(Stream_Width_Ft_3);
							    $('#timeTravel1Info').html(Time_Travel_1);
								$('#timeTravel2Info').html(Time_Travel_2);
								$('#timeTravel3Info').html(Time_Travel_3);
								
								$('#Loc1Info').html(Depth_Loc_1);
								$('#Depth1Info').html(Depth_1);
								$('#Loc2Info').html(Depth_Loc_2);
								$('#Depth2Info').html(Depth_2);
								$('#Loc3Info').html(Depth_Loc_3);
								$('#Depth3Info').html(Depth_3);
								$('#Loc4Info').html(Depth_Loc_4);
								$('#Depth4Info').html(Depth_4);
								$('#Loc5Info').html(Depth_Loc_5);
								$('#Depth5Info').html(Depth_5);
								$('#Loc6Info').html(Depth_Loc_6);
								$('#Depth6Info').html(Depth_6);
								$('#Loc7Info').html(Depth_Loc_7);
								$('#Depth7Info').html(Depth_7);
								$('#Loc8Info').html(Depth_Loc_8);
								$('#Depth8').html(Depth_8);
								$('#Loc9Info').html(Depth_Loc_9);
								$('#Depth9Info').html(Depth_9);
								$('#Loc10Info').html(Depth_Loc_10);
								$('#Depth10Info').html(Depth_10);
								$('#Loc11Info').html(Depth_Loc_11);
								$('#Depth11Info').html(Depth_11);
								$('#Loc12Info').html(Depth_Loc_12);
								$('#Depth12Info').html(Depth_12);
								$('#Loc13Info').html(Depth_Loc_13);
								$('#Depth13Info').html(Depth_13);
								$('#Loc14Info').html(Depth_Loc_14);
								$('#Depth14Info').html(Depth_14);
						
				
						
						
					}
			  }
	});
			return false;
	
	
	
	
} // end checkTypeObservations 










var ImagesObservations = function(Observations_Id){
	
	
			var dataString = 'Observations_Id='+Observations_Id+'&getImagesObservations=true';
	
			 
			
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				async: "false",
				  dataType:"Json",
				  success: function(data) {
					  
					  if (data.Status == 'success'){
						  
						  $('#containerCarousel').html("");
						  $('#owl-demo').html("");
						
						  $('#containerCarousel').css('-webkit-box-pack','start');
						  
						var Photo_Id 		= data.Photo_Id;
						var link_Img 		= data.link_Img;
						var Date_Img		= data.Date_Img;
						var Time 			= data.Time;
						var Lat_Photo 		= data.Lat_Photo;
						var Lon_Photo 		= data.Lon_Photo;
						var Observations_Id = data.Observations_Id;
						var Site_Id 		= data.Site_Id;
					
					
						  
						for( var i in Photo_Id){
							
						  $('#containerCarousel').append(
						  
						   '<div id="loopImageCarousel" onclick="displayImageFull()">'+
                               '<a href="#slideImages" data-transition="slideup" ><img src="'+Url+''+link_Img[i]+'" alt="imgCarousel"></a>'+
                            '</div>'
							
							);
							
							
							
							$('#owl-demo').append(
						  
						    	 '<div class="item"><img src="'+Url+''+link_Img[i]+'" alt="imgCarousel"></div>'
						    );
						
						
						} // end foor loop
						
				    }else{
						$('#containerCarousel').html("");
						$('#containerCarousel').css('-webkit-box-pack','center');
						  $('#containerCarousel').append(
						  	'<h1 class="titleFormMeasuresImg"> No images on this observations</h1>'
						  );
					  
					}
			  }
	});
			return false;
	
	
	
	
} // end checkTypeObservations 




var displayImageFull = function(){
	
	PlayBtn = false;
	$('#playBtnImg').attr('src','Images/imgCarousel/pause.png');
	
  $("#owl-demo").owlCarousel({

    autoPlay : 2000,
	singleItem : true,
  
  });
   
  owl = $("#owl-demo").data('owlCarousel');

} // end displayImageFull




var displayImageFull2 = function(){
	
	PlayBtn2 = false;
	$('#playBtnImg2').attr('src','Images/imgCarousel/pause.png');
	
  $("#owl-demo2").owlCarousel({

    autoPlay : 2000,
	singleItem : true,
  
  });
   
  owl2 = $("#owl-demo2").data('owlCarousel');

} // end displayImageFull



var PlayStopFunction = function(){
	
	
	if(PlayBtn == true){
	
		$('#playBtnImg').attr('src','Images/imgCarousel/pause.png');
		//Auto Play
		owl.play(); // Autoplay

		
		
		PlayBtn = false;
	}else{
			
		$('#playBtnImg').attr('src','Images/imgCarousel/play.png');
		 owl.stop(); // Autoplay Stop
		PlayBtn = true;
	}
	
}



var PlayStopFunction2 = function(){
	
	
	if(PlayBtn2 == true){
	
		$('#playBtnImg2').attr('src','Images/imgCarousel/pause.png');
		//Auto Play
		owl2.play(); // Autoplay

		
		
		PlayBtn2 = false;
	}else{
			
		$('#playBtnImg2').attr('src','Images/imgCarousel/play.png');
		 owl2.stop(); // Autoplay Stop
		PlayBtn2 = true;
	}
	
}


var CloseCarousel = function(){
	
	 owl.destroy();
}


var CloseCarousel2 = function(){
	
	 owl2.destroy();
}



var checkFormByStreamId = function(Stream_Id,Site_Id){
	
	
	
		var dataString = 'Stream_Id='+Stream_Id+'&checkStreamsForms=true';
	
			 
			
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				  dataType:"Json",
				  success: function(data) {
					  
					  if (data.Status == 'success'){
						  
						
						 
						  
						var Form_Id 			= data.Form_Id;
						var Form_Name 			= data.Form_Name;
						var Date_Form			= data.Date_Form;
						var Form_Projects_Id 	= data.Form_Projects_Id;
						var Stream_Id 			= data.Stream_Id;
						var menuForm;
						var size;
						var heightBox;
						var len;
						var tem = "";
						var linesToInsert = "";
					
								  
								  
						
						for( var i in Form_Id){
						
								if(Form_Id[i] == 0){
									
									linesToInsert = '<li id="btnCitizens" onclick="openCitizenForm('+Site_Id+')">Citizens Science</li>'+
									 				'<li id="btnResearch" onclick="openResearchForm('+Site_Id+')">Researchers</li>'
									 
								} else{
									
									linesToInsert = '<li class="btnForms" onclick="opendDynamicForm('+Form_Id[i]+',\''+Form_Name[i]+'\','+Site_Id+')">'+Form_Name[i]+'</li>'
									}					
					
						
							
						  $('#menuFormsLi').append(
						  
						 	linesToInsert
					     );
						  
						    $('.btnForms').css('display','-webkit-box');
							$('.btnForms').css('-webkit-box-align','center');
							$('.btnForms').css('-webkit-box-pack','center');
							$('.btnForms').css('height','50px');
							$('.btnForms').css('border','1px outset #e7e7e7');
							
							$('#btnCitizens').css('display','-webkit-box');
							$('#btnCitizens').css('-webkit-box-align','center');
							$('#btnCitizens').css('-webkit-box-pack','center');
							$('#btnCitizens').css('height','50px');
							$('#btnCitizens').css('border','1px outset #e7e7e7');
										
										
							$('#btnResearch').css('display','-webkit-box');
							$('#btnResearch').css('-webkit-box-align','center');
							$('#btnResearch').css('-webkit-box-pack','center');
							$('#btnResearch').css('height','50px');
							$('#btnResearch').css('border','1px outset #e7e7e7');
										
								
						// This is to increase the form
							
						tem ="";
					
						size = $('#contMessageModal').css('height');
					
						
						len = size.length;
						
						
						
						for(var i= 0; i<len; i++){
								if($.isNumeric(size[i])){
								tem +=size[i];
					     		}
						  heightBox = Number(tem);
							
							if(heightBox < 170){
								FinalSize = heightBox + 55 +'px';
								$('#contMessageModal').css("height",FinalSize);
								
							}else{
								
								$('#contMessageModal').css("height",'170px');
								}
						 
							
						}
						
						
						} // end foor loop
						
				
						
				    }else{
						
						
					  
					}
			  }
	});
			return false;
	
	
	
} // checkFormByStreamId





var openCitizenForm = function(Site_Id){
			
			window.location = "data.html#observationsForms";
			closeModalBox();
		
			$('#btnCitizens').css('background-color','#e7e7e7');
			$('#btnCitizens').css('border','1px inset #e7e7e7');
			setTimeout(function(){
				$('#btnCitizens').css('background-color','#FFF');
				$('#btnCitizens').css('border','1px outset #e7e7e7');
			},50);
			
				
			$('.lineFormObservations2').hide();
			$('.lineFormObservationsTime').hide();
			$('.lineFormObservationsStream').hide();
			$('.lineFormObservationsDepth').hide();
			$('.lineFormObservationsMeasures').hide();
			$('.titleFormMeasures').hide();
			$('.hrResearch').hide();
			$('#typeObservation').val('Citizens');
			$('#Site_Id').val(Site_Id);
			
			getCurrentLocationDafaultForms();
	
			$('#bntObservation').show();
			$('#bntObservationUpdate').hide();
			
			
			 /// NOW I NEED TO EMPTY ALL FIELDS TO START NEW DATA.
			 
			 
			 
								 $('#DaysRainfalInput').val("");
								 $('#ApproxRainfalInput').val("");
								 
								 $('#WeatherInput option[value=""]').prop("selected","selected").change();
								$('#RainTypeInput option[value=""]').prop("selected","selected").change();
								$('#WaterClarityInput option[value=""]').prop("selected","selected").change();
								$('#SurfaceCoatInpt option[value=""]').prop("selected","selected").change();
								$('#OdorCoatInpt option[value=""]').prop("selected","selected").change();
								$('#StreamBedColorInput option[value=""]').prop("selected","selected").change();
								$('#ShadeInpt option[value=""]').prop("selected","selected").change();
								$('#AlgaeCoverInpt option[value=""]').prop("selected","selected").change();
								$('#LeafPacks option[value=""]').prop("selected","selected").change();
								$('#AquaticVegetationInpt option[value=""]').prop("selected","selected").change();
								$('#FlowInpt option[value=""]').prop("selected","selected").change();
								
								
								
								$('#indiNewErosionInput option[value=""]').prop("selected","selected").change();
								$('#RiparianVegetationInput option[value=""]').prop("selected","selected").change();
								$('#AnimalObservationInput option[value=""]').prop("selected","selected").change();
								
								
								 $('#AditionalNotesInput').val("");
								 $('#SamplesTakenInput').val("");
								 
								$('#DissolvelOxygenInput').val("");
								$('#pHInput').val("");
								$('#temperatureInput').val("");
								$('#conductivityInput').val("");
								$('#StreamWidth1').val("");
								$('#StreamWidth2').val("");
								$('#StreamWidth3').val("");
							    $('#timeTravel1').val("");
								$('#timeTravel2').val("");
								$('#timeTravel3').val("");
								$('#Loc1').val("");
								$('#Depth1').val("");
								$('#Loc2').val("");
								$('#Depth2').val("");
								$('#Loc3').val("");
								$('#Depth3').val("");
								$('#Loc4').val("");
								$('#Depth4').val("");
								$('#Loc5').val("");
								$('#Depth5').val("");
								$('#Loc6').val("");
								$('#Depth6').val("");
								$('#Loc7').val("");
								$('#Depth7').val("");
								$('#Loc8').val("");
								$('#Depth8').val("");
								$('#Loc9').val("");
								$('#Depth9').val("");
								$('#Loc10').val("");
								$('#Depth10').val("");
								$('#Loc11').val("");
								$('#Depth11').val("");
								$('#Loc12').val("");
								$('#Depth12').val("");
								$('#Loc13').val("");
								$('#Depth13').val("");
								$('#Loc14').val("");
								$('#Depth14').val("");
			 
			 
			
			
			
	
		
				
			
} // end openCitizenForm






var openResearchForm = function(Site_Id){
	
			window.location = "data.html#observationsForms";
			closeModalBox();
			$('#btnResearch').css('background-color','#e7e7e7');
			$('#btnResearch').css('border','1px inset #e7e7e7');
			setTimeout(function(){
				$('#btnResearch').css('background-color','#FFF');
				$('#btnResearch').css('border','1px outset #e7e7e7');
				},50);
			$('.lineFormObservations2').show();
			$('.lineFormObservationsTime').show();
			$('.lineFormObservationsStream').show();
			$('.lineFormObservationsDepth').show();
			$('.lineFormObservationsMeasures').show();
			$('.titleFormMeasures').show();
			$('.hrResearch').show();
			$('#typeObservation').val('Researchers');
			$('#Site_Id').val(Site_Id);
			
			getCurrentLocationDafaultForms();
			
			$('#bntObservation').show();
			$('#bntObservationUpdate').hide();
			
			
			
			 /// NOW I NEED TO EMPTY ALL FIELDS TO START NEW DATA.
			 
			 
			 
								 $('#DaysRainfalInput').val("");
								 $('#ApproxRainfalInput').val("");
								 
								 $('#WeatherInput option[value=""]').prop("selected","selected").change();
								$('#RainTypeInput option[value=""]').prop("selected","selected").change();
								$('#WaterClarityInput option[value=""]').prop("selected","selected").change();
								$('#SurfaceCoatInpt option[value=""]').prop("selected","selected").change();
								$('#OdorCoatInpt option[value=""]').prop("selected","selected").change();
								$('#StreamBedColorInput option[value=""]').prop("selected","selected").change();
								$('#ShadeInpt option[value=""]').prop("selected","selected").change();
								$('#AlgaeCoverInpt option[value=""]').prop("selected","selected").change();
								$('#LeafPacks option[value=""]').prop("selected","selected").change();
								$('#AquaticVegetationInpt option[value=""]').prop("selected","selected").change();
								$('#FlowInpt option[value=""]').prop("selected","selected").change();
								
								$('#indiNewErosionInput option[value=""]').prop("selected","selected").change();
								$('#RiparianVegetationInput option[value=""]').prop("selected","selected").change();
								$('#AnimalObservationInput option[value=""]').prop("selected","selected").change();
								
								 $('#AditionalNotesInput').val("");
								 $('#SamplesTakenInput').val("");
								 
								$('#DissolvelOxygenInput').val("");
								$('#pHInput').val("");
								$('#temperatureInput').val("");
								$('#conductivityInput').val("");
								$('#StreamWidth1').val("");
								$('#StreamWidth2').val("");
								$('#StreamWidth3').val("");
							    $('#timeTravel1').val("");
								$('#timeTravel2').val("");
								$('#timeTravel3').val("");
								$('#Loc1').val("");
								$('#Depth1').val("");
								$('#Loc2').val("");
								$('#Depth2').val("");
								$('#Loc3').val("");
								$('#Depth3').val("");
								$('#Loc4').val("");
								$('#Depth4').val("");
								$('#Loc5').val("");
								$('#Depth5').val("");
								$('#Loc6').val("");
								$('#Depth6').val("");
								$('#Loc7').val("");
								$('#Depth7').val("");
								$('#Loc8').val("");
								$('#Depth8').val("");
								$('#Loc9').val("");
								$('#Depth9').val("");
								$('#Loc10').val("");
								$('#Depth10').val("");
								$('#Loc11').val("");
								$('#Depth11').val("");
								$('#Loc12').val("");
								$('#Depth12').val("");
								$('#Loc13').val("");
								$('#Depth13').val("");
								$('#Loc14').val("");
								$('#Depth14').val("");
			 
			 
			
			
		
}




///// THIS FUNCTION IS TO GET THE CURRENT LOCATION  


	
	
var getCurrentLocationDynamicForm = function(){
		
	navigator.geolocation.getCurrentPosition(addToDynamicForm);	
}


var addToDynamicForm= function(position){
	
	$('#lat_DynamicOberservation').val(position.coords.latitude);
	$('#lon_DynamicOberservation').val(position.coords.longitude);

}


	
	
var getCurrentLocationDafaultForms = function(){
		
	navigator.geolocation.getCurrentPosition(addToDynamicForm);	
}





var addToDefaultForms= function(position){
	
	$('#Lat_Site').val(position.coords.latitude);
	$('#Lon_Site').val(position.coords.longitude);

}









var opendDynamicForm = function(Form_Id,Form_Name,Site_Id){
	
	// I need to insert Static data on the form
	$('#site_DynamicOberservation').val(Site_Id);
	
	// Add current location
	getCurrentLocationDynamicForm();
	
	
	
	
	$('#modalBoxAlert').remove();
	window.location="data.html#ResultForm";
	$('#formNameResult').html(Form_Name + ' Form');
	
	
		var dataString = 'Form_Id='+Form_Id+'&DisplayFieldForm=true';
				 
				
				$.ajax({
					  type: "POST",
					  url: Url+'PHP/FunctionsMobileForm.php',
					  data: dataString,
					  dataType:"Json",
					  success: function(data) {
				
						var Field_Id 				= data.Field_Id;
						var Field_Name 				= data.Field_Name;
						var Field_Type_Id 			= data.Field_Type_Id;
						var Form_Id 				= data.Form_Id;
						var Field_Type_Description 	= data.Field_Type_Description;
						var secondLine;
						var nameSelect;
						var count=1;
						
						if (data.Status == 'success'){
							  
						 $('#containerFormDisplay').html("");
						 
						 $('#containerFormDisplay').append(
							'<div id="contentSelect"></div>'
							);
						
						   var len = Object.keys(Field_Id).length;
							
							
							
							for(var i in Field_Id){
								
								 if(Field_Type_Id[i] == 5){
									  
									   nameSelect = 'select'+[i];
									   
									   	$('#contentSelect').append(
											'<div class="lineSelect">'+
												'<div class="leftLineSelect">'+
										  	 		'<p>'+Field_Name[i]+'</p>'+
												'</div>'+
												'<div class="rightLineSelect">'+
													'<select class="'+nameSelect+'" id="'+Field_Id[i]+'" name="'+Field_Id[i]+'"></select>'+
												'</div>'+
										   '<div>'
										);
								       displayValuesDropMenu(nameSelect,Field_Id[i]);
								   }
								   
							} // End for loop 1
							
							$('#containerFormDisplay').append(
								'<hr>'
							);
							
							 
							  for(var i = 0; i<len  ; i++){
								  
								
								  
								    if([Number(i)+1] < len && Field_Type_Id[Number(i)+1] != 5){
											 
											 secondLine= '<div class="lineInputLabel">'+
											 				 '<div class="labelDynamic">'+
														 		 '<label>'+Field_Name[Number(i)+1]+'</label>'+
															 '</div>'+
															 '<div class="inputDynamic">'+
																 '<input type="'+Field_Type_Description[Number(i)+1]+'" name="'+Field_Id[Number(i)+1]+'" id="'+Field_Id[Number(i)+1]+'" />'+
															 '</div>'+
														 '</div>'
											
													  
									  }else{
											  secondLine="";
												  
										 }
								    
									
									
											 if(Field_Type_Id[i] != 5){
									
														$('#containerFormDisplay').append(
																			'<div class="twoLabelAndInput">'+
																			
																				'<div class="lineInputLabel">'+
																					'<div class="labelDynamic">'+
																						  '<label>'+Field_Name[i]+'</label>'+
																					'</div>'+
																					'<div class="inputDynamic">'+
																						  '<input type="'+Field_Type_Description[i]+'" name="'+Field_Id[i]+'" id="'+Field_Id[i]+'" />'+
																					'</div>'+
																				'</div>'+
																				
																					secondLine+''+
																				'</div>'
																			
																	 );
																	 
											 	} // endField_Type_Id[i] != 5
										 
										 
										 i +=1;
										 
										}  //End foor Loop
							  
							 
							  
						 }
						 
					  else{
						  
						  //// This is error section
						  
						  
						  }
							 
					  }
				});
				return false;
	
	
}





var displayValuesDropMenu = function(nameSelect,Field_Id){
	
		
		var dataString = 'Field_Id='+Field_Id+'&DisplayValuesDropMenu=true';
				 
				
				$.ajax({
					  type: "POST",
					  url: Url+'PHP/FunctionsMobileForm.php',
					  data: dataString,
					  dataType:"Json",
					  success: function(data) {
				
						if (data.Status == 'success'){
							  
							  var Default_Id 			= data.Default_Id;
							  var Default_Description 	= data.Default_Description;
							  var Field_Id 				= data.Field_Id;
							  
							
							for(var i in Default_Id){
									
									$('.'+nameSelect+'').append(
										'<option value="'+Default_Description[i]+'">'+Default_Description[i]+'</option>'	
									);
							}
							
							
							
						}else if (data.Status == 'NoRows'){
							
						}else{
							
							alert("Error displaying drop down menu values");
						 }
							 
					  }
				});
				return false;
	
	
		
		
		
		
		
		

} //  end displayValuesDropMenu














	
$('#btnDynamicForm').click(function(){

	
         // Get all the inputs into an array...
         var $inputs = $('#dynamicForm :input');
		  // An array of just the ids...
         var result = {};
		 
		 $inputs.each(function (index)
         {
			result[$(this).attr('name')] = $(this).val();
         });
		 
			//This save the ids to use later on php server
			var Ids = Object.keys(result);
		 	
		 	
			//Debugin purpose
			console.log(result);
			//alert(Ids);
		 
			var JsonForm = JSON.stringify(result, null);
			console.log(JsonForm); // This is to debuging purpose
			 
			 
			 
			 
			 var lat_Dyn = $('#lat_DynamicOberservation').val();
			 var lon_Dyn = $('#lon_DynamicOberservation').val();
			 var site 	 = $('#site_DynamicOberservation').val();
			 
			
		
		
			var dataString = 'JsonForm='+JsonForm+'&Ids='+Ids+'&lat_Dyn='+lat_Dyn+'&lon_Dyn='+lon_Dyn+'&site='+site+'&UserLoged='+UserLoged+'&insertDynamicFormData=true';
	
			 
			
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobileForm.php',
				  data: dataString,
				  dataType:"Json",
				  success: function(data) {
					  
				
					  
					   var lat_Dyn = data.lat_Dyn;
					   var lon_Dyn = data.lat_Dyn;
					   var DynamicObservation = data.DynamicObservation;
					   var site = data.site;
				
					
					  if (data.Status == 'success'){
						  
						   //I need to sabe the ID of the observation on javascript session to getlater
							window.localStorage.setItem("ObservationID",DynamicObservation);
							window.localStorage.setItem('lat_Image',lat_Dyn);
							window.localStorage.setItem('lon_Image',lon_Dyn);
							window.localStorage.setItem('Site_Id',site);
							
							
						   var confirmResult = confirm("Do you want includes picture on this observation?");
						   		
								
								if(confirmResult == true){
									
									capturePhotoDynamic();
								
								}else{
									
									window.location = "data.html#pageAddStream";
										
								}
							
						
						
						
					
					
				    }else{
						
						alert("Error creating new observation");
					}
			  }
	});
			return false;
	 
		 
 });
 
 
 
 
 
 
 
 
 
 
var UpdateDynamicObservations = function(Form_Id_Input,Form_Name_Input,Site_Id_Input,DynamicObservation_Input){
	
	
	
	// I need to insert Static data on the form
	$('#site_DynamicOberservationEdit').val(Site_Id_Input);
	$('#DynamicOberservationEdit').val(DynamicObservation_Input);
	
	
	
	$('#formNameResultEdit').html(Form_Name_Input + ' Form');
	
	
		var dataString = 'Form_Id='+Form_Id_Input+'&DisplayFieldForm=true';
				 
				
				$.ajax({
					  type: "POST",
					  url: Url+'PHP/FunctionsMobileForm.php',
					  data: dataString,
					  dataType:"Json",
					  success: function(data) {
				
						var Field_Id 				= data.Field_Id;
						var Field_Name 				= data.Field_Name;
						var Field_Type_Id 			= data.Field_Type_Id;
						var Form_Id 				= data.Form_Id;
						var Field_Type_Description 	= data.Field_Type_Description;
						var secondLine;
						var nameSelect;
						var count=1;
						
						if (data.Status == 'success'){
							  
						 $('#containerFormDisplayEdit').html("");
						 
						 $('#containerFormDisplayEdit').append(
							'<div id="contentSelectEdit"></div>'
							);
						
						   var len = Object.keys(Field_Id).length;
							
							
							
							for(var i in Field_Id){
								
								 if(Field_Type_Id[i] == 5){
									  
									   nameSelect = 'select'+[i];
									   
									   	$('#contentSelectEdit').append(
											'<div class="lineSelect">'+
												'<div class="leftLineSelect">'+
										  	 		'<p>'+Field_Name[i]+'</p>'+
												'</div>'+
												'<div class="rightLineSelect">'+
													'<select class="'+nameSelect+'" id="'+Field_Id[i]+'" name="'+Field_Id[i]+'"></select>'+
												'</div>'+
										   '<div>'
										);
								       displayValuesDropMenu(nameSelect,Field_Id[i]);
								   }
								   
							} // End for loop 1
							
							$('#containerFormDisplayEdit').append(
								'<hr>'
							);
							
							 
							  for(var i = 0; i<len  ; i++){
								  
								
								  
								    if([Number(i)+1] < len && Field_Type_Id[Number(i)+1] != 5){
											 
											 secondLine= '<div class="lineInputLabel">'+
											 				 '<div class="labelDynamic">'+
														 		 '<label>'+Field_Name[Number(i)+1]+'</label>'+
															 '</div>'+
															 '<div class="inputDynamic">'+
																 '<input type="'+Field_Type_Description[Number(i)+1]+'" name="'+Field_Id[Number(i)+1]+'" id="'+Field_Id[Number(i)+1]+'" />'+
															 '</div>'+
														 '</div>'
											
													  
									  }else{
											  secondLine="";
												  
										 }
								    
									
									
											 if(Field_Type_Id[i] != 5){
									
														$('#containerFormDisplayEdit').append(
																			'<div class="twoLabelAndInputEdit">'+
																			
																				'<div class="lineInputLabel">'+
																					'<div class="labelDynamic">'+
																						  '<label>'+Field_Name[i]+'</label>'+
																					'</div>'+
																					'<div class="inputDynamic">'+
																						  '<input type="'+Field_Type_Description[i]+'" name="'+Field_Id[i]+'" id="'+Field_Id[i]+'" />'+
																					'</div>'+
																				'</div>'+
																				
																					secondLine+''+
																				'</div>'
																			
																	 );
																	 
											 	} // endField_Type_Id[i] != 5
										 
										 
										 i +=1;
										 
										}  //End foor Loop
							  
							 
							  
							  getDynamicValuesToEdit(Form_Id_Input,DynamicObservation_Input);
							  
							  
							  
							  
							  
						 }
						 
					  else{
						  
						  //// This is error section
						  
						  
						  }
							 
					  }
				});
				return false;
	
	
}




var  getDynamicValuesToEdit= function(Form_Id_Input,DynamicObservation_Input){
	
		var dataString = 'Form_Id='+Form_Id_Input+'&DynamicObservation='+DynamicObservation_Input+'&GetValuesDynamicObservations=true';
				 
				
				$.ajax({
					  type: "POST",
					  url: Url+'PHP/FunctionsMobileForm.php',
					  data: dataString,
					  dataType:"Json",
					  success: function(data) {
				
						if (data.Status == 'success'){
							  
							  var DataId 				= data.DataId;
							  var Data_Description 		= data.Data_Description;
							  var Field_Id 				= data.Field_Id;
							  var DynamicObservation 	= data.DynamicObservation;
							  var Date_DynaOberservation= data.Date_DynaOberservation;
							  var Lat_DynamiData 		= data.Lat_DynamiData;
							  var Lon_DynamiData 		= data.Lon_DynamiData;
							  var Sites_Id 				= data.Sites_Id;
							  var idUser 				= data.idUser;
							  
							
								
							$('#lat_DynamicOberservationEdit').val(Lat_DynamiData[0]);
							$('#lon_DynamicOberservationEdit').val(Lon_DynamiData[0]);
							
							
							for(var i in DataId){
									
								$('#'+Field_Id[i]).val(Data_Description[i]);
								
							}
							
							
							
						}else if (data.Status == 'NoRows'){
							
						}else{
							
							alert("Error displaying drop down menu values");
						 }
							 
					  }
				});
				return false;
	
	
	
	
} // End getDynamicValuesToEdit
 
 
 







	
$('#btnDynamicFormEdit').click(function(){

	
         // Get all the inputs into an array...
         var $inputs = $('#dynamicFormEdit :input');
		  // An array of just the ids...
         var result = {};
		 
		 $inputs.each(function (index)
         {
			result[$(this).attr('name')] = $(this).val();
         });
		 
			//This save the ids to use later on php server
			var Ids = Object.keys(result);
		 	
		 	
			//Debugin purpose
			console.log(result);
			//alert(Ids);
		 
			var JsonForm = JSON.stringify(result, null);
			console.log(JsonForm); // This is to debuging purpose
			 
			 
			 
			 
			 var lat_Dyn 				= $('#lat_DynamicOberservationEdit').val();
			 var lon_Dyn 				= $('#lon_DynamicOberservationEdit').val();
			 var site 	 				= $('#site_DynamicOberservationEdit').val();
			 var DynamicOberservation 	= $('#DynamicOberservationEdit').val();
		
		
			var dataString = 'JsonForm='+JsonForm+'&Ids='+Ids+'&DynamicOberservation='+DynamicOberservation+'&lat_Dyn='+lat_Dyn+'&lon_Dyn='+lon_Dyn+'&site='+site+'&UserLoged='+UserLoged+'&UpdateDynamicFormData=true';
	
			 
			
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobileForm.php',
				  data: dataString,
				  dataType:"Json",
				  success: function(data) {
					  
				
					  
					   var lat_Dyn = data.lat_Dyn;
					   var lon_Dyn = data.lat_Dyn;
					   var DynamicObservation = data.DynamicObservation;
					   var site = data.site;
				
					
					  if (data.Status == 'success'){
						 
						 alert("update success");
						 window.location = "data.html#displayObservations";
					
					
				    }else{
						
						alert("Error creating new observation");
					}
			  }
	});
			return false;
	 
		 
 });
 
 
 
 
 
 
var fullInfoDynamicObervation = function(DynamicObservationID){

	var dataString = 'DynamicObservation='+DynamicObservationID+'&GetDynamicFormData=true';
 
	$.ajax({
		type: "POST",
		url: Url+'PHP/FunctionsMobileForm2.php',
		data: dataString,
		async: "false",
		dataType:"Json",
		success: function(data) {

			$('#containerDispayDynamicInfo').html("");

			var DataId = data.DataId;
			var Data_Description = data.Data_Description;
			var Field_Id = data.Field_Id;
			var DynamicObservation = data.DynamicObservation;
			var Date_DynaOberservation = data.Date_DynaOberservation;
			var Lat_DynamiData = data.Lat_DynamiData;
			var Lon_DynamiData = data.Lon_DynamiData;
			var Sites_Id = data.Sites_Id;
			var Field_Name = data.Field_Name;
			var Field_Type_Id = data.Field_Type_Id;
			var Form_Id = data.Form_Id;
			var count = 0;


			if (data.Status == 'success'){
				console.log(data.Status);
				$('#latP').html(Lat_DynamiData[0]);
				$('#lonP').html(Lon_DynamiData[0]);

				for(var i in DataId){

					count++;
					$('#containerDispayDynamicInfo').append(

					'<div class="lineLoopDisplayDynamicInfo">'+
					'<div class="lineDisplayDynamic">'+
					'<div class="leftDiplayDynamicInfo">'+
					'<p>'+Field_Name[i]+' :<p>'+
					'</div>'+
					' <div class="rightDiplayDynamicInfo">'+
					'<p>'+Data_Description[i]+'<p>'+
					'</div>'+
					'</div>'+
					'</div>'

					);

					if(count % 2 == 0){

						$('#containerDispayDynamicInfo').append(

						' <div class="LineDivition">'+
						'</div>'

						);

					}

				} // end foor loop

				$('#containerDispayDynamicInfo').append(

				' <div id="containerCarouselDynamic">'+
				'</div>'

				);


				$('#containerCarouselDynamic').css('display','-webkit-box');
				$('#containerCarouselDynamic').css('-webkit-box-orient','horizontal');
				$('#containerCarouselDynamic').css('-webkit-box-align','center');
				$('#containerCarouselDynamic').css('border','1px inset #e7e7e7');
				$('#containerCarouselDynamic').css('width','98%');
				$('#containerCarouselDynamic').css('height','100px');
				$('#containerCarouselDynamic').css('margin-bottom','10px');
				$('#containerCarouselDynamic').css('margin-top','110px');
				$('#containerCarouselDynamic').css('overflow','auto');

				ImagesDynamicObservations(DynamicObservationID);

			}else{
				console.log(data.Status);
				alert("Displaying observation");
			}
		}
	});
return false;
} // end fullInfoDynamicObervation

 
 
 
 
var ImagesDynamicObservations = function(Observations_Id){

	var dataString = 'Observations_Id='+Observations_Id+'&getImagesDynamicObservations=true';

	$.ajax({
		type: "POST",
		url: Url+'PHP/FunctionsMobile2.php',
		data: dataString,
		async: "false",
		dataType:"Json",
		success: function(data) {

			if (data.Status == 'success'){
				console.log(data.Status);
				$('#containerCarouselDynamic').html("");
				$('#owl-demo2').html("");
				$('#containerDispayDynamicInfo').css('-webkit-box-pack','start');

				var Photo_Id = data.Photo_Id;
				var link_Img = data.link_Img;
				var Date_Img = data.Date_Img;
				var Time = data.Time;
				var Lat_Photo = data.Lat_Photo;
				var Lon_Photo = data.Lon_Photo;
				var Observations_Id = data.Observations_Id;
				var Site_Id = data.Site_Id;

				for( var i in Photo_Id){

					$('#containerCarouselDynamic').append(

					'<div id="loopImageCarousel" onclick="displayImageFull2()">'+
					'<a href="#slideImagesDynamic" data-transition="slideup" ><img src="'+Url+''+link_Img[i]+'" alt="imgCarousel"></a>'+
					'</div>'

					);

					$('#owl-demo2').append(

					'<div class="item"><img src="'+Url+''+link_Img[i]+'" alt="imgCarousel"></div>'

					);

				} // end foor loop
			}else{
				console.log(data.Status);
				$('#containerCarouselDynamic').html("");
				$('#containerCarouselDynamic').css('-webkit-box-pack','center');
				$('#containerCarouselDynamic').append(
				'<h1 class="titleFormMeasuresImg"> No images on this observations</h1>'
				);
			}
		}
	});

return false;
} // end checkTypeObservations 


 
 
 
 
 
 var downloadExcelFile = function(Sites_Id,Stream_Id){
	 
	 

//This create the modal window
	
	
	$('body').append(
			'<div id="modalBoxAlert">'+
              '<div id="boxAlert">'+
			  '<a href="javascript:closeModalBoxDownloadForm()" id="closeButton"><img src="Images/close.png" alt="closeIcon"></a>'+
                      '<button type="button" id="btnCreekWatchForms">Creek Watch</button>'+
                      '<button type="button" id="btnOtherForms">Other</button>'+
              '</div>'+
         '</div>'					

								
	 );
	 
	 
	
	$('#modalBoxAlert').css('display','block');
	$('#modalBoxAlert').css('position','fixed');
	$('#modalBoxAlert').css('top','0');
	$('#modalBoxAlert').css('right','0');
	$('#modalBoxAlert').css('bottom','0');
	$('#modalBoxAlert').css('left','0');
	$('#modalBoxAlert').css('background-color','rgba(0,0,0,0.2)');
	$('#modalBoxAlert').css('opacity','1');
	$('#modalBoxAlert').css('z-index','1000');


	$('#modalBoxAlert').css('background-color','rgba(0,0,0,0.2)');
	$('#modalBoxAlert').css('opacity','1');
	$('#modalBoxAlert').css('z-index','1000');


	$('#boxAlert').css('text-align','center');
	$('#boxAlert').css('width','70%');
	$('#boxAlert').css('height','105px');
	$('#boxAlert').css('padding','10px');
	$('#boxAlert').css('position','fixed');
	$('#boxAlert').css('top','100px');
	$('#boxAlert').css('left','10%');
	$('#boxAlert').css('background','-webkit-linear-gradient(#fff, #DDD)');
	$('#boxAlert').css('-webkit-box-shadow','2px 2px 2px rgba(0,0,0,0.5)');


	$('#btnCreekWatchForms').css('width','100%');
	$('#btnCreekWatchForms').css('height','50px');
	

	$('#btnOtherForms').css('width','100%');
	$('#btnOtherForms').css('height','50px');


	$('#closeButton').css('position','absolute');
	$('#closeButton').css('top','-15px');
	$('#closeButton').css('left','-15px');
	
	
	// Now I need to apply style of this modal


	 
$('#btnOtherForms').click(function(){
	 window.open(Url+'PHP/CreateExcelFile.php?Sites_Id='+Sites_Id, '_blank', 'location=yes');
});


$('#btnCreekWatchForms').click(function(){
	 window.open(Url+'PHP/CreateExcelFile2.php?Sites_Id='+Sites_Id, '_blank', 'location=yes');
});

} //  end downloadExcelFile

			
var displayPhotos = function(Observations_Id){

	var dataString2 = 'Site_Id='+Observations_Id+'&DisplayPhotos=true';

	$.ajax({
	type: "POST",
	url: Url+'PHP/FunctionsMobile2.php',
	data: dataString2,
	async: "false",
	dataType:"Json",
	success: function(data) {

		if (data.Status == 'success'){

			var Photo_Id 		= data.Photo_Id;
			var link_Img 		= data.link_Img;
			var Date_Img		= data.Date_Img;
			var Time 			= data.Time;
			var Lat_Photo 		= data.Lat_Photo;
			var Lon_Photo 		= data.Lon_Photo;
			var Observations_Id = data.Observations_Id;
			var Site_Id 		= data.Site_Id;

			console.log(data.Status);

			$('#photoDisplay').html("");
			$('#photo').html("");

			$('#photoDisplay').css('-webkit-box-pack','start');
			for( var i in Photo_Id){

			$('#photoDisplay').append(

			'<div id="loopImageCarousel" onclick="displayImageFull()">'+
			'<a href="#slideImages" data-transition="slideup" ><img src="'+Url+''+link_Img[i]+'" alt="imgCarousel"></a>'+
			'</div>'

			);



			$('#photo').append(

			 '<div class="item"><img src="'+Url+''+link_Img[i]+'" alt="imgCarousel"></div>'
			);


			} // end foor loop
		}else{
			console.log("Photo query failed");
			$('#photoDisplay').html("");
			$('#photoDisplay').css('-webkit-box-pack','center');
			$('#photoDisplay').append(
			'<h1 class="titleFormMeasuresImg"> No images on this observations</h1>'
			);

		}
	}
});
return false;
} // end displayPhotos 
	
 
 var closeModalBoxDownloadForm =  function(){
	$('#modalBoxAlert').hide();
	$('#modalBoxAlert').remove();
	
	$('#boxAlert').hide();
	$('#boxAlert').remove();
	
	$('#closeButton').hide();
	$('#closeButton').remove();
}
