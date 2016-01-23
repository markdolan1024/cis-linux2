/// GLOBAL VARIABLES


		var idUser		 =	window.localStorage.getItem("idUser");
		var Email		 =	window.localStorage.getItem("Email");
		var FirstName	 =	window.localStorage.getItem("FirstName");
		var LastName	 =	window.localStorage.getItem("LastName");
		var ImageUser	 =	window.localStorage.getItem("ImageUser");
		var Phone		 =	window.localStorage.getItem("Phone");
		var Permissions	 =	window.localStorage.getItem("Permissions");
		var User_Type_Id =	window.localStorage.getItem("Usert_Type");

		var DropArray = [];

/// Functions move between pages on form file.



$(document).ready(function(e) {
	
	
	var dataString = 'idUser='+idUser+'&displayProjectRelated==true';
				 
				
				$.ajax({
					  type: "POST",
					  url: Url+'PHP/FunctionsMobileForm.php',
					  data: dataString,
					  dataType:"Json",
					  success: function(data) {
						  
						  
						  // Stream Info
						  var Stream_Id				= data.Stream_Id;
						  var Stream_Name			= data.Stream_Name;
						  var Stream_Description	= data.Stream_Description;
						  var Water_body			= data.Water_body;
						  var Lat					= data.Lat;
						  var Lon					= data.Lon;
						  var DateStream_Mysql		= data.DateStream_Mysql;
						  var DateStream			= data.DateStream;
						  var Time					= data.Time;
						  var Leader_Id				= data.Leader_Id;
						  var Stream_Type			= data.Stream_Type;
							
							
					 	 // Info Team
							
						  var idTeam		= data.idTeam;
						  var Name			= data.Name;
						  var Description	= data.Description;
						  var URL			= data.URL;
						  var TeamImg		= data.TeamImg;
						  var Remarks		= data.Remarks;
						  var ParentID		= data.ParentID;
						  
						  
						  // Info User
							
						  var idUser		= data.idUser;
						  var Email			= data.Email;
						  var FirstName		= data.FirstName;
						  var LastName		= data.LastName;
						  var Phone			= data.Phone;
						  var ImageUser		= data.ImageUser;
						  var Twitter		= data.Twitter;
						  var FB			= data.FB;
						  var User_Type_Id	= data.User_Type_Id;
						  
					
						  
						 
						  if (data.Status == 'success'){
							  
							 
							  $('#LoopCheckProjects').html("");
							  
							  
							  var len = Object.keys(Stream_Id).length;
						
							  for(var i = 0; i<len; i++){
								  
						
								  
										 if(i+1 < len){
											 secondLine= 
											  '<div class="leftLineForm"><input type="checkbox" name="projectId" id="projectId" value="'+Stream_Id[i + 1]+'"/></div><div> <p>'+Stream_Name[i + 1]+'</p></div>';
											  
										  }else{
											  secondLine="";
											 }
										  
								  
								  
								  $('#LoopCheckProjects').append(
							   
							   
							   '<div class="lineFormProjects">'+
							   
								  '<div class="lineProject"><div class="leftLineForm"><input type="checkbox" name="projectId" id="projectId" value="'+Stream_Id[i]+'"/></div><div> <p>'+Stream_Name[i]+'</p></div></div>'+
								  '<div class="lineProject">'+secondLine+'</div>'+
                                  
                                        
                                     '</div>'
							   
							   );
								
									i++;
									
						
			 } //End form loop
							  
							     
                                     
                                    
							  
							  
							  
							  
						  }else{
							  
							  alert('Error displaying projects');
							  
							  }
							 
					  }
				});
				return false;
	
	
	
	
});


