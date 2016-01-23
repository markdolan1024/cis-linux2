/// GLOBAL VARIABLES


var searchByName = true;
var searchByLast = true;
var searchByEmail = true;
var searchByRole = true;



	$(document).ready(function(e) {
    
				
				var dataString = 'DisplayMembers=true';
			 
			
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				  dataType:"Json",
				  success: function(data) {
					  
					 
					  if (data.Status == 'success'){
						  
						  
						  
						  $('#containerUser').html("");
					
	
								
								var idUser  	= data.idUser;
								var Email 		= data.Email;
								var Status 		= data.Status;
								var FirstName 	= data.FirstName;
								var LastName 	= data.LastName;
								var Phone 		= data.Phone;
								var ImageUser 	= data.ImageUser;
								var Twitter 	= data.Twitter;
								var FB 			= data.FB;
								var User_Type_Id= data.User_Type_Id;
								var numRows		= data.numRows;
								
								
								var type_User = ""; 
								
					
							for (var i in idUser) {
								
								if(User_Type_Id[i] == 1){
									type_User = "Web User";
									}else{
									type_User = "Administrator";
										}
								$('#containerUser').append(
								
								 '<div class="lineMembersTeam" onclick="openModalEditLine('+idUser[i]+',\''+FirstName[i]+'\',\''+LastName[i]+'\',\''+Email[i]+'\',\''+Phone[i]+'\',\''+ImageUser[i]+'\',\''+Twitter[i]+'\',\''+FB[i]+'\',\''+User_Type_Id[i]+'\')">'+
                        			'<div class="leftLineMembers">'+
                                    	'<img src="'+Url+'assets/Images/Users/'+ImageUser[i]+'" alt="img Team">'+ 
                                    '</div>'+
                                    '<div class="centerLineMembers">'+
                                    	'<div class="nameBoxMembers"><p>'+FirstName[i]+'  '+LastName[i]+' </p> </div>'+
                                        '<div class="UniBoxMembers"> <p>'+type_User+'</p> </div>'+
								    '</div>'+
                                    '<div class="rightLineMembers">'+
                                  		'<a href="#updateAdmin" onclick="openModalEdit('+idUser[i]+',\''+FirstName[i]+'\',\''+LastName[i]+'\',\''+Email[i]+'\',\''+Phone[i]+'\',\''+ImageUser[i]+'\',\''+Twitter[i]+'\',\''+FB[i]+'\',\''+User_Type_Id[i]+'\')"  data-transition="slideup"><img src="Images/FordwardBlack.png" alt="iconNext" /></a>'+
                                    '</div>	'+
                         		'</div>'
									
                                
								
							
					 		   );
			
                 		 } // End form loop
				  
					
				 
				 
					  }else{
						  
						  alert('You do not belong to any team');
						  
						  }
						 
				  }
			});
			return false;
   
	
});



var displayAllMembers = function(){
	
	
		
				var dataString = 'DisplayMembers=true';
			 
			
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				  dataType:"Json",
				  success: function(data) {
					  
					 
					  if (data.Status == 'success'){
						  
						  
						  
						  $('#containerUser').html("");
					
	
								
								var idUser  	= data.idUser;
								var Email 		= data.Email;
								var Status 		= data.Status;
								var FirstName 	= data.FirstName;
								var LastName 	= data.LastName;
								var Phone 		= data.Phone;
								var ImageUser 	= data.ImageUser;
								var Twitter 	= data.Twitter;
								var FB 			= data.FB;
								var User_Type_Id= data.User_Type_Id;
								var numRows		= data.numRows;
								
								
								var type_User = ""; 
								
					
							for (var i in idUser) {
								
								if(User_Type_Id[i] == 1){
									type_User = "Web User";
									}else{
									type_User = "Administrator";
										}
								$('#containerUser').append(
								
								 '<div class="lineMembersTeam" onclick="openModalEditLine('+idUser[i]+',\''+FirstName[i]+'\',\''+LastName[i]+'\',\''+Email[i]+'\',\''+Phone[i]+'\',\''+ImageUser[i]+'\',\''+Twitter[i]+'\',\''+FB[i]+'\',\''+User_Type_Id[i]+'\')">'+
                        			'<div class="leftLineMembers">'+
                                    	'<img src="'+Url+'assets/Images/Users/'+ImageUser[i]+'" alt="img Team">'+ 
                                    '</div>'+
                                    '<div class="centerLineMembers">'+
                                    	'<div class="nameBoxMembers"><p>'+FirstName[i]+'  '+LastName[i]+' </p> </div>'+
                                        '<div class="UniBoxMembers"> <p>'+type_User+'</p> </div>'+
								    '</div>'+
                                    '<div class="rightLineMembers">'+
                                  		'<a href="#updateAdmin" onclick="openModalEdit('+idUser[i]+',\''+FirstName[i]+'\',\''+LastName[i]+'\',\''+Email[i]+'\',\''+Phone[i]+'\',\''+ImageUser[i]+'\',\''+Twitter[i]+'\',\''+FB[i]+'\',\''+User_Type_Id[i]+'\')"  data-transition="slideup"><img src="Images/FordwardBlack.png" alt="iconNext" /></a>'+
                                    '</div>	'+
                         		'</div>'
									
                                
								
							
					 		   );
			
                 		 } // End form loop
				  
					
				 
				 
					  }else{
						  
						  alert('You do not belong to any team');
						  
						  }
						 
				  }
			});
			return false;
	
	
}




