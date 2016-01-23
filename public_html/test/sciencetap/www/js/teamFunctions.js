
/* 

GOOGLE MAP API KEY

AIzaSyDELvVrnaFo_tHvb_5hzaJxzNp3aoG4VOg

*/

// GLOBAL VARIABLES

 var lat = window.localStorage.getItem('lat');
 var lon = window.localStorage.getItem('lon');


var searchByTeamName = true;
var searchByLeader = true;
var menuCamera = true;
var idUser;
var NameTeam

$(document).ready(function(e) {
	
	
		idUser	= window.localStorage["idUser"];
      			
		var dataString = 'idUser='+idUser+'&DisplayGroupsAdmin=true';
			
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				  dataType:"Json",
				  success: function(data) {
					  
					 
					  if (data.Status == 'success'){
						  
						  
						  
						  $('#containerUser').html("");
					
	
								var idTeam  	= data.idTeam;
								var NameTeam 	= data.Name;
								var Description = data.Description;
								var URL 		= data.URL;
								var Leader 		= data.Leader;
								var Remarks 	= data.Remarks;
								var ParentID 	= data.ParentID;
								var TeamImg 	= data.TeamImg;
								
								
								var NameLeader 	= data.NameLeader;
								var LastLeader 	= data.LastLeader;
						
						
							for (var i in idTeam) {
								$('#containerUser').append(
								
								 '<div class="lineMembersTeam">'+
                                    '<div class="centerLineMembers">'+
                                    	'<div class="nameBoxTeam"><div><p>'+NameTeam[i]+'</p></div> </div>'+
                                        '<div class="UniBoxLeader"><div><p>'+Description[i]+'</p></div> </div>'+
                                 	'</div>'+
                                    '<div class="rightLineMembers">'+
                                  		'<a href="#pageTeamInfo" data-transition="slideup" onclick="exportInfoTeam('+idTeam[i]+',\''+NameTeam[i]+'\',\''+Description[i]+'\',\''+URL[i]+'\',\''+Leader[i]+'\',\''+Remarks[i]+'\',\''+NameLeader[i]+'\',\''+LastLeader[i]+'\','+ParentID[i]+',\''+TeamImg[i]+'\')"><img src="Images/FordwardBlack.png" alt="iconNext" /></a>'+
                                    '</div>'+
                         		'</div>'
									
                                
					 		   );
							   
							   
							   $('#searchByLeaderPanel').append( 
							   '<option value="'+Leader[i]+'">'+NameLeader[i]+' '+LastLeader[i]+'</option>'
							   );
							   
			
                 		 } // End form loop
				
				 
				 	
					  }else{
						  
					
			
						
						  
						 
						  
						  }
						 
				  }
			});
			return false;
   
			
			
   
	
});






	
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



$('#searchByTeamNameBtnPanel').click(function(){
	

	
	var teamName = $('#searchByTeamNamePanel').val();

	if(teamName == ""){
		alert("Team Name needs to be completed");
		}else{
			
			var dataString = 'teamName='+teamName+'&searchByTeamNameBtnPanel=true';
			 
			
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				  dataType:"Json",
				  success: function(data) {
					  
					 
					  if (data.Status == 'success'){
						  
						  
						  
						  $('#containerUser').html("");
					
	
								var idTeam  	= data.idTeam;
								var NameTeam 	= data.Name;
								var Description = data.Description;
								var URL 		= data.URL;
								var Leader 		= data.Leader;
								var Remarks 	= data.Remarks;
								var ParentID 	= data.ParentID;
								var TeamImg 	= data.TeamImg;
								
								var NameLeader 	= data.NameLeader;
								var LastLeader 	= data.LastLeader;
						
							for (var i in idTeam) {
								$('#containerUser').append(
								
								 '<div class="lineMembersTeam">'+
                                    '<div class="centerLineMembers">'+
                                    	'<div class="nameBoxTeam"><div><p>'+NameTeam[i]+'</p></div> </div>'+
                                        '<div class="UniBoxLeader"><div><p>'+Description[i]+'</p></div> </div>'+
                                 	'</div>'+
                                    '<div class="rightLineMembers">'+
                                  		'<a href="#pageTeamInfo" data-transition="slideup"  onclick="exportInfoTeam('+idTeam[i]+',\''+NameTeam[i]+'\',\''+Description[i]+'\',\''+URL[i]+'\',\''+Leader[i]+'\',\''+Remarks[i]+'\',\''+NameLeader[i]+'\',\''+LastLeader[i]+'\','+ParentID[i]+',\''+TeamImg[i]+'\')"><img src="Images/FordwardBlack.png" alt="iconNext" /></a>'+
                                    '</div>'+
                         		'</div>'
									
                                
					 		   );
			
                 		 } // End form loop
				  
				
				 
				 
					  }else{
						 
						  alert('No result found');
						    $('#containerUser').html("");
							StreachWindows();
						  }
						 
				  }
			});
			return false;
			
			
		} // end if condition 

	
	
	
});




