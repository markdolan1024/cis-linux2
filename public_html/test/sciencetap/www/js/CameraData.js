	
	// GlobalVariables;
	
	var ImageUser;
	var pictureSource;   // picture source
    var destinationType; // sets the format of returned value
	var lat_Image = 0;
	var lng_Image = 0;
	

    // Wait for device API libraries to load
    //
    document.addEventListener("deviceready",onDeviceReady,false);


    function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }

    function onPhotoDataSuccess(imageURI) {
		uploadPhoto(imageURI);
   
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(imageURI) {
      	var ImageUser = imageURI;
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
	  saveToPhotoAlbum: true ,
	  targetWidth: 1000,
	  targetHeight: 1330
		
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
	
	});
}



    // Called if something bad happens.
    //
    function onFail(message) {
      		window.localStorage.setItem("ObservationID","");
			window.localStorage.setItem('lat_Image',"");
			window.localStorage.setItem('lon_Image',"");
			window.location = "data.html#pageAddStream";

    }





// This section is to upload the picture

function uploadPhoto(imageURI) {
  
  	var ObservationID =  window.localStorage.getItem("ObservationID");
	var latImage = window.localStorage.getItem('lat_Image');
	var lngImage = window.localStorage.getItem('lon_Image');
	var Site_Id = window.localStorage.getItem('Site_Id');
	

  // I need the lat on lon fot this img
 
  	
   //Note the NameImage is the Observation Id 
   
    var NameImage 	= 'Image_';

  
    var options = new FileUploadOptions();
    options.fileKey="fileObservation";
    options.fileName=NameImage.substr(NameImage.lastIndexOf('/')+1);
    options.mimeType="image/jpge";
	

    
    var params = new Object();
    params.value1 = "test";
    params.value2 = "param";
    
    options.params = params;
    options.chunkedMode = false;
    

	
	var dataString = 'latImage='+latImage+'&lngImage='+lngImage+'&ObservationID='+ObservationID+'&Site_Id='+Site_Id+'AddPhotoObservation=true';
	
    var ft = new FileTransfer();
    ft.upload(imageURI, Url+'/PHP/FunctionsMobile.php?'+dataString, win, fail, options,true);

	

}

function win(r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
    
	var resultConfirmation =  confirm("Do you want to include one more picture?");
	
		if(resultConfirmation == true){
			capturePhoto();
		}else{
			
			window.localStorage.setItem("ObservationID","");
			window.localStorage.setItem('lat_Image',"");
			window.localStorage.setItem('lon_Image',"");
			window.localStorage.setItem('Site_Id',"");
			window.location = "data.html#pageAddStream";

		}	
}

function fail(error) {
    alert("An error has occurred: Code = " .error.code);
}





var  getLocation = function(){
  document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
  navigator.geolocation.getCurrentPosition(onSuccess, onError);     
}

function onSuccess(position) {
  window.localStorage.setItem('lat_Image',position.coords.latitude);
	window.localStorage.setItem('lon_Image',position.coords.longitude);
}

function onError(error) { 
  alert('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n');
}




 function capturePhotoSite(SiteId,Lat,Lon) {
	 
	 // I need to start the variables on the computer session to use later.
	 
	 		window.localStorage.setItem('lat_Image',Lat);
			window.localStorage.setItem('lon_Image',Lon);
			window.localStorage.setItem('Site_Id',SiteId);
	 
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { 
	  quality : 100,
	  destinationType : Camera.DestinationType.FILE_URI,
	  sourceType : Camera.PictureSourceType.CAMERA,
	  allowEdit : false,
	  saveToPhotoAlbum: true ,
	  targetWidth: 1000,
	  targetHeight: 1330
		
		});
    }