$('#searchByNameBtnPanel').click(function(){
		
				var nameSearch = $('#searchByNamePanel').val();
				var dataString = 'nameSearch='+ nameSearch +'&searchByNameBtnPanel=true';
			 
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				  dataType:"Json",
				  success: function(data) {
					  
					 
					  if (data.Status == 'success'){
						  
						  
						  
						  $('#containerUser').html("");
					
	
								
								var idUser  	= data.idUser;
								var Email 		= data.Email;
								var Status 		= data.Status;
								var FirstName 	= data.FirstName;
								var LastName 	= data.LastName;
								var Phone 		= data.Phone;
								var ImageUser 	= data.ImageUser;
								var Twitter 	= data.Twitter;
								var FB 			= data.FB;
								var User_Type_Id= data.User_Type_Id;
								var numRows		= data.numRows;
								
								
								var type_User = ""; 
								
					
							for (var i in idUser) {
								
								if(User_Type_Id[i] == 1){
									type_User = "Web User";
									}else{
									type_User = "Administrator";
										}
								$('#containerUser').append(
								
								 '<div class="lineMembersTeam" onclick="openModalEditLine('+idUser[i]+',\''+FirstName[i]+'\',\''+LastName[i]+'\',\''+Email[i]+'\',\''+Phone[i]+'\',\''+ImageUser[i]+'\',\''+Twitter[i]+'\',\''+FB[i]+'\',\''+User_Type_Id[i]+'\')">'+
                        			'<div class="leftLineMembers">'+
                                    	'<img src="'+Url+'assets/Images/Users/'+ImageUser[i]+'" alt="img Team">'+ 
                                    '</div>'+
                                    '<div class="centerLineMembers">'+
                                    	'<div class="nameBoxMembers"><p>'+FirstName[i]+'  '+LastName[i]+' </p> </div>'+
                                        '<div class="UniBoxMembers"> <p>'+type_User+'</p> </div>'+
								    '</div>'+
                                    '<div class="rightLineMembers linkToInfoTeam" data-ajax="false">'+
                                  			'<a href="#updateAdmin" onclick="openModalEdit('+idUser[i]+',\''+FirstName[i]+'\',\''+LastName[i]+'\',\''+Email[i]+'\',\''+Phone[i]+'\',\''+ImageUser[i]+'\',\''+Twitter[i]+'\',\''+FB[i]+'\',\''+User_Type_Id[i]+'\')"  data-transition="slideup"><img src="Images/FordwardBlack.png" alt="iconNext" /></a>'+
                                    '</div>	'+
                         		'</div>'
									
                                
					 		   );
			
                 		 } // End form loop
				  
					
				 
				 
					  }else{
						  
						  alert('No results found');
						  
						  }
						 
				  }
			});
			return false;
   
	
});








	


