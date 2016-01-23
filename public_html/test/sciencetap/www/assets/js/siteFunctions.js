var searchByTeamName = true;
var searchByLeader = true;
var PlayBtn = false;
var owl;
var PlayBtn2 = false;
var lat = window.localStorage.getItem('lat');
var lon = window.localStorage.getItem('lon');
var UserLoged = window.localStorage.getItem('idUser');
var noSites = 0;
var checkAll = 1;

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
	var lat = tokens[2].substr(tokens[2].indexOf("=")+1);
	var lon = tokens[3].substr(tokens[3].indexOf("=")+1);
	var date = tokens[4].substr(tokens[4].indexOf("=")+1);
	var time = tokens[5].substr(tokens[5].indexOf("=")+1);
	var team = tokens[6].substr(tokens[6].indexOf("=")+1);
	team = team.replace(/\%20/g, ' ');
	$('#Stream_Name_p').html(siteName);
	$('#Stream_Lat_p').html(lat);
	$('#Stream_Lon_p').html(lon);
	$('#Stream_Date_p').html(date);
	$('#Stream_Time_p').html(time);
	$('#Stream_TeamName_p').html(team);
	displayObservationsBySite(siteId);
});

var displayObservationsBySite = function(Sites_Id_Input){

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
		$('#containerObservationsLoop').html("");

		var Stream_Id = data.Stream_Id;
		var Stream_Name = data.Stream_Name;
		var Water_body = data.Water_body;
		var Leader_Id = data.Leader_Id;
		var idTeam = data.idTeam;
		var idUser = data.idUser;
		var Observations_Id = data.Observations_Id;
		var Days_Since_Last_Rainfall = data.Days_Since_Last_Rainfall;
		var Approximate_Rainfall = data.Approximate_Rainfall;
		var Current_Weather = data.Current_Weather;
		var Rain = data.Rain;
		var Water_Clarity = data.Water_Clarity;
		var Surface_Coating = data.Surface_Coating;
		var Odor = data.Odor;
		var Stream_Bed_Color = data.Stream_Bed_Color;
		var Shade_Percentage = data.Shade_Percentage;
		var Algae_Cover = data.Algae_Cover;
		var LeafPacks = data.LeafPacks;
		var Aquatic_Vegetation = data.Aquatic_Vegetation;
		var Flow = data.Flow;
		var Indication_New_Erosion = data.Indication_New_Erosion;
		var Change_riparian_vegetation = data.Change_riparian_vegetation;
		var Animal_Observation = data.Animal_Observation;
		var Additional_Notes = data.Additional_Notes;
		var Samples_Taken = data.Samples_Taken;
		var DateObservation = data.DateObservation;
		var TimeObservation = data.TimeObservation;
		var Sites_Id = data.Sites_Id;
		var Site_Name = data.Site_Name;
		var Site_Description = data.Site_Description;
		var Lat = data.Lat;
		var Lon = data.Lon;
		var TodayDate = data.TodayDate;

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

				$('#containerObservationsLoop').append(

				'<tr><td>'+DateObservation[i]+'</td>'+
				'<td>Citizens Science</td>'+
				'<td>'+Site_Name[i]+'</td>'+
				'<td><a href="javascript:UpdateObservations('+Observations_Id[i]+','+Days_Since_Last_Rainfall[i]+',\''+Approximate_Rainfall[i]+'\',\''+Current_Weather[i]+'\',\''+Rain[i]+'\',\''+Water_Clarity[i]+'\',\''+Surface_Coating[i]+'\',\''+Odor[i]+'\',\''+Stream_Bed_Color[i]+'\',\''+Shade_Percentage[i]+'\',\''+Algae_Cover[i]+'\',\''+LeafPacks[i]+'\',\''+Aquatic_Vegetation[i]+'\',\''+Flow[i]+'\',\''+Erosion+'\',\''+riparian_vegetation+'\',\''+AnimalObservation+'\',\''+AdditionalNotes+'\',\''+SamplesTaken+'\',\''+DateObservation[i]+'\',\''+TimeObservation[i]+'\','+Sites_Id[i]+','+Lat[i]+','+Lon[i]+')"><img src="Images/EditIcon.png" alt="EditIcon" /></a>'+
				'<a href="#infoSite" data-transition="slideup" id="EditObservationLink" onclick="fullInfoObervation('+Observations_Id[i]+','+Days_Since_Last_Rainfall[i]+',\''+Approximate_Rainfall[i]+'\',\''+Current_Weather[i]+'\',\''+Rain[i]+'\',\''+Water_Clarity[i]+'\',\''+Surface_Coating[i]+'\',\''+Odor[i]+'\',\''+Stream_Bed_Color[i]+'\',\''+Shade_Percentage[i]+'\',\''+Algae_Cover[i]+'\',\''+LeafPacks[i]+'\',\''+Aquatic_Vegetation[i]+'\',\''+Flow[i]+'\',\''+Erosion+'\',\''+riparian_vegetation+'\',\''+AnimalObservation+'\',\''+AdditionalNotes+'\',\''+SamplesTaken+'\',\''+DateObservation[i]+'\',\''+TimeObservation[i]+'\','+Sites_Id[i]+','+Lat[i]+','+Lon[i]+')"><img src="Images/EyeIcon.png" alt="EyeIcon" /></a></td></tr>'

				); 	

			}else{

				console.log(Approximate_Rainfall[i]);
				Approximate_Rainfall[i] = Approximate_Rainfall[i].replace("\"", " ");
				$('#containerObservationsLoop').append(

					'<tr><td>'+DateObservation[i]+'</td>'+
					'<td>Citizens Science</td>'+
					'<td>'+Site_Name[i]+'</td>'+
				'<td><a href="#infoSite" data-transition="slideup" id="EditObservationLink" onclick="fullInfoObervation('+Observations_Id[i]+','+Days_Since_Last_Rainfall[i]+','+Approximate_Rainfall[i]+','+Current_Weather[i]+','+Rain[i]+','+Water_Clarity[i]+','+Surface_Coating[i]+','+Odor[i]+','+Stream_Bed_Color[i]+','+Shade_Percentage[i]+','+Algae_Cover[i]+','+LeafPacks[i]+','+Aquatic_Vegetation[i]+','+Flow[i]+','+Erosion+','+riparian_vegetation+','+AnimalObservation+','+AdditionalNotes+','+SamplesTaken+','+DateObservation[i]+','+TimeObservation[i]+','+Sites_Id[i]+','+Lat[i]+','+Lon[i]+')">View Observation</a></td></tr>'
				// '<td><a href="#infoSite" data-transition="slideup" id="EditObservationLink" onclick="fullInfoObervation('+Observations_Id[i]+','+Days_Since_Last_Rainfall[i]+',\''+Approximate_Rainfall[i]+'\',\''+Current_Weather[i]+'\',\''+Rain[i]+'\',\''+Water_Clarity[i]+'\',\''+Surface_Coating[i]+'\',\''+Odor[i]+'\',\''+Stream_Bed_Color[i]+'\',\''+Shade_Percentage[i]+'\',\''+Algae_Cover[i]+'\',\''+LeafPacks[i]+'\',\''+Aquatic_Vegetation[i]+'\',\''+Flow[i]+'\',\''+Erosion+'\',\''+riparian_vegetation+'\',\''+AnimalObservation+'\',\''+AdditionalNotes+'\',\''+SamplesTaken+'\',\''+DateObservation[i]+'\',\''+TimeObservation[i]+'\','+Sites_Id[i]+','+Lat[i]+','+Lon[i]+')">View Observation</a></td></tr>'

				);
			} 
		} // End for loop
		displayDynamicObservationBySite(Sites_Id_Input);
	} else{ // end if (data.Status == 'success')
		console.log(data.Status);
		noSites = 1;
		$('#containerObservationsLoop').html("");
		displayDynamicObservationBySite(Sites_Id_Input);
	}
}
});
return false;
}  // end dataObservationsDisplay

