/// GLOBAL VARIABLES


var searchByTeamName = true;
var searchByLeader = true;
var idUser;



	$(document).ready(function(e) {
	
	
				idUser	= window.localStorage["idUser"];
      			displayCartToCart(idUser);
				displayMemberOnPanel(idUser);
				
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
								
								var NameLeader 	= data.NameLeader;
								var LastLeader 	= data.LastLeader;
						
						
							for (var i in idTeam) {
								$('#containerUser').append(
								
								 '<div class="lineMembersTeam" onclick="openModalEditLine('+idTeam[i]+',\''+NameTeam[i]+'\',\''+Description[i]+'\',\''+URL[i]+'\',\''+Leader[i]+'\',\''+Remarks[i]+'\','+ParentID[i]+')" >'+
                                    '<div class="centerLineMembers">'+
                                    	'<div class="nameBoxTeam"><div><p>'+NameTeam[i]+'</p></div> </div>'+
                                        '<div class="UniBoxLeader"><div><p>'+Description[i]+'</p></div> </div>'+
                                 	'</div>'+
                                    '<div class="rightLineMembers">'+
                                  		'<a href="#updateTeam" onclick="openModalEdit('+idTeam[i]+',\''+NameTeam[i]+'\',\''+Description[i]+'\',\''+URL[i]+'\',\''+Leader[i]+'\',\''+Remarks[i]+'\','+ParentID[i]+')" data-transition="slideup"><img src="Images/FordwardBlack.png" alt="iconNext" /></a>'+
                                    '</div>'+
                         		'</div>'
									
                                
					 		   );
							   
							   
							   $('#searchByLeaderPanel').append( 
							   '<option value="'+Leader[i]+'">'+NameLeader[i]+' '+LastLeader[i]+'</option>'
							   );
							   
			
                 		 } // End form loop
				  
					StreachWindows();
				 		
				 
					  }else{
						  
					
						StreachWindows();
						
						  
						 
						  
						  }
						 
				  }
			});
			return false;
   
			
			
   
	
});






var openModalEdit = function(idTeam,NameTeam,Description,URL,Leader,Remarks,ParentID){
	

	
					
		$('#NameTeam').val(NameTeam);		
		$('#DescriptionTeam').val(Description);
		$('#URLTeam').val(URL);
		$('#RemarkTeam').val(Remarks);
		$('#idTeamInput').val(idTeam);
	
		displayUserTeamToEdit(idTeam);
	    displayMemberOnPanelToEdit(idTeam);
	
	
	
	}
	

var openModalEditLine = function(idTeam,NameTeam,Description,URL,Leader,Remarks,ParentID){
	

	window.location = "adminTeam.html#updateTeam";
					
		$('#NameTeam').val(NameTeam);		
		$('#DescriptionTeam').val(Description);
		$('#URLTeam').val(URL);
		$('#RemarkTeam').val(Remarks);
		$('#idTeamInput').val(idTeam);
	
		displayUserTeamToEdit(idTeam);
	    displayMemberOnPanelToEdit(idTeam);
	
	
	
	}
	
	