$('#searchByLastBtnPanel').click(function(){
		
				var LastSearch = $('#searchByLastPanel').val();
				var dataString = 'LastSearch='+ LastSearch +'&searchByLastBtnPanel=true';
			 
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				  dataType:"Json",
				  success: function(data) {
					  
					 
					  if (data.Status == 'success'){
						  
						  
						  
						  $('#containerUser').html("");
					
	
								
								var idUser  	= data.idUser;
								var Email 		= data.Email;
								var Status 		= data.Status;
								var FirstName 	= data.FirstName;
								var LastName 	= data.LastName;
								var Phone 		= data.Phone;
								var ImageUser 	= data.ImageUser;
								var Twitter 	= data.Twitter;
								var FB 			= data.FB;
								var User_Type_Id= data.User_Type_Id;
								var numRows		= data.numRows;
								
								
								var type_User = ""; 
								
					
							for (var i in idUser) {
								
								if(User_Type_Id[i] == 1){
									type_User = "Web User";
									}else{
									type_User = "Administrator";
										}
								$('#containerUser').append(
								
								 '<div class="lineMembersTeam" onclick="openModalEditLine('+idUser[i]+',\''+FirstName[i]+'\',\''+LastName[i]+'\',\''+Email[i]+'\',\''+Phone[i]+'\',\''+ImageUser[i]+'\',\''+Twitter[i]+'\',\''+FB[i]+'\',\''+User_Type_Id[i]+'\')">'+
                        			'<div class="leftLineMembers">'+
                                    	'<img src="'+Url+'assets/Images/Users/'+ImageUser[i]+'" alt="img Team">'+ 
                                    '</div>'+
                                    '<div class="centerLineMembers">'+
                                    	'<div class="nameBoxMembers"><p>'+FirstName[i]+'  '+LastName[i]+' </p> </div>'+
                                        '<div class="UniBoxMembers"> <p>'+type_User+'</p> </div>'+
								    '</div>'+
                                    '<div class="rightLineMembers linkToInfoTeam" data-ajax="false">'+
                                  			'<a href="#updateAdmin" onclick="openModalEdit('+idUser[i]+',\''+FirstName[i]+'\',\''+LastName[i]+'\',\''+Email[i]+'\',\''+Phone[i]+'\',\''+ImageUser[i]+'\',\''+Twitter[i]+'\',\''+FB[i]+'\',\''+User_Type_Id[i]+'\')"  data-transition="slideup"><img src="Images/FordwardBlack.png" alt="iconNext" /></a>'+
                                    '</div>	'+
                         		'</div>'
									
                                
					 		   );
			
                 		 } // End form loop
				  
					
				 
				 
					  }else{
						  
						  alert('No results found');
						  
						  }
						 
				  }
			});
			return false;
   
	
});











$('#searchByEmailBtnPanel').click(function(){
		
				var EmailSearch = $('#searchByEmailPanel').val();
				var dataString = 'EmailSearch='+ EmailSearch +'&searchByEmailBtnPanel=true';
			 
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				  dataType:"Json",
				  success: function(data) {
					  
					 
					  if (data.Status == 'success'){
						  
						  
						  
						  $('#containerUser').html("");
					
	
								
								var idUser  	= data.idUser;
								var Email 		= data.Email;
								var Status 		= data.Status;
								var FirstName 	= data.FirstName;
								var LastName 	= data.LastName;
								var Phone 		= data.Phone;
								var ImageUser 	= data.ImageUser;
								var Twitter 	= data.Twitter;
								var FB 			= data.FB;
								var User_Type_Id= data.User_Type_Id;
								var numRows		= data.numRows;
								
								
								var type_User = ""; 
								
					
							for (var i in idUser) {
								
								if(User_Type_Id[i] == 1){
									type_User = "Web User";
									}else{
									type_User = "Administrator";
										}
								$('#containerUser').append(
								
								 '<div class="lineMembersTeam" onclick="openModalEditLine('+idUser[i]+',\''+FirstName[i]+'\',\''+LastName[i]+'\',\''+Email[i]+'\',\''+Phone[i]+'\',\''+ImageUser[i]+'\',\''+Twitter[i]+'\',\''+FB[i]+'\',\''+User_Type_Id[i]+'\')">'+
                        			'<div class="leftLineMembers">'+
                                    	'<img src="'+Url+'assets/Images/Users/'+ImageUser[i]+'" alt="img Team">'+ 
                                    '</div>'+
                                    '<div class="centerLineMembers">'+
                                    	'<div class="nameBoxMembers"><p>'+FirstName[i]+'  '+LastName[i]+' </p> </div>'+
                                        '<div class="UniBoxMembers"> <p>'+type_User+'</p> </div>'+
								    '</div>'+
                                    '<div class="rightLineMembers linkToInfoTeam" data-ajax="false">'+
                                  			'<a href="#updateAdmin" onclick="openModalEdit('+idUser[i]+',\''+FirstName[i]+'\',\''+LastName[i]+'\',\''+Email[i]+'\',\''+Phone[i]+'\',\''+ImageUser[i]+'\',\''+Twitter[i]+'\',\''+FB[i]+'\',\''+User_Type_Id[i]+'\')"  data-transition="slideup"><img src="Images/FordwardBlack.png" alt="iconNext" /></a>'+
                                    '</div>	'+
                         		'</div>'
									
                                
					 		   );
			
                 		 } // End form loop
				  
					
				 
				 
					  }else{
						  
						  alert('No result found');
						  
						  }
						 
				  }
			});
			return false;
   
	
});









	

