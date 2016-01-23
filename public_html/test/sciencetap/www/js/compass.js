
/*

  // Wait for device API libraries to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
    function onDeviceReady() {
        navigator.compass.getCurrentHeading(onSuccess, onError);
    }

    // onSuccess: Get the current heading
    //
    function onSuccess(heading) {
		$('#degreesCompas').val(heading.magneticHeading)

    }

    // onError: Failed to get the heading
    //
    function onError(compassError) {
        alert('Compass Error: ' + compassError.code);
    }

	*/


document.addEventListener('deviceready', function(){
	var watchId = 0;
	
	$('#btnWatch').bind( 'touchstart', function(){
		
		
			
			$('#btnWatch').hide();
			$('#StopWatch').show();
	
			// Default of 100ms
			
			options = {
				frequency: 100
				};
				
				watchId = navigator.compass.watchHeading( function(heading){
						var rotation = Math.round( heading.magneticHeading ) + 'deg';
						
						$(' #compassDegree').val(heading.magneticHeading);
						$(' #imgNeedle').css('-webkit-transform','rotate('+ rotation +')');
						
					}, function(error){
						console.log('Error');
					}, options);
					
		
	}); //End functio btnWatch 

	$('#StopWatch').bind( 'touchstart', function(){	
		
		if(watchId){
			
		
			 
			 	navigator.compass.clearWatch(watchId);
				watchId = null;
				$(' #imgNeedle').css('-webkit-transform','rotate(0)');
				$('#compassDegree').val("");
				$('#btnWatch').show();
				$('#StopWatch').hide();
		
		}
		
		
	
		}); //End functio btnWatch 
		
	});
	
	