var closeUpdateModal = function(){
	
	$('#updateUserEdit').css('height','0%');
	setTimeout(function(){
		$('#updateUserEdit').css('display','none');
		},400)
}
	
	
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
						
						
							for (var i in idTeam) {
								$('#containerUser').append(
								
								 '<div class="lineMembersTeam" onclick="openModalEditLine('+idTeam[i]+',\''+NameTeam[i]+'\',\''+Description[i]+'\',\''+URL[i]+'\',\''+Leader[i]+'\',\''+Remarks[i]+'\','+ParentID[i]+')">'+
                                    '<div class="centerLineMembers">'+
                                    	'<div class="nameBoxTeam"><div><p>'+NameTeam[i]+'</p></div> </div>'+
                                        '<div class="UniBoxLeader"><div><p>'+Description[i]+'</p></div> </div>'+
                                 	'</div>'+
                                    '<div class="rightLineMembers">'+
                                  		'<a href="#updateTeam" onclick="openModalEdit('+idTeam[i]+',\''+NameTeam[i]+'\',\''+Description[i]+'\',\''+URL[i]+'\',\''+Leader[i]+'\',\''+Remarks[i]+'\','+ParentID[i]+')" data-transition="slideup"><img src="Images/FordwardBlack.png" alt="iconNext" /></a>'+
                                    '</div>'+
                         		'</div>'
									
                                
					 		   );
			
                 		 } // End form loop
				  
					StreachWindows();
				 
				 
					  }else{
						 
						  alert('No results found');
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
		alert("Team Name needs to be completed");
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
						
						
							for (var i in idTeam) {
								$('#containerUser').append(
								
								 '<div class="lineMembersTeam" onclick="openModalEditLine('+idTeam[i]+',\''+NameTeam[i]+'\',\''+Description[i]+'\',\''+URL[i]+'\',\''+Leader[i]+'\',\''+Remarks[i]+'\','+ParentID[i]+')">'+
                                    '<div class="centerLineMembers">'+
                                    	'<div class="nameBoxTeam"><div><p>'+NameTeam[i]+'</p></div> </div>'+
                                        '<div class="UniBoxLeader"><div><p>'+Description[i]+'</p></div> </div>'+
                                 	'</div>'+
                                    '<div class="rightLineMembers">'+
                                  		'<a href="#updateTeam" onclick="openModalEdit('+idTeam[i]+',\''+NameTeam[i]+'\',\''+Description[i]+'\',\''+URL[i]+'\',\''+Leader[i]+'\',\''+Remarks[i]+'\','+ParentID[i]+')" data-transition="slideup"><img src="Images/FordwardBlack.png" alt="iconNext" /></a>'+
                                    '</div>'+
                         		'</div>'
									
                                
					 		   );
			
                 		 } // End form loop
				  
					StreachWindows();
				 
				 
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





var displayMemberOnPanel = function(idUser){
	
	
	
		var dataString = 'idUser='+idUser+'&displayMemberOnPanel=true';
			 
			
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				  dataType:"Json",
				  success: function(data) {
					  
					 
					  if (data.Status == 'success'){
						  
						  
						  
						  $('#containerSelectMembers').html("");
					
								var idUserToSelect  	 = data.idUser;
								var Email 		 = data.Email;
								var Status 		 = data.Status;
								var FirstName 	 = data.FirstName;
								var LastName 	 = data.LastName;
								var ImageUser 	 = data.ImageUser;
								var User_Type_Id = data.User_Type_Id;
						
						
							for (var i in idUserToSelect) {
								$('#containerSelectMembers').append(
								
								'<div class="lineUserToSelect">'+
                            		'<div class="leftUserToSelet">'+
                                	'<div class="imgUserAddTeam">'+
                                     '<img src= "'+Url+'assets/Images/Users/'+ImageUser[i]+'" alt="iconUSer" />'+
                                    '</div>'+
                                    '<div class="infoUserAddMember">'+
                                    	'<p>'+FirstName[i]+'  '+LastName[i]+' </p>'+
                                    '</div>'+
                                
                                '</div>'+
                                '<div class="rightUserToSelet">'+
                                	'<a href="javascript:selectUserToTeam('+idUserToSelect[i]+','+idUser+')"><img src="Images/addMemberTeamIcon.png" alt="icon Add" /></a>'+
                                '</div>'+
                            '</div> '
                        	  );
			
                 		 } // End form loop
				  
					StreachWindows();
				 
				 
					  }else{
						 
						  alert('No result found');
						    $('#containerUser').html("");
							StreachWindows();
						  }
						  
						 
				  }
			});
			return false;
	
}




$('#searchBtnPanel').click(function(){
	
	
	var nameUser = $('#searchPanelUser').val();
	
	var dataString = 'nameUser=' + nameUser + '&displaySearchMemberOnPanel=true';
			 
			
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				  dataType:"Json",
				  success: function(data) {
					  
					 
					  if (data.Status == 'success'){
						  
						  
						  
						  $('#containerSelectMembers').html("");
					
								var idUserToSelect  	 = data.idUser;
								var Email 		 = data.Email;
								var Status 		 = data.Status;
								var FirstName 	 = data.FirstName;
								var LastName 	 = data.LastName;
								var ImageUser 	 = data.ImageUser;
								var User_Type_Id = data.User_Type_Id;
						
						
							for (var i in idUserToSelect) {
								$('#containerSelectMembers').append(
								
								'<div class="lineUserToSelect">'+
                            		'<div class="leftUserToSelet">'+
                                	'<div class="imgUserAddTeam">'+
                                     '<img src="'+Url+'assets/Images/Users/'+ImageUser[i]+'" alt="iconUSer" />'+
                                    '</div>'+
                                    '<div class="infoUserAddMember">'+
                                    	'<p>'+FirstName[i]+'  '+LastName[i]+' </p>'+
                                    '</div>'+
                                
                                '</div>'+
                                '<div class="rightUserToSelet">'+
                                	'<a href="javascript:selectUserToTeam('+idUserToSelect[i]+','+idUser+')"><img src="Images/addMemberTeamIcon.png" alt="icon Add" /></a>'+
                                '</div>'+
                            '</div> '
                        	  );
			
                 		 } // End form loop
				  
					StreachWindows();
				 
				 
					  }else{
						 
					
						    $('#containerSelectMembers').html("");
							StreachWindows();
						  }
						 
				  }
			});
			return false;
	
	
	
	});