$('#searchByRoleBtnPanel').click(function(){
		
				var roleSearch = $('#searchByRolePanel').val();
				var dataString = 'roleSearch='+ roleSearch +'&searchByRoleBtnPanel=true';
			 
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				  dataType:"Json",
				  success: function(data) {
					  
					 
					  if (data.Status == 'success'){
						   $('#containerUser').html("");
					
	
								
								var idUser  	= data.idUser;
								var Email 		= data.Email;
								var Status 		= data.Status;
								var FirstName 	= data.FirstName;
								var LastName 	= data.LastName;
								var Phone 		= data.Phone;
								var ImageUser 	= data.ImageUser;
								var Twitter 	= data.Twitter;
								var FB 			= data.FB;
								var User_Type_Id= data.User_Type_Id;
								var numRows		= data.numRows;
								
								
								var type_User = ""; 
								
					
							for (var i in idUser) {
								
								if(User_Type_Id[i] == 1){
									type_User = "Web User";
									}else{
									type_User = "Administrator";
										}
								$('#containerUser').append(
								
								 '<div class="lineMembersTeam" onclick="openModalEditLine('+idUser[i]+',\''+FirstName[i]+'\',\''+LastName[i]+'\',\''+Email[i]+'\',\''+Phone[i]+'\',\''+ImageUser[i]+'\',\''+Twitter[i]+'\',\''+FB[i]+'\',\''+User_Type_Id[i]+'\')">'+
                        			'<div class="leftLineMembers">'+
                                    	'<img src="'+Url+'assets/Images/Users/'+ImageUser[i]+'" alt="img Team">'+ 
                                    '</div>'+
                                    '<div class="centerLineMembers">'+
                                    	'<div class="nameBoxMembers"><p>'+FirstName[i]+'  '+LastName[i]+' </p> </div>'+
                                        '<div class="UniBoxMembers"> <p>'+type_User+'</p> </div>'+
								    '</div>'+
                                    '<div class="rightLineMembers linkToInfoTeam" data-ajax="false">'+
                                  			'<a href="#updateAdmin" onclick="openModalEdit('+idUser[i]+',\''+FirstName[i]+'\',\''+LastName[i]+'\',\''+Email[i]+'\',\''+Phone[i]+'\',\''+ImageUser[i]+'\',\''+Twitter[i]+'\',\''+FB[i]+'\',\''+User_Type_Id[i]+'\')"  data-transition="slideup"><img src="Images/FordwardBlack.png" alt="iconNext" /></a>'+
                                    '</div>	'+
                         		'</div>'
									
                                
					 		   );
			
                 		 } // End form loop
				  
					
				 
				 
					  }else{
						  
						  alert('No results found');
						  
						  }
						 
				  }
			});
			return false;
   
	
});







$('#nameTagSearch').click(function(){
	
	$('#contSerchByNamePanel').hide();
	$('#contSerchByLastPanel').hide();
	$('#contSerchByEmailPanel').hide();
	$('#contSerchByRolePanel').hide();
	
	if(searchByName == true){
		
		$('#divSearchPanel').css('height','100px');
		setTimeout(function(){
			$('#contSerchByNamePanel').show();
			}, 500);
		
		searchByName = false;
	}else{
		$('#contSerchByNamePanel').hide();
		$('#divSearchPanel').css('height','0px');
		searchByName = true;
	}
	
	
});


$('#lastTagSearch').click(function(){
	
	$('#contSerchByNamePanel').hide();
	$('#contSerchByLastPanel').hide();
	$('#contSerchByEmailPanel').hide();
	$('#contSerchByRolePanel').hide();
	
	if(searchByLast == true){
		
		$('#divSearchPanel').css('height','100px');
		setTimeout(function(){
			$('#contSerchByLastPanel').show();
			}, 500);
		
		searchByLast = false;
	}else{
		$('#contSerchByLastPanel').hide();
		$('#divSearchPanel').css('height','0px');
		searchByLast = true;
	}
	
	
});


$('#emailTagSearch').click(function(){
	
	$('#contSerchByNamePanel').hide();
	$('#contSerchByLastPanel').hide();
	$('#contSerchByEmailPanel').hide();
	$('#contSerchByRolePanel').hide();
	
	if(searchByEmail == true){
		
		$('#divSearchPanel').css('height','100px');
		setTimeout(function(){
			$('#contSerchByEmailPanel').show();
			}, 500);
		
		searchByEmail = false;
	}else{
		$('#contSerchByEmailPanel').hide();
		$('#divSearchPanel').css('height','0px');
		searchByEmail = true;
	}
	
	
});




