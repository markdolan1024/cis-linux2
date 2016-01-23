var searchByTeamName = true;
var searchByLeader = true;
var PlayBtn = false;
var owl;
var PlayBtn2 = false;
var lat = window.localStorage.getItem('lat');
var lon = window.localStorage.getItem('lon');
var UserLoged = window.localStorage.getItem('idUser');
var globalDate;
var globalTime;
var globalTeam;

// Get info of the user who is logged
var NameLogged 	=	window.localStorage.getItem("FirstName");
var LastLogged 	=   window.localStorage.getItem("LastName");
var ImageUser 	=   window.localStorage.getItem("ImageUser");
var User_Type	=   window.localStorage.getItem("Usert_Type");
var Url = "http://www.sciencetap.us/assets/App/"
var UrlMap = "http://www.sciencetap.us/assets/App"
var image = {
	  url: Url+'assets/Images/Users/'+ImageUser,
	  size: new google.maps.Size(71, 71),
	  origin: new google.maps.Point(0, 0),
	  //anchor: new google.maps.Point(100, 34),
	  scaledSize: new google.maps.Size(30, 35)
};

$(document).ready(function(e) {
	var FirstName =	window.localStorage["FirstName"];
	var LastName = window.localStorage["LastName"];
	$('#user').html(FirstName + " " +LastName);

	var get =  window.location.href;
	var tokens = get.split("&");
	var siteId = tokens[0].substr(tokens[0].indexOf("=")+1);
	var siteName = tokens[1].substr(tokens[1].indexOf("=")+1);
	siteName = siteName.replace(/\%20/g, ' ');
	var date = tokens[2].substr(tokens[2].indexOf("=")+1);
	globalDate = date;
	var time = tokens[3].substr(tokens[3].indexOf("=")+1);
	globalTime= time;
	var team = tokens[4].substr(tokens[4].indexOf("=")+1);
	team = team.replace(/\%20/g, ' ');
	globalTeam = team;
	$('#Stream_Name_p').html(siteName);
	$('#Stream_Date_p').html(date);
	$('#Stream_Time_p').html(time);
	$('#Stream_TeamName_p').html(team);
	displaySite(siteId);
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

				$('#Stream_Lat_p').html(Lat[0]);
				$('#Stream_Lon_p').html(Lon[0]);

				for (var i in Sites_Id) {

					$('#containerSiteLoop').append(
					'<tr>' + 
					'<td>' + Site_Name[i] + '</td>' +
					'<td><button type="button" onclick="setupImageUpload(' + Sites_Id[i] + ')" class="btn btn-primary btn-md" data-toggle="modal" data-target="#imageModal">Upload Image</button></td>' +
					'<td><a href="site.html?SiteId=' + Sites_Id[i] + '&SiteName=' + Site_Name[i] + '&Lat=' + Lat[i] + '&Lon=' + Lon[i] +
					'&Date=' + globalDate + '&Time=' + globalTime + '&Team=' + globalTeam + '" data-transition="slide"><button type="button" id="observationsButton" data-loading-text="Loading..." class="btn btn-primary btn-md" autocomplete="off">Display Observations</button></a></td>' +
					'<td><button onclick="checkUserToForm(' + Sites_Id[i] + ',' + Lat[i] + ',' + Lon[i] + ',' + Stream_Stream[i] + ')" type="button" class="btn btn-primary btn-md" data-toggle="modal" data-target="#AddModal">Add Observation</button></td>' +
					'<td><button type="button" onclick="downloadExcelFile(' + Sites_Id[i] + ',' + Stream_Stream[i] +')" class="btn btn-primary btn-md" data-toggle="modal" data-target="#ExcelModal">Download Excel</button></td></tr>'
					);
				} // End for loop
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

var downloadExcelFile = function(Sites_Id,Stream_Id){
	$('#ExcelModalBody').append(
		'<button type="button" id="btnCreekWatchForms" class="btn btn-primary-md" autocomplete="off">Creek Watch</button>'+
		'<br>' +
		'<br>' +
		'<button type="button" id="btnOtherForms" class="btn btn-primary-md">Other</button>'
	);

	$('#btnOtherForms').click(function(){
	window.open(Url+'PHP/CreateExcelFile.php?Sites_Id='+Sites_Id, '_blank', 'location=yes');
	});

	$('#btnCreekWatchForms').click(function(){
	window.open(Url+'PHP/CreateExcelFile2.php?Sites_Id='+Sites_Id, '_blank', 'location=yes');
	});
} //  end downloadExcelFile

var nav_string =  [
	'<div class="row">',
		'<nav class="navbar navbar-default navbar-fixed-top navbar-inverse">',
			'<div class="navbar-header">',
				'<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#menu">',
				'<span class="sr-only">Toggle Navigation</span>',
				'<span class="icon-bar"></span>',
				'<span class="icon-bar"></span>',
				'<span class="icon-bar"></span>',
				'</button>',
			'</div>',
			'<div class="collapse navbar-collapse" id="menu">',
				'<ul class="nav navbar-nav">',
				'<li><a id="user" href="#"><span class="glyphicon glyphicon-user"></span>&nbspUserName</a></li>',
				'<li id="home"><a href="weather.html"></span>Home</a> </li>',
				'<li id="data"><a href="data.html">Projects</a></li>',
				'<li><a href="map.html">Map</a></li>',
				'<li id="teamMenu"><a href="team.html">Teams</a></li>',
				'<li><a>Logout</a></li>',
				// '<li><img id="logo" class="pull-right"  src="assets/images/sciencetap.png"></img></li>',
				'</ul>',
				'<img id="logo" class="pull-right"  src="assets/images/sciencetap.png"></img>',
			'</div>',
		'</nav>',
	'</div>',
];

var setupImageUpload = function(Site_Id){
	$('#ImageSiteId').html("");
	$('#ImageSiteId').append( Site_Id );
}

var checkUserToForm = function(Site_Id,Lat,Lon,Stream_Id){
// Now I need to display all forms depending the projects
// First I need to create the modalBox to select the forms
	 checkFormByStreamId(Stream_Id,Site_Id);
} // end checkUserToForm

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
				$('#AddModalBody').append(
					'<table class="table table-hover">' +
						'<tbody id="formLoop"></tbody>' +
					'</table>'
				);

					for( var i in Form_Id){
						if(Form_Id[i] == 0){
							linesToInsert = '<tr><td id="btnCitizens" onclick="openCitizenForm('+Site_Id+')">Citizens Science</td></tr>'+
								'<tr><td id="btnResearch" onclick="openResearchForm('+Site_Id+')">Researchers</td></tr>'
							} else{
								linesToInsert = '<tr><td class="btnForms" onclick="opendDynamicForm('+Form_Id[i]+',\''+Form_Name[i]+'\','+Site_Id+')">'+Form_Name[i]+'</td</tr>'
							}					
						  $('#formLoop').append(
						 	linesToInsert
						     );
					} // end foor loop
				}else{
				}
			  }
	});
return false;
} // checkFormByStreamId

var openCitizenForm = function(Site_Id){
			
			window.location = "formDisplay.html";
			//window.location = "data.html#observationsForms";
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

var getCurrentLocationDynamicForm = function(){
		
	navigator.geolocation.getCurrentPosition(addToDynamicForm);	
}

var addToDynamicForm= function(position){
	
	$('#lat_DynamicOberservation').val(position.coords.latitude);
	$('#lon_DynamicOberservation').val(position.coords.longitude);

}