var selectUserToTeam = function(idUserToSelect,idUser){
	
	
	
	var dataString = 'idUserToSelect=' + idUserToSelect + '&idUser=' + idUser +'&addMemberToCartMember=true';
			 
			
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				  dataType:"Json",
				  success: function(data) {
					  
					 
					  if (data.Status == 'success'){
						  
						  
						  
						  $('#containerLoopUserSelected').html("");
					
								var CartMemberShip_Id  	 = data.CartMemberShip_Id;
								var idUserLoged 		 = data.idUserLoged;
								var idUserSelected 		 = data.idUserSelected;
								var FirstName 			 = data.FirstName;
								var LastName 			 = data.LastName;
								
						
						
							for (var i in CartMemberShip_Id) {
								
								$('#containerLoopUserSelected').append(
								
								  '<div class="lineMemberSelected">'+
                                    '<div class="leftLineMemberSelected"><input type="radio" value="'+idUserSelected[i]+'" name="userLeader" id="leaderUserSelected" /></div>'+
                                   ' <div class="centerLineMemberSelected"><p>'+FirstName[i]+'  '+LastName[i] +'</p></div>'+
                                    '<a href="javascript:deleteMemberToCart('+CartMemberShip_Id[i]+','+idUser+')"><div class="rightLineMemberSelected"><img src="Images/trash.png" alt="trash Icon" ></div></a>'+
                                ' </div>'
                                
                              
                        	  );
			
                 		 } // End form loop
				  
					
				 		displayMemberOnPanel(idUser);
						StreachWindows();
				 
					  }else{
						 
					
						    $('#containerSelectMembers').html("");
							StreachWindows();
						  }					 
				  }
			});
			return false;
	
	
	} //  end function selectUserTeam
	
	
	
	
	
	
	
	
var deleteMemberToCart = function(CartMemberShip_Id,idUser){
	
	
	
		var dataString = 'CartMemberShip_Id=' + CartMemberShip_Id + '&idUser=' + idUser +'&deleteMemberToCartMember=true';
			 
			
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				  dataType:"Json",
				  success: function(data) {
					  
					 
					  if (data.Status == 'success'){
						  
						  
						  
						  $('#containerLoopUserSelected').html("");
					
								var CartMemberShip_Id  	 = data.CartMemberShip_Id;
								var idUserLoged 		 = data.idUserLoged;
								var idUserSelected 		 = data.idUserSelected;
								var FirstName 			 = data.FirstName;
								var LastName 			 = data.LastName;
								
						
						
							for (var i in CartMemberShip_Id) {
								
								$('#containerLoopUserSelected').append(
								
								  '<div class="lineMemberSelected">'+
                                    '<div class="leftLineMemberSelected"><input type="radio" value="'+idUserSelected[i]+'" name="userLeader" id="leaderUserSelected" /></div>'+
                                   ' <div class="centerLineMemberSelected"><p>'+FirstName[i]+'  '+LastName[i] +'</p></div>'+
                                    '<a href="javascript:deleteMemberToCart('+CartMemberShip_Id[i]+','+idUser+')"><div class="rightLineMemberSelected"><img src="Images/trash.png" alt="trash Icon" ></div></a>'+
                                ' </div>'
                                
                              
                        	  );
			
                 		 } // End form loop
				  
					
						 displayMemberOnPanel(idUser);
						 StreachWindows();
				 
					  }else{
						 
					
						    $('#containerSelectMembers').html("");
							StreachWindows();
						  }					 
				  }
			});
			return false;
	
	
	}
	
	
	