$('#roleTagSearch').click(function(){
	
	$('#contSerchByNamePanel').hide();
	$('#contSerchByLastPanel').hide();
	$('#contSerchByEmailPanel').hide();
	$('#contSerchByRolePanel').hide();
	
	
	if(searchByRole == true){
		
		$('#divSearchPanel').css('height','100px');
		setTimeout(function(){
			$('#contSerchByRolePanel').show();
			}, 500);
		
		searchByRole = false;
	}else{
		$('#contSerchByRolePanel').hide();
		$('#divSearchPanel').css('height','0px');
		searchByRole = true;
	}
	
	
});



var openModalEdit = function(idUser,FirstName,LastName,Email,Phone,ImageUser,Twitter,FB,User_Type_Id){
	
	
		displayTypeUserSelect(User_Type_Id);
		
		$('#FirstNameToUpdate').val(FirstName);
		$('#LastNameToUpdate').val(LastName);
		$('#idUserToUpdate').val(idUser);
		
		$('#EmailToUpdate').val(Email);
		$('#PhoneToUpdate').val(Phone);
		$('#TwitterToUpdate').val(Twitter);
		$('#FBToUpdate').val(FB);  
			   
		 $('#imgUserUpdate').attr('src', Url+'assets/Images/Users/'+ImageUser+' ');                         
                                           
	
	
	}
	
	
	
var openModalEditLine = function(idUser,FirstName,LastName,Email,Phone,ImageUser,Twitter,FB,User_Type_Id){
	
	window.location = "admin.html#updateAdmin"
	
		displayTypeUserSelect(User_Type_Id);
		
		$('#FirstNameToUpdate').val(FirstName);
		$('#LastNameToUpdate').val(LastName);
		$('#idUserToUpdate').val(idUser);
		
		$('#EmailToUpdate').val(Email);
		$('#PhoneToUpdate').val(Phone);
		$('#TwitterToUpdate').val(Twitter);
		$('#FBToUpdate').val(FB);  
			   
		 $('#imgUserUpdate').attr('src',Url+'assets/Images/Users/'+ImageUser+' ');                         
                                           
	
	
	}
	
var closeUpdateModal = function(){
	
	$('#updateUserEdit').css('height','0%');
	setTimeout(function(){
		$('#updateUserEdit').css('display','none');
		},400)
}



	
var displayTypeUserSelect = function(User_Type){
	
	
		var dataString = 'displayTypeUserSelect=true';
			 
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				  dataType:"Json",
				  success: function(data) {
					  
					 
					  if (data.Status == 'success'){
						  
						  $("#searchByRolePanel2 option").remove();
						  
						
								
								var User_Type_Id  	= data.User_Type_Id;
								var Usert_Type_Description = data.Usert_Type_Description;
								
								
								var selected;
					
             				
							
								for (var i in User_Type_Id) {
								
								if(User_Type_Id[i] == User_Type){
										 selected = "selected";
										 
										  $(".ui-select").html(Usert_Type_Description[i]);
										  $("select").css('width','100%');
										  $("select").css('height','30px');	
										  $("select").css('margin-top','10px');	
										  
									}else{
										 selected = "";
									}
									
								$('#searchByRolePanel2').append(
						
                        			'<option value="'+User_Type_Id[i]+'" '+selected+'>'+Usert_Type_Description[i]+'</option>'  
					 		    );
								
									
			
                 		 } // End form loop
				  
					
				 
				 
					  }else{
						  
						  alert('No results found');
						  
						  }
						 
				  }
			});
			return false;
 
	
	
}




$('#buttonUpdateUser').click(function(){
	
	var IdUser 		= $('#idUserToUpdate').val();
	var firstName 	= $('#FirstNameToUpdate').val();
	var LastName 	= $('#LastNameToUpdate').val();
	var Email 		= $('#EmailToUpdate').val();
	var Phone 		= $('#PhoneToUpdate').val();
	var Twitter 	= $('#TwitterToUpdate').val();
	var Facebook 	= $('#FBToUpdate').val();
	var User_Type	= $('#searchByRolePanel2').val();
	
	
	
		
				var dataString = 'IdUser='+ IdUser + '&firstName='+ firstName + '&LastName='+ LastName + '&Email='+ Email + '&Phone='+ Phone +'&Twitter='+ Twitter + '&Facebook='+ Facebook + '&User_Type='+ User_Type +'&updateUser=true';
			 
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				  dataType:"Json",
				  success: function(data) {
					  
					 
					  if (data.Status == 'success'){
						  
						  displayAllMembers();
						  closeUpdateModal();
						  
						  
					  }else{
						  
						  alert('No rows affected');
						  
						  }
						 
				  }
			});
			return false;
	
	
});