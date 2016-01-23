// Mark Dolan custom jquery functions
// link_string - brings in links accordion and footer

$.fn.greenify = function(){
	this.css("color","green");
};


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
			'</div>',
		'</nav>',
	'</div>',
];