$('#btnCreateForm').click(function(){
	
	var formName = $('#formName').val();
	
	
	
	 var Projects = [];
        $('#projectId:checked').each(function(i){
          Projects[i] = $(this).val();
      });
	  
	  ProjectsSelected = Projects.toString();
	  
	  
	  
	  if(ProjectsSelected == ""){
		  
		  	alert("Please selecte related project to this form");
			$('#formName').focus();
		
		} else if(formName == ""){
			alert("Please introduce a form name");
			$('#formName').focus();
		}else{
		
			var dataString = 'formName='+formName+'&ProjectsSelected='+ProjectsSelected+'&CreateForm=true';
				 
				
				$.ajax({
					  type: "POST",
					  url: Url+'PHP/FunctionsMobileForm.php',
					  data: dataString,
					  dataType:"Json",
					  success: function(data) {
						  
						 
						  if (data.Status == 'success'){
							  
							  $('#FirstStepFormName').html("");
							  
							  var Status	 = data.Status;
							  var Form_Id 	= data.Form_Id;
							  var Form_Name = data.Form_Name;
							  var Projects	= data.Projects;
							  
							  
							  
						
								$('#FirstStepFormName').css('display','none');	
								
								// This display The next steps to insert fields on my form. 
								
									
								$('#TitleFieldCont').html(Form_Name + '  fields');
								$('#Form_Id').val(Form_Id);
								$('#Form_Name').val(formName);
								
								
								$('#SeconStepFormColumns').css('display','-webkit-box');
								$('#containerFields').css('display','-webkit-box');
							  
						  }else if(data.Status == 'duplicate'){
						  
							 alert('This Name Already exist on the database. \n');
							 $('#formName').focus();
						  
						  }else{
							  
							  alert('Error creating new form');
							  
							  }
							 
					  }
				});
				return false;
	
		} // End else conditons
	

});







$('#btnAddField').click(function(){
	
	var Type_Field 	= $('input:radio[name=Type_col]:checked').val();
	var Form_Id 	= $('#Form_Id').val();
	var ColName 	= $('#colName').val();



		
	if(!$.isNumeric(Type_Field)){
		
		alert("Please select a type filed");
		
	}else if(ColName == ""){
		
		alert("Introcue a field name");
		
	}else if(Type_Field == 5){
		
		
			 var valuesDropMenu = DropArray.toString();
				DropArray = [];  // Empty array because I do need more
				//alert(DropArray);
			var dataString = 'Type_Field='+Type_Field+'&Form_Id='+Form_Id+'&valuesDropMenu='+valuesDropMenu+'&ColName='+ColName+'&AddFieldDropForm=true';
				 
				
				$.ajax({
					  type: "POST",
					  url: Url+'PHP/FunctionsMobileForm.php',
					  data: dataString,
					  dataType:"Json",
					  success: function(data) {
				
						var Field_Id 				= data.Field_Id;
						var Field_Name 				= data.Field_Name;
						var Field_Type_Id 			= data.Field_Type_Id;
						var Form_Id 				= data.Form_Id;
						var Field_Type_Description 	= data.Field_Type_Description;
						
						
						
						
						if(data.Status == 'NoRowsAffectedDefault'){
							
							alert('No rows affected');
							
						}else if (data.Status == 'success'){
							  
							  
							  
							  $('#containerLoopFields').html("");
							  $('#colName').val("");
							  $('#Type_col').prop('checked', false);
							  
							  
							  
							  for(var i in Field_Id){
								  
								   $('#containerLoopFields').append(
								   
									   '<div class="lineFieldsLoop">'+
											'<div class="leftLineFieldLoop">'+
												'<p>'+Field_Name[i]+'</p>'+
											'</div>'+ 
											'<div class="centerLineFieldLoop">'+
												'<p>'+Field_Type_Description[i]+'</p>'+
											'</div>'+
											'<div class="rightLineFieldLoop">'+
												'<a href="javascript:deleteField('+Field_Id[i]+','+Form_Id+')"><img src="Images/trash.png" alt="trash Icon"> </a>'+
											'</div>'+
									   '</div>'
								 );
								  
								  
								} // End for loop
							  
						
							  
						 }else{
							  
							  alert('Error creating field');
							  
						 }
							 
					  }
				});
				return false;
	
	
		
		
		
	}else{
		
		
	
		
			var dataString = 'Type_Field='+Type_Field+'&Form_Id='+Form_Id+'&ColName='+ColName+'&AddFieldForm=true';
				 
				
				$.ajax({
					  type: "POST",
					  url: Url+'PHP/FunctionsMobileForm.php',
					  data: dataString,
					  dataType:"Json",
					  success: function(data) {
				
						var Field_Id 				= data.Field_Id;
						var Field_Name 				= data.Field_Name;
						var Field_Type_Id 			= data.Field_Type_Id;
						var Form_Id 				= data.Form_Id;
						var Field_Type_Description 	= data.Field_Type_Description;
						
						
						if (data.Status == 'success'){
							  
							  $('#containerLoopFields').html("");
							  $('#colName').val("");
							  $('#Type_col').prop('checked', false);
							  
							  
							  
							  for(var i in Field_Id){
								  
								   $('#containerLoopFields').append(
								   
									   '<div class="lineFieldsLoop">'+
											'<div class="leftLineFieldLoop">'+
												'<p>'+Field_Name[i]+'</p>'+
											'</div>'+ 
											'<div class="centerLineFieldLoop">'+
												'<p>'+Field_Type_Description[i]+'</p>'+
											'</div>'+
											'<div class="rightLineFieldLoop">'+
												'<a href="javascript:deleteField('+Field_Id[i]+','+Form_Id+')"><img src="Images/trash.png" alt="trash Icon"> </a>'+
											'</div>'+
									   '</div>'
								 );
								  
								  
								} // End for loop
							  
						
							  
						 }else{
							  
							  alert('Error creating field');
							  
						 }
							 
					  }
				});
				return false;
	
	
		
	
	} // end else if condition
	
	
	
});






