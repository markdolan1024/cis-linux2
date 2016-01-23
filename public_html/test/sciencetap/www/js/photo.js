
jQuery(document).ready(function ($) {
	getPhoto();
});


function getPhoto() {
  
     
	var content = 'DisplayPhotos=true';
	
		     
	$.ajax({
		type:'POST',
		data: content,
		url: Url+'PHP/getPhoto.php',
		dataType:'Json',
		success: function(data){
			if(data.Status = 'success'){
						
				var photoId = data.Photo_Id;
				var lat = data.Lat_Photo;
				var lng = data.Lon_Photo;
				var date = data.Date;
				var link = data.link;
				var time = data.Time;
									     		
				$('#imageContainer').html("");
				     	
				for(var i in photoId){     	
				
					$('#imageContainer').append(
					'<div id="photoTile">'+
					'<a href="#pageBigPhoto" onclick="viewPhoto('+photoId[i]+','+lat[i]+','+lng[i]+',\''+date[i]+'\',\''+link[i]+'\')" data-transition="slideup"><img id="photo" alt="1" src="'+UrlMap+''+link[i]+'"></a></div>'
					);	
					 							
					 //onclick="viewPhoto('+photoId[i]+','+lat[i]+','+lng[i]+',\''+date[i]+'\',\''+link[i]+'\')"							
				} // This is the end of my foor loop
				
									     	
			}else{
				alert('All is lost');     		
			}
				     	
		}
				     	 
	});
	
	return false;
		     
}


function viewPhoto(idPhoto,lat, lng, date, link) {
		
	var urlPhoto = UrlMap+''+link;

	$('#photoSingle').attr("src",urlPhoto);
	
//	
//	$('#singlePhoto').html("");
//	$('#singlePhoto').append(
//		'<div><img id="photo" alt="1" src="http://www.web-huertas.com/work/programs/ScienceTap'+link+'"></div>'
//	);
}



