/// GLOBAL VARIABLES
var DropArray = [];

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
											'<div class="FormActionDiv2">'+
							'<a href="#createFormEdit" data-transition="slideup" onClick="displayFormEdit('+Form_Id[i]+',\''+Form_Name[i]+'\')">'+
												'<img src="Images/EditFormBlack.png" alt="view form"/></a>'+
											'</div>'+
										
										'</div>'
									 );
								  
								  } // end if Form_Id[i] != 0 condition
								  
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
						var boolean = false;
						
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




var displayFormEdit = function(Form_Id,Form_Name){
	
	
	
	$('#Form_Id').val(Form_Id);
	$('#Form_Name').val(Form_Name);	
                                       
	$('#TitleFieldCont').html(Form_Name + ' Fields ');
	
	
	
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
												'<a href="javascript:deleteField('+Field_Id[i]+','+Form_Id+',\''+Form_Name+'\')"><img src="Images/trash.png" alt="trash Icon"> </a>'+
											'</div>'+
									   '</div>'
								 );
								  
								  
								} // End for loop
							  
						displayProjectToEdit(Form_Id);
							  
						 }else{
							  
							  
							  
						 }
							 
					  }
				});
				return false;
	
	
	
	
	
} //end displayFormEdit functions







var deleteField = function(Field_Id,Form_Id,Form_Name){
	
	
	var dataString = 'Field_Id='+Field_Id+'&deleteFieldForm=true';
				 
				
				$.ajax({
					  type: "POST",
					  url: Url+'PHP/FunctionsMobileForm.php',
					  data: dataString,
					  dataType:"Json",
					  success: function(data) {
						  
						  if (data.Status == 'success'){
							   displayFormEdit(Form_Id,Form_Name);
							  
						 }else{
							  
							alert('Error deleting field');
							  
						 }
							 
					  }
				});
				return false;
	
	
	
	
	
} // End deleteFields





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








var displayProjectToEdit = function(Form_Id){
	

		
		var dataString = 'Form_Id='+Form_Id+'&displayProjectToEdit=true';
				 
				
				$.ajax({
					  type: "POST",
					  url: Url+'PHP/FunctionsMobileForm.php',
					  data: dataString,
					  dataType:"Json",
					  success: function(data) {
				
						if (data.Status == 'success'){
							
							$('#containerLoopForms').html("");
							
							  var Stream_Id 		= data.Stream_Id;
							  var Stream_Name 		= data.Stream_Name;
							
							  var Stream_Id_Selected	= data.Stream_Id_Selected;
							  var selected;
								
								
							var len = Stream_Id_Selected.length;
							
							for(var i in Stream_Id){
								
								selected="";
									for(var c = 0; c < len; c++){
										
										if(Stream_Id[i] == Stream_Id_Selected[c]){
											selected = "checked";
										}
										
									} // End inside foor loop
									
									
									$('#containerLoopForms').append(
										
										'<div class="lineFormLoop">'+
											'<div class="leftLineFormLoop">'+
												'<input type="checkbox" '+selected+' id="'+Stream_Id[i]+'"  value="'+Stream_Id[i]+'" onclick="updateProjecFromEditForm('+Stream_Id[i]+','+Form_Id+')" >'+
											'</div>'+
											
											'<div class="rightLineFormLoop">'+
												'<p>'+Stream_Name[i]+'</p>'+
											'</div>'+
										'</div>'
															
										
									);
							}
							
							
							
						}else if (data.Status == 'noRows'){
							
						}else{
							
							alert("Error displaying form on panel");
						 }
							 
					  }
				});
				return false;
	
	
		
	
		

} //  end displayFormToEdit







var updateProjecFromEditForm =  function(Stream_Id,Form_Id){
	
	
	
	var checked = $('#' + Stream_Id).is(":checked")
	
	
		var dataString = 'Form_Id='+Form_Id+'&Stream_Id='+Stream_Id+'&checked='+checked+'&updateProjecFromEditForm=true';
				 
				
				$.ajax({
					  type: "POST",
					  url: Url+'PHP/FunctionsMobileForm.php',
					  data: dataString,
					  dataType:"Json",
					  success: function(data) {
				
						if (data.Status == 'successINSERT'){
							
								
									
								
						}else if (data.Status == 'errorINSERT'){
								alert("Error updating new project")
						
						}else if (data.Status == 'successDELETE'){
							
							
						}else{
							
							alert("Error update deleting projec");
						 }
							 
					  }
				});
				return false;
	
	

	
	
	
	
} // end updateProjecFromEditForm








//////