var displayCartToCart = function(idUser){
	
	
		var dataString = 'idUser=' + idUser +'&displayUserCart=true';
			 
			
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				  dataType:"Json",
				  success: function(data) {
					  
					 
					  if (data.Status == 'success'){
						  
						  $('#containerLoopUserSelected').html("");
					
								var CartMemberShip_Id  	 = data.CartMemberShip_Id;
								var idUserLoged 		 = data.idUserLoged;
								var idUserSelected 		 = data.idUserSelected;
								var FirstName 			 = data.FirstName;
								var LastName 			 = data.LastName;
								
						
						
							for (var i in CartMemberShip_Id) {
								
								$('#containerLoopUserSelected').append(
								
								  '<div class="lineMemberSelected">'+
                                    '<div class="leftLineMemberSelected"><input type="radio" value="'+idUserSelected[i]+'" name="userLeader" id="leaderUserSelected" /></div>'+
                                   ' <div class="centerLineMemberSelected"><p>'+FirstName[i]+'  '+LastName[i] +'</p></div>'+
                                    '<a href="javascript:deleteMemberToCart('+CartMemberShip_Id[i]+','+idUser+')"><div class="rightLineMemberSelected"><img src="Images/trash.png" alt="trash Icon" ></div></a>'+
                                ' </div>'
                                
                              
                        	  );
			
                 		 } // End form loop
				  
					StreachWindows();
				 
				 
					  }else{
						
						    $('#containerSelectMembers').html("");
							StreachWindows();
						  }					 
				  }
			});
			return false;
	
	
	}
	
	
	
	
	
$('#addTeamBtn').click(function(){
		
	
	
	var NameTeam = $('#NameTeam').val();
	var DescriptionTeam = $('#DescriptionTeam').val();
	var URLTeam = $('#URLTeam').val();
	var RemarkTeam = $('#RemarkTeam').val();
	var Leader = $('input:radio[name=userLeader]:checked').val();
	
	
	
	if(NameTeam == ""){
		
		alert("Name field is required");
		 $('#NameTeam').focus();
		 
		}else if(Leader == "" || Leader==null){
			
			alert("Please select a team leader");
		 	$('#NameTeam').focus();
		}else{
			
			
					
		var dataString = 'idUser=' + idUser + '&NameTeam=' + NameTeam +'&DescriptionTeam=' + DescriptionTeam + '&URLTeam=' + URLTeam + '&RemarkTeam=' + RemarkTeam + '&Leader=' + Leader +'&CreateTeamParent=true';
			 
			
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				  dataType:"Json",
				  success: function(data) {
					  
					 
					  if (data.Status == 'success'){
						  
						 $('#NameTeam').val("");
						$('#DescriptionTeam').val("");
						$('#URLTeam').val("");
						$('#RemarkTeam').val("");
						  
						displayCartToCart(idUser);
						displayMemberOnPanel(idUser);
						
						$('#NameTeam').val("");
						$('#DescriptionTeam').val("");
						$('#URLTeam').val("");
						$('#RemarkTeam').val("");
						
						alert("Team successfully created");
						
						 
					  }else if(data.Status == 'repeated'){
						
						 alert("This name is repeated, choose another different");
					StreachWindows();
					  }else{
						  StreachWindows();
						  
						  }					 
				  }
			});
			return false;
			
			
			
			
			} // End else condition
		
		
		
		
});
	
	
	
	
	
	
	
	
var displayUserTeamToEdit= function(idTeam){
	
	
		var dataString = 'idTeam=' + idTeam +'&displayMemberTeamToEdit=true';
			 
			
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				  dataType:"Json",
				  success: function(data) {
					  
					 
					  if (data.Status == 'success'){
						  
						  $('#containerLoopUserSelected').html("");
						  
								var idMemberShip  = data.idMemberShip;
								var idTeam 		  = data.idTeam;
								var idUser 		  = data.idUser;
								var FirstName 	  = data.FirstName;
								var LastName 	  = data.LastName;
								var Leader 	  	= data.Leader;
								var checked;
						
							for (var i in idMemberShip) {
								
								if(idUser[i] == Leader[0]){
									checked = 'checked';
								}else{
									checked = '';
								}
								
								$('#containerLoopUserSelected').append(
								
								  '<div class="lineMemberSelected">'+
                                    '<div class="leftLineMemberSelected"><input type="radio" value="'+idUser[i]+'" name="userLeader2" id="leaderUserSelected" '+checked+' /></div>'+
                                   ' <div class="centerLineMemberSelected"><p>'+FirstName[i]+'  '+LastName[i] +'</p></div>'+
                                    '<a href="javascript:deleteMemberToUpdateCart('+idMemberShip[i]+','+idTeam[i]+','+idUser[i]+')"><div class="rightLineMemberSelected"><img src="Images/trash.png" alt="trash Icon" ></div></a>'+
                                ' </div>'
                                
                              
                        	  );
			
                 		 } // End form loop
				  StreachWindows();
					
				 
				 
					  }else{
						
						    $('#containerSelectMembers').html("");
							StreachWindows();
						  }					 
				  }
			});
			return false;
	
	
	}
	
	
	
	var deleteMemberToUpdateCart = function(idMemberShip,idTeam,idUser){
		
		
		var Leader = $('input:radio[name=userLeader2]:checked').val();
		
		var dataString = 'idMemberShip=' + idMemberShip +'&deleteMemberTeamToUpdateCart=true';
			 
			
			if(Leader == idUser){
				alert("Select another leader before deleting this member");	
			}else{
			
					$.ajax({
						  type: "POST",
						  url: Url+'PHP/FunctionsMobile.php',
						  data: dataString,
						  dataType:"Json",
						  success: function(data) {
							   if (data.Status == 'success'){
						
								  
								  displayMemberOnPanelToEdit(idTeam);
								  displayUserTeamToEdit(idTeam);
								  StreachWindows();
								
							  }else{
								
									alert("Error deleting User, try again");
									StreachWindows();
								  }					 
						  }
					});
					return false;
	
		
		
			} // end else condition
		
		
		}
	
	
	
	
	
	
	
	

