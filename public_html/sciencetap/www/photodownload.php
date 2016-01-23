<!DOCTYPE html>
<html>
<head>

		<title> Dolan Photo Download</title>
		<meta name="Description" content="Mark Dolan's Temple University Astro Page">
		<meta charset="utf-8">

<!-- javascript -->
		<script src="assets/js/jquery-1.11.2.min.js"></script>
		<script src="assets/js/dolan_jquery.js"></script>
<script>
	downloadPhotos = function (){
		var arr = document.getElementsByClassName("photo");
		var x;
		var i = 0;
		$.each(arr, function(index, value){
				var box = "check" + index;
				console.log(box);
				 var bool = document.getElementById(box).checked;
				console.log(bool);
				if(bool){
					var dataString = 'photo='+value.value;
					console.log(value.value);
					window.open('./get_stuff.php?img=' + value.value);
				}
		});
	}

	selectAllButtons = function(){
		$('.photo').prop('checked', true);
	}

	displayPhotos = function(Observations_Id){

		var dataString2 = 'Site_Id='+Observations_Id+'&DisplayPhotos=true';
		var Url = "http://www.sciencetap.us/assets/App/";

		$.ajax({
		type: "POST",
		url: Url+'PHP/FunctionsMobile2.php',
		data: dataString2,
		async: "false",
		dataType:"Json",
		success: function(data) {

                if (data.Status == 'success'){

                        var Photo_Id            = data.Photo_Id;
                        var link_Img            = data.link_Img;
                        var Date_Img            = data.Date_Img;
                        var Time                        = data.Time;
                        var Lat_Photo           = data.Lat_Photo;
                        var Lon_Photo           = data.Lon_Photo;
                        var Observations_Id = data.Observations_Id;
                        var Site_Id             = data.Site_Id;

                        console.log(data.Status);

                        $('#photoDisplay').html("");
                        $('#photo').html("");

                        $('#photoDisplay').css('-webkit-box-pack','start');
                        for( var i in Photo_Id){

				var link = Url + link_Img[i];
				link = link.replace("//assets", "/assets");
				$('#photoDisplay').append(

				'<div id="loopImageCarousel" id="photo' + i + '">' +
						'<input type="checkbox" name="photo' + i + '" id="check' + i + '" class="photo"' + 
							' value="' + link + '">' + '&nbsp' +
						'<span>' + Date_Img[i] + " " + Time[i] + '</span>'+'<br>'+
				'<a href="'+Url+link_Img[i]+'"><img src="'+Url+link_Img[i]+'"  alt="imgCarousel"></a>'+
				'</div>'

				);
                        } // end for loop
                        $('#photoDisplay').append('<br>');
                }else{
                        console.log("Photo query failed");
			$('photoDisplay').html("");
                        $('#photoDisplay').css('-webkit-box-pack','center');
                        $('#photoDisplay').append(
                        '<h1 class="titleFormMeasuresImg"> No images on this observations</h1>'
                        );
                }
        }
});
return false;
} // end displayPhotos 

</script>
	
<!-- Bootstrap -->
		<link href="assets/css/bootstrap.min.css" rel="stylesheet">
		<link href="assets/css/custom.css" rel="stylesheet">
		<style>

		iframe{
			display: none;
		} 

			#loopImageCarousel{
				display: inline-block;
				margin: 2px;
				border-style: dashed;
				border-width: 1px;
				padding: 3px;
			}

			#photoDisplay img{
				width: 100px;
				height: 100px;
				border-style: solid;
				border-width: 1px;
				margin: 2px;
			}
			#photoDisplay span{
				font-size: x-small;
				line-height: 50%;
			}
		</style>
</head>
<body>
<form  id="photoDisplay">
</form>
<input name="execute" onclick="selectAllButtons()" type="button" value="Select All"/>
<input name="selectAll" onclick="downloadPhotos()" type="button" value="Execute"/>

<script> displayPhotos(33); </script>`
		<!-- javascript -->
		<script src="assets/js/bootstrap.min.js"></script>
		<script> $('a.btn-info').tooltip() </script>
		<script src="assets/js/respond.js"></script>
</script>
</body>
</html>