$('#searchByLeaderBtnPanel').click(function(){
	

	
	var Leader = $('#searchByLeaderPanel').val();

	if(Leader == ""){
		alert("Team Name need to be complete");
		}else{
			
			var dataString = 'Leader='+Leader+'&searchByLeaderBtnPanel=true';
			 
			
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				  dataType:"Json",
				  success: function(data) {
					  
					 
					  if (data.Status == 'success'){
						  
						  
						  
						  $('#containerUser').html("");
					
	
								var idTeam  	= data.idTeam;
								var NameTeam 	= data.Name;
								var Description = data.Description;
								var URL 		= data.URL;
								var Leader 		= data.Leader;
								var Remarks 	= data.Remarks;
								var ParentID 	= data.ParentID;
								var TeamImg 	= data.TeamImg;
								
								var NameLeader 	= data.NameLeader;
								var LastLeader 	= data.LastLeader;
						
							for (var i in idTeam) {
								$('#containerUser').append(
								
								 '<div class="lineMembersTeam">'+
                                    '<div class="centerLineMembers">'+
                                    	'<div class="nameBoxTeam"><div><p>'+NameTeam[i]+'</p></div> </div>'+
                                        '<div class="UniBoxLeader"><div><p>'+Description[i]+'</p></div> </div>'+
                                 	'</div>'+
                                    '<div class="rightLineMembers">'+
                                  		'<a href="#pageTeamInfo" data-transition="slideup" onclick="exportInfoTeam('+idTeam[i]+',\''+NameTeam[i]+'\',\''+Description[i]+'\',\''+URL[i]+'\',\''+Leader[i]+'\',\''+Remarks[i]+'\',\''+NameLeader[i]+'\',\''+LastLeader[i]+'\','+ParentID[i]+',\''+TeamImg[i]+'\')"><img src="Images/FordwardBlack.png" alt="iconNext" /></a>'+
                                    '</div>'+
                         		'</div>'
									
                                
					 		   );
			
                 		 } // End form loop
				  
				
				 
				 
					  }else{
						 
						  alert('No result found');
						    $('#containerUser').html("");
							
						  }
						 
				  }
			});
			return false;
		} // end if condition 
});