var displayMemberOnPanelToEdit = function(idTeam){
	
	
	
		var dataString = 'idTeam='+idTeam+'&displayMemberOnPanelToEdit=true';
			 
			
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				  dataType:"Json",
				  success: function(data) {
					  
					 
					  if (data.Status == 'success'){
						  
						  
						  
						  $('#containerSelectMembersToEdit').html("");
					
								var idUserToSelect  	 = data.idUser;
								var Email 		 = data.Email;
								var Status 		 = data.Status;
								var FirstName 	 = data.FirstName;
								var LastName 	 = data.LastName;
								var ImageUser 	 = data.ImageUser;
								var User_Type_Id = data.User_Type_Id;
						
						
							for (var i in idUserToSelect) {
								$('#containerSelectMembersToEdit').append(
								
								'<div class="lineUserToSelect">'+
                            		'<div class="leftUserToSelet">'+
                                	'<div class="imgUserAddTeam">'+
                                     '<img src="'+Url+'assets/Images/Users/'+ImageUser[i]+'" alt="iconUSer" />'+
                                    '</div>'+
                                    '<div class="infoUserAddMember">'+
                                    	'<p>'+FirstName[i]+'  '+LastName[i]+' </p>'+
                                    '</div>'+
                                
                                '</div>'+
                                '<div class="rightUserToSelet">'+
                                	'<a href="javascript:selectUserToTeamEdit('+idUserToSelect[i]+','+idTeam+')"><img src="Images/addMemberTeamIcon.png" alt="icon Add" /></a>'+
                                '</div>'+
                            '</div> '
                        	  );
			
                 		 } // End form loop
				  
					StreachWindows();
				 
				 
					  }else{
						 
						  alert('No results found');
						    $('#containerSelectMembersToEdit').html("");
							StreachWindows();
						  }
						 
				  }
			});
			return false;
	
}

	
	
	
var	selectUserToTeamEdit = function(idUserToSelect,idTeam){
		
		var dataString = 'idTeam='+idTeam+'&idUserToSelect='+idUserToSelect+'&selectUserToTeamEdit=true';
			 
			
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				  dataType:"Json",
				  success: function(data) {
					  
					 
					  if (data.Status == 'success'){
						  
						  displayMemberOnPanelToEdit(idTeam);
				 		  displayUserTeamToEdit(idTeam);
						  StreachWindows();
				 
					  }else{
						 
						  alert('No result found');
						  StreachWindows();
						    
						  }
						 
				  }
			});
			return false;
		
}