//////// This part create my modal windows to insert other vaulues /////////

var DropDownValues = function(){
	
	//This create the modal window
	
	
	$('body').append(
			'<div id="modalBoxAlert">'+
              '<div id="boxAlert">'+
			  '<a href="javascript:closeModalBox()" id="closeButton"><img src="Images/close.png" alt="closeIcon"></a>'+
                      '<input type="text" id="valueDropMenu" placeholder="Value" />'+
                      '<button type="button" id="btnAddValue" onclick="addDropValue()" >Add</button>'+
					  '<button type="button" id="btnDone" onclick="DoneDropValue()">Done</button>'+
					  
					'<div id="ResultValues"></div>'+
              '</div>'+
         '</div>'					

								
	 );
	 
	 
	
	$('#modalBoxAlert').css('display','block');
	$('#modalBoxAlert').css('position','fixed');
	$('#modalBoxAlert').css('top','0');
	$('#modalBoxAlert').css('right','0');
	$('#modalBoxAlert').css('bottom','0');
	$('#modalBoxAlert').css('left','0');
	$('#modalBoxAlert').css('background-color','rgba(0,0,0,0.2)');
	$('#modalBoxAlert').css('opacity','1');
	$('#modalBoxAlert').css('z-index','1000');


	$('#boxAlert').css('text-align','center');
	$('#boxAlert').css('width','70%');
	$('#boxAlert').css('height','180px');
	$('#boxAlert').css('padding','10px');
	$('#boxAlert').css('position','fixed');
	$('#boxAlert').css('top','100px');
	$('#boxAlert').css('left','10%');
	$('#boxAlert').css('background','-webkit-linear-gradient(#fff, #DDD)');
	$('#boxAlert').css('-webkit-box-shadow','2px 2px 2px rgba(0,0,0,0.5)');




	$('#ResultValues').css('width','97%');
	$('#ResultValues').css('height','90px');
	$('#ResultValues').css('padding','5px');
	$('#ResultValues').css('background-color','white');
	$('#ResultValues').css('border','1px inset white');
	$('#ResultValues').css('overflow','scroll');



	$('#boxAlert input').css('margin-top','10px');
	$('#boxAlert input').css('text-align','center');
	$('#boxAlert input').css('width','95%');


	$('#btnAddValue').css('margin-top','10px');
	$('#btnAddValue').css('width','50%');
	
	$('#btnDone').css('margin-top','10px');
	$('#btnDone').css('width','50%');

	$('#closeButton').css('position','absolute');
	$('#closeButton').css('top','-15px');
	$('#closeButton').css('left','-15px');
	
	
	// Now I need to display the values that already it have
	
	
	
for(var i = 0; i< DropArray.length; i++){
			
		$('#ResultValues').append(
			'<div class="valueDropLine">'+DropArray[i]+'</div>'
		);
		$('#valueDropMenu').val("");
		$('.valueDropLine').css('height','25px');
	    $('.valueDropLine').css('border-bottom','1px dashed gray');
} // end for loop inside
 				
	
 

} // End of muy function createModalInput


