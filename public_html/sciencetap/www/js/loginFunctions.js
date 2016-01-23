
$('#loginBtn').click(function(){
	
	
	var emailInput = $('#emailInput').val(); 
	var password = $('#password').val(); 
	
		if(emailInput == "" || emailInput==null){
			
			alert("Email Required");
			$('#emailInput').focus();
			
		}else if(password == "" || password==null){
			
			alert("Password Required");
			$('#emailInput').focus();
		}if(!isValidEmailAddress(emailInput)){
			alert("Email Format Inorrect");
			$('#emailInput').focus();
			}else{
	
		var dataString = 'emailLogin='+emailInput + '&passLogin='+password +'&buttonLoginCellphone=true';
			
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				  dataType:"Json",
				  success: function(data) {
					  
					 
					  if (data.Status == 'success'){
						    
						var idUser 		= data.idUser;
						var Email		= data.Email;
						var FirstName 	= data.FirstName;
						var LastName 	= data.LastName;
						var ImageUser 	= data.ImageUser;
						var Phone		= data.Phone;
						var Permissions = data.Permissions;
						var User_Type_Id = data.User_Type_Id;
						
						///  Store this variables in the memory of the cellphone to remember login
						//setting an item

							window.localStorage.setItem("idUser", idUser);
						    window.localStorage.setItem("Email", Email);
							window.localStorage.setItem("FirstName",FirstName );
						    window.localStorage.setItem("LastName",LastName);
						    window.localStorage.setItem("ImageUser",ImageUser);
							window.localStorage.setItem("Phone", Phone);
							window.localStorage.setItem("Permissions", Permissions);
							window.localStorage.setItem("Usert_Type", User_Type_Id);
					
							window.open("weather.html", '_self', 'location=yes');
				 		
					  }else if(data.Status == 'incative'){
						  
						  alert('Inactive Account. Check your email to activate it. ');
						  
						  }else{
							 alert('Login Fail');
							  }
						 
				  }
			});
			return false;


			}

});




function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
};
