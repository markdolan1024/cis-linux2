// JavaScript Document


// global variables 

var menuCamera = true;

$(document).ready(function(e) {
	if(window.localStorage["idUser"] == ""){
				window.location = "index.html";
			}
	
    	var idUser		=	window.localStorage["idUser"];
        var Email		=	window.localStorage["Email"]; 
		var FirstName	=	window.localStorage["FirstName"];
        var LastName		=	window.localStorage["LastName"];
		var ImageUser	=	window.localStorage["ImageUser"];
        var Phone		=	window.localStorage["Phone"];
		var Permissions	=	window.localStorage["Permissions"];
				
				
			$('#ImageUser').attr('src',Url+'assets/Images/Users/'+ImageUser+'');	
			$('#NameUser').html(FirstName + " " +LastName);
			
			
			
});

$("#loginTag").click(function(){
	location.href= "index.html";
});
	
$("#registerTag").click(function(){
	location.href= "register.html";
});
	
	
$("#teamTag").click(function(){
	location.href= "team.html";
});


$("#teamPrincipalMenu").click(function(){
	location.href= "team.html";
});	
	
	
	
$(".linkToInfoData").click(function(){
	location.href= "individualData.html";
});	

$("#mapTag").click(function(){
	location.href= "map.html";
});	

$("#mapPrincipalMenu").click(function(){
	location.href= "map.html";
});		
	
	
$("#dataTag").click(function(){
	location.href= "data.html";
});	
	
$("#TopPrincipalMenu").click(function(){
	location.href= "data.html";
});	



$("#AdminTag").click(function(){
	location.href= "admin.html";
});		

$("#BottomPrincipalMenu").click(function(){
	location.href= "admin.html";
});	


$("#homeTag").click(function(){
	location.href= "weather.html";
});	



$("#formsTag").click(function(){
	location.href= "forms.html";
});		
	
$("#formsPrincipalMenu").click(function(){
	location.href= "forms.html";
});		
	
	
$(".membersAdmin").click(function(){
	location.href= "admin.html";
});	

$(".teamAdmin").click(function(){
	location.href= "adminTeam.html";
});	


$(".addMemberAdmin").click(function(){
	location.href= "adminAddMember.html";
});	

$(".adminAddTeam").click(function(){
	location.href= "adminAddTeam.html";
});



$("#SearchUser").click(function(){
	$( "#serarchContainer" ).css( "display", "-webkit-box" );
});	
	
$("#closeSearch").click(function(){
	$( "#serarchContainer" ).css( "display", "none" );
});	

$(".RegisterImg").click(function(){
	location.href= "register.html";
});		

$(".LoginImg").click(function(){
	location.href= "index.html";
});		





$("#leftLinePhoto").click(function(){
	
	if(menuCamera == true){
		
	$( "#menuCamera" ).css( "height", "50px" );
	setTimeout(function(){
		$( "#rightCamera" ).css( "display", "-webkit-box");
		$( "#leftCamera" ).css( "display", "-webkit-box");
		},300);
		menuCamera = false;
	}else{
		$( "#rightCamera" ).css( "display", "none");
		$( "#leftCamera" ).css( "display", "none");
		$( "#menuCamera" ).css( "height", "0px" );
		menuCamera = true;
		}
});	



$("#logoutTag").click(function(){
				
			window.localStorage.setItem("idUser", null);
			window.localStorage.setItem("Email", null);
			window.localStorage.setItem("FirstName", null);
			window.localStorage.setItem("LastName", null);
		    window.localStorage.setItem("ImageUser", null);
			window.localStorage.setItem("Phone", null);
		    window.localStorage.setItem("Permissions", null);
            			
		window.open("index.html", '_self', 'location=yes');
});	

$("#logoutPrincipalMenu").click(function(){
				
			window.localStorage.setItem("idUser", null);
			window.localStorage.setItem("Email", null);
			window.localStorage.setItem("FirstName", null);
			window.localStorage.setItem("LastName", null);
		    window.localStorage.setItem("ImageUser", null);
			window.localStorage.setItem("Phone", null);
		    window.localStorage.setItem("Permissions", null);
            			
		window.open("index.html", '_self', 'location=yes');
});




$("#addData").click(function(){
	document.getElementById("floatMenuInsert").style.display = "-webkit-box";
	setTimeout(function(){
		
	document.getElementById("floatMenuInsert").style.height = "100%";
		}, 200);
	
});	



$("#closeInsertBox").click(function(){
	document.getElementById("floatMenuInsert").style.height = "0%";
	
	setTimeout(function(){
		document.getElementById("floatMenuInsert").style.display = "-webkit-box";
	}, 200);
	
});	



document.addEventListener("showkeyboard", function(){
	$('#footer').hide();
});
	
document.addEventListener("hidekeyboard", function(){
	$('#footer').show();
});