var closeModalBox =  function(){
	$('#modalBoxAlert').hide();
	$('#modalBoxAlert').remove();
	
	$('#boxAlert').hide();
	$('#boxAlert').remove();
	
	$('#closeButton').hide();
	$('#closeButton').remove();
}




var addDropValue = function(){
	
		var count = 0;
	
	
	var DropValue = $('#valueDropMenu').val();
	
	
	if(DropValue == ""){
		alert('Please introduce a value');	
		 $('#valueDropMenu').focus();
	}else{
		
		
		for(var i = 0; i< DropArray.length; i++){
			
				
				if(DropArray[i] == DropValue){
					
					count +=1;
				}
				
			}
			
			if(count == 0){
				
		
				DropArray.push(DropValue);
				
					$('#ResultValues').append(
						'<div class="valueDropLine">'+DropValue+'</div>'
					);
								
					$('#valueDropMenu').val("");
					$('.valueDropLine').css('height','25px');
					$('.valueDropLine').css('border-bottom','1px dashed gray');
									
			}else{
					alert(DropValue +'This value already exists');
					$('#valueDropMenu').focus();
				}
		
				

	}
	
	

}



var DoneDropValue = function(){
	
	
	$('#modalBoxAlert').hide();
	$('#modalBoxAlert').remove();
	
	$('#boxAlert').hide();
	$('#boxAlert').remove();
	
	$('#closeButton').hide();
	$('#closeButton').remove();
	
}










//////




var displayFieldsForm = function(Form_Id){
	
			
			
			var dataString = 'Form_Id='+Form_Id+'&DisplayFieldForm=true';
				 
				
				$.ajax({
					  type: "POST",
					  url: Url+'PHP/FunctionsMobileForm.php',
					  data: dataString,
					  dataType:"Json",
					  success: function(data) {
				
						var Field_Id 				= data.Field_Id;
						var Field_Name 				= data.Field_Name;
						var Field_Type_Id 			= data.Field_Type_Id;
						var Form_Id 				= data.Form_Id;
						var Field_Type_Description 	= data.Field_Type_Description;
						
						
						if (data.Status == 'success'){
							  
							  $('#containerLoopFields').html("");
							  $('#colName').val("");
							  $('#Type_col').prop('checked', false);
							  
							  
							  
							  for(var i in Field_Id){
								  
								   $('#containerLoopFields').append(
								   
									   '<div class="lineFieldsLoop">'+
											'<div class="leftLineFieldLoop">'+
												'<p>'+Field_Name[i]+'</p>'+
											'</div>'+ 
											'<div class="centerLineFieldLoop">'+
												'<p>'+Field_Type_Description[i]+'</p>'+
											'</div>'+
											'<div class="rightLineFieldLoop">'+
												'<a href="javascript:deleteField('+Field_Id[i]+','+Form_Id+')"><img src="Images/trash.png" alt="trash Icon"> </a>'+
											'</div>'+
									   '</div>'
								 );
								  
								  
								} // End for loop
							  
						
							  
						 }else{
							  
							  
							  
						 }
							 
					  }
				});
				return false;
	
	
		
	
}