var exportInfoTeam = function(idTeam,NameTeam,Description,URL,Leader,Remarks,NameLeader,LastLeader,ParentID,TeamImg){
	
	$('.TeamNameInfo').html(NameTeam);
	$('#descriptionInfoTeam').html(Description);
	$('#RemarkInfoTeam').html(Remarks);
	$('#LeaderInfoTeam').html(NameLeader +' '+LastLeader);
	$('#URLInfoTeam').html(URL);
	
	
	
	if(TeamImg != ""){
		
		var UrlImg = Url+'assets/Images/Teams/'+TeamImg;
		$('#logoTeam').css('width','95px');
		$('#logoTeam').css('height','140px');
		$('#logoTeam').attr('src',UrlImg);
	}else{
		
		$('#logoTeam').css('width','70px');
		$('#logoTeam').css('height','80px');
		$('#logoTeam').attr('src','Images/cameraIcon2.png');
	
	}
	
	
	// GET ACTUAL DATE AND TIME //
	
	var dt = new Date();
	var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
	
	
	// NOW I NEED TO COMPLETE SOME FIELD ON MY FORM CREATE STREAM 
	
	$('#LatitudStream').val(lat);
	$('#LongitudStream').val(lon);
	$('#dateStream').val(dt);
	$('#timeStream').val(time);
	$('#idTeamStream').val(idTeam);
	
	/*
	
	<input type="text" placeholder="Latitude" id="LatitudStream" />
                    <input type="text" placeholder="Longitude" id="LongitudStream" />
                    <input type="date" placeholder="Date" id="dateStream"  />
                    <input type="time" placeholder="Time" id="timeStream" />
	*/
	

	
	 window.localStorage.setItem("idTeam", idTeam);
	 window.localStorage.setItem("NameTeam", NameTeam);

	displayMembersTeamInfo(idTeam);

	var IdUserLooged = Number(idUserLogged);
	var Leader = Number(Leader);
	
	if(IdUserLooged == Leader){
		
		$('#footer').html("");
		$('#footerStream').html("");
		
		$('#footer').append(
		
	
					'<div id="containerFooter">'+
                    	'<div class="FooterMenuLeader">'+
                        	'<div class="contImageFooter"><a href="#pageTeamInfo" data-transition="slide" data-direction="reverse"><img src="Images/TeamIcon.png" alt="Register Icon"></a></div>'+
                            '<div><p>Team</p></div>'+
                        '</div>'+
                       	'<div class="FooterMenuLeader">'+
                        	'<div class="contImageFooter">'+
									'<a href="#pageStreamInsert" data-transition="slide" onclick="displayFormsCreationProject()"><img src="Images/Icons/plus_gray.png" alt="Register Icon"></a>'+
							'</div>'+
                            '<div><p>Add Project</p></div>'+
                        '</div>'+
                    
					'</div>'
		
		
		);
		
		
		$('#footerStream').append(
		
					'<div id="containerFooter">'+
                    	'<div class="FooterMenuLeader">'+
                        	'<div class="contImageFooter"><a href="#pageTeamInfo" data-transition="slide" data-direction="reverse"><img src="Images/TeamIcon.png" alt="Register Icon"></a></div>'+
                            '<div><p>Team</p></div>'+
                        '</div>'+
                       	'<div class="FooterMenuLeader">'+
                        	'<div class="contImageFooter">'+
									'<a href=""#pageStreamInsert" data-transition="slide" onclick="displayFormsCreationProject()"><img src="Images/Icons/plus_gray.png" alt="Register Icon"></a>'+
							'</div>'+
                            '<div><p>Add Project</p></div>'+
                        '</div>'+
                    
					'</div>'
		
		);
	
	
	}else{
		$('#footer').css('background-color','#fff');
		$('#footerStream').css('background-color','#fff');
	
		$('#footer').html("");
		$('#footerStream').html("");
		}
		
		
	
} //  end of my function 








var displayMembersTeamInfo = function(idTeam){
	



	var dataString = 'idTeam='+idTeam+'&dispalyMembersInfoTeam=true';
			 
			
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				  dataType:"Json",
				  success: function(data) {
					  
					  var idUser 		= data.idUser;
					  var Email 		= data.Email;
					  var Status 		= data.Status;
					  var FirstName 	= data.FirstName;
					  var LastName 		= data.LastName;
					  var ImageUser 	= data.ImageUser;
					  var User_Type_Id 	= data.User_Type_Id;
					 
					    if (data.Status == 'success'){
					
						  
						  $('#infoMemberTeamBox').html("");
					
	
							for (var i in idUser) {
								
								$('#infoMemberTeamBox').append(
								
								'<div class="lineMemberInfoTeam">'+
                                	'<div class="nameMemberInfoTeam"><p>'+FirstName[i]+' '+LastName[i]+'</p></div>'+
                                	'<div class="actionMemberInfoTeam"><a href="#EmailPanel" onclick="openBoxEmail(\''+Email[i]+'\')"><img src="Images/addMember_black.png" alt="IconMail" /></a></div>'+
                                '</div>' 
									
                                
					 		   );
			
                 		 } // End form loop
				  
				
				
				 
				 
					  }else{
						 
						  alert('No result found');
						    $('#infoMemberTeamBox').html("");
							
						  }
						 
				  }
			});
			return false;

	
}



/* javascript:openBoxEmail(\''+Email[i]+'\')  */


