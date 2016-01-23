	
	// GlobalVariables;
	
	var ImageUser;
	var pictureSource;   // picture source
    var destinationType; // sets the format of returned value

    // Wait for device API libraries to load
    //
    document.addEventListener("deviceready",onDeviceReady,false);


    function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }

    function onPhotoDataSuccess(imageURI) {
		var ImageUser = imageURI;
		$('#imgUserRegistration').attr('src',ImageUser);
	//	var NamePicture = "juan";
	//	uploadPhoto(imageURI, NamePicture)
    //  	openPage1();
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(imageURI) {
      	var ImageUser = imageURI;
		$('#imgUserRegistration').attr('src',ImageUser);
	//	var NamePicture = "juan";
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
      //alert('Failed because: ' + message);
    }





// This section is to upload the picture

function uploadPhoto(imageURI, NameImage) {
  
    var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName=NameImage.substr(NameImage.lastIndexOf('/')+1);
    options.mimeType="image/jpge";
	

    
    var params = new Object();
    params.value1 = "test";
    params.value2 = "param";
    
    options.params = params;
    options.chunkedMode = false;
    
    var ft = new FileTransfer();
    ft.upload(imageURI, Url+'PHP/FunctionsMobile.php', win, fail, options,true);
	

}

function win(r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
    alert(r.response);
}

function fail(error) {
    alert("An error has occurred: Code = " .error.code);
}

function openPage1(){
  location.href = "#page1";
 }







	
function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
};
	
// This function is to check if is number
function isNumber(n) {
 	return !isNaN(parseFloat(n)) && isFinite(n);
}
				


$("#buttonRegister").click(function(){
	
	              
                        
	
	
	var name   	 	= $("#name").val(); 
	var last		= $("#last").val(); 
	var email		= $("#email").val();
	var cellphone	= $("#cellphone").val();
	var Twitter		= $("#Twiter").val();
	var Facebook	= $("#Facebook").val();
	var pass		= $("#password").val();
	var re_pass		= $("#re_password").val();

	var NameImage = email;
	var $img = $("#imgUserRegistration");
	var ImageUser = $img.attr("src");

	
				 
	if(name == ""){
		
		alert("Please enter a first name");
		$("#name").focus();
		 	
	}else if(last == ""){
		
		alert("Please enter a last name");
		$("#last").focus();
		
	}else if(email == ""){
		alert("Please enter an email address");
		$("#email").focus();
		
	}else if(!isValidEmailAddress(email)){
		
		alert("Please enter a valid email");
		$("#email").focus();
		
	}else if(cellphone == ""){
		
		alert("Please enter a valid phone number");
		$("#cellphone").focus();
		
	}
	else if(!isNumber(cellphone)){
		
		alert("No spaces and characters allowed in a phone number");
		$("#cellphone").focus();
	}
	else if(pass == ""){
			
		alert("Please enter a password");
		$("#pass").focus();
		
	}else if(re_pass == ""){
		alert("Please re-enter your password");
		$("#re_pass").focus();
		
	}else if(pass != re_pass){
		alert("Passwords do not match");
		$("#pass").focus();
		
	}else if(pass.length < 6){
		alert("Minimum password length of 6 characters");
		$("#pass").focus();
		
	}else{
	
		
 
				 
		 
		 
	var dataString = 'name='+ name + '&last='+ last +'&email='+ email +'&cellphone='+ cellphone +'&Twitter='+ Twitter +'&Facebook='+ Facebook +'&pass='+ pass +'&InsertUser=true';
			 
			
			$.ajax({
				  type: "POST",
				  url: Url+'PHP/FunctionsMobile.php',
				  data: dataString,
				  dataType:"Json",
				  success: function(data) {
					  
					 
					  if (data.Status == 'success'){
						  
						 		uploadPhoto(ImageUser, NameImage); 
						 
								$("#name").val(""); 
								$("#last").val(""); 
								$("#email").val("");
								$("#cellphone").val("");
								$("#Twiter").val("");
								$("#Facebook").val("");
								$("#password").val("");
								$("#re_password").val("");
								$('#imgUserRegistration').attr('src',' ');
								
								alert("Check your email to activate this account");
					  }else{
						  
						  alert('error adding user');
						  
						  }
						 
				  }
			});
			return false;
		 
		 
		 
		 
		 
		 
		} // End else condition
	
	
	
	
});



$('#PrivacyPol').click(function(){
	 window.open('https://policy-portal.truste.com/core/privacy-policy/ScienceTap/139b7f56-c40f-458e-a469-e1bf15b68e7e','_blank', 'location=yes');
});


	


	


