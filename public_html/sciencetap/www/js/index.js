
$(document).ready(function(e) {
    	var idUser		=	window.localStorage["idUser"];
        var Email		=	window.localStorage["Email"]; 
		var FirstName	=	window.localStorage["FirstName"];
        var LastName	=	window.localStorage["LastName"];
		var ImageUser	=	window.localStorage["ImageUser"];
        var Phone		=	window.localStorage["Phone"];
		var Permissions	=	window.localStorage["Permissions"];
				
				
			$('#ImageUser').attr('src','http://web-huertas.com/work/programs/ScienceTap/assets/Images/Users/'+ImageUser+'');	
			$('#NameUser').html(FirstName + " " +LastName);
});

