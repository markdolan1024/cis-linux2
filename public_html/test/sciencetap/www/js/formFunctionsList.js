/// GLOBAL VARIABLES


/// Functions move between pages on form file.



$(document).ready(function(e) {
	
	
	
	
			var dataString = 'DisplayFormsInfo=true';
				 
				
				$.ajax({
					  type: "POST",
					  url: Url+'PHP/FunctionsMobileForm.php',
					  data: dataString,
					  dataType:"Json",
					  success: function(data) {
						
				
						var Form_Id 		= data.Form_Id;
						var Form_Name 		= data.Form_Name;
						var Date_Form 		= data.Date_Form;
						var Date_Form_Mysql = data.Date_Form_Mysql;
					
						
						if (data.Status == 'success'){
							  
							  $('#ListFormContent').html("");
						
							  
							  
							 
								  
								 
									  
									   for(var i in Form_Id){
										   
										    if(Form_Id[i] != 0){
								  
								   $('#ListFormContent').append(
								   
									 '<div class="lineListForm">'+
										'<div class="FormNameDiv">'+Form_Name[i]+'</div>'+
										'<div class="FormDateDiv">'+Date_Form[i]+'</div>'+
										'<div class="FormActionDiv">'+
						'<a href="#ResultForm" data-transition="slideup" onClick="displayFormFormat('+Form_Id[i]+',\''+Form_Name[i]+'\')">'+
											'<img src="Images/viewForm.png" alt="view form"/></a>'+
										'</div>'+
									
									'</div>'
								 );
								  
								  
									   } // end if condition Form_Id[i] != 0
								  
								} // End for loop
							  
						
							  
						 }else{
							   $('#ListFormContent').html("");
							  alert('Error Displaying Form');
							  
						 }
							 
					  }
				});
				return false;
	
	
});








var displayFormFormat = function(Form_Id,Form_Name){
	

	
	
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