var deleteField = function(Field_Id,Form_Id){
	
	
	var dataString = 'Field_Id='+Field_Id+'&deleteFieldForm=true';
				 
				
				$.ajax({
					  type: "POST",
					  url: Url+'PHP/FunctionsMobileForm.php',
					  data: dataString,
					  dataType:"Json",
					  success: function(data) {
						  
						  if (data.Status == 'success'){
							   displayFieldsForm(Form_Id);
							  
						 }else{
							  
							alert('Error deleting field');
							  
						 }
							 
					  }
				});
				return false;
	
	
	
	
	
} // End deleteFields










var displayFormFormat = function(Form_Id,Form_Name){
	

   var Form_Id = $('#Form_Id').val();
	var Form_Name = $('#Form_Name').val();
	
	
	$('#formNameResult').html(Form_Name + ' Form');
	
	
		var dataString = 'Form_Id='+Form_Id+'&DisplayFieldForm=true';
				 
				
				$.ajax({
					  type: "POST",
					  url: Url+'PHP/FunctionsMobileForm.php',
					  data: dataString,
					  dataType:"Json",
					  success: function(data) {
				
						var Field_Id 				= data.Field_Id;
						var Field_Name 				= data.Field_Name;
						var Field_Type_Id 			= data.Field_Type_Id;
						var Form_Id 				= data.Form_Id;
						var Field_Type_Description 	= data.Field_Type_Description;
						var secondLine;
						var nameSelect;
						var count=1;
						
						if (data.Status == 'success'){
							  
						 $('#containerFormDisplay').html("");
						 
						 $('#containerFormDisplay').append(
							'<div id="contentSelect"></div>'
							);
						
						   var len = Object.keys(Field_Id).length;
							
							
							
							for(var i in Field_Id){
								
								 if(Field_Type_Id[i] == 5){
									  
									   nameSelect = 'select'+[i];
									   
									   	$('#contentSelect').append(
											'<div class="lineSelect">'+
												'<div class="leftLineSelect">'+
										  	 		'<p>'+Field_Name[i]+'</p>'+
												'</div>'+
												'<div class="rightLineSelect">'+
													'<select id="'+nameSelect+'"></select>'+
												'</div>'+
										   '<div>'
										);
								       displayValuesDropMenu(nameSelect,Field_Id[i]);
								   }
								   
							} // End for loop 1
							
							
							 
							  for(var i in Field_Id){
								  
									
									
									
								  
								  if(Field_Type_Id[i] != 5){
									  
									  
									  		$('#containerFormDisplay').append(
											
												 '<div class="twoLabelAndInput">'+
														'<div class="lineInputLabel">'+
															   '<div class="labelDynamic">'+
																		'<label>'+Field_Name[i]+'</label>'+
																'</div>'+
																'<div class="inputDynamic">'+
																	 '<input type="'+Field_Type_Description[i]+'" id="'+Field_Id[i]+'" />'+
																'</div>'+
														'</div>'+
																				
											  '</div>'
											);
											
								
										
										 
										}  //End foor Loop
										
										
							  } // End if conditions Field_Type_Id[i] != 5)
							 
							  
						 }
						 
					  else{
						  
						  //// This is error section
						  
						  
						  }
							 
					  }
				});
				return false;
	
	
}





var displayValuesDropMenu = function(nameSelect,Field_Id){
	
		
		var dataString = 'Field_Id='+Field_Id+'&DisplayValuesDropMenu=true';
				 
				
				$.ajax({
					  type: "POST",
					  url: Url+'PHP/FunctionsMobileForm.php',
					  data: dataString,
					  dataType:"Json",
					  success: function(data) {
				
						if (data.Status == 'success'){
							  
							  var Default_Id 			= data.Default_Id;
							  var Default_Description 	= data.Default_Description;
							  var Field_Id 				= data.Field_Id;
							  
							
							for(var i in Default_Id){
									
									$('#'+nameSelect+'').append(
										'<option value="'+Default_Description[i]+'">'+Default_Description[i]+'</option>'	
									);
							}
							
							
							
						}else if (data.Status == 'NoRows'){
							
						}else{
							
							alert("Error displaying drop down menu values");
						 }
							 
					  }
				});
				return false;
	
	
		
		
		
		
		
		

} //  end displayValuesDropMenu