$('#searchBtnPanelUpdate').click(function(){
	
	
	var nameUser = $('#searchPanelUserUpdate').val();
	var idTeam = $('#idTeamInput').val();
	
	var dataString = 'nameUser=' + nameUser + '&idTeam=' + idTeam +'&displaySearchMemberOnPanelToUpdate=true';

			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				  dataType:"Json",
				  success: function(data) {
					  
					 
					  if (data.Status == 'success'){
						  
						  
						  
						  $('#containerSelectMembersToEdit').html("");
					
								var idUserToSelect  	 = data.idUser;
								var Email 		 = data.Email;
								var Status 		 = data.Status;
								var FirstName 	 = data.FirstName;
								var LastName 	 = data.LastName;
								var ImageUser 	 = data.ImageUser;
								var User_Type_Id = data.User_Type_Id;
						
						
						for (var i in idUserToSelect) {
								$('#containerSelectMembersToEdit').append(
								
								'<div class="lineUserToSelect">'+
                            		'<div class="leftUserToSelet">'+
                                	'<div class="imgUserAddTeam">'+
                                     '<img src="'+Url+'assets/Images/Users/'+ImageUser[i]+'" alt="iconUSer" />'+
                                    '</div>'+
                                    '<div class="infoUserAddMember">'+
                                    	'<p>'+FirstName[i]+'  '+LastName[i]+' </p>'+
                                    '</div>'+
                                
                                '</div>'+
                                '<div class="rightUserToSelet">'+
                                	'<a href="javascript:selectUserToTeamEdit('+idUserToSelect[i]+','+idTeam+')"><img src="Images/addMemberTeamIcon.png" alt="icon Add" /></a>'+
                                '</div>'+
                            '</div> '
                        	  );
			
                 		 } // End form loop
				  StreachWindows();
					
				 
				 
					  }else{
						 
					
						    $('#containerSelectMembersToEdit').html("");
							StreachWindows();
						  }
						 
				  }
			});
			return false;
	
	
	
	});











$('#UpdateTeamBtn').click(function(){
	
	
	var NameTeam = $('#NameTeam').val();
	var DescriptionTeam = $('#DescriptionTeam').val();
	var URLTeam = $('#URLTeam').val();
	var RemarkTeam = $('#RemarkTeam').val();
	var idTeamInput = $('#idTeamInput').val();
	var Leader = $('input:radio[name=userLeader2]:checked').val();
             
	
	
	
	var dataString = 'NameTeam=' + NameTeam + '&DescriptionTeam=' + DescriptionTeam +'&URLTeam=' + URLTeam + '&RemarkTeam=' + RemarkTeam +'&idTeamInput=' + idTeamInput +'&Leader=' + Leader +'&UpdateTeamAdmin=true';

			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				  dataType:"Json",
				  success: function(data) {
					  
					 
					  if (data.Status == 'success'){
						  closeUpdateModal();
						  DisplayGroupAfterUpdate();
						  StreachWindows();
						
					  }else{
					
						   closeUpdateModal();
						   StreachWindows();
						  }
						 
				  }
			});
			return false;
	
	
	
	});






var DisplayGroupAfterUpdate = function(){
	
	
	
		var dataString = '&DisplayGroupsAdmin=true';
			 
			
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
								
								var NameLeader 	= data.NameLeader;
								var LastLeader 	= data.LastLeader;
						
						
							for (var i in idTeam) {
								$('#containerUser').append(
								
								 '<div class="lineMembersTeam" onclick="openModalEditLine('+idTeam[i]+',\''+NameTeam[i]+'\',\''+Description[i]+'\',\''+URL[i]+'\',\''+Leader[i]+'\',\''+Remarks[i]+'\','+ParentID[i]+')">'+
                                    '<div class="centerLineMembers">'+
                                    	'<div class="nameBoxTeam"><div><p>'+NameTeam[i]+'</p></div> </div>'+
                                        '<div class="UniBoxLeader"><div><p>'+Description[i]+'</p></div> </div>'+
                                 	'</div>'+
                                    '<div class="rightLineMembers">'+
                                  		'<a href="#updateTeam" onclick="openModalEdit('+idTeam[i]+',\''+NameTeam[i]+'\',\''+Description[i]+'\',\''+URL[i]+'\',\''+Leader[i]+'\',\''+Remarks[i]+'\','+ParentID[i]+')" data-transition="slideup"><img src="Images/FordwardBlack.png" alt="iconNext" /></a>'+
                                    '</div>'+
                         		'</div>'
									
                                
					 		   );
							   
							   
							   $('#searchByLeaderPanel').append( 
							   '<option value="'+Leader[i]+'">'+NameLeader[i]+' '+LastLeader[i]+'</option>'
							   );
							   
			
                 		 } // End form loop
				  
					StreachWindows();
				 		
				 
					  }else{
						  
					
						  StreachWindows();
						 
						  
						  }
						 
				  }
			});
			return false;
	
	
	}



var StreachWindows = function(){
	
	$('body').css('height','100%');
	$('body').css('min-height','100%');
	
	$('html').css('height','100%');
	$('html').css('min-height','100%');
	

	}

	