var displayDynamicObservationBySite = function(Sites_Id){

	var dataString = 'Sites_Id='+Sites_Id+'&UserLoged='+UserLoged+'&displayDynamicObservationBySite=true';
	var Site_Id = Sites_Id;

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
					$('#containerObservationsLoop').append(

					'<tr><td>' + Date_DynaOberservation[i] + '</td>' +
					'<td>'+Form_Name[i]+'</td>'+
					'<td>'+Site_Name[i]+'</td>'+
					'<td><a href="data.html#ResultFormEdit" onclick="UpdateDynamicObservations('+Form_Id[i]+',\''+Form_Name[i]+'\','+Sites_Id[i]+','+DynamicObservation[i]+')"><img src="Images/EditIcon.png" alt="EditIcon" /></a>'+
					'<a href="data.html#infoDynamicObservation" onclick="fullInfoDynamicObervation('+DynamicObservation[i]+')"><img src="Images/EyeIcon.png" alt="EyeIcon" /></a></td></tr>'
					); 	
				}else{
					$('#containerObservationsLoop').append(

					'<tr><td>' + Date_DynaOberservation[i] + '</td>' +
					'<td>'+Form_Name[i]+'</td>'+
					'<td>'+Site_Name[i]+'</td>'+
					'<td><a href="data.html#infoDynamicObservation" onclick="fullInfoDynamicObervation('+DynamicObservation[i]+')">View Observation</a></td></tr>'
					);
				}
			} // End for loop

			$('.container').append(
				'<div id="photoDisplay">'+
				'</div>'
				);
			displayPhotos(Sites_Id);	
		} else{
			if(noSites){
				$('#containerObservationsLoop').append(
				'<h1 class="titleFormMeasuresImg"> No Sites On This Project</h1>'
				);
			}else{
				console.log(Site_Id);
				$('.container').append(
					'<div id="photoDisplay">'+
					'</div>'
					);
				displayPhotos(Site_Id);	
			}
		}

	}
});

