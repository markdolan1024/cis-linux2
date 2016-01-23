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
	var get =  window.location.href;
	var tokens = get.split("?");
	var siteId = tokens[1].substr(tokens[1].indexOf("=")+1);
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
		$('#containerObersationsLoop').html("");

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
