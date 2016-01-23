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
	var FirstName =	window.localStorage["FirstName"];
	var LastName = window.localStorage["LastName"];
	$('#user').html(FirstName + " " +LastName);

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
				var Lat = data.Lat;
				var Lon	= data.Lon;
				var DateStream 	= data.DateStream;
				var Time = data.Time;
				var Leader_Id = data.Leader_Id;
				var idTeam = data.idTeam;
				var NameTeam = data.Name;
				var Description	= data.Description;
				var URL = data.URL;
				var TeamImg = data.TeamImg;
				var Remarks = data.Remarks;
				var ParentID = data.ParentID;

				for (var i in Stream_Id) {
					var clickFunction = 'onclick="selectStreamByLine('+Stream_Id[i]+',\''+Stream_Name[i]+'\',\''+Water_body[i]+'\','+Lat[i]+','+Lon[i]+',\''+DateStream[i]+'\',\''+Time[i]+'\','+Leader_Id[i]+','+idTeam[i]+',\''+NameTeam[i]+'\',\''+Description[i]+'\',\''+URL[i]+'\',\''+TeamImg[i]+'\',\''+Remarks[i]+'\','+UserLoged+')">';

					$('#contentProjectTable').append(

					'<li class="project" role="presentation" ' + clickFunction + '<a>' +
					Stream_Name[i] +
					'<span class="TeamLabel">&nbspTeam:'+NameTeam[i] + '</span>' +
					'<span  class="glyphicon glyphicon-chevron-right pull-right" data-transition="slide"></span>' + '</a>' +
					'</li>'
					);
				} // End for loop

			}else{
			}
		}
	});
return false;
});

var selectStreamByLine = function(Stream_Id,Stream_Name,Water_body,Lat,Lon,DateStream,Time,Leader_Id,idTeam,NameTeam,Description,URL,TeamImg,Remarks,UserLoged){
		window.location = "project.html?SiteId=" + Stream_Id + "&Name=" + Stream_Name + "&Date=" + DateStream + "&Time=" + Time + "&By=" + NameTeam;
}

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