return false;

}  // end dataObservationsDisplay

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
				'</ul>',
				'<img id="logo" class="pull-right"  src="assets/images/sciencetap.png"></img>',
			'</div>',
		'</nav>',
	'</div>',
];

var carouselSetupString = '<div id="carousel" class="carousel slide" data-ride="carousel">' + '<div class="carousel-inner" role="listbox">';
var carouselEndString = '</div>'+ '<a class="left carousel-control" href="#carousel" role="button" data-slide="prev">' +
		'<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>' +
		'<span class="sr-only">Previous</span></a>' +
		'<a class="right carousel-control" href="#carousel" role="button" data-slide="next">' +
		'<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>'+ 
		'<span class="sr-only">Next</span></a>' +
	'</div>';

var carouselString=  [
	'<div id="carousel" class="carousel slide" data-ride="carousel">',
		'<ol class="carousel-indicators">',
		'<li data-target="#carousel" data-slide-to="0" class="active"></li>',
		'<li data-target="#carousel" data-slide-to="1"></li>',
		'<li data-target="#carousel" data-slide-to="2"></li>',
		'</ol>',
		'<div class="carousel-inner" role="listbox">',
			'<div class="item active">',
			'<img src="" alt="">',
			'</div>',
			'<div class="item">',
			'<img src="" alt="">',
			'</div>',
		'</div>',
		'<a class="left carousel-control" href="#carousel" role="button" data-slide="prev">',
		'<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>',
		'<span class="sr-only">Previous</span></a>',
		'<a class="right carousel-control" href="#carousel" role="button" data-slide="next">',
		'<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>',
		'<span class="sr-only">Next</span></a>',
	'</div>'
];

displayPhotos = function(Observations_Id){

	var dataString = 'Site_Id='+Observations_Id+'&DisplayPhotos=true';
	var Url = "http://www.sciencetap.us/assets/App/";

	$.ajax({
	type: "POST",
	url: Url+'PHP/FunctionsMobile2.php',
	data: dataString,
	async: "false",
	dataType:"Json",
	success: function(data) {

	if (data.Status == 'success'){

		var Photo_Id = data.Photo_Id;
		var link_Img = data.link_Img;
		var Date_Img = data.Date_Img;
		var Time = data.Time;
		var Lat_Photo = data.Lat_Photo;
		var Lon_Photo = data.Lon_Photo;
		var Observations_Id = data.Observations_Id;
		var Site_Id = data.Site_Id;

		console.log(data.Status);

		$('#photoDisplay').html("");
		$('#photo').html("");

		for( var i in Photo_Id){

			var link = Url + link_Img[i];
			link = link.replace("//assets", "/assets");
			$('#photoDisplay').append(
				'<div id="loopImage">' +
				'<input type="checkbox" name="photo' + i + '" id="check' + i + '" class="photo"' + 
				' value="' + link + '">' + '&nbsp' +
				'<span>' + Date_Img[i] + " " + Time[i] + '</span>'+'<br>'+
				'<a onclick="startCarousel(i)" class="thumbnail" href="'+Url+link_Img[i]+'"><img src="'+Url+link_Img[i]+'"  alt="imgCarousel"></a>' +
				'</div>'
			);
		} // end for loop
		$('#photoDisplay').append('<br>');
		// $('#photoDisplay').after('<input name="selectAll" onclick="selectAllButtons()" type="button" value="Select All"/>');
		$('#photoDisplay').after('<button class="btn btn-primary btn-md" onclick="selectAllButtons()" type="button">Select All</button>');
		$('#photoDisplay').after('<button class="btn btn-primary btn-md" onclick="downloadPhotos()" type="button">Download</button>&nbsp');
		// for( var i in Photo_Id){ $('.carousel-inner').append( '<div class="item">' + '<img src="' + Url + link_Img[i] + '">' + '</div>'); }
	}else{
		console.log(data.Status);
		console.log("Photo query failed");
		$('photoDisplay').html("");
		$('#photoDisplay').append(
		'<h1 class="titleFormMeasuresImg"> No images on this observation</h1>'
		);
	}
}
});
return false;
} // end displayPhotos 

downloadPhotos = function (){
	var arr = document.getElementsByClassName("photo");
	var x;
	var i = 0;
	$.each(arr, function(index, value){
			var box = "check" + index;
			console.log(box);
			 var bool = document.getElementById(box).checked;
			console.log(bool);
			if(bool){
				var dataString = 'photo='+value.value;
				console.log(value.value);
				window.open('./get_stuff.php?img=' + value.value);
			}
	});
}

selectAllButtons = function(){
	if(checkAll){
		$('.photo').prop('checked', true);
		checkAll = 0;
	}else{
		$('.photo').prop('checked', false);
		checkAll = 1;
	}

}

startCarousel = function(i){
	$('.carousel').carousel();
}
