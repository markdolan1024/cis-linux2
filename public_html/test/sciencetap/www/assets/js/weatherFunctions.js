var Url = "http://www.sciencetap.us/assets/App/"
var UrlMap = "http://www.sciencetap.us/assets/App"

$(document).ready(function(e) {
	if(window.localStorage["idUser"] == ""){
		window.location = "index.html";
		var idUser = window.localStorage["idUser"];
		var Email = window.localStorage["Email"]; 
		var FirstName =	window.localStorage["FirstName"];
		var LastName = window.localStorage["LastName"];
		var ImageUser =	window.localStorage["ImageUser"];
		var Phone = window.localStorage["Phone"];
		var Permissions	= window.localStorage["Permissions"];
		$('#ImageUser').attr('src',Url+'assets/Images/Users/'+ImageUser+'');	
		$('#user').html(FirstName + " " +LastName);
	}
	var FirstName =	window.localStorage["FirstName"];
	var LastName = window.localStorage["LastName"];
	$('#user').html(FirstName + " " +LastName);
	
});

var displayUserInfo = function(){
	var results = [];
	// for(var i = 0; i < window.localStorage.length; i++){ key = window.localStorage.key(i); console.log(key); }
	var firstName = localStorage.getItem('FirstName');
	var lastName = localStorage.getItem('LastName');
	var userInfo = [];
	userInfo['Name'] = firstName + " " + lastName;
	userInfo['Email'] = localStorage.getItem('Email');
	userInfo['Team Name'] = localStorage.getItem('NameTeam');
	userInfo['Phone#'] = localStorage.getItem('Phone');
	var userIdType = localStorage.getItem('Usert_Type');
	if(userIdType == 4){
		userInfo['User Type'] = 'Admin';
	}else{
		userInfo['User Type'] = 'User';
	}
	
	for(var i in userInfo){
		$("#userTable").append("<tr><td>" + i + "</td><td>" + userInfo[i] + "</td></tr>");
	}
}


var nav_string =  [
	'<div class="row col-md-6 col-lg-6">',
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
	'<div class="col-md-6 col-lg-6"></div>'
];