var openBoxEmail = function(Email){
	$('#toEmailPanel').val(Email);
	$('#subjectEmailPanel').val("");
	$('#bodyEmailPanel').val("");
}



$('#sendEmailPanel').click(function(){
	
	var To = $('#toEmailPanel').val();
	var Subject = $('#subjectEmailPanel').val();
	var Body = $('#bodyEmailPanel').val();
	
	
	
	var dataString = 'To='+To+ '&Subject='+Subject+'&Body='+Body+'&sendEmailPanel=true';
			 
			
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				  dataType:"Json",
				  success: function(data) {
					
					    if (data.Status == 'success'){
							
						alert("Email sent successfully");
						$('#toEmailPanel').val("");
						$('#subjectEmailPanel').val("");
						$('#bodyEmailPanel').val("");
						
					  }else{
						 
						  alert('Error sending emil');
							
						  }
						 
				  }
			});
			return false;

	
	

});





$("#leftLine1InfoUSer").click(function(){
	
	if(menuCamera == true){
		
	$( "#menuCameraLeader" ).css( "height", "50px" );
	setTimeout(function(){
		$( "#rightCamera" ).css( "display", "-webkit-box");
		$( "#leftCamera" ).css( "display", "-webkit-box");
		},300);
		menuCamera = false;
	}else{
		$( "#rightCamera" ).css( "display", "none");
		$( "#leftCamera" ).css( "display", "none");
		$( "#menuCameraLeader" ).css( "height", "0px" );
		menuCamera = true;
		}
});	









//// HERE IS THE MENU TO TAKE THE IMAGE TO THE TEAM ///



    document.addEventListener("deviceready",onDeviceReady,false);


    function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }

    function onPhotoDataSuccess(imageURI) {
		
		var ImageUser = imageURI;
		$('#logoTeam').css('width','95px');
		$('#logoTeam').css('height','140px');
		$('#logoTeam').attr('src',ImageUser);
		uploadPhoto(imageURI);
		
	//	var NamePicture = "juan";
	//	uploadPhoto(imageURI, NamePicture)
    //  	openPage1();
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(imageURI) {
      	var ImageUser = imageURI;
	
		$('#logoTeam').css('width','95px');
		$('#logoTeam').css('height','140px');
		$('#logoTeam').attr('src',ImageUser);
		
		uploadPhoto(imageURI);
	//	uploadPhoto(imageURI, NamePicture)
		//openPage1();
    }

    // A button will call this function
    //
    function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { 
	  quality : 100,
	  destinationType : Camera.DestinationType.FILE_URI,
	  sourceType : Camera.PictureSourceType.CAMERA,
	  allowEdit : false,
	  targetWidth: 500,
	  targetHeight: 500,
	  saveToPhotoAlbum: true 
	
		
		});
    }



function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail,{
		  quality : 100,
		  destinationType: destinationType.FILE_URI,
		  sourceType: source,
		  destinationType: Camera.DestinationType.FILE_URI,
		  allowEdit: false,
		  targetWidth: 300,
		  targetHeight: 300,
	});
}

    // Called if something bad happens.
    //
function onFail(message) {
     // alert('Failed because: ' + message);
}





// This section is to upload the picture

function uploadPhoto(imageURI) {
  
  var idTeamPhoto 	= window.localStorage.getItem('idTeam');
  var NameImage 	= window.localStorage.getItem('NameTeam');
  
    var options = new FileUploadOptions();
    options.fileKey="fileImgTeam";
    options.fileName=NameImage.substr(NameImage.lastIndexOf('/')+1);
    options.mimeType="image/jpge";
	
	

    
    var params = new Object();
    params.value1 = "test";
    params.value2 = "param";
    
    options.params = params;
    options.chunkedMode = false;
    
    var ft = new FileTransfer();
    ft.upload(imageURI, Url+'PHP/FunctionsMobile.php?idTeamPhoto='+idTeamPhoto, win, fail, options,true);
	

}

function win(r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
    alert("Image successfully added");
}

function fail(error) {
    alert("An error has occurred: Code = " .error.code);
}






/*

TABLE 'Stream'

Stream_Name
Water_body
Lat	float
Lon	float
Date
Time
Monitor_Id
idTeam
	 
*/





$('#addStreamBtn').click(function(){
	
	var StreamName = $('#StreamName').val();
	var WaterBody = $('#WaterBody').val();
	var LatitudStream = $('#LatitudStream').val();
	var LongitudStream = $('#LongitudStream').val();
	var dateStream = $('#dateStream').val();
	var timeStream = $('#timeStream').val();
	var MonitorStream = idUser;
	var idTeamStream = $('#idTeamStream').val();
	var FormsSelected;
	
	 var Forms = [];
        $('#formsCheckbox:checked').each(function(i){
          Forms[i] = $(this).val();
      });
	  
	  FormsSelected = Forms.toString();
	 
	  
	  if(StreamName == ""){
		  alert("Please complete project name");
		  $('#StreamName').focus();
		  
	  }else if(LatitudStream == ""){
		  alert("Please complete latitud");
		  $('#LatitudStream').focus();
		  
	  }else if(LongitudStream == ""){
		  alert("Please complete longitud");
		  $('#LongitudStream').focus();	 
	 		 
	  }else if(dateStream == ""){
		  
		    alert("Please complete date field");
		  	$('#dateStream').focus();	
		}else if(timeStream ==""){
			  alert("Please complete date field");
		  	$('#timeStream').focus();	
		}else{
	  

	

	
	var dataString = 'StreamName='+StreamName+ '&WaterBody='+WaterBody+'&LatitudStream='+LatitudStream+'&LongitudStream='+LongitudStream+'&dateStream='+dateStream+'&timeStream='+timeStream+'&MonitorStream='+MonitorStream+'&idTeamStream='+idTeamStream+'&FormsSelected='+FormsSelected+'&CreateStream=true';
			 
			
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				  dataType:"Json",
				  success: function(data) {
					
					    if (data.Status == 'success'){
							
						alert("Project created successfully");
						
						$('#StreamName').val("");
						$('#WaterBody').val("");
						$('#LatitudStream').val("");
						$('#LongitudStream').val("");
						$('#dateStream').val("");
						$('#timeStream').val("");
					 	$('#MonitorStream').val("");
						
					  }else if(data.Status == 'repeated') {
						 
						  alert('Alredy exist a project with same description');
						  $('#StreamName').focus();
							
					 }else{
						 
						 alert('Error creating a new project');
						 
						 }
						 
				  }
			});
			return false;


		} // End else condition
	
	

});









var displayFormsCreationProject = function(){
	



	var dataString = 'displayFormsCreationProject=true';
			 
			
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobileForm.php',
				  data: dataString,
				  dataType:"Json",
				  success: function(data) {
					  
					  $('#loopFormSelection').html("");
					  
					  var Form_Id 		= data.Form_Id;
					  var Form_Name 	= data.Form_Name;
					  var Date_Form 	= data.Date_Form;
					  
					  var len = Object.keys(Form_Id).length;
					 
					  if (data.Status == 'success'){
						  
						  
						  
						  
						 
						 for(var i = 0; i< len ; i++){
							 
							 
							 
							if([Number(i)+1] < len){
											 
								  secondLine= '<div class="lineFormSelection">'+
													'<div class="leftLineFormSelection"><input type="checkbox" id="formsCheckbox" value="'+Form_Id[Number(i)+1]+'"></div>'+
													'<div class="rightLineFormSelection"><p>'+Form_Name[Number(i)+1]+'</p></div>'+
											   '</div>'
											   	  
									  }else{
											  secondLine="";
												  
										 }
								    
							 
							 
							 
							 $('#loopFormSelection').append(
							 
							 	'<div class="twoLinesFormSelection">'+
								
									'<div class="lineFormSelection">'+
										'<div class="leftLineFormSelection"><input type="checkbox" id="formsCheckbox" value="'+Form_Id[i]+'"></div>'+
										'<div class="rightLineFormSelection"><p>'+Form_Name[i]+'</p></div>'+
											
									'</div>'+
									secondLine+''+
									
                                
                              '</div>'
							 
							 
							 
							 );
							 
							 i++;
						
						
						 } // end foor loop
						 
						 
					
					  }else if(data.Status == 'noRows'){
						  
						  
				 
					  }else{
						 
						  alert('Error displaying forms');
							
						  }
						 
				  }
			});
			return false;

	
}




